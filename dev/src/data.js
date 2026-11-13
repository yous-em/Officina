/* Données de l'application. Chaque bloc deviendra un fichier séparé dans la version en ligne.
   Statuts : "verifie" = lu dans la source citée le 13/11/2026 ; "partiel" = une partie reste à vérifier ;
   "a_verifier" = écrit de mémoire. */
const SRC = {
  thesaurus: { label: "Thésaurus ANSM, septembre 2023 (dernière édition)", url: "https://ansm.sante.fr/documents/reference/thesaurus-des-interactions-medicamenteuses-1" },
  clari: { label: "RCP Clarithromycine Biogaran 500 mg", url: "https://base-donnees-publique.medicaments.gouv.fr/medicament/65441220/extrait" },
  clari2: { label: "RCP Clarithromycine HCS 500 mg (22/01/2025)", url: "https://base-donnees-publique.medicaments.gouv.fr/medicament/69702372/extrait" },
  eliquis: { label: "RCP Eliquis (mai 2024)", url: "https://ec.europa.eu/health/documents/community-register/2024/20240506162639/anx_162639_fr.pdf" },
  para: { label: "RCP Paracétamol EG 1 g", url: "https://base-donnees-publique.medicaments.gouv.fr/medicament/62772966/extrait" },
  paraRein: { label: "RCP Paracétamol Zydus 1 g (31/01/2025)", url: "https://base-donnees-publique.medicaments.gouv.fr/medicament/65881579/extrait" },
  ibu: { label: "RCP Brufen 400 mg", url: "https://base-donnees-publique.medicaments.gouv.fr/medicament/65573720/extrait" },
  rami: { label: "RCP Ramipril Krka 5 mg (22/04/2020)", url: "https://base-donnees-publique.medicaments.gouv.fr/medicament/60168465/extrait" },
  spiro: { label: "RCP spironolactone", url: "https://base-donnees-publique.medicaments.gouv.fr/medicament/68916754/extrait" },
  biso: { label: "RCP Cardensiel 1,25 mg", url: "https://base-donnees-publique.medicaments.gouv.fr/medicament/63162282/extrait" },
  furo: { label: "RCP Furosémide Zydus 40 mg (08/04/2026)", url: "https://base-donnees-publique.medicaments.gouv.fr/extrait.php?specid=66951557" },
  aphp: { label: "Fiche AP-HP bicarbonate de potassium (source secondaire)", url: "https://ageps.aphp.fr/wp-content/blogs.dir/67/files/2025/06/FUT-Bicarbonate-Potassium-2025-06-17.pdf" }
};

const NIVEAUX = {
  ci: { label: "Contre-indication", court: "Contre-indication" },
  asdec: { label: "Association déconseillée", court: "Déconseillée" },
  pe: { label: "Précaution d'emploi", court: "Précaution" },
  apec: { label: "À prendre en compte", court: "À prendre en compte" },
  poso: { label: "Posologie ou adaptation", court: "Posologie" }
};

const NOTIONS = {
  "cyp3a4-statine": "Inhibiteurs du CYP3A4 et simvastatine",
  "aod-dose": "Adaptation de dose de l'apixaban",
  "ains-anticoagulant": "AINS sous anticoagulant",
  "ains-rein": "AINS avec IEC et diurétiques",
  "hyperkaliemie": "Associations hyperkaliémiantes",
  "paracetamol-dose": "Doses du paracétamol",
  "ains-dose": "Doses et contre-indications de l'ibuprofène",
  "iec-toux": "Toux et angio-œdème sous IEC",
  "iec-usage": "Ramipril : doses et prise",
  "betabloquant-ic": "Bisoprolol dans l'insuffisance cardiaque"
};

const DOMAINES = {
  cardio: { label: "Cardiologie", icone: "coeur" },
  infectio: { label: "Infectiologie", icone: "bacterie" },
  geriatrie: { label: "Gériatrie", icone: "canne" }
};

