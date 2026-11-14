/* Fin des fiches de classe : tables de correspondance et réflexes (à charger en dernier). */
/* ================= Tables ================= */
const CLASSE_DE = {};
FICHES.forEach((f) => {
  f.drugs.forEach((d) => { CLASSE_DE[d] = f.id; });
  f.statut = f.drugs.some((d) => DRUGS[d] && DRUGS[d].statut === "verifie") ? "partiel" : "a_verifier";
  f.note = NOTE_FICHE + (f.drugs.length ? "Reprend l'ancienne fiche : " + f.drugs.map((d) => DRUGS[d].dci).join(", ") + "." : "Classe nouvelle, entièrement à vérifier.");
  const s = new Set(["bdpm"].concat(f.src)); f.drugs.forEach((d) => (DRUGS[d].sources || []).forEach((x) => s.add(x))); f.sources = Array.from(s);
  f.rappels = Array.from(new Set([].concat(...f.drugs.map((d) => DRUGS[d].rappels || []))));
});
/* Tous les réflexes, pour l'accueil. */
const REFLEXES = [].concat(...FICHES.map((f) => f.refl.map((t) => ({ fiche: f.id, t }))));

DATA.SPE = SPE; DATA.VOIES = VOIES; DATA.FICHES = FICHES; DATA.CLASSE_DE = CLASSE_DE; DATA.REFLEXES = REFLEXES;
