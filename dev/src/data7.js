/* Lot 7 : quatre ordonnances d'entraînement sur les chapitres de ses cours (ostéoporose, AVC, grossesse,
   infection ostéoarticulaire). Ordonnances originales, pas tirées de ses PDF : elles seront complétées
   par les ordonnances et annales du cours quand les fichiers seront transmis. */
Object.assign(SRC, {
  calciumRcp: { label: "RCP Calcium Vitamine D3 Biogaran 500 mg/400 UI", url: "https://base-donnees-publique.medicaments.gouv.fr/extrait.php?specid=60210697" },
  calciumRcp2: { label: "RCP Ideos (calcium, vitamine D3)", url: "https://www.pharmacie-cayeux.fr/rcp/ideos-cpr-croq-b-60-5b1e187f7a05b.pdf" },
  clopiRcp: { label: "RCP Clopidogrel EG Labo 75 mg (07/05/2025)", url: "https://base-donnees-publique.medicaments.gouv.fr/medicament/67233727/extrait" },
  clopiRcp2: { label: "RCP Clopidogrel 75 mg, rubrique 4.4 (inhibiteurs du CYP2C19)", url: "https://agence-prd.ansm.sante.fr/php/ecodex/rcp/R0245911.htm" },
  crat: { label: "CRAT, Centre de référence sur les agents tératogènes", url: "https://www.lecrat.fr/" },
  eliquis2011: { label: "RCP Eliquis, rubrique 4.4 (inducteurs du CYP3A4 et de la P-gp)", url: "https://ec.europa.eu/health/documents/community-register/2011/20110518102349/anx_102349_fr.pdf" }
});
Object.assign(DOMAINES, { rhumato: { label: "Rhumatologie" }, neuro: { label: "Neurologie" }, grossesse: { label: "Grossesse" } });
Object.assign(NOTIONS, {
  "prises-distance": "Médicaments à prendre à distance",
  "ipp-long-cours": "IPP au long cours",
  "clopidogrel-ipp": "Clopidogrel et IPP",
  "ains-antiagregant": "AINS sous antiagrégants",
  "grossesse-ains": "AINS et grossesse",
  "fq-tendon": "Fluoroquinolones et tendons"
});

Object.assign(RAPPELS, {
  "prises-a-distance": {
    titre: "Médicaments à prendre à distance",
    intro: "Les sels de calcium, de fer, de magnésium et les pansements digestifs forment des complexes dans l'intestin : le médicament associé est moins absorbé.",
    colonnes: ["Médicament", "Règle de prise", "Si on l'oublie"],
    lignes: [
      ["**Alendronate**", "À jeun, grand verre d'eau du robinet, **30 min** avant tout ; calcium **2 h** après", "Absorption déjà très faible : traitement inefficace"],
      ["**Lévothyroxine**", "Le matin à jeun ; calcium, fer, pansements à **plus de 2 h**", "TSH qui monte : hypothyroïdie mal équilibrée"],
      ["**Fluoroquinolones**", "Calcium, fer, magnésium, antiacides à **2 h** d'écart", "Antibiotique moins efficace"],
      ["**Cyclines**", "Calcium à au moins 2 h", "Antibiotique moins efficace"]
    ],
    reflexe: "Réflexe : dès qu'un calcium apparaît sur une ordonnance, chercher thyroïde, bisphosphonate, fer, quinolone ou cycline, et écrire le plan de prise.",
    statut: "partiel", note: "Calcium avec hormones thyroïdiennes, bisphosphonates, cyclines et quinolones : vérifiés dans les RCP du calcium. Règle de prise de l'alendronate : classique, à relire sur son RCP.",
    sources: ["calciumRcp", "calciumRcp2"]
  },
  "inducteurs-enzymatiques": {
    titre: "Inducteurs enzymatiques",
    intro: "Un inducteur augmente la quantité d'enzymes (CYP3A4 surtout) : les médicaments associés sont éliminés plus vite et marchent moins. L'effet s'installe en quelques jours et persiste après l'arrêt.",
    colonnes: ["Inducteur", "Médicaments qui perdent leur effet", "Conséquence à redouter"],
    lignes: [
      ["**Rifampicine**", "AOD, AVK, corticoïdes, contraceptifs, lévothyroxine…", "Thrombose, rechute, grossesse"],
      ["**Millepertuis**", "Contraceptifs hormonaux, AVK, digoxine, immunosuppresseurs", "Grossesse, rejet de greffe"],
      ["**Carbamazépine, phénytoïne, phénobarbital**", "Contraceptifs, AOD, nombreux autres", "Échec thérapeutique"]
    ],
    reflexe: "Réflexe : inducteur sur l'ordonnance ou au comptoir → pilule ? anticoagulant ? corticoïde ? Et penser à l'arrêt : l'effet dure encore une à deux semaines.",
    statut: "partiel", note: "Millepertuis et apixaban : vérifiés sur les RCP. Liste des autres inducteurs et durée après l'arrêt de la rifampicine : à vérifier sur son cours.",
    sources: ["milleRcp", "eliquis2011", "hasContra"]
  }
});