const DRUGS = {
  clarithromycine: {
    dci: "Clarithromycine", classe: "Macrolide", domaine: "infectio",
    poso: ["Ne pas dépasser 500 mg deux fois par jour"],
    alertes: ["Inhibiteur puissant du CYP3A4 : nombreuses interactions", "Contre-indiquée avec la simvastatine", "Risque d'allongement du QT"],
    conseils: ["Aller au bout du traitement", "Signaler tout autre médicament pris, même sans ordonnance"],
    statut: "partiel", note: "Plafond de dose, contre-indication et QT vérifiés. Posologie par indication à vérifier.",
    sources: ["clari", "clari2"]
  },
  simvastatine: {
    dci: "Simvastatine", classe: "Statine", domaine: "cardio",
    poso: ["Une prise par jour, le soir"],
    alertes: ["Contre-indiquée avec les inhibiteurs puissants du CYP3A4", "Risque d'atteinte musculaire, jusqu'à la rhabdomyolyse"],
    conseils: ["Signaler toute douleur, crampe ou faiblesse musculaire inexpliquée", "Éviter le jus de pamplemousse"],
    statut: "partiel", note: "Prise le soir et risque musculaire vérifiés. Pamplemousse à vérifier.",
    sources: ["clari"]
  },
  paracetamol: {
    dci: "Paracétamol", classe: "Antalgique, antipyrétique", domaine: "cardio",
    poso: ["1 g par prise au maximum", "4 heures au minimum entre deux prises", "3 g par jour ; 4 g seulement sur avis médical", "Clairance entre 10 et 50 mL/min : 6 heures entre deux prises, 3 g par jour"],
    alertes: ["Contre-indiqué en cas d'insuffisance hépatique sévère", "Surdosage : toxicité hépatique"],
    conseils: ["Compter tous les médicaments qui en contiennent", "Réévaluer au-delà de 3 jours de fièvre ou 5 jours de douleur"],
    statut: "verifie", note: "Vérifié dans deux RCP de paracétamol 1 g.",
    sources: ["para", "paraRein"]
  },
  apixaban: {
    dci: "Apixaban", classe: "Anticoagulant oral direct (anti-Xa)", domaine: "cardio",
    poso: ["Fibrillation atriale : 5 mg deux fois par jour", "2,5 mg deux fois par jour si au moins deux critères : 80 ans ou plus, 60 kg ou moins, créatinine à 133 µmol/L ou plus", "2,5 mg deux fois par jour si la clairance est entre 15 et 29 mL/min"],
    alertes: ["Non recommandé si la clairance est inférieure à 15 mL/min", "AINS : association déconseillée, risque hémorragique"],
    conseils: ["Deux prises régulières chaque jour", "Oubli : prendre la dose tout de suite, puis continuer normalement", "Jamais d'AINS ni d'aspirine en automédication", "Signaler tout saignement"],
    statut: "verifie", note: "Vérifié dans le RCP Eliquis.",
    sources: ["eliquis", "thesaurus"]
  },
  bisoprolol: {
    dci: "Bisoprolol", classe: "Bêtabloquant cardiosélectif", domaine: "cardio",
    poso: ["Insuffisance cardiaque : paliers à partir de 1,25 mg, jusqu'à 10 mg une fois par jour"],
    alertes: ["Arrêt brutal : risque de dégradation aiguë"],
    conseils: ["Prise le matin", "Ne jamais arrêter brutalement"],
    statut: "verifie", note: "Vérifié dans le RCP Cardensiel.",
    sources: ["biso"]
  },
  ramipril: {
    dci: "Ramipril", classe: "Inhibiteur de l'enzyme de conversion (IEC)", domaine: "cardio",
    poso: ["Hypertension : début à 2,5 mg par jour", "Maximum 10 mg par jour"],
    alertes: ["Toux sèche persistante, fréquente (1 à 10 patients sur 100)", "Angio-œdème : arrêt et urgence", "Hyperkaliémie, surtout avec potassium ou épargneurs de potassium", "AINS : fonction rénale et kaliémie"],
    conseils: ["Une prise à heure fixe, avec ou sans repas", "Une toux sèche est possible : en parler sans arrêter le traitement", "Gonflement du visage, des lèvres ou de la langue : appeler le 15", "Pas de sel de régime au potassium ni d'AINS en automédication"],
    statut: "partiel", note: "Vérifié pour l'hypertension. Posologie dans l'insuffisance cardiaque à vérifier.",
    sources: ["rami"]
  },
  furosemide: {
    dci: "Furosémide", classe: "Diurétique de l'anse", domaine: "cardio",
    poso: ["Œdèmes modérés : 20 à 40 mg par jour"],
    alertes: ["Hypokaliémie", "Déshydratation, hypotension"],
    conseils: ["Prise le matin", "Bilan sanguin régulier"],
    statut: "partiel", note: "Posologie et risques vérifiés. Horaire de prise à vérifier.",
    sources: ["furo"]
  },
  spironolactone: {
    dci: "Spironolactone", classe: "Diurétique épargneur de potassium", domaine: "cardio",
    poso: ["Insuffisance cardiaque : 25 mg par jour", "50 mg seulement si la kaliémie reste sous 5 mmol/L"],
    alertes: ["Réduire si la kaliémie dépasse 5,5 mmol/L, arrêter à partir de 6", "Potassium : association déconseillée sauf hypokaliémie", "IEC : précaution d'emploi, surveiller kaliémie et créatinine"],
    conseils: ["Pas de sel de régime au potassium", "Bilan sanguin régulier"],
    statut: "verifie", note: "Posologie et seuils vérifiés dans le RCP, interactions dans le Thésaurus.",
    sources: ["spiro", "thesaurus"]
  },
  potassium: {
    dci: "Chlorure de potassium", classe: "Supplément potassique", domaine: "cardio",
    poso: ["Selon la kaliémie"],
    alertes: ["Avec un épargneur de potassium : association déconseillée sauf hypokaliémie", "Hyperkaliémie potentiellement létale si la fonction rénale est altérée"],
    conseils: ["Gélule à avaler sans la croquer, au cours d'un repas"],
    statut: "partiel", note: "Interactions vérifiées dans le Thésaurus. Modalités de prise à vérifier.",
    sources: ["thesaurus", "aphp"]
  },
  ibuprofene: {
    dci: "Ibuprofène", classe: "Anti-inflammatoire non stéroïdien (AINS)", domaine: "cardio",
    poso: ["400 mg par prise", "Toutes les 6 à 8 heures", "1 200 mg par jour au maximum"],
    alertes: ["Contre-indiqué : insuffisance rénale sévère, insuffisance cardiaque sévère", "Anticoagulant oral : association déconseillée", "IEC, diurétiques : risque d'insuffisance rénale aiguë"],
    conseils: ["Pendant un repas", "Dose la plus faible, durée la plus courte"],
    statut: "verifie", note: "Posologie et contre-indications vérifiées dans le RCP.",
    sources: ["ibu", "thesaurus"]
  },
  omeprazole: {
    dci: "Oméprazole", classe: "Inhibiteur de la pompe à protons", domaine: "cardio",
    poso: ["20 mg par jour"],
    alertes: [],
    conseils: ["Modalités de prise à vérifier"],
    statut: "a_verifier", note: "Fiche écrite de mémoire, à vérifier sur le RCP.",
    sources: []
  }
};

