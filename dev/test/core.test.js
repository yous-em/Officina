// Contrôle de la logique : correction, scores, répétition espacée, cohérence des données.
const assert = require("assert");
const fs = require("fs"); fs.writeFileSync("/tmp/officina-data.cjs", fs.readFileSync(__dirname + "/../src/data.js", "utf8") + fs.readFileSync(__dirname + "/../src/data2.js", "utf8") + fs.readFileSync(__dirname + "/../src/data3.js", "utf8") + fs.readFileSync(__dirname + "/../src/data4.js", "utf8") + fs.readFileSync(__dirname + "/../src/data5.js", "utf8") + fs.readFileSync(__dirname + "/../src/data6.js", "utf8") + fs.readFileSync(__dirname + "/../src/data7.js", "utf8") + fs.readFileSync(__dirname + "/../src/data8.js", "utf8") + fs.readFileSync(__dirname + "/../src/data9.js", "utf8") + fs.readFileSync(__dirname + "/../src/data10.js", "utf8") + fs.readFileSync(__dirname + "/../src/data11.js", "utf8") + fs.readFileSync(__dirname + "/../src/data12.js", "utf8") + ["data13", "data14", "data15", "data16", "data18", "data17"].map((f) => fs.readFileSync(__dirname + "/../src/" + f + ".js", "utf8")).join(""));
const D = require("/tmp/officina-data.cjs"), C = require("../src/core.js");
let n = 0; const ok = (name, fn) => { fn(); n++; console.log("ok  " + name); };

ok("données : références valides", () => {
  D.ORDOS.forEach((o) => {
    o.lignes.forEach((l) => assert(!l.drug || D.DRUGS[l.drug], "médicament inconnu " + l.drug)); o.domaines.forEach((x) => assert(D.DOMAINES[x], x)); assert.strictEqual(new Set(o.problemes.map((p) => p.id)).size, o.problemes.length);
    o.problemes.forEach((p) => {
      p.lignes.concat(p.cle).forEach((l) => assert(o.lignes.find((x) => x.id === l), o.id + " ligne " + l));
      assert(D.NIVEAUX[p.niveau]); assert(D.NOTIONS[p.notion], p.notion);
      const codes = D.SFPC.problemes.map((x) => x[0]).concat(D.SFPC.inter.map((x) => x[0]));
      assert(p.sfpc.length && p.sfpc.every((x) => codes.includes(x))); assert(p.interv.length && p.interv.every((x) => D.SFPC.interventions.some((y) => y[0] === x)));
      if (p.devenir) assert(D.SFPC.devenirs.some((y) => y[0] === p.devenir.code)); p.sources.forEach((s) => assert(D.SRC[s], s));
      assert(p.cle.every((l) => p.lignes.includes(l)));
    });
  });
  assert.strictEqual(D.ORDOS.length, 50); assert.strictEqual(D.CAS.length, 21); assert.strictEqual(new Set(D.CAS.map((c) => c.id)).size, 21); assert.strictEqual(new Set(D.ORDOS.map((o) => o.id)).size, 50);
  D.CAS.forEach((c) => { c.drugs.forEach((d) => assert(D.DRUGS[d])); assert(D.NOTIONS[c.notion]); c.sources.forEach((x) => assert(D.SRC[x], x)); c.domaines.forEach((x) => assert(D.DOMAINES[x], x)); assert(c.questions.filter((q) => q.attendue).length >= 4); assert.strictEqual(new Set(c.questions.map((q) => q.id)).size, c.questions.length); assert.strictEqual(c.options.filter((o) => o.correct).length, 1); });
  D.CARDS.forEach((k) => { assert(D.NOTIONS[k.notion], k.notion); assert(!k.drug || D.DRUGS[k.drug], k.drug); assert(k.cle && Array.isArray(k.points)); });
  assert.strictEqual(new Set(D.CARDS.map((k) => k.id)).size, D.CARDS.length);
  Object.values(D.RAPPELS).forEach((r) => { r.sources.forEach((x) => assert(D.SRC[x], x)); r.lignes.forEach((l) => assert.strictEqual(l.length, r.colonnes.length)); });
  Object.values(D.DRUGS).forEach((m) => { (m.rappels || []).forEach((x) => assert(D.RAPPELS[x])); if (m.complet) { m.complet.interactions.forEach((i) => assert(D.NIVEAUX[i[0]], i[0])); ['g', 'a'].forEach((k) => assert(['ci', 'asdec', 'pe', 'ok'].includes(m.complet.grossesse[k]))); ['identite', 'mecanisme', 'indications', 'posologies', 'administration', 'ci', 'surveillance', 'cinetique'].forEach((k) => assert(m.complet[k].length, k)); } });
  assert.strictEqual(Object.values(D.DRUGS).filter((m) => m.complet).length, Object.keys(D.DRUGS).length);
  D.ORDOS.forEach((o) => (o.rappels || []).forEach((x) => assert(D.RAPPELS[x])));
  assert.strictEqual(D.METHODE.length, 10);
  Object.values(D.DRUGS).forEach((m) => m.sources.forEach((s) => assert(D.SRC[s], s)));
});

