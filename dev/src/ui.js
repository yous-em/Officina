/* Interface. Rendu par chaînes HTML, un seul écouteur de clics délégué. */
(() => {
  const D = DATA, C = CORE;
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const day = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000);
  const pct = (v) => (v === null || v === undefined ? "–" : v + " %");
  /* **texte** = information clé, mise en valeur. */
  const fmt = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<mark>$1</mark>");

  /* ---------- Sauvegarde locale ---------- */
  const KEY = "officina.v1";
  const vide = () => ({ v: 1, cards: {}, reviews: [], attempts: [], days: {}, custom: [], edits: {}, susp: {}, maj: 0 });
  let store = vide(), stockageOk = true;
  try { const raw = localStorage.getItem(KEY); if (raw) store = Object.assign(vide(), JSON.parse(raw)); } catch (e) { stockageOk = false; }
  const saveLocal = () => { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { stockageOk = false; } };
  /* Sauvegarde durable : copie dans l'espace privé du compte (capacité db), une écriture à la fois. */
  let nuage = null, ecrit = false, sale = false, etatNuage = "attente";
  const pousser = () => {
    if (!nuage) return; if (ecrit) { sale = true; return; }
    ecrit = true; sale = false;
    nuage.set(JSON.parse(JSON.stringify(store))).then(() => { etatNuage = "ok"; }, () => { etatNuage = "erreur"; }).then(() => { ecrit = false; if (sale) pousser(); });
  };
  const save = () => { store.maj = Date.now(); saveLocal(); pousser(); };
  const aDuContenu = (o) => !!(o && ((o.reviews || []).length || (o.attempts || []).length || (o.custom || []).length || Object.keys(o.edits || {}).length));
  const brancherNuage = async () => {
    try {
      const cl = window.claude; if (!cl || !cl.use) { etatNuage = "absent"; return; }
      const [db, user] = await Promise.all([cl.use("db"), cl.use("user")]);
      const id = db && user ? await user.id() : null;
      if (!id) { etatNuage = "absent"; return; }
      const ref = db.doc("data/users/" + id + "/progression"), snap = await ref.get();
      const dist = snap.exists ? snap.data() : null;
      nuage = ref; etatNuage = "ok";
      if (dist && (dist.maj || 0) > (store.maj || 0)) { store = Object.assign(vide(), JSON.parse(JSON.stringify(dist))); saveLocal(); render(); }
      else if (aDuContenu(store) && (!dist || (store.maj || 0) > (dist.maj || 0))) { if (!store.maj) store.maj = Date.now(); pousser(); }
    } catch (e) { etatNuage = nuage ? "erreur" : "absent"; }
    if (S.tab === "progres" && !S.rev) render();
  };
  /* Fichier de sauvegarde : seule copie indépendante du téléphone. */
  const KEY_EXP = "officina.export";
  const dernierExport = () => { try { return +localStorage.getItem(KEY_EXP) || 0; } catch (e) { return 0; } };
  const joursSansExport = () => aDuContenu(store) ? Math.floor((Date.now() - (dernierExport() || store.first0 || Date.now())) / 864e5) : 0;
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}
  if (!store.first0) store.first0 = Date.now();
  const nomFichier = () => "officina-sauvegarde-" + new Date().toISOString().slice(0, 10) + ".json";
  const exporter = async () => {
    const txt = JSON.stringify(store), nom = nomFichier();
    const fini = () => { try { localStorage.setItem(KEY_EXP, String(Date.now())); } catch (e) {} S.outil = { msg: "Sauvegarde exportée : " + nom + ". Rangez-la dans Fichiers ou iCloud Drive." }; render(); };
    try {
      const f = new File([txt], nom, { type: "application/json" });
      if (navigator.canShare && navigator.canShare({ files: [f] })) { await navigator.share({ files: [f], title: "Sauvegarde Officina" }); fini(); return; }
    } catch (e) { if (e && e.name === "AbortError") return; }
    try { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([txt], { type: "application/json" })); a.download = nom; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000); fini(); }
    catch (e) { S.outil = { mode: "copie" }; render(); }
  };
  const restaurerTexte = (txt) => {
    const o = JSON.parse(txt || ""); if (!o || !o.cards || !Array.isArray(o.reviews) || !Array.isArray(o.attempts)) throw 0;
    store = Object.assign(vide(), o); if (!Array.isArray(store.custom)) store.custom = []; save();
  };
  const marquerJour = () => { const d = day(); store.days[d] = (store.days[d] || 0) + 1; };

  /* ---------- Icônes et formes ---------- */
  const I = {
    accueil: '<path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/>',
    ordonnances: '<path d="M7 3h8l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M9 12h7M9 16h5M9 8h3"/>',
    cas: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
    medicaments: '<rect x="3" y="9" width="18" height="7" rx="3.5" transform="rotate(-35 12 12.5)"/><path d="M9.6 8.2l4.6 6.6"/>',
    progres: '<path d="M4 20V10M10 20V4M16 20v-7M21 20H3"/>',
    cartes: '<rect x="4" y="6" width="13" height="14" rx="2"/><path d="M8 3h11a1 1 0 0 1 1 1v12"/>',
    chevron: '<path d="M9 6l6 6-6 6"/>',
    retour: '<path d="M15 6l-6 6 6 6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    flamme: '<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z"/>',
    source: '<path d="M5 4h9a4 4 0 0 1 4 4v12H9a4 4 0 0 1-4-4z"/><path d="M9 9h5M9 13h5"/>'
  };
  const ic = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n] || ""}</svg>`;
  const FORME = {
    ci: '<polygon points="5,1 11,1 15,5 15,11 11,15 5,15 1,11 1,5"/>',
    asdec: '<polygon points="8,1.5 15,14.5 1,14.5"/>',
    pe: '<polygon points="8,1 15,8 8,15 1,8"/>',
    apec: '<circle cx="8" cy="8" r="7"/>',
    poso: '<rect x="2" y="2" width="12" height="12" rx="1"/>',
    inap: '<polygon points="8,1 15,6.5 12.5,15 3.5,15 1,6.5"/>',
    reg: '<path d="M3 1h7l3 3v11H3z"/>',
    ok: '<path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm3.6 5.3L7.3 10.9 4.5 8.2l1-1 1.8 1.7 3.3-3.6z"/>'
  };
  const forme = (n) => `<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">${FORME[n]}</svg>`;
  const grav = (n, long) => `<span class="grav ${n}">${forme(n)}${esc(long ? D.NIVEAUX[n].label : D.NIVEAUX[n].court)}</span>`;
  const STATUT = { verifie: "Vérifié", partiel: "Vérifié en partie", a_verifier: "À vérifier" };
  const statut = (s) => `<span class="statut ${s}">${STATUT[s]}</span>`;
  const sources = (ids) => (ids || []).map((k) => D.SRC[k].url ? `<a href="${D.SRC[k].url}" target="_blank" rel="noopener">${esc(D.SRC[k].label)}</a>` : esc(D.SRC[k].label)).join(" · ");
  const chaine = (steps) => `<div class="chaine">${steps.map((s) => `<div>${fmt(s)}</div>`).join("")}</div>`;
  const niv = (n) => `<span class="chip">Niveau ${n}</span>`;
  /* Libellés de la fiche SFPC et pastille d'un signalement. */
  const sfpcLabel = (code) => { const x = D.SFPC.inter.find((y) => y[0] === code) || D.SFPC.problemes.find((y) => y[0] === code); return x ? code + " · " + x[1] : code; };
  const lib = (liste, code) => { const x = liste.find((y) => y[0] === code); return x ? code + " · " + x[1] : code; };
  const flagChip = (f) => { const x = D.SFPC.inter.find((y) => y[0] === f.sfpc); return x && x[2] ? grav(x[2]) : `<span class="chip">${esc(sfpcLabel(f.sfpc))}</span>`; };
  const doms = (ds) => ds.map((d) => `<span class="chip">${esc(D.DOMAINES[d].label)}</span>`).join("");

  /* ---------- État ---------- */
  const TABS = ["accueil", "ordonnances", "cas", "cartes", "medicaments", "progres"];
  const TAB_LABEL = { accueil: "Accueil", ordonnances: "Ordonnances", cas: "Cas", cartes: "Cartes", medicaments: "Médicaments", progres: "Progrès" };
  const S = { tab: "accueil", ordo: null, cas: null, cls: null, hl: null, refl: Math.floor(Math.random() * D.REFLEXES.length), rev: null, filtre: { niveau: 0 }, q: "", outil: null, ordoVue: "ordos", cr: null, dose: null,
    cartes: { q: "", etat: "toutes", tri: "echeance", drug: null, ouvert: null, edit: null, ids: [], suppr: false } };

  /* ---------- Cartes : celles de l'application, ses modifications, ses propres cartes ---------- */
  const pointsVersTexte = (pts) => (pts || []).map(([l, t]) => (l ? l + " : " + t : t)).join("\n");
  const texteVersPoints = (txt) => String(txt || "").split("\n").map((x) => x.trim()).filter(Boolean).map((x) => { const i = x.indexOf(" : "); return i > 0 && i <= 40 ? [x.slice(0, i), x.slice(i + 3)] : ["", x]; });
  const toutesCartes = () => D.CARDS.map((c) => (store.edits[c.id] ? Object.assign({}, c, store.edits[c.id], { modifiee: true }) : c)).concat(store.custom.map((c) => Object.assign({ perso: true }, c)));
  const cartesActives = () => toutesCartes().filter((c) => !store.susp[c.id]);
  const DV = () => Object.assign({}, D, { CARDS: cartesActives() });
  const verso = (c) => `<p class="cle">${fmt(c.cle)}</p>${(c.points || []).length ? `<dl class="pts">${c.points.map(([l, t]) => `<div>${l ? `<dt>${esc(l)}</dt>` : ""}<dd>${fmt(t)}</dd></div>`).join("")}</dl>` : ""}`;

  const dernier = (kind, id) => { const a = store.attempts.filter((x) => x.kind === kind && x.id === id); return a.length ? a[a.length - 1] : null; };
  const faitAujourdhui = (kind) => store.attempts.some((x) => x.kind === kind && x.day === day());
  const choisir = (kind, liste) => liste.slice().sort((a, b) => {
    const x = dernier(kind, a.id), y = dernier(kind, b.id);
    return (x ? 1 + x.score / x.max : 0) - (y ? 1 + y.score / y.max : 0);
  })[0];

  /* ---------- Fiche médicament (zones fixes) ---------- */
  const fiche = (id) => {
    const m = D.DRUGS[id];
    const ul = (a) => (a.length ? `<ul>${a.map((x) => `<li>${fmt(x)}</li>`).join("")}</ul>` : `<p class="small">Rien à signaler ici.</p>`);
    return `<div class="fiche">
      <div class="z poso"><h3>Posologie usuelle</h3>${ul(m.poso)}</div>
      <div class="z alertes"><h3>Alertes</h3>${ul(m.alertes)}</div>
      <div class="z conseils"><h3>Conseils au comptoir</h3>${ul(m.conseils)}</div>
    </div>
    <p class="small">${statut(m.statut)} ${esc(m.note)}</p>
    ${m.sources.length ? `<p class="small">${sources(m.sources)}</p>` : ""}`;
  };
  const rappels = (ids) => !ids.length ? "" : `<section class="stack"><h2>Rappels comptoir</h2>
    ${ids.map((id) => `<details class="rappel"><summary><span class="tile" style="width:30px;height:30px;border-radius:8px">${ic("medicaments")}</span><span class="grow">${esc(D.DRUGS[id].dci)}</span>${statut(D.DRUGS[id].statut)}</summary><div class="in stack">${fiche(id)}<button class="btn ghost" data-a="med-open" data-id="${id}">Ouvrir la fiche de la classe</button></div></details>`).join("")}
  </section>`;
  const rappelCours = (id) => { const r = D.RAPPELS[id]; return `<article class="card stack cours"><h3>Pour faire le lien</h3><h2>${esc(r.titre)}</h2><p class="muted">${esc(r.intro)}</p><div class="tablew"><table><thead><tr>${r.colonnes.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${r.lignes.map((l) => `<tr>${l.map((c) => `<td>${fmt(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p class="reflexe">${esc(r.reflexe)}</p><p class="small">${statut(r.statut)} ${esc(r.note)}<br>${sources(r.sources)}</p></article>`; };
  const GA = { ci: "Contre-indiqué", asdec: "Déconseillé", pe: "Avec précaution", ok: "Possible" };
  const ulf = (a) => `<ul>${a.map((x) => `<li>${fmt(x)}</li>`).join("")}</ul>`;
  const dlf = (a) => `<dl class="pts">${a.map(([l, t]) => `<div><dt>${fmt(l)}</dt><dd>${fmt(t)}</dd></div>`).join("")}</dl>`;
  function ficheComplete(id, k) {
    const m = D.DRUGS[id], c = m.complet, g = c.grossesse;
    const secs = [
      ["identite", "Identité", dlf(c.identite)],
      ["mecanisme", "Mécanisme", chaine(c.mecanisme)],
      ["indications", "Indications", ulf(c.indications)],
      ["posologies", "Posologies", dlf(c.posologies) + (c.plafonds.length ? `<h3>Plafonds imposés par une association</h3>${dlf(c.plafonds)}` : "") + `<h3>Mode d'administration</h3>${ulf(c.administration)}`],
      ["ci", "Contre-indications", ulf(c.ci)],
      ["interactions", "Interactions", `<div class="stack">${c.interactions.map(([n, avec, quoi]) => `<div class="inter bord-${n}">${grav(n)}<p><strong>${esc(avec)}</strong></p><p class="muted">${fmt(quoi)}</p></div>`).join("")}</div><p class="small">Niveaux indicatifs, déduits du RCP. À vérifier avant de s'y fier.</p>`],
      ["grossesse", "Grossesse et allaitement", `<div class="gas"><div class="ga"><h3>Grossesse</h3><span class="grav ${g.g}">${forme(g.g)}${GA[g.g]}</span><p>${fmt(g.gTexte)}</p></div><div class="ga"><h3>Allaitement</h3><span class="grav ${g.a}">${forme(g.a)}${GA[g.a]}</span><p>${fmt(g.aTexte)}</p></div></div><p class="small">Fertilité : ${esc(g.f)} Pour aller plus loin : <a href="https://www.lecrat.fr" target="_blank" rel="noopener">CRAT</a> (non consulté pour cette fiche).</p>`],
      ["ei", "Effets indésirables", `<h3>Fréquents</h3>${ulf(c.ei.frequents)}<h3>Plus rares</h3>${ulf(c.ei.rares)}<h3>Graves</h3><div class="graves">${ulf(c.ei.graves)}</div>${c.ei.classe ? `<p class="muted">${fmt(c.ei.classe)}</p>` : ""}`],
      ["surveillance", "Surveillance", ulf(c.surveillance)],
      ["cinetique", "Cinétique", ulf(c.cinetique)]
    ];
    return `<div class="wrap sommaire">${secs.map(([s, t]) => `<button class="chip" data-a="saut" data-s="${s}">${t}</button>`).join("")}</div>
    <section class="stack"><h3>L'essentiel au comptoir${k ? " : " + esc(m.dci) : ""}</h3>${fiche(id)}</section>
    ${secs.map(([s, t, corps]) => `<section class="fsec ${s}" id="f-${s}"><h2>${t}</h2>${corps}</section>`).join("")}
    ${(m.rappels || []).map(rappelCours).join("")}`;
  }

  /* ---------- Accueil ---------- */
  function programme() {
    const d = day(), st = C.stats(store, DV(), d);
    const file = C.fileRevision(store, DV(), d, 8);
    const revAuj = store.reviews.some((r) => r.day === d);
    const o = choisir("ordo", D.ORDOS), c = choisir("cas", D.CAS);
    return { st, items: [
      { a: "rev-start", icone: "cartes", titre: file.length ? `${file.length} carte${file.length > 1 ? "s" : ""} à réviser` : "Révisions à jour", sous: "Révisions espacées", fait: !file.length && revAuj },
      { a: "ordo-open", id: o.id, icone: "ordonnances", titre: `Ordonnance : ${o.titre}`, sous: `Niveau ${o.niveau} · ${o.resume}`, fait: faitAujourdhui("ordo") },
      { a: "cas-open", id: c.id, icone: "cas", titre: `Cas : ${c.titre}`, sous: `Niveau ${c.niveau} · ${c.type}`, fait: faitAujourdhui("cas") }
    ] };
  }
  function vAccueil() {
    const { st, items } = programme();
    const n = items.filter((x) => x.fait).length, h = new Date().getHours();
    const d0 = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }), date = d0.charAt(0).toUpperCase() + d0.slice(1);
    const suivant = items.find((x) => !x.fait);
    const dash = 163, off = dash - (dash * n) / items.length;
    const jse = joursSansExport();
    const rappelExport = jse >= 7 ? `<button class="bandeau tap" data-a="sv-exporter" style="text-align:left;width:100%">${dernierExport() ? "Dernière sauvegarde exportée il y a " + jse + " jours." : "Aucune sauvegarde exportée pour l'instant."} Touchez ici pour l'exporter dans Fichiers ou iCloud.</button>` : "";
    return `${rappelExport}<header class="row"><div class="grow"><p class="small">${esc(date)}</p><h1>${h >= 18 ? "Bonsoir" : "Bonjour"}</h1></div>
      ${st.serie ? `<span class="chip">${ic("flamme").replace("<svg", '<svg width="15" height="15"')} ${st.serie} jour${st.serie > 1 ? "s" : ""}</span>` : ""}</header>
    ${(() => { const r = D.REFLEXES[S.refl]; return r ? reflexeBox([r.t], `<span class="small">Change à chaque passage</span>`).replace("</div><p>", `</div><h3 class="rtit">${esc(FI[r.fiche].nom)}</h3><p>`).replace("</article>", `<div class="wrap"><button class="chip" data-a="cls-open" data-id="${r.fiche}">Fiche : ${esc(FI[r.fiche].nom)}</button><button class="chip" data-a="refl-autre">Un autre réflexe</button></div></article>`) : ""; })()}
    <section class="hero">
      <svg width="64" height="64" viewBox="0 0 64 64" role="img" aria-label="${n} sur ${items.length}"><circle cx="32" cy="32" r="26" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="6"/><circle cx="32" cy="32" r="26" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-dasharray="${dash}" stroke-dashoffset="${off}" transform="rotate(-90 32 32)"/><text x="32" y="37" text-anchor="middle" font-size="15" font-weight="700" fill="#fff" font-family="inherit">${n}/${items.length}</text></svg>
      <div class="grow"><h2>Séance du jour</h2><p>${suivant ? "Trois étapes, environ 30 minutes" : "Terminée pour aujourd'hui"}</p>
      ${suivant ? `<button class="btn" data-a="${suivant.a}" data-id="${suivant.id || ""}">${n ? "Reprendre" : "Commencer"}</button>` : ""}</div>
    </section>
    <section class="stack"><h3>Au programme</h3>
      ${items.map((x) => `<button class="card tap ${x.fait ? "done" : ""}" data-a="${x.a}" data-id="${x.id || ""}"><span class="tile">${ic(x.fait ? "check" : x.icone)}</span><span class="grow"><span class="titre" style="font-weight:600;display:block">${esc(x.titre)}</span><span class="small">${esc(x.fait ? "Fait aujourd'hui" : x.sous)}</span></span>${ic("chevron").replace("<svg", '<svg width="18" height="18" style="color:var(--ink-3)"')}</button>`).join("")}
    </section>
    <section class="stack"><h3>À retravailler</h3>
      ${st.lacunes.length ? `<div class="card stack">${st.lacunes.map(barreNotion).join("")}</div>` : `<p class="muted">Les notions à revoir apparaîtront ici après vos premiers exercices.</p>`}
    </section>
    <section class="jauges"><div class="jauge"><span class="small">Je sais</span><b>${pct(st.sais)}</b><span class="small">Cartes de révision</span></div><div class="jauge"><span class="small">Je sais appliquer</span><b>${pct(st.applique)}</b><span class="small">Ordonnances et cas</span></div></section>
    <p class="bandeau">Outil de formation. Il ne remplace ni le RCP ni la validation pharmaceutique.</p>`;
  }
  const barreNotion = (n) => `<div class="notion"><div class="tete"><span>${esc(n.label)}</span><span>${pct(n.global)}</span></div><div class="barre"><i style="width:${n.global || 0}%"></i></div></div>`;

  /* ---------- Ordonnances ---------- */
  function vOrdoListe() {
    const nivs = [...new Set(D.ORDOS.map((o) => o.niveau))].sort();
    const doms0 = [...new Set(D.ORDOS.flatMap((o) => o.domaines))];
    const liste = D.ORDOS.filter((o) => (!S.filtre.niveau || o.niveau === S.filtre.niveau) && (!S.filtre.dom || o.domaines.includes(S.filtre.dom)));
    if (S.ordoVue === "doses") return vDoses();
    if (EXO[S.ordoVue] && S.ordoVue !== "doses") return vCrListe();
    return `<header><h1>Ordonnances</h1><p class="muted">Analysez, signalez, puis comparez avec la correction.</p></header>${basculeOrdo()}
    <div class="wrap"><button class="chip" data-a="filtre" data-n="0" aria-pressed="${!S.filtre.niveau}">Tous les niveaux</button>${nivs.map((n) => `<button class="chip" data-a="filtre" data-n="${n}" aria-pressed="${S.filtre.niveau === n}">Niveau ${n}</button>`).join("")}</div>
    <div class="wrap"><button class="chip" data-a="dom" data-n="" aria-pressed="${!S.filtre.dom}">Tous les domaines</button>${doms0.map((t) => `<button class="chip" data-a="dom" data-n="${t}" aria-pressed="${S.filtre.dom === t}">${esc(D.DOMAINES[t].label)}</button>`).join("")}</div>
    <section class="stack">${liste.length ? "" : `<p class="muted">Aucune ordonnance pour ces filtres.</p>`}${liste.map((o) => { const a = dernier("ordo", o.id); return `<button class="card tap" data-a="ordo-open" data-id="${o.id}"><span class="tile">${ic("ordonnances")}</span><span class="grow stack" style="gap:4px"><span style="font-weight:600">${esc(o.titre)}</span><span class="small">${esc(o.resume)}</span><span class="wrap">${niv(o.niveau)}${doms(o.domaines)}${a ? `<span class="chip">Dernier essai ${Math.round(a.score / a.max * 100)} %</span>` : ""}</span></span></button>`; }).join("")}</section>
    <p class="small">${D.ORDOS.length} ordonnances pour l'instant. La banque s'agrandit par lots relus.</p>`;
  }
  const ordoCourante = () => D.ORDOS.find((o) => o.id === S.ordo.id);
  function patientCard(p) {
    return `<section class="card stack"><div><h2>${esc(p.nom)}</h2><p class="muted">${esc(p.details)}</p></div><div class="wrap">${p.chips.map((c) => `<span class="chip">${esc(c)}</span>`).join("")}</div><p class="muted">${esc(p.contexte)}</p></section>`;
  }
  function editeur(o, l) {
    const d = S.ordo.draft, existants = S.ordo.flags.map((f, i) => ({ f, i })).filter((x) => x.f.ligne === l.id);
    return `<div class="editeur">
      ${existants.map((x) => `<div class="row">${flagChip(x.f)}<span class="grow small">${x.f.partenaires.length ? "Avec " + x.f.partenaires.map((p) => esc(o.lignes.find((y) => y.id === p).libelle)).join(", ") : ""}</span><button class="chip" data-a="flag-del" data-i="${x.i}">Retirer</button></div>`).join("")}
      <div class="stack" style="gap:6px"><label>4 · Identification du problème</label><div class="wrap">${D.SFPC.problemes.map(([k, t]) => `<button class="chip" data-a="draft-cat" data-n="${k}" aria-pressed="${d.cat === k}">${k} · ${esc(t)}</button>`).join("")}</div>
        ${d.cat === "3" ? `<div class="wrap sous">${D.SFPC.inter.map(([k, t, g]) => g ? `<button class="grav ${g}" data-a="draft-sfpc" data-n="${k}" aria-pressed="${d.sfpc === k}">${forme(g)}${k} · ${esc(t)}</button>` : `<button class="chip" data-a="draft-sfpc" data-n="${k}" aria-pressed="${d.sfpc === k}">${k} · ${esc(t)}</button>`).join("")}</div>` : ""}</div>
      <div class="stack" style="gap:6px"><label>5 · Intervention (une seule)</label><div class="wrap">${D.SFPC.interventions.map(([k, t]) => `<button class="chip" data-a="draft-inter" data-n="${k}" aria-pressed="${d.inter === k}">${k} · ${esc(t)}</button>`).join("")}</div></div>
      <div class="stack" style="gap:6px"><label>Associé à (facultatif)</label><div class="wrap">${o.lignes.filter((x) => x.id !== l.id).map((x) => `<button class="chip" data-a="draft-part" data-l="${x.id}" aria-pressed="${d.partenaires.includes(x.id)}">${esc(x.libelle.split(" ")[0] === "Chlorure" ? "Potassium" : x.libelle.split(" ")[0])}</button>`).join("")}</div></div>
      <div class="stack" style="gap:6px"><label>Priorité</label><div class="wrap"><button class="chip" data-a="draft-prio" data-n="1" aria-pressed="${d.priorite === 1}">Appel avant délivrance</button><button class="chip" data-a="draft-prio" data-n="2" aria-pressed="${d.priorite === 2}">Délivrer et surveiller</button></div></div>
      <div class="stack" style="gap:6px"><label for="note-${l.id}">Mécanisme et conduite à tenir</label><textarea id="note-${l.id}" data-i="draft-note" placeholder="Inhibition du CYP3A4, risque musculaire. J'appelle le médecin.">${esc(d.note)}</textarea></div>
      ${S.ordo.err ? `<p class="erreur" role="alert">${esc(S.ordo.err)}</p>` : ""}
      <div class="row"><button class="btn primary grow" data-a="flag-add" data-l="${l.id}">Enregistrer le signalement</button><button class="btn ghost" data-a="ligne-close">Fermer</button></div>
    </div>`;
  }
  function blocOrdonnance(o, actif) {
    const groupes = [...new Set(o.lignes.map((l) => l.origine))];
    let num = 0;
    return `<section class="ordonnance">${groupes.map((g) => `<p class="origine">${esc(g)}</p>${o.lignes.filter((l) => l.origine === g).map((l) => {
      num++; const fl = S.ordo.flags.filter((f) => f.ligne === l.id), ouv = actif && S.ordo.ouvert === l.id;
      const corps = `<span class="num">${num}</span><span class="grow"><span class="nom">${esc(l.libelle)}</span><br><span class="muted">${esc(l.poso)}${l.duree ? " · " + esc(l.duree) : ""}</span>${fl.length ? `<span class="wrap" style="margin-top:6px">${fl.map(flagChip).join("")}</span>` : ""}</span>`;
      return actif ? `<button class="ligne ${ouv ? "ouverte" : ""}" data-a="ligne-open" data-l="${l.id}" aria-expanded="${ouv}">${corps}</button>${ouv ? editeur(o, l) : ""}` : `<div class="ligne">${corps}</div>`;
    }).join("")}`).join("")}</section>`;
  }
  function vOrdoAnalyse() {
    const o = ordoCourante(), n = S.ordo.flags.length;
    return `<div><button class="back" data-a="ordo-close">${ic("retour").replace("<svg", '<svg width="18" height="18"')} Ordonnances</button><h1>${esc(o.titre)}</h1><div class="wrap" style="margin-top:8px">${niv(o.niveau)}${doms(o.domaines)}</div></div>
    ${patientCard(o.patient)}
    <details class="rappel"><summary><span class="grow">Méthode : commenter en 10 points</span></summary><div class="in"><ol class="methode">${D.METHODE.map(([t, x]) => `<li><strong>${esc(t)}.</strong> ${esc(x)}</li>`).join("")}</ol></div></details>
    <p class="muted">Touchez un médicament pour signaler un problème. Un même médicament peut en porter plusieurs.</p>
    ${blocOrdonnance(o, true)}
    <section class="stack">
      <p class="muted">${n ? `${n} signalement${n > 1 ? "s" : ""}` : "Aucun signalement pour l'instant"}</p>
      ${S.ordo.confirmVide ? `<p class="erreur" role="alert">Vous n'avez rien signalé. Certaines ordonnances sont sans problème : validez de nouveau si c'est votre réponse.</p>` : ""}
      <button class="btn primary block" data-a="ordo-valider">${S.ordo.confirmVide ? "Valider sans signalement" : "Valider mon analyse"}</button>
    </section>`;
  }
  const AUTO_LABEL = [["juste", "Juste"], ["incomplet", "Incomplet"], ["absent", "Absent"]];
  const autoEval = (pid, champ, label) => { const v = (S.ordo.auto[pid] || {})[champ]; return `<div class="stack" style="gap:5px"><span class="small">${label}</span><div class="auto">${AUTO_LABEL.map(([k, t]) => `<button data-a="auto" data-p="${pid}" data-c="${champ}" data-v="${k}" aria-pressed="${v === k}">${t}</button>`).join("")}</div></div>`; };
  function blocProbleme(o, c) {
    const p = c.p;
    return `<article class="corr bord-${p.niveau}">
      <div class="zone stack" style="gap:8px"><h3>1 · Problème</h3><h2>${esc(p.titre)}</h2><div class="wrap">${grav(p.niveau, true)}<span class="chip">${p.priorite === 1 ? "Appel avant délivrance" : "Délivrer et surveiller"}</span></div>
        <div class="criteres"><span class="crit ${c.trouve ? "oui" : ""}">${c.trouve ? "Trouvé" : "Non trouvé"}</span><span class="crit ${c.niveau ? "oui" : ""}">Problème ${c.niveau ? "bien classé" : "à reclasser"}</span><span class="crit ${c.interv ? "oui" : ""}">Intervention ${c.interv ? "juste" : "à revoir"}</span><span class="crit ${c.priorite ? "oui" : ""}">Priorité ${c.priorite ? "juste" : "à revoir"}</span></div>
        <dl class="pts"><div><dt>4 · Problème</dt><dd>${p.sfpc.map((x) => `<mark>${esc(sfpcLabel(x))}</mark>`).join(" ou ")}</dd></div><div><dt>5 · Intervention</dt><dd>${p.interv.map((x) => esc(lib(D.SFPC.interventions, x))).join(" ou ")}</dd></div></dl></div>
      ${p.devenir ? `<div class="zone stack" style="gap:6px"><h3>6 · Devenir de l'intervention</h3><p>${esc(p.devenir.scenario)}</p><div class="wrap">${D.SFPC.devenirs.map(([k, t]) => { const ch = (S.ordo.dev || {})[p.id]; return `<button class="chip ${ch && k === p.devenir.code ? "bon" : ""}" data-a="dev" data-p="${p.id}" data-n="${k}" aria-pressed="${ch === k}">${k} · ${esc(t)}</button>`; }).join("")}</div>${(S.ordo.dev || {})[p.id] ? `<p class="small">${(S.ordo.dev || {})[p.id] === p.devenir.code ? "Bien coté." : "À recoter : " + esc(lib(D.SFPC.devenirs, p.devenir.code)) + "."}</p>` : ""}</div>` : ""}
      <div class="zone"><h3>2 · Mécanisme</h3>${chaine(p.mecanisme)}</div>
      <div class="zone"><h3>3 · Conduite à tenir</h3><p>${esc(p.conduite)}</p></div>
      ${c.notes.length ? `<div class="zone stack" style="gap:6px"><h3>Votre analyse</h3>${c.notes.map((n) => `<p class="note-moi">${esc(n)}</p>`).join("")}</div>` : ""}
      ${c.trouve && !S.ordo.saved ? `<div class="zone stack" style="gap:8px"><h3>Comparez et évaluez-vous</h3>${autoEval(p.id, "mecanisme", "Mon mécanisme était")}${autoEval(p.id, "conduite", "Ma conduite à tenir était")}</div>` : ""}
      <p class="small">${statut(p.statut)} ${esc(p.note)}<br>${sources(p.sources)}</p>
    </article>`;
  }
  function vOrdoCorrection() {
    const o = ordoCourante(), cor = S.ordo.cor, sc = C.scoreOrdo(cor, S.ordo.auto);
    const tr = cor.problemes.filter((c) => c.trouve).length, p1 = cor.problemes.filter((c) => c.p.priorite === 1), p2 = cor.problemes.filter((c) => c.p.priorite === 2);
    const medIds = [...new Set(o.lignes.map((l) => l.drug).filter(Boolean))];
    return `<div><button class="back" data-a="ordo-close">${ic("retour").replace("<svg", '<svg width="18" height="18"')} Ordonnances</button><h1>Correction</h1><p class="muted">${esc(o.titre)}</p></div>
    <section class="jauges"><div class="jauge"><span class="small">Problèmes trouvés</span><b>${tr}/${cor.problemes.length}</b></div><div class="jauge"><span class="small">Score ${S.ordo.saved ? "" : "provisoire"}</span><b>${Math.round(sc.score / sc.max * 100)} %</b></div></section>
    ${blocOrdonnance(o, false)}
    ${p1.length ? `<section class="stack"><h2>Ce qui bloque la délivrance</h2>${p1.map((c) => blocProbleme(o, c)).join("")}</section>` : ""}
    ${p2.length ? `<section class="stack"><h2>Ce qui se surveille ou se corrige</h2>${p2.map((c) => blocProbleme(o, c)).join("")}</section>` : ""}
    ${(o.rappels || []).map(rappelCours).join("")}
    ${cor.nonAttendus.length ? `<section class="card stack"><h2>Signalements non attendus</h2>${cor.nonAttendus.map((f) => `<div class="row">${flagChip(f)}<span class="grow">${esc(o.lignes.find((l) => l.id === f.ligne).libelle)}</span></div>`).join("")}<p class="muted">Ils ne figurent pas dans cette correction. Si vous pensez avoir raison, vérifiez sur le RCP : la correction n'est pas exhaustive.</p></section>` : ""}
    <section class="card stack"><h2>Lignes sans problème</h2>${o.sansProbleme.map((t) => `<p>${esc(t)}</p>`).join("")}</section>
    ${o.patientDire ? `<section class="card stack"><h2>À dire au patient</h2><p>${esc(o.patientDire)}</p></section>` : ""}
    <section class="card stack" style="border-color:var(--ink)"><h2>À retenir</h2><p>${esc(o.retenir)}</p></section>
    ${rappels(medIds)}
    <section class="stack">${S.ordo.err ? `<p class="erreur" role="alert">${esc(S.ordo.err)}</p>` : ""}
      ${S.ordo.saved ? `<p class="bandeau">Résultat enregistré : ${Math.round(sc.score / sc.max * 100)} %.</p><button class="btn block" data-a="ordo-close">Retour aux ordonnances</button>` : `<button class="btn primary block" data-a="ordo-save">Enregistrer mon résultat</button>`}</section>`;
  }

  /* ---------- Cas ---------- */
  function vCasListe() {
    const th = [...new Set(D.CAS.flatMap((c) => c.domaines))], liste = D.CAS.filter((c) => !S.filtre.theme || c.domaines.includes(S.filtre.theme));
    return `<header><h1>Cas cliniques</h1><p class="muted">Interrogez, décidez, puis lisez la correction.</p></header>
    <div class="wrap"><button class="chip" data-a="theme" data-n="" aria-pressed="${!S.filtre.theme}">Tous les thèmes</button>${th.map((t) => `<button class="chip" data-a="theme" data-n="${t}" aria-pressed="${S.filtre.theme === t}">${esc(D.DOMAINES[t].label)}</button>`).join("")}</div>
    <section class="stack">${liste.map((c) => { const a = dernier("cas", c.id); return `<button class="card tap" data-a="cas-open" data-id="${c.id}"><span class="tile">${ic("cas")}</span><span class="grow stack" style="gap:4px"><span style="font-weight:600">${esc(c.titre)}</span><span class="small">${esc(c.resume)}</span><span class="wrap"><span class="chip">${esc(c.type)}</span>${niv(c.niveau)}${doms(c.domaines)}${a ? `<span class="chip">Dernier essai ${Math.round(a.score / a.max * 100)} %</span>` : ""}</span></span></button>`; }).join("")}</section>
    <p class="small">${D.CAS.length} cas pour l'instant. La banque s'agrandit par lots relus.</p>`;
  }
  const casCourant = () => D.CAS.find((c) => c.id === S.cas.id);
  function vCas() {
    const c = casCourant(), k = S.cas, e = k.etape;
    const tete = `<div><button class="back" data-a="cas-close">${ic("retour").replace("<svg", '<svg width="18" height="18"')} Cas</button><div class="row"><h1 class="grow">${esc(c.titre)}</h1><span class="small">Étape ${e} sur 5</span></div><div class="etapes" style="margin-top:10px">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= e ? "fait" : ""}"></i>`).join("")}</div></div>`;
    const demande = `<section class="card stack"><p class="citation">« ${esc(c.demande)} »</p><p class="muted">${esc(c.patient)}</p></section>`;
    const err = k.err ? `<p class="erreur" role="alert">${esc(k.err)}</p>` : "";
    const obtenu = () => `<section class="stack"><h3>Ce que vous avez appris</h3>${c.questions.filter((q) => k.posees.includes(q.id)).map((q) => `<div class="question posee"><span style="font-weight:600">${esc(q.q)}</span><span class="rep">${esc(q.r)}</span></div>`).join("")}</section>`;
    if (e === 1) return `${tete}${demande}<p class="muted">Le patient est devant vous. À vous de mener l'entretien avant de décider.</p><button class="btn primary block" data-a="cas-next">Interroger le patient</button>`;
    if (e === 2) return `${tete}${demande}<section class="stack"><h3>Vos questions</h3><p class="muted">Touchez une question pour la poser. Toutes ne sont pas utiles.</p>${c.questions.map((q) => { const p = k.posees.includes(q.id); return `<button class="question ${p ? "posee" : ""}" data-a="cas-q" data-q="${q.id}" aria-pressed="${p}"><span style="font-weight:600">${esc(q.q)}</span>${p ? `<span class="rep">${esc(q.r)}</span>` : ""}</button>`; }).join("")}</section>${err}<button class="btn primary block" data-a="cas-next">J'ai fini mes questions</button>`;
    if (e === 3) return `${tete}${obtenu()}<section class="stack champ"><label for="hyp">Votre hypothèse et son mécanisme</label><textarea id="hyp" data-i="cas-hyp" placeholder="Toux liée à…">${esc(k.hyp)}</textarea></section>${err}<button class="btn primary block" data-a="cas-next">Continuer</button>`;
    if (e === 4) return `${tete}${demande}<p class="bandeau">Critère éliminatoire à l'examen : prendre en charge la bonne situation, et orienter vers le médecin quand il le faut.</p><section class="stack"><h3>Votre décision</h3>${c.options.map((o) => `<button class="option" data-a="cas-opt" data-o="${o.id}" aria-pressed="${k.option === o.id}">${esc(o.texte)}</button>`).join("")}</section>${err}<button class="btn primary block" data-a="cas-next">Valider ma décision</button>`;
    const sc = C.scoreCas(c, k.posees, k.hypAuto, k.option), choix = c.options.find((o) => o.id === k.option);
    const oubli = c.questions.filter((q) => q.attendue && !k.posees.includes(q.id)), inut = c.questions.filter((q) => !q.attendue && k.posees.includes(q.id));
    return `${tete}
    ${sc.elimine ? `<p class="elim" role="status"><strong>Cas non validé.</strong> La décision est éliminatoire : une mauvaise prise en charge ou une orientation manquée annule le reste, même si tout le reste est juste.</p>` : ""}
    <article class="corr" style="border-radius:14px;border-left:5px solid ${sc.decisionOk ? "var(--ok)" : "var(--g-ci)"}"><div class="zone stack" style="gap:6px"><h3>1 · Votre décision</h3><h2>${sc.decisionOk ? "Bonne décision" : "Décision éliminatoire"}</h2><p class="note-moi">${esc(choix.texte)}</p></div>
      <div class="zone stack" style="gap:8px"><h3>Les quatre options</h3>${c.options.map((o) => `<p><strong>${o.correct ? "Oui" : "Non"} · ${esc(o.texte)}.</strong> ${esc(o.pourquoi)}</p>`).join("")}</div></article>
    <article class="corr" style="border-radius:14px"><div class="zone stack" style="gap:6px"><h3>2 · Raisonnement</h3><h2>${esc(c.hypothese.attendu)}</h2>${chaine(c.hypothese.mecanisme)}</div>
      <div class="zone stack" style="gap:6px"><h3>Votre hypothèse</h3><p class="note-moi">${esc(k.hyp)}</p>${k.saved ? "" : `<div class="auto">${[["juste", "Juste"], ["incomplet", "Incomplète"], ["absent", "Fausse"]].map(([v, t]) => `<button data-a="cas-auto" data-v="${v}" aria-pressed="${k.hypAuto === v}">${t}</button>`).join("")}</div>`}</div></article>
    <article class="corr" style="border-radius:14px"><div class="zone stack" style="gap:8px"><h3>3 · Vos questions</h3><h2>${sc.questionsOk} question${sc.questionsOk > 1 ? "s" : ""} utile${sc.questionsOk > 1 ? "s" : ""} sur ${sc.questionsAttendues}</h2>
      ${oubli.length ? `<div class="stack" style="gap:6px"><span class="small">Oubliées</span>${oubli.map((q) => `<p><strong>${esc(q.q)}</strong> ${esc(q.pourquoi)}.</p>`).join("")}</div>` : `<p>Aucune question utile oubliée.</p>`}
      ${inut.length ? `<div class="stack" style="gap:6px"><span class="small">Posées sans utilité ici</span>${inut.map((q) => `<p>${esc(q.q)}</p>`).join("")}</div>` : ""}</div></article>
    <p class="small">${statut(c.statut)} ${esc(c.note)}<br>${sources(c.sources)}</p>
    <section class="card stack" style="border-color:var(--ink)"><h2>À retenir</h2><ul style="margin:0;padding-left:18px" class="stack">${c.synthese.map((s) => `<li>${fmt(s)}</li>`).join("")}</ul></section>
    ${rappels(c.drugs)}
    <section class="stack">${err}${k.saved ? `<p class="bandeau">Résultat enregistré : ${Math.round(sc.score / sc.max * 100)} %.</p><button class="btn block" data-a="cas-close">Retour aux cas</button>` : `<button class="btn primary block" data-a="cas-save">Enregistrer mon résultat</button>`}</section>`;
  }

  /* ---------- Médicaments : fiches de classe ---------- */
  const FI = Object.fromEntries(D.FICHES.map((f) => [f.id, f]));
  const norm = (t) => String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const molsDe = (f) => f.mols.filter((x) => x.length > 1);
  const specs = (a) => (a || []).map(([d, t]) => `<div class="spec"><span class="dci">${esc(d)}</span><span>${fmt(t)}</span></div>`).join("");
  const sousTitre = (t) => `<h3 class="stit">${esc(t)}</h3>`;
  const tabMols = (f) => `<table class="mtab">${f.mols.map((x) => x.length === 1 ? `<tr class="mg"><th colspan="2">${esc(x[0])}</th></tr>` : `<tr${S.hl && norm(x[0]).includes(norm(S.hl)) ? ' class="hl"' : ""}><td><b>${esc(x[0])}</b>${x[2] ? ' <span class="pro">prodrogue</span>' : ""}</td><td>${esc(x[1])}</td></tr>`).join("")}</table>`;
  const tabPoso = (f) => {
    const vs = Array.from(new Set([].concat(...f.poso.map((r) => r[3].split(/[ ,;]+/))).filter((v) => D.VOIES[v])));
    return `<div class="tablew"><table class="ptab"><thead><tr><th>Molécule</th><th>Dose</th><th>Rythme</th><th>Voie</th></tr></thead><tbody>${f.poso.map((r) => `<tr><td><b>${esc(r[0])}</b></td><td>${fmt(r[1])}</td><td>${fmt(r[2])}</td><td class="voie">${esc(r[3])}</td></tr>`).join("")}</tbody></table></div>${vs.length ? `<p class="small">${vs.map((v) => v + " : " + D.VOIES[v]).join(" · ")}</p>` : ""}`;
  };
  const reflexeBox = (txts, tete) => `<article class="rflx"><div class="rtete"><span class="rlab">${ic("flamme").replace("<svg", '<svg width="18" height="18"')} Réflexe au comptoir</span>${tete || ""}</div>${txts.map((t) => `<p>${fmt(t)}</p>`).join("")}</article>`;
  function ficheClasse(f) {
    const g = f.gr, ul = (a) => (a && a.length ? ulf(a) : "");
    const secs = [
      ["mecanisme", "Mécanisme", chaine(f.meca) + (f.mecaNote ? `<p class="muted">${fmt(f.mecaNote)}</p>` : "")],
      ["indications", "Indications", ul(f.ind) + specs(f.indS)],
      ["posologies", "Posologies et administration", tabPoso(f) + sousTitre("Administration") + ul(f.adm) + specs(f.admS)],
      ["ci", "Contre-indications", ul(f.ci) + specs(f.ciS)],
      ["interactions", "Interactions", (f.inter.length ? `<div class="stack">${f.inter.map(([n, avec, quoi]) => `<div class="inter bord-${n}">${grav(n)}<p><strong>${esc(avec)}</strong></p><p class="muted">${fmt(quoi)}</p></div>`).join("")}</div>` : `<p class="small">Pas d'interaction notable retenue pour la classe.</p>`) + (f.interS.length ? sousTitre("Propres à une molécule") + specs(f.interS) : "")],
      ["grossesse", "Grossesse et allaitement", `<div class="gas"><div class="ga"><h3>Grossesse</h3><span class="grav ${g[0]}">${forme(g[0])}${GA[g[0]]}</span><p>${fmt(g[1])}</p></div><div class="ga"><h3>Allaitement</h3><span class="grav ${g[2]}">${forme(g[2])}${GA[g[2]]}</span><p>${fmt(g[3])}</p></div></div><p class="small">Pour aller plus loin : <a href="https://www.lecrat.fr" target="_blank" rel="noopener">CRAT</a>.</p>`],
      ["ei", "Effets indésirables", sousTitre("De la classe") + ul(f.ei) + (f.eiG.length ? sousTitre("Graves") + `<div class="graves">${ulf(f.eiG)}</div>` : "") + (f.eiS.length ? sousTitre("Propres à une molécule") + specs(f.eiS) : "")],
      ["surveillance", "Surveillance", ul(f.surv) + specs(f.survS)],
      ["cinetique", "Cinétique", (ul(f.cin) + specs(f.cinS)) || `<p class="small">Rien de particulier à retenir.</p>`]
    ];
    if (f.asso.length) secs.push(["asso", "Associations fixes", ulf(f.asso)]);
    return `<section class="fsec mols0" id="f-molecules"><h2>Molécules de la classe</h2>${tabMols(f)}${f.mols.some((x) => x[2]) ? "" : `<p class="small">Aucune prodrogue dans cette classe.</p>`}</section>
    <div class="wrap sommaire">${secs.map(([s, t]) => `<button class="chip" data-a="saut" data-s="${s}">${t}</button>`).join("")}</div>
    ${reflexeBox(f.refl)}
    ${secs.map(([s, t, corps]) => `<section class="fsec ${s}" id="f-${s}"><h2>${t}</h2>${corps}</section>`).join("")}
    ${(f.rappels || []).map(rappelCours).join("")}
    <p class="small">${statut(f.statut)} ${esc(f.note)}<br>${sources(f.sources)}</p>`;
  }
  const medsFiltres = () => {
    const q = norm(S.q.trim());
    return D.FICHES.map((f) => {
      if (!q) return { f, hits: [] };
      const hits = molsDe(f).filter((x) => norm(x[0] + " " + x[1]).includes(q)).map((x) => x[0] + " (" + x[1].split(/[;,(]/)[0].trim() + ")");
      return hits.length || norm(f.nom + " " + f.sous).includes(q) ? { f, hits } : null;
    }).filter(Boolean);
  };
  const carteFiche = ({ f, hits }) => { const ms = molsDe(f); return `<button class="card tap" data-a="cls-open" data-id="${f.id}"><span class="grow"><span style="font-weight:600;display:block">${esc(f.nom)}</span><span class="small">${esc(hits.length ? hits.slice(0, 3).join(" · ") : ms.slice(0, 4).map((x) => x[0]).join(", ") + (ms.length > 4 ? "…" : ""))}</span></span><span class="nmol">${ms.length}</span></button>`; };
  const medsListe = () => {
    const l = medsFiltres();
    if (!l.length) return `<p class="muted">Aucune classe ni molécule ne correspond.</p>`;
    return D.SPE.map(([s, nom]) => { const r = l.filter((x) => x.f.spe === s); return r.length ? `<section class="stack"><h2>${esc(nom)}</h2>${r.map(carteFiche).join("")}</section>` : ""; }).join("");
  };
  const retour = (a, t) => `<button class="back" data-a="${a}">${ic("retour").replace("<svg", '<svg width="18" height="18"')} ${esc(t)}</button>`;
  const entrainement = (ids) => D.ORDOS.filter((o) => o.lignes.some((l) => ids.includes(l.drug))).map((o) => `<button class="chip" data-a="ordo-open" data-id="${o.id}">Ordonnance : ${esc(o.titre)}</button>`).concat(D.CAS.filter((c) => c.drugs.some((d) => ids.includes(d))).map((c) => `<button class="chip" data-a="cas-open" data-id="${c.id}">Cas : ${esc(c.titre)}</button>`));
  function vMeds() {
    if (S.cls) {
      const f = FI[S.cls], ou = entrainement(f.drugs), nc = toutesCartes().filter((x) => f.drugs.includes(x.drug)).length;
      const spe = (D.SPE.find((x) => x[0] === f.spe) || [0, ""])[1];
      return `<div>${retour("cls-close", "Médicaments")}<h1>${esc(f.nom)}</h1><p class="muted">${esc(spe)}${f.sous ? " · " + esc(f.sous) : ""}</p></div>
      ${nc ? `<button class="btn block" data-a="cartes-cls" data-id="${f.id}">${ic("cartes").replace("<svg", '<svg width="18" height="18" style="vertical-align:-3px"')} Cartes liées (${nc})</button>` : ""}
      ${ficheClasse(f)}${ou.length ? `<section class="stack"><h3>Pour s'entraîner</h3><div class="wrap">${ou.join("")}</div></section>` : ""}`;
    }
    return `<header><h1>Médicaments</h1><p class="muted">Par spécialité, puis par classe pharmacologique.</p></header>
    <input type="search" id="recherche" data-i="med-q" placeholder="Classe, molécule ou nom commercial (Prolia, Triatec…)" value="${esc(S.q)}" aria-label="Rechercher une classe, une molécule ou un nom commercial">
    <div class="stack" id="liste-meds">${medsListe()}</div>`;
  }

  /* ---------- Révisions ---------- */
  const fmtJ = (n) => (n <= 0 ? "ce jour" : n === 1 ? "1 jour" : n < 30 ? n + " jours" : Math.round(n / 30) + " mois");
  function vRev() {
    const r = S.rev, tete = `<div><button class="back" data-a="rev-close">${ic("retour").replace("<svg", '<svg width="18" height="18"')} Accueil</button><h1>Révisions</h1></div>`;
    if (!r.file.length) return `${tete}<section class="card stack"><h2>${r.fait ? "Séance terminée" : "Rien à réviser aujourd'hui"}</h2><p class="muted">${r.fait ? `${r.fait} réponse${r.fait > 1 ? "s" : ""} enregistrée${r.fait > 1 ? "s" : ""}. Les cartes reviendront au bon moment.` : "Les prochaines cartes arriveront à leur date."}</p></section><button class="btn block" data-a="rev-close">Retour à l'accueil</button>`;
    const c = toutesCartes().find((x) => x.id === r.file[0]);
    if (!c) { r.file.shift(); return vRev(); }
    const pv = C.FSRS.preview(store.cards[c.id], day());
    return `${tete}<p class="muted">Encore ${r.file.length} carte${r.file.length > 1 ? "s" : ""} · ${esc(D.NOTIONS[c.notion])}</p>
    <section class="flash"><p class="q">${esc(c.recto)}</p>${r.montre ? `<div class="r">${verso(c)}</div>` : ""}</section>
    ${r.montre ? `<div class="notes4">${[["À revoir", 1], ["Difficile", 2], ["Correct", 3], ["Facile", 4]].map(([t, g]) => `<button data-a="rev-note" data-g="${g}">${t}<span>${g === 1 ? "tout de suite" : fmtJ(pv[g - 1])}</span></button>`).join("")}</div><p class="small">Répondez de tête avant de regarder, puis notez-vous honnêtement. <button class="lien" data-a="carte-edit" data-id="${c.id}">Modifier cette carte</button></p>` : `<button class="btn primary block" data-a="rev-montrer">Voir la réponse</button>`}`;
  }

  /* ---------- Cartes : parcourir, trier, modifier, ajouter ---------- */
  const etatCarte = (c) => {
    const k = store.cards[c.id];
    if (store.susp[c.id]) return { code: "susp", txt: "Suspendue", ord: 1e9, d: 0 };
    if (!k || !k.reps) return { code: "nouv", txt: "Nouvelle", ord: 1e8, d: 0 };
    const j = k.due - day();
    return { code: j <= 0 ? "due" : "appr", txt: j <= 0 ? "À réviser" : "Dans " + fmtJ(j), ord: j, d: k.d };
  };
  const ETATS = [["toutes", "Toutes"], ["due", "À réviser"], ["nouv", "Nouvelles"], ["appr", "Apprises"], ["susp", "Suspendues"], ["perso", "Mes cartes"]];
  function cartesFiltrees() {
    const f = S.cartes, q = f.q.trim().toLowerCase();
    const l = toutesCartes().map((c) => ({ c, e: etatCarte(c) })).filter(({ c, e }) =>
      (!f.drug || (f.drug.indexOf("cls:") === 0 ? FI[f.drug.slice(4)].drugs.includes(c.drug) : c.drug === f.drug)) && (f.etat === "toutes" || (f.etat === "perso" ? c.perso : e.code === f.etat)) &&
      (!q || (c.recto + " " + c.cle + " " + pointsVersTexte(c.points) + " " + (D.NOTIONS[c.notion] || "") + " " + (c.drug ? D.DRUGS[c.drug].dci : "")).toLowerCase().includes(q)));
    const tri = { echeance: (a, b) => a.e.ord - b.e.ord, notion: (a, b) => (D.NOTIONS[a.c.notion] || "").localeCompare(D.NOTIONS[b.c.notion] || "", "fr"), difficulte: (a, b) => b.e.d - a.e.d, medicament: (a, b) => (a.c.drug || "zz").localeCompare(b.c.drug || "zz", "fr") }[f.tri];
    if (tri) l.sort(tri);
    f.ids = l.map((x) => x.c.id);
    return l;
  }
  const listeCartes = () => { const l = cartesFiltrees(); return `<p class="small">${l.length} carte${l.length > 1 ? "s" : ""}</p>` + (l.length ? l.map(({ c, e }) => `<button class="card tap carte-l" data-a="carte-open" data-id="${c.id}"><span class="grow stack" style="gap:5px"><span style="font-weight:600">${esc(c.recto)}</span><span class="wrap"><span class="chip e-${e.code}">${e.txt}</span><span class="chip">${esc(D.NOTIONS[c.notion] || "Mes cartes")}</span>${c.perso ? `<span class="chip">Ma carte</span>` : c.modifiee ? `<span class="chip">Modifiée</span>` : ""}</span></span></button>`).join("") : `<p class="muted">Aucune carte ne correspond à ces filtres.</p>`); };
  function vCartes() {
    const f = S.cartes;
    if (f.edit) {
      const e = f.edit, opt = (v, t, cur) => `<option value="${v}" ${v === cur ? "selected" : ""}>${esc(t)}</option>`;
      return `<div><button class="back" data-a="carte-cancel">${ic("retour").replace("<svg", '<svg width="18" height="18"')} Annuler</button><h1>${e.id ? "Modifier la carte" : "Nouvelle carte"}</h1></div>
      <div class="stack champ"><label for="ce-recto">Question</label><textarea id="ce-recto" data-i="ce-recto" placeholder="Une question précise, qui annonce ce qu'on attend">${esc(e.recto)}</textarea></div>
      <div class="stack champ"><label for="ce-cle">Réponse clé</label><input type="text" id="ce-cle" data-i="ce-cle" value="${esc(e.cle)}" placeholder="Ce qu'il faut retenir en premier"></div>
      <div class="stack champ"><label for="ce-details">Détails, un par ligne</label><textarea id="ce-details" data-i="ce-details" style="min-height:130px" placeholder="Mécanisme : inhibition du CYP3A4">${esc(e.details)}</textarea><p class="small">Écrivez « Libellé : texte » pour créer une ligne titrée. Entourez de deux astérisques **ce qu'il faut mettre en valeur**.</p></div>
      <div class="stack champ"><label for="ce-notion">Notion</label><select id="ce-notion" data-i="ce-notion">${Object.keys(D.NOTIONS).map((n) => opt(n, D.NOTIONS[n], e.notion)).join("")}</select></div>
      <div class="stack champ"><label for="ce-drug">Médicament lié</label><select id="ce-drug" data-i="ce-drug">${opt("", "Aucun", e.drug)}${Object.keys(D.DRUGS).map((n) => opt(n, D.DRUGS[n].dci, e.drug)).join("")}</select></div>
      ${e.err ? `<p class="erreur" role="alert">${esc(e.err)}</p>` : ""}
      <button class="btn primary block" data-a="carte-save">Enregistrer la carte</button>`;
    }
    if (f.ouvert) {
      const c = toutesCartes().find((x) => x.id === f.ouvert);
      if (!c) { f.ouvert = null; return vCartes(); }
      if (!f.ids.includes(c.id)) cartesFiltrees();
      const e = etatCarte(c), k = store.cards[c.id], i = f.ids.indexOf(c.id);
      return `<div><button class="back" data-a="carte-close">${ic("retour").replace("<svg", '<svg width="18" height="18"')} Cartes</button><p class="small">${i >= 0 ? `Carte ${i + 1} sur ${f.ids.length}` : ""}</p></div>
      <section class="flash"><p class="q">${esc(c.recto)}</p><div class="r">${verso(c)}</div></section>
      <div class="row"><button class="btn grow" data-a="carte-nav" data-d="-1">Précédente</button><button class="btn grow" data-a="carte-nav" data-d="1">Suivante</button></div>
      <div class="wrap"><span class="chip e-${e.code}">${e.txt}</span><span class="chip">${esc(D.NOTIONS[c.notion] || "Mes cartes")}</span>${c.drug ? `<button class="chip" data-a="med-open" data-id="${c.drug}">Fiche ${esc(D.DRUGS[c.drug].dci)}</button>` : ""}${k && k.reps ? `<span class="chip">${k.reps} révision${k.reps > 1 ? "s" : ""}, ${k.lapses} oubli${k.lapses > 1 ? "s" : ""}</span>` : ""}</div>
      <div class="wrap"><button class="btn" data-a="carte-edit" data-id="${c.id}">Modifier</button><button class="btn" data-a="carte-susp" data-id="${c.id}">${store.susp[c.id] ? "Réactiver" : "Suspendre"}</button>${c.modifiee ? `<button class="btn ghost" data-a="carte-reset" data-id="${c.id}">Rétablir l'original</button>` : ""}${c.perso ? `<button class="btn ghost" data-a="carte-del">Supprimer</button>` : ""}</div>
      ${f.suppr ? `<p class="erreur" role="alert">Cette carte et son historique seront supprimés.</p><div class="row"><button class="btn primary" data-a="carte-del-ok" data-id="${c.id}">Supprimer</button><button class="btn ghost" data-a="carte-del-non">Annuler</button></div>` : ""}`;
    }
    const tris = [["echeance", "Échéance"], ["notion", "Notion"], ["medicament", "Médicament"], ["difficulte", "Difficulté"]];
    return `<header class="row"><div class="grow"><h1>Cartes</h1><p class="muted">Parcourir, modifier, ajouter.</p></div><button class="btn primary" data-a="carte-new">Nouvelle</button></header>
    <input type="search" id="carte-q" data-i="carte-q" placeholder="Rhabdomyolyse, apixaban, kaliémie" value="${esc(f.q)}" aria-label="Rechercher dans les cartes">
    ${f.drug ? `<div class="wrap"><span class="chip">${f.drug.indexOf("cls:") === 0 ? "Classe : " + esc(FI[f.drug.slice(4)].nom) : "Médicament : " + esc(D.DRUGS[f.drug].dci)}</span><button class="chip" data-a="cartes-drug-clear">Voir toutes les cartes</button></div>` : ""}
    <div class="wrap">${ETATS.map(([k, t]) => `<button class="chip" data-a="cartes-etat" data-e="${k}" aria-pressed="${f.etat === k}">${t}</button>`).join("")}</div>
    <div class="row"><label class="small" for="carte-tri">Trier par</label><select id="carte-tri" data-i="carte-tri" class="grow">${tris.map(([k, t]) => `<option value="${k}" ${f.tri === k ? "selected" : ""}>${t}</option>`).join("")}</select></div>
    <section class="stack" id="liste-cartes">${listeCartes()}</section>`;
  }

  /* ---------- Progrès ---------- */
  function vProgres() {
    const st = C.stats(store, DV(), day());
    const ligne = (n) => `<div class="notion"><div class="tete"><span>${esc(n.label)}</span><span>${n.global === null ? "Pas encore travaillée" : `Je sais ${pct(n.sais)} · J'applique ${pct(n.applique)}`}</span></div><div class="barre"><i style="width:${n.global || 0}%"></i></div></div>`;
    const tri = st.notions.slice().sort((a, b) => (a.global === null) - (b.global === null) || a.global - b.global);
    const meds = {}, plus = (id) => { meds[id] = (meds[id] || 0) + 1; };
    store.attempts.forEach((a) => (a.details || []).filter((d) => !d.trouve).forEach((d) => {
      if (a.kind === "ordo") {
        const o = D.ORDOS.find((x) => x.id === a.id); if (!o) return;
        const ids = new Set(); o.problemes.filter((p) => p.notion === d.notion).forEach((p) => p.cle.forEach((l) => { const dr = o.lignes.find((y) => y.id === l).drug; if (dr) ids.add(dr); }));
        ids.forEach(plus);
      } else { const c = D.CAS.find((x) => x.id === a.id); if (c) c.drugs.forEach(plus); }
    }));
    const medsTri = Object.keys(meds).sort((a, b) => meds[b] - meds[a]).slice(0, 5);
    const o = S.outil || {};
    return `<header><h1>Progrès</h1><p class="muted">Ce que vous savez, et ce que vous savez appliquer.</p></header>
    <section class="jauges"><div class="jauge"><span class="small">Je sais</span><b>${pct(st.sais)}</b><span class="small">${store.reviews.length} réponse${store.reviews.length > 1 ? "s" : ""} aux cartes</span></div><div class="jauge"><span class="small">Je sais appliquer</span><b>${pct(st.applique)}</b><span class="small">${store.attempts.length} exercice${store.attempts.length > 1 ? "s" : ""}</span></div></section>
    <section class="card stack"><h2>Par notion</h2>${tri.map(ligne).join("")}</section>
    <section class="card stack"><h2>Erreurs récurrentes</h2>${st.recurrentes.length ? st.recurrentes.map((n) => `<p>${esc(n.label)} : manquée ${n.rates} fois</p>`).join("") : `<p class="muted">Une notion apparaît ici quand elle est manquée au moins deux fois.</p>`}</section>
    <section class="card stack"><h2>Médicaments à revoir</h2>${medsTri.length ? `<div class="wrap">${medsTri.map((id) => `<button class="chip" data-a="med-open" data-id="${id}">${esc(D.DRUGS[id].dci)} · ${meds[id]}</button>`).join("")}</div>` : `<p class="muted">Les médicaments liés à vos erreurs apparaîtront ici.</p>`}</section>
    <section class="card stack"><h2>Code visuel</h2><div class="wrap">${Object.keys(D.NIVEAUX).map((n) => grav(n, true)).join("")}</div><p class="small">Une couleur et une forme par niveau, partout dans l'application.</p></section>
    <section class="card stack"><h2>Sauvegarde</h2>
      <p class="muted">${etatNuage === "ok" ? "Votre progression est enregistrée dans votre compte, à chaque réponse. Vous la retrouvez en rouvrant l'application, sur n'importe quel appareil connecté au même compte." : etatNuage === "attente" ? "Connexion à la sauvegarde en cours…" : etatNuage === "erreur" ? "Le dernier enregistrement dans votre compte a échoué. La progression reste sur cet appareil ; il sera retenté à la prochaine réponse." : stockageOk ? "Votre progression est enregistrée sur ce téléphone, à chaque réponse. Elle ne dépend d'aucun compte. Pour ne jamais la perdre, exportez-la régulièrement." : "Aucun enregistrement possible ici : la progression sera perdue en fermant la page."}</p>
      <p class="small">${dernierExport() ? "Dernier fichier exporté le " + new Date(dernierExport()).toLocaleDateString("fr-FR") + "." : "Aucun fichier exporté pour l'instant."} Exportez une fois par semaine : c'est la copie qui survit à un changement de téléphone.</p>
      <button class="btn primary block" data-a="sv-exporter">Exporter ma sauvegarde</button>
      <label class="btn block" for="sv-fichier" style="text-align:center">Restaurer depuis un fichier<input type="file" id="sv-fichier" accept=".json,application/json,text/plain" style="position:absolute;opacity:0;width:1px;height:1px"></label>
      <div class="wrap"><button class="btn ghost" data-a="sv-copier">Copier en texte</button><button class="btn ghost" data-a="sv-ouvrir">Coller un texte</button><button class="btn ghost" data-a="sv-reset">Tout effacer</button></div>
      ${o.msg ? `<p class="bandeau" role="status">${esc(o.msg)}</p>` : ""}
      ${o.mode === "copie" ? `<label class="small" for="sv-out">Copie automatique impossible ici. Sélectionnez ce texte et copiez-le.</label><textarea id="sv-out" readonly>${esc(JSON.stringify(store))}</textarea>` : ""}
      ${o.mode === "restaurer" ? `<label class="small" for="sv-in">Collez ici une sauvegarde copiée plus tôt.</label><textarea id="sv-in" data-i="sv-in"></textarea>${o.err ? `<p class="erreur" role="alert">${esc(o.err)}</p>` : ""}<button class="btn primary" data-a="sv-restaurer">Restaurer cette sauvegarde</button>` : ""}
      ${o.mode === "reset" ? `<p class="erreur" role="alert">Toute la progression sera effacée de cet appareil.</p><div class="row"><button class="btn primary" data-a="sv-reset-ok">Effacer</button><button class="btn ghost" data-a="sv-annuler">Annuler</button></div>` : ""}
    </section>
    <p class="bandeau">Outil de formation. Chaque donnée porte son statut et sa source ; le RCP et le jugement professionnel font foi.</p>`;
  }

  /* ---------- Exercices écrits (courriers, questions courtes, déprescription) et calculs de dose ---------- */
  const EXO = {
    courriers: { kind: "courrier", nom: "Courrier au médecin", titre: "Courriers", intro: "Écrivez au médecin, puis comparez avec le modèle et évaluez-vous sur la grille.", liste: () => D.COURRIERS, base: () => D.CRIT_BASE.map(([k, t]) => ["b-" + k, t]), baseNom: "Méthode (tous les courriers)", label: "Votre courrier", ph: "Pharmacie…, le…&#10;Objet :…&#10;Cher Confrère,&#10;Je me permets de vous contacter au sujet de…", modele: "Courrier modèle", notion: () => "courrier", retour: "Retour aux courriers" },
    qroc: { kind: "qroc", nom: "Questions courtes", titre: "Questions courtes", intro: "Répondez par écrit comme à l'oral, puis cochez les points clés présents dans votre réponse.", liste: () => D.QROC, base: () => [], label: "Votre réponse", ph: "Répondez en quelques lignes, avec les mots-clés attendus…", modele: "Réponse attendue", notion: (c) => c.notion, retour: "Retour aux questions" },
    depresc: { kind: "deprescription", nom: "Déprescription", titre: "Déprescription", intro: "Rédigez un protocole d'arrêt progressif, puis comparez avec le modèle et la grille.", liste: () => D.DEPRESC, base: () => D.CRIT_DEP.map(([k, t]) => ["p-" + k, t]), baseNom: "Méthode (tous les protocoles)", label: "Votre protocole", ph: "Pourquoi déprescrire…&#10;Accord du patient…&#10;Palier 1 :…", modele: "Protocole modèle", notion: () => "deprescription", retour: "Retour aux protocoles" },
    doses: { nom: "Calcul de dose" }
  };
  const VUES = [["ordos", "Analyse d'ordonnance"], ["courriers", EXO.courriers.nom], ["qroc", EXO.qroc.nom], ["depresc", EXO.depresc.nom], ["doses", EXO.doses.nom]];
  const basculeOrdo = () => `<div class="wrap" role="group" aria-label="Exercices">${VUES.map(([v, t]) => `<button class="chip" data-a="ordo-vue" data-v="${v}" aria-pressed="${(S.ordoVue || "ordos") === v}">${t}</button>`).join("")}</div>`;
  const crCourant = () => EXO[S.cr.t].liste().find((c) => c.id === S.cr.id);
  const crCriteres = (c) => EXO[S.cr.t].base().concat(c.crit);
  function vCrListe() {
    const e = EXO[S.ordoVue], L = e.liste();
    return `<header><h1>${e.titre}</h1><p class="muted">${e.intro}</p></header>${basculeOrdo()}
    <section class="stack">${L.map((c) => { const a = dernier(e.kind, c.id); return `<button class="card tap" data-a="cr-open" data-t="${S.ordoVue}" data-id="${c.id}"><span class="tile">${ic("ordonnances")}</span><span class="grow stack" style="gap:4px"><span style="font-weight:600">${esc(c.titre)}</span><span class="small">${c.dest ? esc(c.dest) + " · " : ""}${niv(c.niveau)}${a ? " · Dernier essai : " + Math.round(a.score / a.max * 100) + " %" : ""}</span></span>${ic("chevron")}</button>`; }).join("")}</section>
    <p class="small">${L.length} exercices. Chaque correction indique son statut et ses sources.</p>`;
  }
  function vCourrier() {
    const e = EXO[S.cr.t], c = crCourant(), k = S.cr, o = c.ordo ? D.ORDOS.find((x) => x.id === c.ordo) : null;
    const tete = `<header class="row"><button class="btn ghost" data-a="cr-close" aria-label="Retour">${ic("retour")}</button><div class="grow"><h1>${esc(c.titre)}</h1><p class="small">${c.dest ? "À : " + esc(c.dest) + " · " : ""}${niv(c.niveau)}</p></div></header>
      <section class="card stack"><h2>Situation</h2><p>${fmt(c.contexte)}</p>${o ? `<details><summary class="small">Voir l'ordonnance (${o.lignes.length} lignes)</summary><ul>${o.lignes.map((l) => `<li><b>${esc(l.libelle)}</b> : ${esc(l.poso)}</li>`).join("")}</ul></details>` : ""}<p><b>Consigne.</b> ${fmt(c.consigne)}</p></section>`;
    if (k.phase === "redaction") return `${tete}
      <section class="stack"><label for="cr-txt">${e.label}</label><textarea id="cr-txt" data-i="cr-txt" style="min-height:${e.kind === "qroc" ? 160 : 260}px" placeholder="${e.ph}">${esc(k.txt)}</textarea>
      ${k.err ? `<p class="erreur" role="alert">${esc(k.err)}</p>` : ""}<button class="btn primary block" data-a="cr-voir">Voir la correction et la grille</button></section>`;
    const crit = crCriteres(c), nb = e.base().length, n = crit.filter(([id]) => k.coche[id]).length;
    return `${tete}
      <section class="card stack"><h2>${e.label}</h2><div class="lettre">${k.txt.split("\n").map((x) => `<p>${esc(x) || "&nbsp;"}</p>`).join("")}</div></section>
      <section class="card stack"><h2>${e.modele}</h2><div class="lettre">${c.modele.map((x) => `<p>${fmt(x)}</p>`).join("")}</div>
        ${c.court ? `<h3>Version courte (messagerie sécurisée)</h3><p class="lettre">${fmt(c.court)}</p>` : ""}
        <p class="small">${statut(c.statut)} ${esc(c.note)}</p>${c.sources.length ? `<p class="small">${sources(c.sources)}</p>` : ""}</section>
      <section class="card stack"><h2>Grille d'auto-évaluation</h2><p class="small">Cochez ce que votre réponse contient vraiment.</p>
        ${nb ? `<h3>${e.baseNom}</h3><div class="stack" style="gap:6px">${crit.slice(0, nb).map(([id, t]) => critBtn(id, t)).join("")}</div><h3>Propre à ce cas</h3>` : ""}<div class="stack" style="gap:6px">${crit.slice(nb).map(([id, t]) => critBtn(id, t)).join("")}</div>
        <p><b>${n} / ${crit.length}</b> critères remplis.</p>
        ${k.saved ? `<p class="small" role="status">Enregistré. Le score compte dans la notion « ${esc(D.NOTIONS[e.notion(c)])} ».</p>` : `<button class="btn primary block" data-a="cr-save">Enregistrer mon auto-évaluation</button>`}</section>
      <section class="card stack"><h2>À retenir</h2><p>${fmt(c.retenir)}</p></section>
      ${e.kind === "courrier" && D.RAPPELS["lettre-prescripteur"] ? rappelCours("lettre-prescripteur") : ""}
      <button class="btn ghost block" data-a="cr-close">${e.retour}</button>`;
  }
  const critBtn = (id, t) => `<button class="crit" data-a="cr-crit" data-c="${id}" aria-pressed="${!!S.cr.coche[id]}"><span class="case">${S.cr.coche[id] ? ic("check") : ""}</span><span>${fmt(t)}</span></button>`;
  const nombre = (s) => { const x = parseFloat(String(s).replace(/\s/g, "").replace(",", ".")); return isFinite(x) ? x : null; };
  const chiffre = (x) => String(x).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  function vDoses() {
    if (!S.dose) return `<header><h1>Calcul de dose</h1><p class="muted">De tête, sans calculatrice : comme au comptoir et à l'examen.</p></header>${basculeOrdo()}
      <section class="stack">${D.DOSES.map((x) => { const a = dernier("dose", x.id); return `<button class="card tap" data-a="dose-open" data-id="${x.id}"><span class="tile">${ic("ordonnances")}</span><span class="grow stack" style="gap:4px"><span style="font-weight:600">${esc(x.titre)}</span><span class="small">${a ? (a.score ? "Réussi" : "À refaire") : "Pas encore fait"}</span></span>${ic("chevron")}</button>`; }).join("")}</section>
      <p class="small">${D.DOSES.length} calculs. Chaque correction détaille le calcul mental.</p>`;
    const x = D.DOSES.find((y) => y.id === S.dose.id), k = S.dose;
    const tete = `<header class="row"><button class="btn ghost" data-a="dose-close" aria-label="Retour">${ic("retour")}</button><div class="grow"><h1>${esc(x.titre)}</h1></div></header>
      <section class="card stack"><p>${fmt(x.enonce)}</p></section>`;
    if (!k.fait) return `${tete}<section class="stack"><label for="dose-val">Votre réponse (${esc(x.u)})</label><input type="text" inputmode="decimal" id="dose-val" data-i="dose-val" value="${esc(k.val)}" autocomplete="off">
      ${k.err ? `<p class="erreur" role="alert">${esc(k.err)}</p>` : ""}<button class="btn primary block" data-a="dose-ok">Vérifier</button></section>`;
    const v = nombre(k.val), bon = Math.abs(v - x.r) <= x.tol;
    return `${tete}<section class="card stack" role="status"><h2>${bon ? "Juste" : "À revoir"}</h2><p>Votre réponse : <b>${chiffre(v)} ${esc(x.u)}</b> · Attendu : <b>${chiffre(x.r)} ${esc(x.u)}</b>${x.tol ? ` (à ${chiffre(x.tol)} près)` : ""}</p></section>
      <section class="card stack"><h2>Le calcul</h2><ol>${x.etapes.map((t) => `<li>${fmt(t)}</li>`).join("")}</ol>${x.src.length ? `<p class="small">${sources(x.src)}</p>` : ""}</section>
      <div class="row"><button class="btn ghost grow" data-a="dose-close">Tous les calculs</button>${D.DOSES.indexOf(x) < D.DOSES.length - 1 ? `<button class="btn primary grow" data-a="dose-open" data-id="${D.DOSES[D.DOSES.indexOf(x) + 1].id}">Calcul suivant</button>` : ""}</div>`;
  }

  /* ---------- Rendu ---------- */
  const app = document.getElementById("app");
  function vue() {
    if (S.rev) return vRev();
    if (S.tab === "ordonnances" && S.cr) return vCourrier();
    if (S.tab === "ordonnances") return S.ordo ? (S.ordo.phase === "analyse" ? vOrdoAnalyse() : vOrdoCorrection()) : vOrdoListe();
    if (S.tab === "cas") return S.cas ? vCas() : vCasListe();
    if (S.tab === "medicaments") return vMeds();
    if (S.tab === "cartes") return vCartes();
    if (S.tab === "progres") return vProgres();
    return vAccueil();
  }
  function render(haut) {
    const m = app.querySelector("main"), y = m ? m.scrollTop : 0;
    app.innerHTML = `<main id="contenu" tabindex="-1">${vue()}</main><nav class="tabs" aria-label="Sections">${TABS.map((t) => `<button data-a="tab" data-t="${t}" ${S.tab === t && !S.rev ? 'aria-current="page"' : ""}>${ic(t)}${TAB_LABEL[t]}</button>`).join("")}</nav>`;
    app.querySelector("main").scrollTop = haut ? 0 : y;
  }
  const autreReflexe = () => { if (D.REFLEXES.length > 1) { let i; do { i = Math.floor(Math.random() * D.REFLEXES.length); } while (i === S.refl); S.refl = i; } };
  const aller = (tab) => { S.tab = tab; S.rev = null; try { if (location.hash !== "#" + tab) location.hash = tab; } catch (e) { /* cadre sans accès à l'adresse */ } };
  const draftVide = () => ({ cat: null, sfpc: null, inter: null, partenaires: [], priorite: null, note: "" });

  /* ---------- Actions ---------- */
  const A = {
    tab: (d) => { aller(d.t); if (d.t === "ordonnances") { S.cr = null; S.dose = null; } if (d.t !== "medicaments") { S.cls = null; S.hl = null; } if (d.t === "accueil") autreReflexe(); render(true); },
    filtre: (d) => { S.filtre.niveau = +d.n; render(); },
    theme: (d) => { S.filtre.theme = d.n || null; render(); },
    dom: (d) => { S.filtre.dom = d.n || null; render(); },
    "ordo-vue": (d) => { S.ordoVue = d.v; S.dose = null; render(true); },
    "cr-open": (d) => { const t = d.t || "courriers"; aller("ordonnances"); S.ordoVue = t; S.cr = { t, id: d.id, phase: "redaction", txt: "", coche: {}, err: "", saved: false }; render(true); },
    "dose-open": (d) => { aller("ordonnances"); S.ordoVue = "doses"; S.dose = { id: d.id, val: "", fait: false, err: "" }; render(true); },
    "dose-close": () => { S.dose = null; render(true); },
    "dose-ok": () => {
      const x = D.DOSES.find((y) => y.id === S.dose.id), v = nombre(S.dose.val);
      if (v === null) { S.dose.err = "Entrez un nombre (la virgule est acceptée)."; return render(); }
      const bon = Math.abs(v - x.r) <= x.tol ? 1 : 0;
      store.attempts.push({ kind: "dose", id: x.id, day: day(), score: bon, max: 1, val: v, details: [{ notion: "dose-calcul", score: bon, max: 1, trouve: !!bon }] });
      marquerJour(); save(); S.dose.fait = true; S.dose.err = ""; render(true);
    },
    "cr-close": () => { S.cr = null; render(true); },
    "cr-voir": () => { if (S.cr.txt.trim().length < (S.cr.t === "qroc" ? 15 : 40)) { S.cr.err = "Écrivez votre réponse avant de voir la correction."; return render(); } S.cr.err = ""; S.cr.phase = "correction"; render(true); },
    "cr-crit": (d) => { if (S.cr.saved) return; S.cr.coche[d.c] = !S.cr.coche[d.c]; S.cr.err = ""; render(); },
    "cr-save": () => {
      const c = crCourant(), crit = crCriteres(c), score = crit.filter(([id]) => S.cr.coche[id]).length;
      const e = EXO[S.cr.t];
      store.attempts.push({ kind: e.kind, id: c.id, day: day(), score, max: crit.length, txt: S.cr.txt, details: [{ notion: e.notion(c), score, max: crit.length, trouve: score / crit.length >= 0.7 }] });
      marquerJour(); save(); S.cr.saved = true; render();
    },
    "ordo-open": (d) => { aller("ordonnances"); S.ordo = { id: d.id, phase: "analyse", flags: [], ouvert: null, draft: draftVide(), err: "", auto: {}, saved: false, confirmVide: false }; render(true); },
    "ordo-close": () => { S.ordo = null; render(true); },
    "ligne-open": (d) => { S.ordo.ouvert = S.ordo.ouvert === d.l ? null : d.l; S.ordo.draft = draftVide(); S.ordo.err = ""; S.ordo.confirmVide = false; render(); },
    "ligne-close": () => { S.ordo.ouvert = null; S.ordo.err = ""; render(); },
    "draft-cat": (d) => { S.ordo.draft.cat = d.n; S.ordo.draft.sfpc = d.n === "3" ? null : d.n; S.ordo.err = ""; render(); },
    "draft-sfpc": (d) => { S.ordo.draft.sfpc = d.n; S.ordo.err = ""; render(); },
    "draft-inter": (d) => { S.ordo.draft.inter = d.n; S.ordo.err = ""; render(); },
    dev: (d) => { (S.ordo.dev = S.ordo.dev || {})[d.p] = d.n; render(); },
    "draft-part": (d) => { const p = S.ordo.draft.partenaires, i = p.indexOf(d.l); if (i < 0) p.push(d.l); else p.splice(i, 1); render(); },
    "draft-prio": (d) => { S.ordo.draft.priorite = +d.n; S.ordo.err = ""; render(); },
    "flag-add": (d) => {
      const f = S.ordo.draft;
      if (!f.cat) { S.ordo.err = "Choisissez un type de problème."; return render(); }
      if (!f.sfpc) { S.ordo.err = "Précisez le niveau de l'interaction."; return render(); }
      if (!f.inter) { S.ordo.err = "Choisissez l'intervention."; return render(); }
      if (!f.priorite) { S.ordo.err = "Indiquez la priorité."; return render(); }
      S.ordo.flags.push({ ligne: d.l, sfpc: f.sfpc, inter: f.inter, partenaires: f.partenaires.slice(), priorite: f.priorite, note: f.note.trim() });
      S.ordo.ouvert = null; S.ordo.draft = draftVide(); S.ordo.err = ""; S.ordo.confirmVide = false; render();
    },
    "flag-del": (d) => { S.ordo.flags.splice(+d.i, 1); render(); },
    "ordo-valider": () => {
      if (!S.ordo.flags.length && !S.ordo.confirmVide) { S.ordo.confirmVide = true; return render(); }
      S.ordo.cor = C.corrigerOrdo(ordoCourante(), S.ordo.flags); S.ordo.phase = "correction"; S.ordo.err = ""; render(true);
    },
    auto: (d) => { (S.ordo.auto[d.p] = S.ordo.auto[d.p] || {})[d.c] = d.v; S.ordo.err = ""; render(); },
    "ordo-save": () => {
      const manque = S.ordo.cor.problemes.some((c) => c.trouve && !((S.ordo.auto[c.p.id] || {}).mecanisme && (S.ordo.auto[c.p.id] || {}).conduite));
      if (manque) { S.ordo.err = "Évaluez votre mécanisme et votre conduite pour chaque problème trouvé."; return render(); }
      const sc = C.scoreOrdo(S.ordo.cor, S.ordo.auto);
      store.attempts.push({ kind: "ordo", id: S.ordo.id, day: day(), score: sc.score, max: sc.max, details: sc.details });
      marquerJour(); save(); S.ordo.saved = true; S.ordo.err = ""; render();
    },
    "cas-open": (d) => { aller("cas"); S.cas = { id: d.id, etape: 1, posees: [], hyp: "", option: null, hypAuto: null, err: "", saved: false }; render(true); },
    "cas-close": () => { S.cas = null; render(true); },
    "cas-q": (d) => { if (!S.cas.posees.includes(d.q)) S.cas.posees.push(d.q); S.cas.err = ""; render(); },
    "cas-opt": (d) => { S.cas.option = d.o; S.cas.err = ""; render(); },
    "cas-auto": (d) => { S.cas.hypAuto = d.v; S.cas.err = ""; render(); },
    "cas-next": () => {
      const k = S.cas;
      if (k.etape === 2 && !k.posees.length) { k.err = "Posez au moins une question avant de continuer."; return render(); }
      if (k.etape === 3 && !k.hyp.trim()) { k.err = "Écrivez votre hypothèse, même en quelques mots."; return render(); }
      if (k.etape === 4 && !k.option) { k.err = "Choisissez une décision."; return render(); }
      k.err = ""; k.etape++; render(true);
    },
    "cas-save": () => {
      const k = S.cas;
      if (!k.hypAuto) { k.err = "Évaluez votre hypothèse avant d'enregistrer."; return render(); }
      const sc = C.scoreCas(casCourant(), k.posees, k.hypAuto, k.option);
      store.attempts.push({ kind: "cas", id: k.id, day: day(), score: sc.score, max: sc.max, details: sc.details });
      marquerJour(); save(); k.saved = true; k.err = ""; render();
    },
    "med-open": (d) => { aller("medicaments"); S.cls = D.CLASSE_DE[d.id]; S.hl = D.DRUGS[d.id] ? D.DRUGS[d.id].dci : null; render(true); },
    "cls-open": (d) => { aller("medicaments"); S.cls = d.id; S.hl = null; render(true); },
    "cls-close": () => { S.cls = null; S.hl = null; render(true); },
    "cartes-cls": (d) => { aller("cartes"); Object.assign(S.cartes, { drug: "cls:" + d.id, etat: "toutes", q: "", ouvert: null, edit: null }); render(true); },
    "refl-autre": () => { autreReflexe(); render(); },
    "rev-start": () => { S.rev = { file: C.fileRevision(store, DV(), day(), 8), montre: false, fait: 0 }; render(true); },
    "rev-close": () => { aller("accueil"); render(true); },
    "rev-montrer": () => { S.rev.montre = true; render(); },
    "rev-note": (d) => {
      const g = +d.g, id = S.rev.file.shift();
      store.cards[id] = C.FSRS.review(store.cards[id], g, day()); store.reviews.push({ id, g, day: day() });
      if (g === 1) S.rev.file.push(id);
      S.rev.montre = false; S.rev.fait++; marquerJour(); save(); render(true);
    },
    saut: (d) => { const el = document.getElementById("f-" + d.s); if (el) el.scrollIntoView({ block: "start" }); },
    "cartes-drug": (d) => { aller("cartes"); Object.assign(S.cartes, { drug: d.id, etat: "toutes", q: "", ouvert: null, edit: null }); render(true); },
    "cartes-drug-clear": () => { S.cartes.drug = null; render(); },
    "cartes-etat": (d) => { S.cartes.etat = d.e; render(); },
    "carte-open": (d) => { S.cartes.ouvert = d.id; S.cartes.suppr = false; render(true); },
    "carte-close": () => { S.cartes.ouvert = null; render(true); },
    "carte-nav": (d) => { const i = S.cartes.ids.indexOf(S.cartes.ouvert) + +d.d; if (i >= 0 && i < S.cartes.ids.length) { S.cartes.ouvert = S.cartes.ids[i]; S.cartes.suppr = false; render(true); } },
    "carte-new": () => { S.cartes.edit = { id: null, recto: "", cle: "", details: "", notion: "perso", drug: S.cartes.drug && S.cartes.drug.indexOf("cls:") !== 0 ? S.cartes.drug : "", err: "" }; render(true); },
    "carte-edit": (d) => { const c = toutesCartes().find((x) => x.id === d.id); if (!c) return; aller("cartes"); S.cartes.ouvert = c.id; S.cartes.edit = { id: c.id, recto: c.recto, cle: c.cle, details: pointsVersTexte(c.points), notion: c.notion, drug: c.drug || "", err: "" }; render(true); },
    "carte-cancel": () => { S.cartes.edit = null; render(true); },
    "carte-save": () => {
      const e = S.cartes.edit;
      if (!e.recto.trim()) { e.err = "Écrivez la question."; return render(); }
      if (!e.cle.trim()) { e.err = "Écrivez la réponse clé : ce qu'il faut retenir en premier."; return render(); }
      const corps = { recto: e.recto.trim(), cle: e.cle.trim(), points: texteVersPoints(e.details), notion: e.notion, drug: e.drug || null };
      if (!e.id) { const id = "u" + Date.now().toString(36); store.custom.push(Object.assign({ id }, corps)); S.cartes.ouvert = id; }
      else if (D.CARDS.some((c) => c.id === e.id)) store.edits[e.id] = corps;
      else { const i = store.custom.findIndex((c) => c.id === e.id); if (i >= 0) store.custom[i] = Object.assign({ id: e.id }, corps); }
      save(); S.cartes.edit = null; render(true);
    },
    "carte-susp": (d) => { if (store.susp[d.id]) delete store.susp[d.id]; else store.susp[d.id] = 1; save(); render(); },
    "carte-reset": (d) => { delete store.edits[d.id]; save(); render(); },
    "carte-del": () => { S.cartes.suppr = true; render(); },
    "carte-del-non": () => { S.cartes.suppr = false; render(); },
    "carte-del-ok": (d) => { store.custom = store.custom.filter((c) => c.id !== d.id); delete store.cards[d.id]; delete store.susp[d.id]; save(); S.cartes.ouvert = null; S.cartes.suppr = false; render(true); },
    "sv-copier": () => {
      const txt = JSON.stringify(store), ok = () => { S.outil = { msg: "Sauvegarde copiée. Collez-la dans une note pour la garder." }; render(); }, ko = () => { S.outil = { mode: "copie" }; render(); };
      try { navigator.clipboard.writeText(txt).then(ok, ko); } catch (e) { ko(); }
    },
    "sv-ouvrir": () => { S.outil = { mode: "restaurer", txt: "" }; render(); },
    "sv-restaurer": () => {
      try { restaurerTexte(S.outil.txt); S.outil = { msg: "Progression restaurée." }; }
      catch (e) { S.outil.err = "Ce texte n'est pas une sauvegarde valide. Collez le texte complet, sans le modifier."; }
      render();
    },
    "sv-exporter": () => { exporter(); },
    "sv-reset": () => { S.outil = { mode: "reset" }; render(); },
    "sv-reset-ok": () => { store = vide(); save(); S.outil = { msg: "Progression effacée." }; render(); },
    "sv-annuler": () => { S.outil = null; render(); }
  };
  app.addEventListener("click", (e) => { const el = e.target.closest("[data-a]"); if (el && A[el.dataset.a]) A[el.dataset.a](el.dataset, el); });
  app.addEventListener("change", (e) => {
    if (e.target.id !== "sv-fichier" || !e.target.files || !e.target.files[0]) return;
    e.target.files[0].text().then((t) => { try { restaurerTexte(t); S.outil = { msg: "Progression restaurée depuis le fichier." }; } catch (er) { S.outil = { err: "", msg: "Ce fichier n'est pas une sauvegarde Officina valide." }; } render(); });
  });
  app.addEventListener("input", (e) => {
    const k = e.target.dataset.i, v = e.target.value;
    if (k === "draft-note") S.ordo.draft.note = v;
    else if (k === "cas-hyp") S.cas.hyp = v;
    else if (k === "cr-txt") S.cr.txt = v;
    else if (k === "dose-val") S.dose.val = v;
    else if (k === "sv-in") S.outil.txt = v;
    else if (k === "med-q") { S.q = v; document.getElementById("liste-meds").innerHTML = medsListe(); }
    else if (k === "carte-q") { S.cartes.q = v; document.getElementById("liste-cartes").innerHTML = listeCartes(); }
    else if (k === "carte-tri") { S.cartes.tri = v; document.getElementById("liste-cartes").innerHTML = listeCartes(); }
    else if (k && k.indexOf("ce-") === 0 && S.cartes.edit) S.cartes.edit[k.slice(3)] = v;
  });
  const depuisHash = () => { const h = (location.hash || "").slice(1); if (TABS.includes(h) && h !== S.tab) { S.tab = h; S.rev = null; render(true); } };
  window.addEventListener("hashchange", depuisHash);
  const h0 = (location.hash || "").slice(1); if (TABS.includes(h0)) S.tab = h0;
  render(true);
  brancherNuage();
})();
