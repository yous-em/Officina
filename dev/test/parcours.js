// Parcours complet dans un vrai navigateur, à la taille d'un téléphone.
const { chromium } = require("playwright");
const path = require("path");
(async () => {
  const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome", args: ["--no-sandbox"] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("console", (m) => { if (m.type() === "error" && !/fonts\.g|ERR_|Failed to load resource/.test(m.text())) errors.push("console: " + m.text()); });
  await page.goto("file://" + path.join(__dirname, "..", "dist", "index.html"));
  const shot = (n) => page.screenshot({ path: `/tmp/shot-${n}.png` });
  const tap = (sel) => page.locator(sel).first().click();
  const txt = async (s) => { if (!(await page.locator("main").innerText()).includes(s)) throw new Error("Texte absent : " + s); };
  const tasse = async (n) => { const bad = await page.evaluate(() => [...document.querySelectorAll("main > *")].filter((e) => e.scrollHeight > e.clientHeight + 2 && getComputedStyle(e).overflowY === "visible").length); if (bad) errors.push("bloc tassé " + n + " : " + bad); };
  const noOverflow = async (n) => { await tasse(n); const w = await page.evaluate(() => document.querySelector("main").scrollWidth - document.querySelector("main").clientWidth); if (w > 1) errors.push("débordement horizontal " + n + " : " + w + "px"); };

  await txt("Séance du jour"); await noOverflow("accueil"); await shot("1-accueil");

  // Ordonnance 2 : signalements, validation, correction
  await tap('nav [data-t="ordonnances"]'); await txt("Deux ordonnances le même jour");
  await tap('[data-a="ordo-open"][data-id="o2"]'); await txt("Mme D.");
  await tap('[data-a="ordo-valider"]'); await txt("Vous n'avez rien signalé");
  await tap('.ligne[data-l="l8"]');
  await tap('[data-a="flag-add"]'); await txt("Choisissez un type de problème");
  await tap('[data-a="draft-cat"][data-n="3"]'); await tap('[data-a="flag-add"]'); await txt("Précisez le niveau"); await tap('[data-a="draft-sfpc"][data-n="3.3"]');
  await tap('[data-a="flag-add"]'); await txt("Choisissez l'intervention"); await tap('[data-a="draft-inter"][data-n="7"]'); await tap('[data-a="flag-add"]'); await txt("Indiquez la priorité");
  await tap('[data-a="draft-part"][data-l="l1"]'); await tap('[data-a="draft-prio"][data-n="1"]');
  await page.fill("textarea", "AINS + anticoagulant : risque hémorragique. <b>J'appelle</b> le médecin.");
  await noOverflow("éditeur"); await shot("2-editeur");
  await tap('[data-a="flag-add"]');
  await tap('.ligne[data-l="l1"]'); await tap('[data-a="draft-cat"][data-n="2"]'); await tap('[data-a="draft-inter"][data-n="1"]'); await tap('[data-a="draft-prio"][data-n="1"]'); await tap('[data-a="flag-add"]');
  await tap('.ligne[data-l="l2"]'); await tap('[data-a="draft-cat"][data-n="3"]'); await tap('[data-a="draft-sfpc"][data-n="3.2"]'); await tap('[data-a="draft-inter"][data-n="4"]'); await tap('[data-a="draft-prio"][data-n="2"]'); await tap('[data-a="flag-add"]');
  await txt("3 signalements");
  await tap('[data-a="ordo-valider"]'); await txt("Ce qui bloque la délivrance"); await txt("Signalements non attendus"); await txt("2/6"); await txt("Problème bien classé"); await txt("Intervention juste");
  await tap('[data-a="dev"][data-p="p1"][data-n="1"]'); await txt("À recoter : 4"); await tap('[data-a="dev"][data-p="p1"][data-n="4"]'); await txt("Bien coté");
  if ((await page.locator("main").innerHTML()).includes("<b>J'appelle</b>")) errors.push("texte utilisateur non échappé");
  await noOverflow("correction"); await shot("3-correction"); await page.locator("article.corr").first().screenshot({ path: "/tmp/shot-3b-probleme.png" });
  await tap('[data-a="ordo-save"]'); await txt("Évaluez votre mécanisme");
  for (const p of ["p1", "p4"]) for (const c of ["mecanisme", "conduite"]) await tap(`[data-a="auto"][data-p="${p}"][data-c="${c}"][data-v="juste"]`);
  await tap('[data-a="ordo-save"]'); await txt("Résultat enregistré : 33 %");
  await page.locator("details.rappel summary").nth(1).click(); await txt("Posologie usuelle");
  await page.locator("details.rappel").first().scrollIntoViewIfNeeded(); await shot("4-rappel");
  await tap('[data-a="ordo-close"]'); await txt("50 ordonnances"); await tap('[data-a="dom"][data-n="pediatrie"]'); await tap('[data-a="ordo-open"][data-id="o6"]'); await tap('.ligne[data-l="l3"]'); await tap('[data-a="draft-cat"][data-n="2"]'); await tap('[data-a="draft-inter"][data-n="1"]'); await tap('[data-a="draft-prio"][data-n="1"]'); await tap('[data-a="flag-add"]'); await tap('[data-a="ordo-valider"]'); await txt("200 mg/kg par jour"); await txt("1/1"); await noOverflow("ordo pédiatrie"); await shot("3d-pediatrie"); await tap('[data-a="ordo-close"]'); await tap('[data-a="dom"][data-n=""]');
  for (const id of ["o3", "o4", "o5", "o7", "o8"]) { await tap(`[data-a="ordo-open"][data-id="${id}"]`); await tap('[data-a="ordo-valider"]'); await tap('[data-a="ordo-valider"]'); await txt("À retenir"); await noOverflow("ordo " + id); await tap('[data-a="ordo-close"]'); }
  await tap('[data-a="ordo-open"][data-id="o1"]'); await txt("commenter en 10 points"); await tap('.ligne[data-l="l1"]'); await tap('[data-a="draft-cat"][data-n="3"]'); await tap('[data-a="draft-sfpc"][data-n="3.4"]'); await tap('[data-a="draft-inter"][data-n="6"]'); await tap('[data-a="draft-prio"][data-n="1"]'); await tap('[data-a="flag-add"]'); await tap('[data-a="ordo-valider"]'); await txt("Métabolisme des statines"); await txt("Pour faire le lien"); await noOverflow("rappel cours"); await page.locator("article.cours").first().screenshot({ path: "/tmp/shot-3c-cours.png" }); await tap('[data-a="ordo-close"]');

  // Cas
  await tap('nav [data-t="ordonnances"]'); await tap('[data-a="ordo-vue"][data-v="courriers"]'); await txt("8 exercices"); await tap('[data-a="cr-open"][data-id="cr5"]'); await tap('[data-a="cr-voir"]'); await txt("Écrivez votre réponse");
  await page.fill("#cr-txt", "Cher Confrère, je me permets de vous contacter au sujet de M. X : clopidogrel et ésoméprazole, association déconseillée. Je vous propose le pantoprazole. Bien confraternellement."); await tap('[data-a="cr-voir"]'); await txt("Courrier modèle"); await txt("CYP2C19");
  await tap('[data-a="cr-crit"][data-c="b-patient"]'); await tap('[data-a="cr-crit"][data-c="c4"]'); await txt("2 / 12"); await noOverflow("courrier"); await shot("4c-courrier"); await tap('[data-a="cr-save"]'); await txt("Enregistré"); await tap('[data-a="cr-close"]');
  await tap('[data-a="ordo-vue"][data-v="qroc"]'); await txt("10 exercices"); await tap('[data-a="cr-open"][data-id="q4"]'); await page.fill("#cr-txt", "Plus de 10 ans, TROD positif, pharmacien formé."); await tap('[data-a="cr-voir"]'); await txt("Réponse attendue");
  await tap('[data-a="cr-crit"][data-c="c2"]'); await tap('[data-a="cr-crit"][data-c="c3"]'); await txt("2 / 6"); await noOverflow("qroc"); await tap('[data-a="cr-save"]'); await txt("Mal de gorge et TROD"); await tap('[data-a="cr-close"]');
  await tap('[data-a="ordo-vue"][data-v="depresc"]'); await txt("4 exercices"); await tap('[data-a="cr-open"][data-id="dp1"]'); await txt("Zopiclone"); await tap('[data-a="cr-close"]');
  await tap('[data-a="ordo-vue"][data-v="doses"]'); await txt("12 calculs"); await tap('[data-a="dose-open"][data-id="d4"]'); await page.fill("#dose-val", "abc"); await tap('[data-a="dose-ok"]'); await txt("Entrez un nombre");
  await page.fill("#dose-val", "5,6"); await tap('[data-a="dose-ok"]'); await txt("Juste"); await txt("100 mg/mL"); await noOverflow("dose"); await shot("4d-dose"); await tap('[data-a="dose-close"]'); await txt("Réussi");
  await tap('[data-a="ordo-vue"][data-v="ordos"]'); await txt("50 ordonnances");
  await tap('nav [data-t="cas"]'); await tap('[data-a="cas-open"]'); await tap('[data-a="cas-next"]');
  await tap('[data-a="cas-next"]'); await txt("Posez au moins une question");
  for (const q of ["q1", "q3", "q4", "q7"]) await tap(`[data-q="${q}"]`);
  await txt("Du ramipril 5 mg"); await shot("5-questions");
  await tap('[data-a="cas-next"]'); await tap('[data-a="cas-next"]'); await txt("Écrivez votre hypothèse");
  await page.fill("#hyp", "Toux sous IEC, bradykinine");
  await tap('[data-a="cas-next"]'); await tap('[data-a="cas-next"]'); await txt("Choisissez une décision");
  await tap('[data-o="c"]'); await tap('[data-a="cas-next"]'); await txt("Bonne décision"); await txt("3 questions utiles sur 6");
  await noOverflow("cas"); await shot("6-cas-correction");
  await tap('[data-a="cas-save"]'); await txt("Évaluez votre hypothèse");
  await tap('[data-a="cas-auto"][data-v="juste"]'); await tap('[data-a="cas-save"]'); await txt("Résultat enregistré");

  await tap('[data-a="cas-close"]'); await txt("42 cas"); await tap('[data-a="theme"][data-n="voyage"]'); await tap('[data-a="cas-open"][data-id="c7"]'); await tap('[data-a="cas-next"]'); await tap('[data-q="q1"]'); await txt("Cameroun"); await tap('[data-a="cas-next"]'); await page.fill("#hyp", "grippe"); await tap('[data-a="cas-next"]'); await tap('[data-o="a"]'); await tap('[data-a="cas-next"]'); await txt("Cas non validé"); await txt("Décision éliminatoire"); await noOverflow("cas éliminé"); await shot("6b-elimine"); await tap('[data-a="cas-auto"][data-v="absent"]'); await tap('[data-a="cas-save"]'); await txt("Résultat enregistré : 0 %");
  // Révisions
  await tap('nav [data-t="accueil"]'); await txt("Fait aujourd'hui"); await tap('[data-a="rev-start"]'); await txt("Encore 8 cartes");
  await tap('[data-a="rev-montrer"]'); await shot("7-revision");
  await tap('[data-a="rev-note"][data-g="1"]'); await txt("Encore 8 cartes");
  for (let i = 0; i < 8; i++) { await tap('[data-a="rev-montrer"]'); await tap('[data-a="rev-note"][data-g="3"]'); }
  await txt("Séance terminée");
  await tap('[data-a="rev-close"]'); await txt("Terminée pour aujourd'hui");

  // Médicaments : fiches de classe
  await tap('nav [data-t="medicaments"]'); await txt("Cœur et vaisseaux"); await txt("Os et métabolisme"); await page.fill("#recherche", "iec"); await txt("Inhibiteurs de l'enzyme de conversion");
  await tap('[data-a="cls-open"][data-id="iec"]'); await txt("Molécules de la classe"); await txt("prodrogue"); await txt("Coversyl"); await txt("Grossesse et allaitement"); await txt("Propres à une molécule"); await noOverflow("fiche iec"); await shot("8-fiche-iec");
  await tap('[data-a="saut"][data-s="posologies"]'); await shot("8b-iec-poso");
  await tap('[data-a="cartes-cls"]'); await txt("6 cartes"); await txt("Classe : Inhibiteurs"); await noOverflow("cartes"); await shot("10-cartes");
  await tap('[data-a="carte-open"]'); await txt("Carte 1 sur 6"); await tap('[data-a="carte-nav"][data-d="1"]'); await txt("Carte 2 sur 6"); await shot("11-carte");
  await tap('[data-a="carte-edit"]'); await page.fill("#ce-cle", "Réponse **modifiée**"); await tap('[data-a="carte-save"]'); await txt("Rétablir l'original");
  if (!(await page.locator("main").innerHTML()).includes("<mark>modifiée</mark>")) errors.push("mise en valeur absente");
  await tap('[data-a="carte-reset"]'); if ((await page.locator("main").innerText()).includes("Rétablir l'original")) errors.push("rétablissement sans effet");
  await tap('[data-a="carte-susp"]'); await txt("Suspendue"); await tap('[data-a="carte-susp"]');
  await tap('[data-a="carte-close"]'); await tap('[data-a="cartes-drug-clear"]'); await txt("62 cartes");
  await tap('[data-a="carte-new"]'); await tap('[data-a="carte-save"]'); await txt("Écrivez la question");
  await page.fill("#ce-recto", "Ma question <i>test</i> ?"); await page.fill("#ce-cle", "Ma **réponse**"); await page.fill("#ce-details", "Mécanisme : via le **CYP3A4**\nligne libre");
  await tap('[data-a="carte-save"]'); await txt("Ma question <i>test</i> ?"); await txt("Mécanisme"); await shot("12-ma-carte");
  await tap('[data-a="carte-close"]'); await tap('[data-a="cartes-etat"][data-e="perso"]'); await txt("1 carte"); await page.fill("#carte-q", "zzz"); await txt("0 carte"); await page.fill("#carte-q", "");
  await page.selectOption("#carte-tri", "notion"); await tap('[data-a="cartes-etat"][data-e="toutes"]'); await txt("63 cartes");
  await tap('nav [data-t="medicaments"]'); await tap('[data-a="cls-close"]'); await page.fill("#recherche", "prolia"); await txt("Anticorps anti-RANKL"); await tap('[data-a="cls-open"][data-id="antirankl"]'); await txt("rebond"); await noOverflow("anti-RANKL");
  await tap('[data-a="cls-close"]'); await page.fill("#recherche", "fosamax"); await tap('[data-a="cls-open"][data-id="bisphos"]'); await txt("75 mg"); await txt("1×/an"); await txt("PO : voie orale"); await noOverflow("bisphosphonates"); await shot("13-bisphos");
  await tap('[data-a="saut"][data-s="posologies"]'); await shot("13b-bisphos-poso");
  for (const [q, c, t] of [["apixa", "aod", "facteur"], ["omép", "ipp", "pompe à protons"], ["potassium", "potassium", "13,4 mmol"], ["paracé", "paracetamol", "glutathion"], ["furo", "anse", "anse de Henle"], ["biso", "bb", "Cardiosélectifs"], ["aldactone", "arm", "gynécomastie"], ["ibu", "ains", "COX-1"], ["clari", "macrolides", "50S"], ["lamictal", "antiepi-na", "canaux sodiques"], ["levothyrox", "thyroide", "TSH"], ["concerta", "psychostim", "ordonnance sécurisée"]]) { await tap('[data-a="cls-close"]'); await page.fill("#recherche", q); await tap('[data-a="cls-open"][data-id="' + c + '"]'); await txt(t); await txt("Molécules de la classe"); await txt("Grossesse et allaitement"); await noOverflow("classe " + q); }
  // Depuis une ordonnance, un médicament ouvre sa classe
  await page.evaluate(() => { location.hash = "accueil"; }); await tap('nav [data-t="accueil"]'); await txt("Change à chaque passage"); await tap('[data-a="refl-autre"]'); await txt("Un autre réflexe"); await shot("14-accueil-reflexe");
  await tap('[data-a="cls-open"]'); await txt("Molécules de la classe");

  // Progrès, sauvegarde, rechargement
  await tap('nav [data-t="progres"]'); await txt("Par notion"); await noOverflow("progres"); await shot("9-progres");
  const avant = await page.evaluate(() => localStorage.getItem("officina.v1"));
  await page.reload(); await tap('nav [data-t="progres"]'); await txt("6 exercices"); await tap('nav [data-t="cartes"]'); await tap('[data-a="cartes-etat"][data-e="perso"]'); await txt("1 carte"); await tap('nav [data-t="progres"]');
  await tap('[data-a="sv-reset"]'); await tap('[data-a="sv-reset-ok"]'); await txt("Progression effacée"); await txt("0 exercice");
  await tap('[data-a="sv-ouvrir"]'); await page.fill("#sv-in", "pas une sauvegarde"); await tap('[data-a="sv-restaurer"]'); await txt("n'est pas une sauvegarde valide");
  await page.fill("#sv-in", avant); await tap('[data-a="sv-restaurer"]'); await txt("Progression restaurée"); await txt("6 exercices");

  // Sauvegarde dans le compte : écriture après un exercice, puis relecture sur un appareil vierge
  const faux = `window.claude = { use: async (n) => n === "db" ? { doc: (p) => ({ get: async () => ({ exists: !!window.__dist, data: () => window.__dist }), set: async (d) => { window.__dist = d; window.__chemin = p; window.__n = (window.__n || 0) + 1; } }) } : { id: async () => "u_test" } };`;
  const ctx2 = await browser.newContext({ viewport: { width: 360, height: 740 } }); const p2 = await ctx2.newPage();
  p2.on("pageerror", (e) => errors.push("pageerror(2): " + e.message));
  await p2.addInitScript(faux); await p2.goto("file://" + path.join(__dirname, "..", "dist", "index.html"));
  await p2.locator('[data-a="rev-start"]').first().click(); await p2.locator('[data-a="rev-montrer"]').click(); await p2.locator('[data-a="rev-note"][data-g="3"]').click();
  await p2.waitForFunction(() => window.__n >= 1);
  const ecrit = await p2.evaluate(() => ({ chemin: window.__chemin, n: window.__dist.reviews.length, maj: window.__dist.maj }));
  if (ecrit.chemin !== "data/users/u_test/progression" || ecrit.n !== 1 || !ecrit.maj) errors.push("écriture compte : " + JSON.stringify(ecrit));
  const navW = await p2.evaluate(() => { const n = document.querySelector("nav.tabs"); return [...n.querySelectorAll("button")].some((b) => b.scrollWidth > b.clientWidth + 1) || n.scrollWidth > n.clientWidth + 1; });
  if (navW) errors.push("barre d'onglets trop étroite à 360 px"); await p2.screenshot({ path: "/tmp/shot-14-nav360.png" });
  const ctx3 = await browser.newContext({ viewport: { width: 390, height: 844 } }); const p3 = await ctx3.newPage();
  await p3.addInitScript(`window.__dist = ${JSON.stringify({ v: 1, cards: {}, reviews: [], attempts: [{ kind: "cas", id: "c1", day: 1, score: 5, max: 5, details: [{ notion: "iec-toux", score: 5, max: 5, trouve: true }] }], days: {}, custom: [], edits: {}, susp: {}, maj: 9e15 })};` + faux);
  await p3.goto("file://" + path.join(__dirname, "..", "dist", "index.html")); await p3.locator('nav [data-t="progres"]').click();
  await p3.waitForFunction(() => document.querySelector("main").innerText.includes("1 exercice") && document.querySelector("main").innerText.includes("enregistrée dans votre compte"), null, { timeout: 5000 }).catch(() => errors.push("relecture depuis le compte : progression non restaurée"));

  console.log(errors.length ? "ERREURS\n" + errors.join("\n") : "PARCOURS OK, aucune erreur");
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})().catch((e) => { console.error("ÉCHEC : " + e.message); process.exit(1); });