Object.assign(DRUGS, {
  alendronate: { dci: "Alendronate", classe: "Bisphosphonate", domaine: "rhumato",
    poso: ["**70 mg une fois par semaine**, toujours le même jour"],
    alertes: ["**À jeun**, avec un **grand verre d'eau du robinet**, au moins **30 minutes** avant aliment, boisson ou autre médicament", "**Rester assis ou debout 30 minutes** : risque d'œsophagite", "**Ostéonécrose de la mâchoire** : bilan dentaire, signaler tout soin dentaire", "Insuffisance rénale sévère : non recommandé (seuil à vérifier)"],
    conseils: ["Pas d'eau minérale riche en calcium, pas de café ni de jus pour l'avaler", "Calcium et vitamine D : à un autre moment de la journée", "Signaler une douleur en avalant, une brûlure derrière le sternum", "Bonne hygiène dentaire, visite chez le dentiste"],
    rappels: ["prises-a-distance"],
    statut: "a_verifier", note: "Règles de prise classiques écrites de mémoire : à relire sur le RCP.", sources: ["calciumRcp2"] },
  levothyroxine: { dci: "Lévothyroxine", classe: "Hormone thyroïdienne", domaine: "geriatrie",
    poso: ["Une prise par jour, **le matin à jeun**, environ 30 minutes avant le petit-déjeuner", "Dose adaptée à la **TSH**"],
    alertes: ["**Marge thérapeutique étroite**", "**Calcium, fer, pansements digestifs : à plus de 2 heures**", "Inducteurs enzymatiques (rifampicine…) : baisse d'efficacité possible"],
    conseils: ["Toujours à la même heure, de la même façon", "Signaler palpitations, tremblements, amaigrissement (surdosage) ou fatigue, frilosité (sous-dosage)", "Contrôle de la TSH après tout changement"],
    rappels: ["prises-a-distance"],
    statut: "partiel", note: "Interaction avec le calcium vérifiée sur les RCP du calcium. Le reste : classique, à relire sur le RCP.", sources: ["calciumRcp", "calciumRcp2"] },
  clopidogrel: { dci: "Clopidogrel", classe: "Antiagrégant plaquettaire (inhibiteur P2Y12)", domaine: "neuro",
    poso: ["**75 mg une fois par jour**", "Après un AVC mineur ou un AIT : associé à l'aspirine pour une **durée courte** (RCP : bénéfice non étudié au-delà de 4 semaines dans ce contexte)"],
    alertes: ["**Prodrogue** activée par le **CYP2C19**", "**Oméprazole, ésoméprazole** (inhibiteurs du CYP2C19) : **association déconseillée** ; éviter les IPP sauf nécessité", "Anticoagulant oral associé : non recommandé (saignements)"],
    conseils: ["Ne jamais arrêter sans avis du médecin", "Prévenir avant tout soin dentaire ou toute chirurgie", "Saignements anormaux, selles noires : consulter", "Pas d'AINS ni d'aspirine en automédication"],
    statut: "partiel", note: "Interaction avec les inhibiteurs du CYP2C19 et les IPP, association aux anticoagulants : vérifiées sur deux RCP. Durée exacte de la double antiagrégation après un AVC : à vérifier sur son cours.", sources: ["clopiRcp", "clopiRcp2"] },
  rifampicine: { dci: "Rifampicine", classe: "Antibiotique (rifamycine)", domaine: "infectio",
    poso: ["Dose par kilo selon l'infection : à vérifier sur son cours", "**À jeun**, à distance des repas (à vérifier sur le RCP)"],
    alertes: ["**Inducteur enzymatique puissant** : AOD, AVK, corticoïdes, contraceptifs, lévothyroxine…", "Coloration **orange** des urines, des larmes, de la sueur : tache les **lentilles souples**", "Toxicité hépatique : bilan hépatique"],
    conseils: ["Ne jamais l'utiliser seule : toujours associée à un autre antibiotique (résistances)", "Contraception non hormonale pendant le traitement et après", "Signaler jaunisse, urines très foncées, fatigue inhabituelle"],
    rappels: ["inducteurs-enzymatiques"],
    statut: "a_verifier", note: "Fiche courte écrite de mémoire, sauf l'interaction avec l'apixaban (RCP Eliquis).", sources: ["eliquis2011"] },
  levofloxacine: { dci: "Lévofloxacine", classe: "Fluoroquinolone", domaine: "infectio",
    poso: ["500 mg une ou deux fois par jour selon l'infection", "Dose à réduire si la clairance est sous 50 mL/min (à vérifier)"],
    alertes: ["**Tendinopathie, rupture du tendon d'Achille** : plus de 60 ans, **corticoïdes**", "**Photosensibilisation**", "Allongement du QT ; troubles neuropsychiques"],
    conseils: ["Arrêter et consulter à la **moindre douleur d'un tendon**", "Pas d'exposition au soleil ni aux UV", "Calcium, fer, magnésium, antiacides : **2 heures d'écart**"],
    rappels: ["prises-a-distance"],
    statut: "a_verifier", note: "Fiche courte écrite de mémoire, à relire sur le RCP.", sources: ["thesaurus"] }
});

