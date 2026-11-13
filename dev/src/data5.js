/* Lot 5 : six ordonnances tirées de ses cours (sujet âgé, pédiatrie).
   Sujet âgé : correction de l'enseignant, rapportée par des notes d'étudiants.
   Pédiatrie : ordonnances du cours, correction construite à partir des recommandations données en cours. */
Object.assign(SRC, {
  coursAge: { label: "Cours de commentaire d'ordonnance, CM 1 du 23/10/2026 (notes d'étudiants)", url: "" },
  coursPed: { label: "ED de pédiatrie du 11/09/2026 (notes d'étudiants)", url: "" },
  recoOrl: { label: "Antibiothérapie des infections ORL, Journal de pédiatrie et de puériculture, 2024", url: "" }
});
Object.assign(DOMAINES, { pediatrie: { label: "Pédiatrie" } });
Object.assign(NOTIONS, { "ped-antibio": "Antibiotiques de l'enfant : dose par kilo et durée", "cyp2d6": "Fluoxétine, inhibiteur du CYP2D6", "age-doses": "Doses à réduire chez le sujet âgé", "isrs-saignement": "ISRS et risque de saignement" });
DRUGS.amoxicilline = { dci: "Amoxicilline", classe: "Pénicilline A (bêta-lactamine)", domaine: "infectio",
  poso: ["**Otite moyenne aiguë purulente** : **80 à 100 mg/kg par jour**, maximum 3 g par jour", "**Angine à TROD positif** : **50 mg/kg par jour** en 2 prises, maximum 2 g par jour, 6 jours", "Otite : **10 jours avant 2 ans, 5 jours après**"],
  alertes: ["**Allergie aux pénicillines**", "La dose par kilo ne doit jamais dépasser la dose adulte", "Pas d'antibiotique : rhinopharyngite, otite congestive ou séreuse, angine à TROD négatif"],
  conseils: ["Montrer jusqu'où compléter le flacon avec de l'eau", "Vérifier le dosage du flacon : 125, 250 ou 500 mg pour 5 mL", "Conservation après reconstitution : variable selon le générique", "Donner avant le repas, aller au bout du traitement", "Deux flacons si l'enfant va à la crèche"],
  statut: "partiel", note: "Doses et durées telles que données en cours (recommandations pédiatriques 2024). Non recoupées avec le RCP.", sources: ["coursPed", "recoOrl"] };

const L = (id, libelle, poso, duree, origine, drug) => ({ id, libelle, poso, duree, origine, drug: drug || null });
const PB = (o) => Object.assign({ priorite: 2, statut: "partiel", devenir: null }, o);
const NOTE_PED = "Correction construite à partir des recommandations données en cours ; elle n'a pas été corrigée par l'enseignante.";