const o1 = D.ORDOS[0], o2 = D.ORDOS[1];
const CODE = { ci: "3.4", asdec: "3.3", pe: "3.2", apec: "3.1", poso: "2" };
const F = (ligne, type, partenaires, priorite, inter) => ({ ligne, sfpc: CODE[type], inter: inter || "7", partenaires: partenaires || [], priorite: priorite || 1, note: "" });

ok("o1 : clarithromycine signalée en contre-indication", () => {
  const c = C.corrigerOrdo(o1, [F("l1", "ci", ["l3"], 1)]);
  assert(c.problemes[0].trouve && c.problemes[0].niveau && c.problemes[0].priorite); assert.strictEqual(c.nonAttendus.length, 0);
  const s = C.scoreOrdo(c, { p1: { mecanisme: "juste", conduite: "incomplet" } });
  assert(c.problemes[0].interv); assert.strictEqual(s.score, 5.5); assert.strictEqual(s.max, 6);
  assert(!C.corrigerOrdo(o1, [F("l1", "asdec", ["l3"], 1, "1")]).problemes[0].niveau, "mauvais classement SFPC");
  assert(!C.corrigerOrdo(o1, [F("l1", "ci", ["l3"], 1, "1")]).problemes[0].interv, "mauvaise intervention");
});
ok("o1 : signalement par la simvastatine seule accepté", () => assert(C.corrigerOrdo(o1, [F("l3", "ci")]).problemes[0].trouve));
ok("o1 : paracétamol signalé = non attendu, problème non trouvé", () => {
  const c = C.corrigerOrdo(o1, [F("l2", "poso")]);
  assert(!c.problemes[0].trouve); assert.strictEqual(c.nonAttendus.length, 1); assert.strictEqual(C.scoreOrdo(c, {}).score, 0);
});
ok("o1 : aucune réponse", () => { const c = C.corrigerOrdo(o1, []); assert.strictEqual(C.scoreOrdo(c, {}).score, 0); });

