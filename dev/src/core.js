/* Logique pure : répétition espacée (FSRS-5, paramètres par défaut), correction, statistiques. */
const FSRS = (() => {
  const W = [0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046, 1.54575, 0.1192, 1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655, 0.6621];
  const F = 19 / 81, C = -0.5, RETENTION = 0.9;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const retr = (t, s) => Math.pow(1 + F * t / s, C);
  const interval = (s) => Math.max(1, Math.round((s / F) * (Math.pow(RETENTION, 1 / C) - 1)));
  const d0 = (g) => clamp(W[4] - Math.exp(W[5] * (g - 1)) + 1, 1, 10);
  const nextD = (d, g) => clamp(W[7] * d0(4) + (1 - W[7]) * (d + (-W[6] * (g - 3)) * (10 - d) / 9), 1, 10);
  const sOk = (d, s, r, g) => s * (1 + (11 - d) * Math.pow(s, -W[9]) * (Math.exp(W[10] * (1 - r)) - 1) * (g === 2 ? W[15] : 1) * (g === 4 ? W[16] : 1) * Math.exp(W[8]));
  const sFail = (d, s, r) => Math.min(W[11] * Math.pow(d, -W[12]) * (Math.pow(s + 1, W[13]) - 1) * Math.exp(W[14] * (1 - r)), s);
  /* card : {s, d, last, due, reps, lapses} ou undefined. g : 1 à revoir, 2 difficile, 3 correct, 4 facile. day : numéro du jour. */
  function review(card, g, day) {
    let s, d;
    if (!card || !card.reps) { s = W[g - 1]; d = d0(g); }
    else {
      const r = retr(Math.max(0, day - card.last), card.s);
      s = g === 1 ? sFail(card.d, card.s, r) : sOk(card.d, card.s, r, g);
      d = nextD(card.d, g);
    }
    s = Math.max(s, 0.01);
    return { s, d, last: day, due: g === 1 ? day : day + interval(s), reps: ((card && card.reps) || 0) + 1, lapses: ((card && card.lapses) || 0) + (g === 1 ? 1 : 0), first: card && card.first !== undefined ? card.first : day };
  }
  const preview = (card, day) => [1, 2, 3, 4].map(g => { const n = review(card, g, day); return n.due - day; });
  return { review, preview, retr, interval, W };
})();

/* ---------- Correction d'une ordonnance ---------- */
/* flags : [{ligne, type, partenaires:[], priorite:1|2, note}] */
function matchFlag(flag, p) {
  const part = flag.partenaires || [];
  /* Problème porté par une seule ligne (posologie) : le médicament lui-même, signalé sans association. */
  if (p.lignes.length === 1) return p.cle.includes(flag.ligne) && !part.length;
  const set = [flag.ligne].concat(part);
  if (!set.some(l => p.cle.includes(l))) return false;
  if (!part.length) return true;
  return set.filter(l => p.lignes.includes(l)).length >= 2;
}
function corrigerOrdo(ordo, flags) {
  const used = new Set();
  const problemes = ordo.problemes.map(p => {
    const ms = flags.map((f, i) => ({ f, i })).filter(x => matchFlag(x.f, p));
    ms.forEach(x => used.add(x.i));
    return {
      p, trouve: ms.length > 0,
      niveau: ms.some(x => p.sfpc.includes(x.f.sfpc)),
      interv: ms.some(x => p.interv.includes(x.f.inter)),
      priorite: ms.some(x => x.f.priorite === p.priorite),
      notes: ms.map(x => x.f.note).filter(Boolean)
    };
  });
  const nonAttendus = flags.filter((f, i) => !used.has(i));
  return { problemes, nonAttendus };
}
const AUTO = { juste: 1, incomplet: 0.5, absent: 0 };
/* auto : {pid: {mecanisme:'juste'|'incomplet'|'absent', conduite:...}} */
function scoreOrdo(correction, auto) {
  let score = 0, max = 0; const details = [];
  correction.problemes.forEach(c => {
    const a = (auto && auto[c.p.id]) || {};
    const pts = !c.trouve ? 0 : 1 + (c.niveau ? 1 : 0) + (c.interv ? 1 : 0) + (c.priorite ? 1 : 0) + (AUTO[a.mecanisme] || 0) + (AUTO[a.conduite] || 0);
    score += pts; max += 6;
    details.push({ notion: c.p.notion, score: pts, max: 6, trouve: c.trouve });
  });
  return { score, max, details };
}