const ORDOS = [
  {
    id: "o1", titre: "Infection respiratoire sous statine", domaines: ["infectio"], niveau: 2,
    resume: "3 lignes, 1 problème, 1 faux piège",
    patient: { nom: "M. R.", details: "67 ans, 82 kg", chips: ["DFG 74 mL/min", "Dyslipidémie", "Pas d'allergie connue"],
      contexte: "Ordonnance de son médecin traitant pour une infection respiratoire basse." },
    lignes: [
      { id: "l1", drug: "clarithromycine", libelle: "Clarithromycine 500 mg", poso: "1 comprimé matin et soir", duree: "7 jours", origine: "Médecin traitant" },
      { id: "l2", drug: "paracetamol", libelle: "Paracétamol 1 g", poso: "1 comprimé si fièvre, 3 par jour au maximum", duree: "7 jours", origine: "Médecin traitant" },
      { id: "l3", drug: "simvastatine", libelle: "Simvastatine 40 mg", poso: "1 comprimé le soir", duree: "Traitement chronique", origine: "Historique" }
    ],
    problemes: [
      { id: "p1", titre: "Clarithromycine et simvastatine", lignes: ["l1", "l3"], cle: ["l1", "l3"], niveau: "ci", priorite: 1, notion: "cyp3a4-statine",
        mecanisme: ["Inhibiteur puissant du CYP3A4", "Métabolisme de la simvastatine diminué", "Exposition plasmatique augmentée", "Atteinte musculaire, jusqu'à la rhabdomyolyse"],
        conduite: "Ne pas délivrer en l'état. Appeler le prescripteur. Deux options à lui proposer : suspendre la simvastatine le temps de l'antibiothérapie, ou choisir un antibiotique sans interaction.",
        statut: "partiel", note: "Niveau vérifié (RCP clarithromycine, rubrique 4.3). L'option « suspendre la statine » reste à vérifier dans le RCP de la simvastatine.", sources: ["clari"] }
    ],
    sansProbleme: ["Faux piège : le paracétamol. 1 g par prise et 3 g par jour sont conformes chez cet adulte de plus de 50 kg sans facteur de risque."],
    patientDire: "Si la clarithromycine est maintenue avec arrêt temporaire de la statine : signaler toute douleur, crampe ou faiblesse musculaire, et reprendre la simvastatine à la date fixée par le médecin.",
    retenir: "Une ordonnance s'analyse avec l'historique. La contre-indication se trouvait entre une ligne du jour et un traitement absent de l'ordonnance."
  },
  {
    id: "o2", titre: "Deux ordonnances le même jour", domaines: ["cardio", "geriatrie"], niveau: 3,
    resume: "9 lignes, 2 prescripteurs, 6 problèmes à hiérarchiser",
    patient: { nom: "Mme D.", details: "82 ans, 58 kg", chips: ["Clairance 36 mL/min", "Kaliémie 5,1 mmol/L", "Créatinine 98 µmol/L", "FA non valvulaire", "Insuffisance cardiaque NYHA II", "Hypertension", "Gonarthrose"],
      contexte: "Biologie d'il y a 5 jours. Elle présente deux ordonnances le même jour." },
    lignes: [
      { id: "l1", drug: "apixaban", libelle: "Apixaban 5 mg", poso: "1 comprimé matin et soir", duree: "3 mois", origine: "Cardiologue" },
      { id: "l2", drug: "bisoprolol", libelle: "Bisoprolol 5 mg", poso: "1 comprimé le matin", duree: "3 mois", origine: "Cardiologue" },
      { id: "l3", drug: "ramipril", libelle: "Ramipril 5 mg", poso: "1 comprimé le matin", duree: "3 mois", origine: "Cardiologue" },
      { id: "l4", drug: "furosemide", libelle: "Furosémide 40 mg", poso: "1 comprimé le matin", duree: "3 mois", origine: "Cardiologue" },
      { id: "l5", drug: "spironolactone", libelle: "Spironolactone 25 mg", poso: "1 comprimé le matin", duree: "3 mois", origine: "Cardiologue" },
      { id: "l6", drug: "potassium", libelle: "Chlorure de potassium 600 mg LP", poso: "1 gélule matin et soir", duree: "3 mois", origine: "Cardiologue" },
      { id: "l7", drug: "paracetamol", libelle: "Paracétamol 1 g", poso: "1 comprimé jusqu'à 4 fois par jour si douleur", duree: "3 mois", origine: "Cardiologue" },
      { id: "l8", drug: "ibuprofene", libelle: "Ibuprofène 400 mg", poso: "1 comprimé 3 fois par jour", duree: "10 jours", origine: "Médecin remplaçant" },
      { id: "l9", drug: "omeprazole", libelle: "Oméprazole 20 mg", poso: "1 gélule le soir", duree: "10 jours", origine: "Médecin remplaçant" }
    ],
    problemes: [
      { id: "p1", titre: "Ibuprofène chez une patiente sous apixaban", lignes: ["l8", "l1"], cle: ["l8"], niveau: "asdec", priorite: 1, notion: "ains-anticoagulant",
        mecanisme: ["AINS", "Agression de la muqueuse gastroduodénale, sous anticoagulant", "Risque hémorragique augmenté"],
        conduite: "Ne pas délivrer l'ibuprofène sans appel. Proposer le paracétamol, déjà prescrit.",
        statut: "verifie", note: "Thésaurus ANSM 2023, p. 23.", sources: ["thesaurus"] },
      { id: "p2", titre: "Ibuprofène avec ramipril, furosémide et spironolactone", lignes: ["l8", "l3", "l4", "l5"], cle: ["l8"], niveau: "pe", priorite: 1, notion: "ains-rein",
        mecanisme: ["AINS", "Moins de prostaglandines rénales", "Filtration glomérulaire diminuée", "Insuffisance rénale aiguë"],
        conduite: "Même appel. Elle cumule trois facteurs de risque : âge, diurétiques, fonction rénale altérée. Si l'AINS était maintenu : hydratation, contrôle de la créatinine et de la kaliémie. L'effet antihypertenseur est aussi réduit et la kaliémie majorée.",
        statut: "verifie", note: "Thésaurus p. 23 et 24, RCP ramipril.", sources: ["thesaurus", "rami"] },
      { id: "p3", titre: "Potassium avec spironolactone et ramipril, kaliémie à 5,1", lignes: ["l6", "l5", "l3"], cle: ["l6"], niveau: "asdec", priorite: 1, notion: "hyperkaliemie",
        mecanisme: ["Addition des effets hyperkaliémiants", "Pas d'hypokaliémie pour justifier l'apport", "Hyperkaliémie potentiellement létale, surtout si la fonction rénale est altérée"],
        conduite: "Appeler le cardiologue. Proposer l'arrêt du potassium et un contrôle de la kaliémie et de la créatinine.",
        statut: "partiel", note: "Potassium et épargneur : vérifié (Thésaurus p. 83). Potassium et IEC : lu dans une fiche AP-HP citant le Thésaurus, à vérifier à la source.", sources: ["thesaurus", "aphp"] },
      { id: "p4", titre: "Apixaban 5 mg deux fois par jour", lignes: ["l1"], cle: ["l1"], niveau: "poso", priorite: 1, notion: "aod-dose",
        mecanisme: ["82 ans (80 ans ou plus) et 58 kg (60 kg ou moins)", "Deux critères de réduction sur trois", "Dose attendue : 2,5 mg deux fois par jour", "Surdosage, risque hémorragique"],
        conduite: "Appeler le cardiologue pour confirmer la dose.",
        statut: "verifie", note: "RCP Eliquis, rubrique 4.2.", sources: ["eliquis"] },
      { id: "p5", titre: "Paracétamol jusqu'à 4 g par jour", lignes: ["l7"], cle: ["l7"], niveau: "poso", priorite: 2, notion: "paracetamol-dose",
        mecanisme: ["Clairance entre 10 et 50 mL/min", "6 heures au minimum entre deux prises", "3 g par jour au maximum"],
        conduite: "Corriger avec le prescripteur : 1 g trois fois par jour au maximum.",
        statut: "verifie", note: "RCP paracétamol 1 g.", sources: ["paraRein"] },
      { id: "p6", titre: "Spironolactone et ramipril", lignes: ["l5", "l3"], cle: ["l5", "l3"], niveau: "pe", priorite: 2, notion: "hyperkaliemie",
        mecanisme: ["Deux médicaments hyperkaliémiants", "Association justifiée dans l'insuffisance cardiaque", "Sous surveillance de la kaliémie et de la créatinine"],
        conduite: "Délivrer. Vérifier que la kaliémie et la créatinine sont suivies. Seuils du RCP : réduire la spironolactone si la kaliémie dépasse 5,5 mmol/L, l'arrêter à partir de 6.",
        statut: "verifie", note: "Thésaurus p. 225, RCP spironolactone.", sources: ["thesaurus", "spiro"] }
    ],
    sansProbleme: ["Bisoprolol 5 mg le matin et furosémide 40 mg le matin sont cohérents.", "L'oméprazole est logique avec un AINS à 82 ans, mais il devient inutile si l'ibuprofène est retiré."],
    patientDire: "",
    retenir: "Le pharmacien est ici le seul à voir les deux ordonnances. Un médicament banal ajouté par un second prescripteur peut cumuler trois risques sur un terrain fragile : hémorragie, insuffisance rénale aiguë, hyperkaliémie."
  }
];