const P = (c, id) => c.problemes.find((x) => x.p.id === id);
ok("o2 : ibuprofène sans partenaire couvre ses deux problèmes", () => {
  const c = C.corrigerOrdo(o2, [F("l8", "asdec")]);
  assert(P(c, "p1").trouve && P(c, "p1").niveau); assert(P(c, "p2").trouve && !P(c, "p2").niveau);
  assert(!P(c, "p3").trouve && !P(c, "p4").trouve && !P(c, "p6").trouve);
});
ok("o2 : ibuprofène + apixaban ne valide pas le problème rénal", () => {
  const c = C.corrigerOrdo(o2, [F("l8", "asdec", ["l1"])]);
  assert(P(c, "p1").trouve); assert(!P(c, "p2").trouve); assert(!P(c, "p4").trouve);
});
ok("o2 : apixaban en posologie ne valide pas l'interaction", () => {
  const c = C.corrigerOrdo(o2, [F("l1", "poso")]);
  assert(P(c, "p4").trouve && P(c, "p4").niveau); assert(!P(c, "p1").trouve);
});
ok("o2 : apixaban signalé avec l'ibuprofène valide l'interaction", () => {
  const c = C.corrigerOrdo(o2, [F("l1", "asdec", ["l8"])]);
  assert(P(c, "p1").trouve && P(c, "p1").niveau); assert(!P(c, "p4").trouve);
});
ok("o2 : spironolactone + potassium ne valide pas spironolactone + ramipril", () => {
  const c = C.corrigerOrdo(o2, [F("l5", "asdec", ["l6"])]);
  assert(P(c, "p3").trouve && P(c, "p3").niveau); assert(!P(c, "p6").trouve); assert(!P(c, "p2").trouve);
});
ok("o2 : spironolactone seule en précaution = p6, priorité 2", () => {
  const c = C.corrigerOrdo(o2, [F("l5", "pe", [], 2)]);
  assert(P(c, "p6").trouve && P(c, "p6").niveau && P(c, "p6").priorite); assert(!P(c, "p2").trouve && !P(c, "p3").trouve);
});
ok("o2 : copie parfaite = 100 %", () => {
  const flags = [F("l8", "asdec", ["l1"], 1), F("l8", "pe", ["l3", "l4", "l5"], 1), F("l6", "asdec", ["l5", "l3"], 1), F("l1", "poso", [], 1, "1"), F("l7", "poso", [], 2, "1"), F("l5", "pe", ["l3"], 2, "4")];
  const c = C.corrigerOrdo(o2, flags), auto = {};
  o2.problemes.forEach((p) => { auto[p.id] = { mecanisme: "juste", conduite: "juste" }; });
  const s = C.scoreOrdo(c, auto);
  assert.strictEqual(c.nonAttendus.length, 0); assert.strictEqual(s.score, s.max); assert.strictEqual(s.max, 36);
});
ok("o2 : bisoprolol signalé = non attendu", () => assert.strictEqual(C.corrigerOrdo(o2, [F("l2", "pe")]).nonAttendus.length, 1));

ok("cas : parcours parfait et parcours faible", () => {
  const c = D.CAS[0];
  const a = C.scoreCas(c, ["q1", "q2", "q3", "q4", "q5", "q6"], "juste", "c");
  assert.strictEqual(a.score, 5); assert(a.decisionOk);
  const b = C.scoreCas(c, ["q7", "q8"], "absent", "a");
  assert.strictEqual(b.score, 0); assert(!b.decisionOk); assert.strictEqual(b.inutiles, 2);
  const e = C.scoreCas(c, ["q1", "q2", "q3", "q4", "q5", "q6"], "juste", "a");
  assert.strictEqual(e.score, 0, "éliminatoire : tout juste sauf la décision = 0"); assert(e.elimine); assert(!a.elimine);
});

ok("FSRS : intervalles croissants et cohérents", () => {
  const f = C.FSRS;
  assert(Math.abs(f.retr(10, 10) - 0.9) < 1e-9, "R(S,S) = 0,9");
  assert.strictEqual(f.interval(10), 10);
  let k = f.review(undefined, 3, 100);
  assert.strictEqual(k.due - 100, 3, "première réponse Correct : 3 jours"); assert(k.d >= 1 && k.d <= 10);
  const pv = f.preview(undefined, 100); assert(pv[0] === 0 && pv[1] <= pv[2] && pv[2] <= pv[3]);
  let prev = 3;
  for (let i = 0; i < 5; i++) { const day = k.due; k = f.review(k, 3, day); const iv = k.due - day; assert(iv > prev, "intervalle croissant " + iv); prev = iv; }
  const avant = k.s, oubli = f.review(k, 1, k.due);
  assert(oubli.s < avant && oubli.due === oubli.last && oubli.lapses === 1);
  const repasse = f.review(oubli, 3, oubli.last); assert(Math.abs(repasse.s - oubli.s) < 1e-9, "même jour : stabilité inchangée");
});