ORDOS.push(
{ id: "o9", titre: "Femme de 74 ans : ostéoporose et thyroïde", domaines: ["rhumato", "geriatrie"], niveau: 2, resume: "6 lignes, 2 prescripteurs, 4 problèmes, plan de prise à écrire",
  patient: { nom: "Mme L.", details: "74 ans, 58 kg, clairance 55 mL/min", chips: ["Fracture du poignet l'an dernier", "Hypothyroïdie", "Hypertension", "Oméprazole depuis 4 ans"], contexte: "Première ordonnance du rhumatologue, présentée avec le renouvellement habituel de son généraliste." },
  lignes: [
    L("l1", "Alendronate 70 mg", "1 comprimé une fois par semaine, le lundi", "3 mois", "Rhumatologue", "alendronate"),
    L("l2", "Carbonate de calcium 500 mg + cholécalciférol 400 UI", "1 comprimé matin et soir", "3 mois", "Rhumatologue"),
    L("l3", "Lévothyroxine 75 µg", "1 comprimé le matin", "3 mois", "Généraliste", "levothyroxine"),
    L("l4", "Hydrochlorothiazide 12,5 mg", "1 comprimé le matin", "3 mois", "Généraliste"),
    L("l5", "Oméprazole 20 mg", "1 gélule le soir", "3 mois", "Généraliste", "omeprazole"),
    L("l6", "Paracétamol 1 g", "1 comprimé jusqu'à 3 fois par jour si douleur", "3 mois", "Généraliste", "paracetamol")],
  problemes: [
    PB({ id: "p1", titre: "Calcium et alendronate", lignes: ["l2", "l1"], cle: ["l2", "l1"], niveau: "pe", priorite: 1, notion: "prises-distance", sfpc: ["3.2"], interv: ["3"],
      mecanisme: ["Le calcium forme un **complexe** avec l'alendronate dans l'intestin", "L'alendronate, **déjà très peu absorbé**, l'est encore moins", "**Traitement de l'ostéoporose inefficace**", "Risque de nouvelle fracture"],
      conduite: "Délivrer avec un plan de prise écrit : alendronate le lundi au réveil, à jeun, debout ; calcium à un autre moment, au moins 2 heures après (midi et soir).",
      statut: "verifie", note: "Précaution d'emploi et délai (30 minutes au minimum, plus de 2 heures si possible) : vérifiés sur les RCP du calcium.", sources: ["calciumRcp", "calciumRcp2"] }),
    PB({ id: "p2", titre: "Calcium et lévothyroxine", lignes: ["l2", "l3"], cle: ["l2", "l3"], niveau: "pe", notion: "prises-distance", sfpc: ["3.2"], interv: ["3"],
      mecanisme: ["Le calcium **diminue l'absorption** de la lévothyroxine", "Moins d'hormone absorbée", "**TSH qui remonte** : hypothyroïdie mal équilibrée, fatigue"],
      conduite: "Délivrer. Lévothyroxine le matin à jeun, calcium à plus de 2 heures (midi et soir). Le lundi : alendronate au réveil, lévothyroxine 30 minutes après, petit-déjeuner ensuite.",
      statut: "partiel", note: "Interaction et délai de 2 heures vérifiés sur les RCP du calcium. L'ordre des prises du lundi est une proposition à valider sur son cours.", sources: ["calciumRcp", "calciumRcp2"] }),
    PB({ id: "p3", titre: "Hydrochlorothiazide et calcium", lignes: ["l4", "l2"], cle: ["l4", "l2"], niveau: "apec", notion: "prises-distance", sfpc: ["3.1", "10"], interv: ["4"],
      mecanisme: ["Le thiazidique **réduit l'élimination urinaire du calcium**", "Le calcium s'ajoute à un apport quotidien", "Risque d'**hypercalcémie** : soif, nausées, constipation, confusion"],
      conduite: "Délivrer. Suggérer un contrôle de la calcémie ; expliquer les signes d'hypercalcémie.",
      statut: "verifie", note: "Association à prendre en compte : lue dans les RCP du calcium.", sources: ["calciumRcp2"] }),
    PB({ id: "p4", titre: "Oméprazole depuis 4 ans chez une patiente fracturée", lignes: ["l5"], cle: ["l5"], niveau: "apec", notion: "ipp-long-cours", sfpc: ["7"], interv: ["4"],
      mecanisme: ["IPP au long cours, **indication non retrouvée**", "Risque **modérément augmenté de fracture** (hanche, poignet, vertèbres) chez le sujet âgé", "L'acidité gastrique aide aussi à absorber le carbonate de calcium"],
      conduite: "Délivrer. Proposer au généraliste de réévaluer l'indication (déprescription progressive si elle n'est plus justifiée).",
      note: "Risque de fracture des IPP au long cours : mentionné dans le RCP de l'oméprazole (à relire). Absorption du carbonate de calcium : écrit de mémoire.", sources: ["mopral"] })],
  sansProbleme: ["Alendronate à 55 mL/min de clairance : utilisable (non recommandé seulement en cas d'insuffisance rénale sévère).", "Faux piège : calcium 1 g et vitamine D 800 UI par jour, une dose classique chez la femme âgée.", "Paracétamol 3 g par jour au maximum : conforme chez le sujet âgé."],
  patientDire: "Le lundi : alendronate au réveil, avec un grand verre d'eau du robinet, puis rester assise ou debout. Lévothyroxine 30 minutes après, petit-déjeuner ensuite. Calcium le midi et le soir. Signaler une douleur en avalant. Voir le dentiste. Prévention des chutes à la maison.",
  retenir: "Trois médicaments veulent le matin à jeun ou se gênent entre eux : sur ce type d'ordonnance, l'intervention principale est le plan de prise.",
  rappels: ["prises-a-distance"] },

{ id: "o10", titre: "Sortie de neurologie après un AVC", domaines: ["neuro", "cardio"], niveau: 3, resume: "7 lignes, 2 prescripteurs, 2 problèmes, 2 faux pièges",
  patient: { nom: "M. B.", details: "66 ans, 82 kg, clairance 80 mL/min", chips: ["AVC ischémique mineur il y a 3 jours", "Reflux gastrique", "Arthrose du genou", "Fumeur, 20 cigarettes par jour"], contexte: "Il présente l'ordonnance de sortie de l'unité neurovasculaire, et celle de son généraliste de la semaine dernière qu'il n'avait pas encore utilisée." },
  lignes: [
    L("l1", "Acide acétylsalicylique 75 mg", "1 sachet par jour", "21 jours, puis arrêt", "Neurologue"),
    L("l2", "Clopidogrel 75 mg", "1 comprimé par jour", "3 mois", "Neurologue", "clopidogrel"),
    L("l3", "Atorvastatine 80 mg", "1 comprimé le soir", "3 mois", "Neurologue"),
    L("l4", "Ramipril 5 mg", "1 comprimé le matin", "3 mois", "Neurologue", "ramipril"),
    L("l5", "Nicotine, patch 21 mg/24 h", "1 patch par jour", "1 mois", "Neurologue"),
    L("l6", "Oméprazole 20 mg", "1 gélule le matin", "1 mois", "Généraliste", "omeprazole"),
    L("l7", "Ibuprofène 400 mg", "1 comprimé 3 fois par jour si douleur du genou", "1 mois", "Généraliste", "ibuprofene")],
  problemes: [
    PB({ id: "p1", titre: "Clopidogrel et oméprazole", lignes: ["l2", "l6"], cle: ["l2", "l6"], niveau: "asdec", priorite: 1, notion: "clopidogrel-ipp", sfpc: ["3.3"], interv: ["6"],
      mecanisme: ["Le clopidogrel est une **prodrogue** activée par le **CYP2C19**", "L'**oméprazole inhibe le CYP2C19**", "Moins de métabolite actif : **antiagrégation insuffisante**", "**Risque de récidive** d'AVC"],
      conduite: "Contacter le généraliste : réévaluer le besoin d'un IPP et, s'il est nécessaire, proposer un IPP moins concerné par l'interaction.",
      note: "Association déconseillée et « éviter les IPP sauf nécessité absolue » : vérifiés sur deux RCP du clopidogrel. Choix de l'IPP de remplacement (pantoprazole ?) : à vérifier sur son cours.", sources: ["clopiRcp", "clopiRcp2"],
      devenir: { scenario: "Le généraliste maintient un IPP pour le reflux et remplace l'oméprazole par du pantoprazole.", code: "1" } }),
    PB({ id: "p2", titre: "Ibuprofène sous double antiagrégation", lignes: ["l7", "l1", "l2"], cle: ["l7"], niveau: "apec", priorite: 1, notion: "ains-antiagregant", sfpc: ["3.1"], interv: ["6", "7"],
      mecanisme: ["AINS + aspirine + clopidogrel : **trois atteintes de l'hémostase** et de la muqueuse gastrique", "**Risque hémorragique digestif** fortement augmenté", "Juste après un AVC, un saignement est grave", "Avec le ramipril : risque rénal en plus"],
      conduite: "Ne pas délivrer l'ibuprofène. Proposer au généraliste le paracétamol pour le genou, et des mesures locales.",
      note: "Majoration du risque hémorragique avec les AINS : RCP du clopidogrel. Niveau exact du Thésaurus pour AINS + antiagrégants : à vérifier.", sources: ["clopiRcp", "ibu"],
      devenir: { scenario: "Le généraliste accepte : paracétamol à la place de l'ibuprofène.", code: "1" } })],
  sansProbleme: ["Faux piège : aspirine et clopidogrel ensemble. Double antiagrégation voulue après un AVC mineur, pour une durée courte : vérifier seulement que l'arrêt de l'aspirine est écrit (21 jours).", "Faux piège : le patch de nicotine. Les substituts sont utilisables chez le patient cardiovasculaire ; l'arrêt du tabac est une priorité après un AVC.", "Atorvastatine 80 mg : statine de forte intensité, attendue après un AVC ischémique.", "Ramipril 5 mg : surveiller créatinine et kaliémie."],
  patientDire: "Ne jamais arrêter les antiagrégants sans avis. Aspirine pendant 21 jours seulement, clopidogrel ensuite. Aucun AINS ni aspirine en automédication. Saignement anormal, selles noires : consulter. Patch de nicotine : un nouveau chaque matin, à un autre endroit.",
  retenir: "Deux prescripteurs, deux ordonnances qui ne se connaissent pas : c'est au pharmacien de croiser l'ordonnance de sortie avec celle du généraliste.",
  rappels: ["statines-metabolisme"] },

{ id: "o11", titre: "Enceinte de 27 semaines, chez le dentiste", domaines: ["grossesse", "infectio"], niveau: 1, resume: "5 lignes, 1 problème majeur, 2 faux pièges",
  patient: { nom: "Mme S.", details: "31 ans, enceinte de 27 semaines d'aménorrhée", chips: ["Grossesse 27 SA", "Pas d'allergie connue", "Abcès dentaire"], contexte: "Ordonnance du dentiste, présentée avec le renouvellement de sa sage-femme." },
  lignes: [
    L("l1", "Amoxicilline 1 g", "1 comprimé matin et soir", "7 jours", "Dentiste", "amoxicilline"),
    L("l2", "Ibuprofène 400 mg", "1 comprimé 3 fois par jour", "5 jours", "Dentiste", "ibuprofene"),
    L("l3", "Paracétamol 1 g", "1 comprimé jusqu'à 3 fois par jour si douleur", "5 jours", "Dentiste", "paracetamol"),
    L("l4", "Chlorhexidine, bain de bouche", "3 fois par jour après le brossage", "5 jours", "Dentiste"),
    L("l5", "Acide folique 0,4 mg", "1 comprimé par jour", "1 mois", "Sage-femme")],
  problemes: [
    PB({ id: "p1", titre: "Ibuprofène à 27 semaines de grossesse", lignes: ["l2"], cle: ["l2"], niveau: "ci", priorite: 1, notion: "grossesse-ains", sfpc: ["1"], interv: ["7", "6"],
      mecanisme: ["Les AINS **inhibent les prostaglandines** du fœtus", "**Fermeture prématurée du canal artériel** : défaillance cardiaque fœtale", "**Atteinte rénale fœtale**, moins de liquide amniotique", "**Contre-indiqués à partir de 24 SA** (début du 6e mois), même en prise courte"],
      conduite: "Ne pas délivrer l'ibuprofène. Appeler le dentiste : le paracétamol déjà prescrit suffit. Expliquer à la patiente qu'aucun AINS n'est permis jusqu'à l'accouchement, y compris en automédication.",
      note: "Contre-indication à partir du 6e mois : à relire dans le RCP de l'ibuprofène et sur le CRAT.", sources: ["ibu", "crat"],
      devenir: { scenario: "Le dentiste confirme : paracétamol seul, l'ibuprofène est supprimé.", code: "1" } })],
  sansProbleme: ["Faux piège : l'amoxicilline. C'est l'antibiotique de référence pendant la grossesse ; 1 g matin et soir est une dose adulte habituelle.", "Faux piège : la chlorhexidine en bain de bouche, utilisable pendant la grossesse (à vérifier sur le CRAT).", "Acide folique : surtout utile avant la conception et au premier trimestre ; à 27 SA, il est sans danger mais d'intérêt discutable. Pas de quoi bloquer la délivrance.", "Paracétamol 3 g par jour : antalgique de choix pendant la grossesse."],
  patientDire: "Aucun anti-inflammatoire (ibuprofène, kétoprofène, aspirine à dose antalgique), même en gel ou en automédication, jusqu'à l'accouchement. Paracétamol à la dose la plus faible et le moins longtemps possible. Aller au bout de l'antibiotique.",
  retenir: "Grossesse sur l'ordonnance : chercher d'abord les AINS. Contre-indiqués à partir de 24 SA, quel que soit le prescripteur et la durée." },

{ id: "o12", titre: "Infection de prothèse de hanche, 74 ans", domaines: ["infectio", "geriatrie"], niveau: 3, resume: "5 lignes, 3 interactions, traitement de 12 semaines",
  patient: { nom: "M. G.", details: "74 ans, 78 kg, clairance 65 mL/min", chips: ["Fibrillation atriale sous apixaban", "Pseudo-polyarthrite rhizomélique sous corticoïde", "Prothèse de hanche infectée, opérée"], contexte: "Sortie d'orthopédie après le lavage de sa prothèse. Antibiothérapie prévue pour 12 semaines. Son traitement habituel est repris sur l'ordonnance." },
  lignes: [
    L("l1", "Rifampicine 300 mg", "2 gélules matin et soir", "12 semaines", "Chirurgien orthopédiste", "rifampicine"),
    L("l2", "Lévofloxacine 500 mg", "1 comprimé matin et soir", "12 semaines", "Chirurgien orthopédiste", "levofloxacine"),
    L("l3", "Apixaban 5 mg", "1 comprimé matin et soir", "3 mois", "Traitement habituel", "apixaban"),
    L("l4", "Prednisolone 5 mg", "1 comprimé le matin", "3 mois", "Traitement habituel"),
    L("l5", "Paracétamol 1 g", "1 comprimé 3 fois par jour si douleur", "1 mois", "Chirurgien orthopédiste", "paracetamol")],
  problemes: [
    PB({ id: "p1", titre: "Rifampicine et apixaban", lignes: ["l1", "l3"], cle: ["l1", "l3"], niveau: "pe", priorite: 1, notion: "inducteurs", sfpc: ["3.2"], interv: ["6", "4"],
      mecanisme: ["La rifampicine **induit le CYP3A4 et la glycoprotéine P**", "L'apixaban est éliminé plus vite : **exposition diminuée d'environ 50 %**", "Fibrillation atriale **moins bien protégée**", "**Risque d'AVC** pendant 12 semaines, et encore après l'arrêt de l'inducteur"],
      conduite: "Appeler le prescripteur : faire discuter l'anticoagulation pendant la rifampicine (autre anticoagulant, avis du cardiologue). Ne pas modifier seul.",
      note: "RCP Eliquis : diminution d'environ 50 % de l'exposition, association « avec précaution » dans la fibrillation atriale. Niveau retenu par son cours ou le Thésaurus : à vérifier (l'association peut être classée plus sévèrement).", sources: ["eliquis2011", "eliquis"],
      devenir: { scenario: "Le chirurgien demande l'avis du cardiologue, qui remplace l'apixaban pendant le traitement antibiotique.", code: "1" } }),
    PB({ id: "p2", titre: "Rifampicine et prednisolone", lignes: ["l1", "l4"], cle: ["l1", "l4"], niveau: "pe", notion: "inducteurs", sfpc: ["3.2"], interv: ["4", "1"],
      mecanisme: ["Induction du métabolisme hépatique du corticoïde", "**Prednisolone moins efficace**", "Risque de **poussée** de pseudo-polyarthrite (douleurs, raideur des épaules)", "À l'arrêt de la rifampicine : effet du corticoïde qui remonte"],
      conduite: "Délivrer. Signaler au prescripteur ; surveiller la réapparition des douleurs ; dose de corticoïde à adapter pendant et après la rifampicine.",
      statut: "a_verifier", note: "Interaction classique écrite de mémoire : niveau à vérifier dans le Thésaurus ou les RCP.", sources: ["thesaurus"] }),
    PB({ id: "p3", titre: "Lévofloxacine, corticoïde et 74 ans", lignes: ["l2", "l4"], cle: ["l2", "l4"], niveau: "apec", notion: "fq-tendon", sfpc: ["3.1"], interv: ["4"],
      mecanisme: ["Fluoroquinolone : toxicité sur les **tendons**", "**Plus de 60 ans** et **corticoïde** : risque majoré", "**Tendinopathie, rupture du tendon d'Achille**, parfois des deux côtés", "Traitement long : 12 semaines d'exposition"],
      conduite: "Délivrer. Expliquer d'arrêter et de consulter à la moindre douleur d'un tendon ; prévenir le prescripteur du terrain à risque.",
      statut: "a_verifier", note: "Facteurs de risque (âge, corticoïdes) : classiques. Niveau exact du Thésaurus : à vérifier.", sources: ["thesaurus"] })],
  sansProbleme: ["Rifampicine 1 200 mg par jour pour 78 kg et lévofloxacine 1 g par jour : doses des infections ostéoarticulaires à vérifier sur son cours ; la clairance de 65 mL/min ne demande pas d'adaptation de la lévofloxacine.", "Paracétamol 3 g par jour : conforme chez le sujet âgé."],
  patientDire: "Rifampicine à jeun. Urines, larmes et sueur orange : c'est normal, retirer les lentilles souples. Lévofloxacine : pas de soleil, et arrêter à la moindre douleur d'un tendon. Calcium, fer, pansements gastriques à 2 heures de la lévofloxacine. Ne jamais arrêter seul les antibiotiques avant 12 semaines.",
  retenir: "Rifampicine sur une ordonnance = relire chaque ligne en se demandant : ce médicament va-t-il perdre son effet ?",
  rappels: ["inducteurs-enzymatiques"] }
);