const CAS = [
  {
    id: "c1", titre: "Un sirop pour la toux", domaines: ["cardio"], niveau: 2, type: "Comptoir",
    resume: "Demande spontanée, 8 questions possibles",
    demande: "Bonjour, je voudrais un sirop pour la toux. Ça fait trois semaines que ça traîne.",
    patient: "M. B., 58 ans",
    questions: [
      { id: "q1", q: "Toux sèche ou grasse ?", r: "Sèche, irritative, surtout la nuit.", attendue: true, pourquoi: "Oriente le diagnostic" },
      { id: "q2", q: "Fièvre, essoufflement, sang dans les crachats, amaigrissement ?", r: "Non, rien de tout ça.", attendue: true, pourquoi: "Signes de gravité" },
      { id: "q3", q: "Prenez-vous un traitement ? Un médicament récent ?", r: "Du ramipril 5 mg depuis cinq semaines, pour la tension.", attendue: true, pourquoi: "Question clé" },
      { id: "q4", q: "Gonflement des lèvres, de la langue ou du visage ? Gêne pour avaler ?", r: "Non.", attendue: true, pourquoi: "Recherche d'un angio-œdème sous IEC" },
      { id: "q5", q: "Fumez-vous ? Asthme ou reflux connus ?", r: "Non.", attendue: true, pourquoi: "Autres causes de toux chronique" },
      { id: "q6", q: "Avez-vous déjà pris quelque chose ?", r: "Des pastilles, sans effet.", attendue: true, pourquoi: "Évite un doublon et renseigne sur l'évolution" },
      { id: "q7", q: "Êtes-vous vacciné contre la grippe ?", r: "Oui, le mois dernier.", attendue: false, pourquoi: "Sans utilité ici" },
      { id: "q8", q: "Avez-vous des allergies alimentaires ?", r: "Non.", attendue: false, pourquoi: "Sans utilité ici" }
    ],
    hypothese: { attendu: "Toux sèche induite par l'IEC (ramipril).",
      mecanisme: ["Inhibition de l'enzyme de conversion", "La bradykinine, dégradée par la même enzyme, s'accumule", "Irritation des voies aériennes", "Toux sèche et persistante"] },
    options: [
      { id: "a", texte: "Délivrer un sirop antitussif", correct: false, pourquoi: "Il ne traite pas la cause et retarde le diagnostic." },
      { id: "b", texte: "Conseiller d'arrêter le ramipril", correct: false, pourquoi: "On n'arrête pas un antihypertenseur sans avis médical." },
      { id: "c", texte: "Ne pas délivrer d'antitussif, expliquer le lien possible et orienter vers le médecin, sans urgence, en poursuivant le traitement", correct: true, pourquoi: "La toux sous IEC disparaît à l'arrêt. Le changement de traitement est une décision médicale." },
      { id: "d", texte: "Appeler le 15", correct: false, pourquoi: "Pas ici. Oui en cas de gonflement du visage, des lèvres ou de la langue, ou de gêne pour respirer : angio-œdème." }
    ],
    statut: "partiel",
    note: "Toux fréquente, persistante, réversible à l'arrêt, et conduite devant un angio-œdème : vérifiées dans le RCP du ramipril. Mécanisme par la bradykinine et relais habituel par un sartan : à vérifier sur son cours.",
    sources: ["rami"],
    synthese: ["Toux sèche qui dure chez un patient traité : chercher un IEC dans l'historique.", "Le pharmacien oriente, le médecin modifie le traitement.", "Sous IEC, un gonflement du visage ou de la gorge est une urgence."],
    drugs: ["ramipril"], notion: "iec-toux"
  }
];