ok("statistiques et file de révision", () => {
  const store = { cards: {}, reviews: [], attempts: [], days: {} };
  assert.strictEqual(C.fileRevision(store, D, 100, 8).length, 8);
  let s = C.stats(store, D, 100); assert.strictEqual(s.sais, null); assert.strictEqual(s.applique, null); assert.strictEqual(s.serie, 0);
  store.cards.k1 = C.FSRS.review(undefined, 3, 100); store.reviews.push({ id: "k1", g: 3, day: 100 }); store.days[100] = 1;
  const c = C.corrigerOrdo(o2, [F("l1", "poso")]);
  const sc = C.scoreOrdo(c, { p4: { mecanisme: "juste", conduite: "juste" } });
  store.attempts.push({ kind: "ordo", id: "o2", day: 100, score: sc.score, max: sc.max, details: sc.details });
  s = C.stats(store, D, 100);
  assert.strictEqual(s.sais, 100); assert.strictEqual(s.applique, Math.round(5 / 36 * 100)); assert.strictEqual(s.serie, 1);
  assert(s.lacunes.length > 0 && s.lacunes[0].global === 0);
  assert(!C.fileRevision(store, D, 100, 8).includes("k1")); assert.strictEqual(C.fileRevision(store, D, 100, 8).length, 7);
  assert(C.fileRevision(store, D, 103, 8).includes("k1")); assert.strictEqual(C.fileRevision(store, D, 103, 8).length, 9);
  assert.strictEqual(C.stats(store, D, 101).serie, 1); assert.strictEqual(C.stats(store, D, 102).serie, 0);
});
ok("lots 6 à 14 : copie parfaite = 100 % sur chaque nouvelle ordonnance", () => {
  
  D.ORDOS.slice(8).forEach((o) => {
    const flags = o.problemes.map((p) => ({ ligne: p.cle[0], sfpc: p.sfpc[0], inter: p.interv[0], partenaires: p.lignes.length > 1 ? p.lignes.filter((l) => l !== p.cle[0]) : [], priorite: p.priorite, note: "" }));
    const c = C.corrigerOrdo(o, flags), auto = {};
    o.problemes.forEach((p) => { auto[p.id] = { mecanisme: "juste", conduite: "juste" }; });
    const s = C.scoreOrdo(c, auto); assert.strictEqual(s.score, s.max, o.id); assert.strictEqual(c.nonAttendus.length, 0, o.id);
  });
});

ok("lots 11-12 : fiches de classe", () => {
  const vus = {}, ids = new Set();
  D.FICHES.forEach((f) => {
    assert(!ids.has(f.id), "id en double " + f.id); ids.add(f.id);
    assert(D.SPE.some((s) => s[0] === f.spe), f.id + " spe");
    assert(f.mols.some((x) => x.length > 1) && f.refl.length && f.meca.length && f.ind.length && f.poso.length && f.adm.length && f.ci.length && f.ei.length && f.surv.length, f.id);
    f.poso.forEach((r) => { assert.strictEqual(r.length, 4, f.id); r[3].split(/[ ,;]+/).forEach((v) => assert(D.VOIES[v], f.id + " voie " + v)); });
    f.inter.forEach((i) => assert(D.NIVEAUX[i[0]], f.id + " " + i[0]));
    [f.gr[0], f.gr[2]].forEach((k) => assert(["ci", "asdec", "pe", "ok"].includes(k), f.id));
    ["indS", "admS", "ciS", "interS", "eiS", "survS", "cinS"].forEach((k) => f[k].forEach((x) => assert(x.length === 2, f.id + " " + k)));
    f.sources.forEach((s) => assert(D.SRC[s], s)); (f.rappels || []).forEach((r) => assert(D.RAPPELS[r], r));
    f.drugs.forEach((d) => { assert(D.DRUGS[d], d); assert(!vus[d], "deux classes " + d); vus[d] = 1; });
  });
  Object.keys(D.DRUGS).forEach((d) => assert(D.CLASSE_DE[d], "sans classe " + d));
  assert(D.REFLEXES.length > 40);
});

console.log(n + " contrôles passés");