/* Cartes de révision liées aux lots 6 et 7. */
CARDS.push(
  { id: "k21", notion: "peau-orientation", drug: "aciclovir", recto: "Aciclovir crème pour un bouton de fièvre : nombre d'applications, quand commencer, durée maximale ?", cle: "**5 fois par jour** · dès les **picotements** · **10 jours** au maximum",
    points: [["Âge", "Adulte et enfant de plus de **6 ans**"], ["Orienter", "Près de l'œil, étendu, fièvre, immunodépression"], ["Conseil clé", "**Pas de bisou au nouveau-né**"]] },
  { id: "k22", notion: "peau-orientation", drug: "amoxicilline", recto: "Plaque rouge qui s'étend autour d'une ancienne piqûre de tique, sans démangeaison. Diagnostic, faut-il une sérologie ?", cle: "**Érythème migrant** · antibiotique **sans sérologie**",
    points: [["Délai", "Dans les **30 jours** après la piqûre"], ["Conduite", "**Médecin traitant** rapidement"], ["Prévention", "Tire-tique, désinfecter, **surveiller un mois**"]] },
  { id: "k23", notion: "entorse", drug: null, recto: "Entorse de cheville : quels critères d'Ottawa imposent une radiographie ?", cle: "**Appui impossible (4 pas)** · **douleur osseuse** malléolaire · âge",
    points: [["Douleur osseuse", "Bord postérieur ou **pointe** d'une malléole"], ["Âge", "Moins de 18 ans ou plus de 55 ans (sources françaises)"], ["Règle", "**Un seul critère suffit**"]] },
  { id: "k24", notion: "inducteurs", drug: "millepertuis", recto: "Une patiente sous pilule demande du millepertuis. Niveau de l'interaction, mécanisme, conséquence ?", cle: "**Contre-indication** · **inducteur** enzymatique · **échec de la contraception**",
    points: [["Mécanisme", "Induction du **CYP3A4** : la pilule est éliminée plus vite"], ["Durée", "L'induction persiste environ **1 semaine** après l'arrêt"], ["Autres CI", "AVK, digoxine, immunosuppresseurs, antirétroviraux"]] },
  { id: "k25", notion: "atropiniques-age", drug: "doxylamine", recto: "Doxylamine (Donormyl) : 2 contre-indications à rechercher, durée de traitement ?", cle: "**Glaucome par fermeture de l'angle** · **troubles urétroprostatiques** · **2 à 5 jours**",
    points: [["Pourquoi", "Effet **atropinique**"], ["Sujet âgé", "Chutes, confusion : prudence, dose réduite"], ["Prise", "15 à 30 minutes avant le coucher"]] },
  { id: "k26", notion: "urgence-vitale", drug: "adrenaline", recto: "Stylo d'adrénaline : dose selon le poids, site d'injection, et dans quel ordre avec le 15 ?", cle: "**0,30 mg** au-dessus de 30 kg · **0,15 mg** de 15 à 30 kg · **cuisse**, puis **15**",
    points: [["Site", "**Face antérolatérale de la cuisse**, à travers les vêtements, jamais la fesse"], ["Deuxième dose", "Après **5 à 15 minutes** si pas d'amélioration"], ["Ordre", "**Injecter d'abord, appeler ensuite**"]] },
  { id: "k27", notion: "brulure", drug: null, recto: "Brûlure : quelle est la « règle des 15 », et 3 critères qui imposent un avis urgent ?", cle: "**15 minutes**, eau à **15 °C**, à **15 cm**",
    points: [["Gravité", "**Enfant de moins de 5 ans**, visage, mains, plis, périnée ; cloques étendues ; chimique ou électrique"], ["À ne pas faire", "Glace, corps gras, percer les cloques"]] },
  { id: "k28", notion: "prises-distance", drug: "alendronate", recto: "Alendronate 70 mg : comment le prendre, et à quelle distance du calcium ?", cle: "**À jeun**, grand verre d'eau du robinet, **debout 30 min** · calcium **2 h** après",
    points: [["Pourquoi", "Absorption **très faible**, réduite encore par le calcium"], ["Risque", "**Œsophagite** si on se recouche"], ["Conseil", "Bilan dentaire : ostéonécrose de la mâchoire"]] },
  { id: "k29", notion: "clopidogrel-ipp", drug: "clopidogrel", recto: "Clopidogrel et oméprazole : niveau, mécanisme, conséquence ?", cle: "**Association déconseillée** · **CYP2C19** · antiagrégation insuffisante",
    points: [["Mécanisme", "Le clopidogrel est une **prodrogue** activée par le CYP2C19, que l'oméprazole inhibe"], ["Conduite", "Réévaluer l'IPP ; s'il est nécessaire, en choisir un moins concerné"]] },
  { id: "k30", notion: "grossesse-ains", drug: "ibuprofene", recto: "À partir de quand les AINS sont-ils contre-indiqués pendant la grossesse, et pourquoi ?", cle: "**À partir de 24 SA** (6e mois) · **canal artériel**, reins du fœtus",
    points: [["Même si", "Prise courte, gel, automédication"], ["Alternative", "**Paracétamol**, dose minimale, durée minimale"], ["Source pratique", "Le **CRAT**"]] },
  { id: "k31", notion: "inducteurs", drug: "rifampicine", recto: "Rifampicine chez un patient sous apixaban : que se passe-t-il, et que faire ?", cle: "Exposition à l'apixaban **divisée par 2** · **appeler le prescripteur**",
    points: [["Mécanisme", "Induction du **CYP3A4** et de la **P-gp**"], ["Risque", "**AVC** dans la fibrillation atriale"], ["Piège", "L'effet persiste **après l'arrêt** de la rifampicine"]] }
);