/* ---------- Correction d'un cas ---------- */
function scoreCas(cas, posees, hypAuto, optionId) {
  const att = cas.questions.filter(q => q.attendue);
  const ok = att.filter(q => posees.includes(q.id)).length;
  const inutiles = cas.questions.filter(q => !q.attendue && posees.includes(q.id)).length;
  const qPts = Math.max(0, ok / att.length * 2 - inutiles * 0.25);
  const hPts = (AUTO[hypAuto] || 0) * 1;
  const opt = cas.options.find(o => o.id === optionId);
  const bon = !!(opt && opt.correct);
  /* Critère éliminatoire : mauvaise prise en charge ou orientation manquée = cas non validé, quel que soit le reste. */
  const total = bon ? Math.round((qPts + hPts + 2) * 100) / 100 : 0;
  return { score: total, max: 5, questionsOk: ok, questionsAttendues: att.length, inutiles, decisionOk: bon, elimine: !bon,
    details: [{ notion: cas.notion, score: total, max: 5, trouve: bon }] };
}

/* ---------- Statistiques ---------- */
/* store : {cards:{}, reviews:[{id,g,day}], attempts:[{kind,id,day,score,max,details}], days:{}} */
function stats(store, data, day) {
  const notions = {};
  Object.keys(data.NOTIONS).forEach(n => { notions[n] = { id: n, label: data.NOTIONS[n], sais: [0, 0], applique: [0, 0], rates: 0 }; });
  const cardById = {}; data.CARDS.forEach(c => { cardById[c.id] = c; });
  store.reviews.forEach(r => {
    const c = cardById[r.id]; if (!c || !notions[c.notion]) return;
    notions[c.notion].sais[1] += 1; if (r.g >= 2) notions[c.notion].sais[0] += 1;
  });
  store.attempts.forEach(a => (a.details || []).forEach(d => {
    const n = notions[d.notion]; if (!n) return;
    n.applique[0] += d.score; n.applique[1] += d.max; if (!d.trouve) n.rates += 1;
  }));
  const pct = (x) => x[1] ? Math.round(x[0] / x[1] * 100) : null;
  const tot = (k) => { const t = [0, 0]; Object.values(notions).forEach(n => { t[0] += n[k][0]; t[1] += n[k][1]; }); return pct(t); };
  const list = Object.values(notions).map(n => {
    const s = pct(n.sais), a = pct(n.applique);
    const vals = [s, a].filter(v => v !== null);
    return { id: n.id, label: n.label, sais: s, applique: a, rates: n.rates, global: vals.length ? Math.min.apply(null, vals) : null };
  });
  const travaillees = list.filter(n => n.global !== null).sort((x, y) => x.global - y.global);
  const due = data.CARDS.filter(c => { const k = store.cards[c.id]; return k && k.reps && k.due <= day; });
  const nouvelles = data.CARDS.filter(c => !(store.cards[c.id] && store.cards[c.id].reps));
  let serie = 0; for (let d = day; store.days[d]; d--) serie++;
  if (!store.days[day]) { serie = 0; for (let d = day - 1; store.days[d]; d--) serie++; }
  return { sais: tot("sais"), applique: tot("applique"), notions: list, lacunes: travaillees.filter(n => n.global < 70).slice(0, 4),
    recurrentes: list.filter(n => n.rates >= 2), due, nouvelles, serie };
}
function fileRevision(store, data, day, maxNouvelles) {
  const s = stats(store, data, day);
  /* Limite quotidienne : les cartes découvertes aujourd'hui comptent dans le quota. */
  const dejaVues = Object.values(store.cards).filter(k => k.first === day).length;
  return s.due.concat(s.nouvelles.slice(0, Math.max(0, maxNouvelles - dejaVues))).map(c => c.id);
}
const CORE = { FSRS, matchFlag, corrigerOrdo, scoreOrdo, scoreCas, stats, fileRevision };
if (typeof module !== "undefined") module.exports = CORE;