ORDOS.push(
{ id: "o3", titre: "Homme de 81 ans, neuf médicaments", domaines: ["geriatrie", "cardio"], niveau: 3, resume: "9 lignes, ordonnance bizone, 4 problèmes, 1 faux piège",
  patient: { nom: "M. X.", details: "81 ans, 86 kg", chips: ["Fréquence cardiaque 40/min à la montre", "Métoprolol depuis des années", "Fluoxétine depuis quelques mois", "Diabète de type 2", "Hypertension"], contexte: "Renouvellement mensuel. Au comptoir, il vous dit se sentir fatigué et vous montre sa montre connectée." },
  lignes: [
    L("l1", "Metformine 1 000 mg + sitagliptine 50 mg", "1 comprimé matin et soir", "1 mois, 5 renouvellements", "Affection de longue durée"),
    L("l2", "Hydrochlorothiazide 25 mg", "1 comprimé le matin", "1 mois", "Affection de longue durée"),
    L("l3", "Périndopril 10 mg + amlodipine 5 mg", "1 comprimé le matin", "1 mois", "Affection de longue durée"),
    L("l4", "Apixaban 5 mg", "1 comprimé matin et soir", "1 mois", "Affection de longue durée", "apixaban"),
    L("l5", "Métoprolol 100 mg", "1/2 comprimé le matin", "1 mois", "Affection de longue durée"),
    L("l6", "Fluoxétine 20 mg", "2 comprimés le matin", "1 mois", "Hors affection de longue durée"),
    L("l7", "Paracétamol 1 g", "1 comprimé toutes les 6 heures", "1 mois", "Hors affection de longue durée", "paracetamol"),
    L("l8", "Daridorexant 25 mg", "1 comprimé au coucher", "1 mois", "Hors affection de longue durée"),
    L("l9", "Solifénacine 10 mg", "1 comprimé le soir", "1 mois", "Hors affection de longue durée")],
  problemes: [
    PB({ id: "p1", titre: "Fluoxétine et métoprolol, avec un pouls à 40", lignes: ["l6", "l5"], cle: ["l6", "l5"], niveau: "pe", priorite: 1, notion: "cyp2d6", sfpc: ["3.2"], interv: ["7", "1", "6"],
      mecanisme: ["La **fluoxétine inhibe le CYP2D6**", "Le métoprolol, métabolisé par le CYP2D6, s'accumule", "**Bradycardie** : 40 battements par minute", "Métabolite de la fluoxétine à demi-vie longue : l'effet dure"],
      conduite: "Appeler le médecin. Ne pas délivrer le métoprolol : on suspend le bêtabloquant, car l'antidépresseur ne s'arrête pas brutalement. Profiter de l'appel pour proposer les deux ajustements de dose.",
      note: "Correction de l'enseignant (précaution d'emploi), rapportée par des notes d'étudiants.", sources: ["coursAge"],
      devenir: { scenario: "Le médecin accepte de suspendre le métoprolol et revoit le patient demain.", code: "1" } }),
    PB({ id: "p2", titre: "Fluoxétine et apixaban", lignes: ["l6", "l4"], cle: ["l6", "l4"], niveau: "pe", notion: "isrs-saignement", sfpc: ["3.2", "3.1"], interv: ["4"],
      mecanisme: ["La fluoxétine bloque le transporteur de la sérotonine", "Les plaquettes captent moins de sérotonine", "Agrégation diminuée, sous anticoagulant", "**Risque de saignement** augmenté"],
      conduite: "Délivrer. Surveiller gencives, nez, selles, hématomes ; consulter après toute chute.",
      note: "Interaction citée par l'enseignant. Niveau exact à vérifier : les deux cotations sont acceptées.", sources: ["coursAge", "eliquis"] }),
    PB({ id: "p3", titre: "Hydrochlorothiazide 25 mg", lignes: ["l2"], cle: ["l2"], niveau: "poso", notion: "age-doses", sfpc: ["2", "1"], interv: ["1"],
      mecanisme: ["Diurétique associé à deux autres antihypertenseurs", "Déshydratation, hypovolémie, hypokaliémie", "**Risque de chute** chez le sujet âgé"],
      conduite: "Proposer au médecin de réduire à 12,5 mg.", note: "Correction de l'enseignant.", sources: ["coursAge"] }),
    PB({ id: "p4", titre: "Paracétamol 1 g toutes les 6 heures", lignes: ["l7"], cle: ["l7"], niveau: "poso", notion: "age-doses", sfpc: ["2"], interv: ["1"],
      mecanisme: ["4 prises par jour, soit **4 g**", "Chez la personne âgée : **3 g par jour au maximum**", "Risque hépatique"],
      conduite: "Proposer 1 g trois fois par jour au maximum.", statut: "verifie", note: "Correction de l'enseignant, concordante avec le RCP.", sources: ["coursAge", "para"] })],
  sansProbleme: ["Faux piège : l'apixaban à 5 mg deux fois par jour. Il a 81 ans mais pèse 86 kg : un seul critère de réduction sur trois, la dose est correcte.", "Metformine + sitagliptine : conforme, 100 mg de sitagliptine par jour au maximum ; à adapter à la fonction rénale.", "Fluoxétine 40 mg, daridorexant 25 mg, solifénacine 10 mg : posologies jugées correctes en cours."],
  patientDire: "Périndopril avant le petit-déjeuner. Metformine toujours prise de la même façon par rapport aux repas. Se lever par paliers. Daridorexant 30 minutes avant le coucher. Pas d'AINS ni de millepertuis en automédication.",
  retenir: "Poser des questions au comptoir change l'analyse : c'est le pouls à 40 qui transforme une précaution d'emploi en appel au médecin." },

{ id: "o4", titre: "Enfant de 5 ans : rhume, toux et antibiotique en réserve", domaines: ["pediatrie", "infectio"], niveau: 2, resume: "5 lignes, calcul de dose par kilo",
  patient: { nom: "Enfant", details: "5 ans, 21 kg", chips: ["Pas d'allergie connue"], contexte: "Les parents présentent l'ordonnance. Aucune calculatrice : calculez de tête." },
  lignes: [
    L("l1", "Tixocortol, suspension nasale", "1 pulvérisation dans le nez 3 à 4 fois par jour", "1 flacon", "Médecin"),
    L("l2", "Hélicidine 10 %, sirop", "1 cuillère à soupe 3 fois par jour", "1 flacon", "Médecin"),
    L("l3", "Paracétamol 2,4 %, suspension buvable", "Dose pour 21 kg, 3 à 4 fois par jour", "1 flacon", "Médecin", "paracetamol"),
    L("l4", "Amoxicilline 250 mg/5 mL, poudre pour suspension", "1 cuillère-mesure 3 fois par jour. À débuter seulement si fièvre", "6 jours", "Médecin", "amoxicilline"),
    L("l5", "Racécadotril 30 mg enfant, sachets", "1 sachet 3 fois par jour, si diarrhée", "2 à 3 jours", "Médecin")],
  problemes: [
    PB({ id: "p1", titre: "Amoxicilline : dose trop faible et prescription « si fièvre »", lignes: ["l4"], cle: ["l4"], niveau: "poso", priorite: 1, notion: "ped-antibio", sfpc: ["2", "1"], interv: ["1", "7"],
      mecanisme: ["250 mg × 3 = **750 mg par jour**", "750 / 21 kg = **36 mg/kg par jour**", "Angine : 50 mg/kg, soit 1 050 mg. Otite : 80 à 100 mg/kg, soit 1 680 à 2 100 mg", "**Sous-dosage** dans tous les cas : échec et résistances", "Antibiotique « si fièvre » : la fièvre seule n'est pas une indication"],
      conduite: "Appeler le prescripteur : quelle infection est visée ? Selon la réponse, adapter la dose au poids ou ne pas délivrer l'antibiotique.", note: NOTE_PED, sources: ["coursPed", "recoOrl"] })],
  sansProbleme: ["Paracétamol à la dose-poids, jusqu'à 4 fois par jour : conforme (60 mg/kg par jour).", "Racécadotril 30 mg, 1 sachet 3 fois par jour à 21 kg : jugé conforme, à vérifier sur le RCP.", "Hélicidine : posologie de l'enfant à vérifier sur le RCP."],
  patientDire: "Lavages de nez avant les pulvérisations. Paracétamol : utiliser la seringue graduée en kilos.",
  retenir: "Le réflexe en pédiatrie : dose par jour divisée par le poids, puis comparaison à la recommandation de l'infection traitée." },

{ id: "o5", titre: "Enfant de 34 kg : macrolide, antitussif et fluidifiant", domaines: ["pediatrie", "infectio"], niveau: 2, resume: "5 lignes, 2 problèmes à vérifier",
  patient: { nom: "Enfant", details: "34 kg", chips: ["Pas d'allergie connue"], contexte: "Ordonnance manuscrite complétée à la main." },
  lignes: [
    L("l1", "Roxithromycine 150 mg, comprimés", "1 comprimé matin et soir avant les repas", "5 jours", "Médecin"),
    L("l2", "Paracétamol orodispersible", "1 si fièvre mal tolérée", "1 boîte", "Médecin", "paracetamol"),
    L("l3", "Oxomémazine, sirop", "1 cuillère au coucher", "", "Médecin"),
    L("l4", "Acétylcystéine, sachets", "2 le matin", "3 jours", "Médecin"),
    L("l5", "Tixocortol, suspension nasale", "Ajouté à la main, sans posologie", "", "Médecin")],
  problemes: [
    PB({ id: "p1", titre: "Roxithromycine 150 mg matin et soir à 34 kg", lignes: ["l1"], cle: ["l1"], niveau: "poso", priorite: 1, notion: "ped-antibio", sfpc: ["2"], interv: ["1"],
      mecanisme: ["150 mg × 2 = **300 mg par jour**, la dose de l'adulte", "300 / 34 kg = **8,8 mg/kg par jour**", "Dose de l'enfant plus faible, avec une forme pédiatrique"],
      conduite: "Appeler le prescripteur pour adapter la dose et la forme au poids.", note: "Dose de l'enfant (5 à 8 mg/kg par jour, forme à 100 mg entre 24 et 40 kg) écrite de mémoire : à vérifier sur le RCP.", sources: ["coursPed"] }),
    PB({ id: "p2", titre: "Antitussif et fluidifiant ensemble", lignes: ["l3", "l4"], cle: ["l3", "l4"], niveau: "apec", notion: "ped-antibio", sfpc: ["1", "7", "8"], interv: ["7"],
      mecanisme: ["L'acétylcystéine fluidifie les sécrétions", "L'oxomémazine bloque la toux qui les évacue", "**Association illogique** : encombrement"],
      conduite: "Proposer de n'en garder qu'un, selon le type de toux. Oxomémazine : antihistaminique sédatif.", note: "Raisonnement classique, à vérifier sur son cours.", sources: ["coursPed"] })],
  sansProbleme: ["Tixocortol ajouté à la main sans posologie : à faire préciser (prescription peu claire)."],
  patientDire: "Roxithromycine avant les repas.",
  retenir: "Un comprimé « adulte » chez un enfant : toujours refaire le calcul par kilo." },

{ id: "o6", titre: "Enfant de 3 ans : amoxicilline 1 g trois fois par jour", domaines: ["pediatrie", "infectio"], niveau: 1, resume: "3 lignes, 1 problème majeur",
  patient: { nom: "Enfant", details: "3 ans, 15 kg", chips: ["Poids ajouté à la main"], contexte: "Ordonnance imprimée, poids noté à la main." },
  lignes: [
    L("l1", "Allium cepa 9 CH", "3 granules 3 fois par jour", "5 jours", "Médecin"),
    L("l2", "Tixocortol, suspension nasale", "2 fois par jour", "1 flacon", "Médecin"),
    L("l3", "Amoxicilline 1 g", "1 matin, midi et soir", "7 jours", "Médecin", "amoxicilline")],
  problemes: [
    PB({ id: "p1", titre: "Amoxicilline 3 g par jour à 15 kg", lignes: ["l3"], cle: ["l3"], niveau: "poso", priorite: 1, notion: "ped-antibio", sfpc: ["2"], interv: ["1"],
      mecanisme: ["1 g × 3 = **3 g par jour**", "3 000 / 15 kg = **200 mg/kg par jour**", "Attendu : 80 à 100 mg/kg, soit **1,2 à 1,5 g par jour**", "**Surdosage : le double de la dose**, et une forme à 1 g inadaptée à 3 ans"],
      conduite: "Ne pas délivrer en l'état. Appeler le prescripteur : dose adaptée au poids, en suspension buvable. Vérifier aussi la durée : 5 jours pour une otite après 2 ans.", note: NOTE_PED, sources: ["coursPed", "recoOrl"],
      devenir: { scenario: "Le médecin corrige : 500 mg trois fois par jour en suspension, pendant 5 jours.", code: "1" } })],
  sansProbleme: ["Tixocortol et homéopathie : rien à signaler."],
  patientDire: "Montrer la reconstitution du flacon et le trait de niveau.",
  retenir: "3 g par jour est la dose maximale de l'adulte : chez un enfant de 15 kg, c'est une erreur de logiciel ou de ligne." },

{ id: "o7", titre: "Adolescente de 44,7 kg allergique à l'amoxicilline", domaines: ["pediatrie", "infectio"], niveau: 2, resume: "2 lignes, 1 problème, 1 faux piège",
  patient: { nom: "Adolescente", details: "12 ans et demi, 44,7 kg, 157 cm", chips: ["Allergie à l'amoxicilline", "Intolérance à la trimébutine"], contexte: "Ordonnance imprimée avec allergies renseignées." },
  lignes: [
    L("l1", "Paracétamol effervescent 500 mg", "Matin, midi et soir si fièvre ou douleur", "3 boîtes", "Médecin", "paracetamol"),
    L("l2", "Cefpodoxime, suspension buvable", "1 dose pour 44 kg matin et soir, à la fin des repas", "1 semaine", "Médecin")],
  problemes: [
    PB({ id: "p1", titre: "Cefpodoxime pendant 7 jours", lignes: ["l2"], cle: ["l2"], niveau: "poso", notion: "ped-antibio", sfpc: ["7", "2"], interv: ["1"],
      mecanisme: ["Dose : 8 mg/kg × 44,7 = **358 mg par jour**, sous le maximum de 400 mg : correcte", "Durée recommandée : **5 jours** (angine, ou otite après 2 ans)", "7 jours : durée trop longue, sans bénéfice"],
      conduite: "Signaler au prescripteur et proposer 5 jours. Vérifier que la suspension est la forme adaptée à ce poids.", note: NOTE_PED + " Forme adaptée à 44 kg : à vérifier sur le RCP.", sources: ["coursPed", "recoOrl"] })],
  sansProbleme: ["Faux piège : l'allergie à l'amoxicilline. Elle explique le choix du cefpodoxime, traitement de deuxième intention. Demander seulement la nature de l'allergie : une réaction grave ferait rediscuter les céphalosporines.", "Paracétamol 500 mg trois fois par jour : sous la dose maximale pour 44,7 kg."],
  patientDire: "Cefpodoxime à la fin des repas. Aller au bout du traitement.",
  retenir: "Une allergie notée sur l'ordonnance n'est pas toujours un problème : ici, elle justifie la prescription." },

{ id: "o8", titre: "Nourrisson de 11 mois : amoxicilline 800 mg matin et soir", domaines: ["pediatrie", "infectio"], niveau: 3, resume: "3 lignes, dose et durée à vérifier",
  patient: { nom: "Nourrisson", details: "11 mois, 11,1 kg", chips: ["Poids du jour"], contexte: "Sur l'ordonnance, la dose d'amoxicilline est en partie raturée." },
  lignes: [
    L("l1", "Paracétamol, suspension buvable", "1 dose-poids toutes les 6 heures si fièvre au-dessus de 38,5 °C", "", "Médecin", "paracetamol"),
    L("l2", "Sérum physiologique", "Lavages de nez 4 à 6 fois par jour", "5 jours", "Médecin"),
    L("l3", "Amoxicilline 250 mg/5 mL", "800 mg matin et soir (mention en partie raturée)", "5 jours", "Médecin", "amoxicilline")],
  problemes: [
    PB({ id: "p1", titre: "Amoxicilline : dose, durée et écriture", lignes: ["l3"], cle: ["l3"], niveau: "poso", priorite: 1, notion: "ped-antibio", sfpc: ["2", "9"], interv: ["1", "3"],
      mecanisme: ["800 mg × 2 = **1 600 mg par jour**", "1 600 / 11,1 kg = **144 mg/kg par jour**", "Attendu : 80 à 100 mg/kg, soit **890 à 1 110 mg par jour** (environ 500 mg matin et soir, soit 10 mL)", "Avant 2 ans, une otite se traite **10 jours**, pas 5", "Mention raturée : prescription peu claire"],
      conduite: "Ne pas délivrer sans appel : faire confirmer la dose, la durée et l'indication. Exprimer la dose en mL pour les parents.", note: NOTE_PED + " L'indication n'est pas écrite : l'otite est une hypothèse.", sources: ["coursPed", "recoOrl"],
      devenir: { scenario: "Le médecin est injoignable ce soir. Vous ne délivrez pas l'amoxicilline et demandez aux parents de le rappeler demain matin.", code: "5" } })],
  sansProbleme: ["Paracétamol à la dose-poids toutes les 6 heures : conforme.", "Lavages de nez : conformes."],
  patientDire: "Donner l'antibiotique avant le biberon : le nourrisson le prend mieux et le régurgite moins.",
  retenir: "Trois vérifications chez le nourrisson : la dose par kilo, la durée selon l'âge, et la lisibilité." }
);
