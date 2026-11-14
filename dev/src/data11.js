/* Lot 11 : l'onglet Médicaments est organisé par classe.
   Chaque classe = une fiche détaillée de référence (modèle ramipril) + la liste de ses molécules,
   avec DCI, noms commerciaux français et particularités propres à chaque molécule.
   Les listes de molécules sont écrites de mémoire : statut "a_verifier" tant qu'elles n'ont pas été relues
   sur la base publique des médicaments (noms commerciaux, commercialisation actuelle, posologies). */

Object.assign(SRC, {
  bdpm: { label: "Base de données publique des médicaments (pour vérifier noms et RCP)", url: "https://base-donnees-publique.medicaments.gouv.fr/" }
});

const NOTE_CLASSE = "Liste des molécules écrite de mémoire : noms commerciaux, commercialisation actuelle et chiffres à confirmer sur la base publique des médicaments. ";

/* Familles affichées dans l'onglet, dans cet ordre. */
const FAMILLES = [
  ["cardio", "Cœur et vaisseaux"],
  ["douleur", "Douleur et inflammation"],
  ["infectio", "Anti-infectieux"],
  ["neuro", "Neurologie"],
  ["psy", "Psychiatrie, anxiété, sommeil"],
  ["endocrino", "Endocrinologie, diabète"],
  ["os", "Os et métabolisme phosphocalcique"],
  ["gastro", "Digestif"],
  ["allergie", "Allergie et urgences"],
  ["femme", "Contraception"],
  ["uro", "Urologie"],
  ["onco", "Cancérologie"],
  ["phyto", "Phytothérapie"]
];

/* m(DCI, noms commerciaux, particularités, id de la fiche détaillée si elle existe) */
const molc = (dci, noms, pts, drug) => ({ dci, noms, pts, drug: drug || null });

const CLASSES = [
  /* ---------------- Cœur et vaisseaux ---------------- */
  { id: "bb", nom: "Bêtabloquants", famille: "cardio", ref: "bisoprolol", fiches: ["bisoprolol", "propranolol"],
    principe: ["Blocage des récepteurs **β1** cardiaques → **fréquence et contractilité ↓** → besoins en oxygène ↓", "Blocage β1 rénal → **rénine ↓** → pression artérielle ↓", "Blocage **β2** (non cardiosélectifs) → **bronchospasme**, vasoconstriction périphérique, signes d'hypoglycémie masqués"],
    classe: ["Ne **jamais arrêter brutalement** : effet rebond (angor, tachycardie)", "La cardiosélectivité **diminue quand la dose augmente** : prudence chez l'asthmatique même avec un β1-sélectif", "**Masquent** tachycardie et tremblements de l'hypoglycémie (la sueur persiste)", "Vérapamil, diltiazem : bradycardie, bloc auriculo-ventriculaire", "Trois critères à connaître : **cardiosélectivité**, **ASI** (activité sympathomimétique intrinsèque), **lipophilie** (passage cérébral : cauchemars, fatigue)"],
    groupes: [
      { titre: "Cardiosélectifs (β1)", note: "Préférés chez le BPCO, le diabétique, l'artéritique.", mols: [
        molc("Aténolol", "Ténormine", ["**Hydrophile**, élimination **rénale** : adapter à la clairance", "Peu de passage cérébral"]),
        molc("Bisoprolol", "Cardensiel, Détensiel, Bisoce", ["Insuffisance cardiaque : titration depuis **1,25 mg**, palier toutes les 1 à 2 semaines", "Une prise par jour"], "bisoprolol"),
        molc("Métoprolol", "Selozok LP, Lopressor, Seloken", ["**Lipophile**, métabolisé par le **CYP2D6** (paroxétine, fluoxétine : bradycardie)", "Forme LP (succinate) dans l'insuffisance cardiaque"]),
        molc("Nébivolol", "Nébilox, Témérit", ["Très β1-sélectif + **vasodilatateur** (libération de NO)", "Insuffisance cardiaque du sujet de 70 ans ou plus"]),
        molc("Acébutolol", "Sectral", ["Avec **ASI** : moins de bradycardie au repos"]),
        molc("Bétaxolol", "Kerlone ; collyre Bétoptic", ["Demi-vie longue, une prise par jour", "Collyre dans le glaucome"]),
        molc("Céliprolol", "Célectol", ["β1-sélectif avec **effet agoniste β2 partiel** (vasodilatateur)"])
      ] },
      { titre: "Non cardiosélectifs (β1 + β2)", note: "**Contre-indiqués dans l'asthme.** Indications hors cardiologie fréquentes.", mols: [
        molc("Propranolol", "Avlocardyl, Avlocardyl LP ; Hémangiol (solution buvable)", ["**Lipophile** : cauchemars, fatigue, dépression", "Prophylaxie de la **migraine**, tremblement essentiel, hypertension portale, trac", "Hémangiol : **hémangiome infantile**, à donner pendant ou juste après un repas (risque d'hypoglycémie)", "Avec le rizatriptan : rizatriptan **5 mg** maximum"], "propranolol"),
        molc("Sotalol", "Sotalex", ["Aussi antiarythmique de **classe III** : **allongement du QT**, torsades de pointes", "**Hypokaliémie** dangereuse (diurétiques hypokaliémiants) ; élimination rénale"]),
        molc("Nadolol", "Corgard", ["Hydrophile, demi-vie longue, élimination rénale"]),
        molc("Pindolol", "Visken", ["Avec **ASI**"]),
        molc("Timolol", "Timoptol, Géltim (collyres)", ["Glaucome : **passage systémique** possible (bradycardie, bronchospasme) ; occlusion du point lacrymal 1 à 2 min"]),
        molc("Carvédilol", "Kredex", ["Bloque aussi les récepteurs **α1** : hypotension orthostatique", "Insuffisance cardiaque ; à prendre **pendant le repas**"]),
        molc("Labétalol", "Trandate", ["Bloque aussi **α1**", "Référence de l'**HTA de la grossesse** (surveiller le nouveau-né : bradycardie, hypoglycémie)"])
      ] }
    ] },

  { id: "iec", nom: "Inhibiteurs de l'enzyme de conversion (IEC)", famille: "cardio", ref: "ramipril", fiches: ["ramipril"],
    principe: ["Enzyme de conversion bloquée → **angiotensine II ↓** → vasodilatation, **aldostérone ↓** → **kaliémie ↑**", "La même enzyme dégrade la bradykinine → **bradykinine ↑** → **toux sèche**, **angio-œdème**", "Débit de filtration glomérulaire dépendant de l'angiotensine II → **insuffisance rénale fonctionnelle** si déshydratation, AINS, diurétiques"],
    classe: ["**Grossesse : contre-indiqués** aux 2e et 3e trimestres, déconseillés au 1er", "Créatinine et kaliémie avant, 1 à 2 semaines après le début ou une hausse de dose", "Toux : effet de classe, **pas de changement d'IEC** ; passer à un sartan", "Angio-œdème : arrêt définitif ; sacubitril/valsartan contre-indiqué moins de **36 heures** après le dernier IEC", "Presque toutes les molécules sont des **prodrogues** (sauf captopril et lisinopril)"],
    groupes: [
      { titre: "Molécules", note: "Elles se distinguent surtout par la demi-vie (nombre de prises) et la voie d'élimination.", mols: [
        molc("Captopril", "Lopril", ["Demi-vie courte : **2 à 3 prises** par jour", "Groupement **thiol** : troubles du goût, éruptions", "À prendre 1 heure avant le repas (à vérifier)"]),
        molc("Énalapril", "Renitec ; Co-Renitec (+ hydrochlorothiazide)", ["Prodrogue ; 1 à 2 prises par jour"]),
        molc("Lisinopril", "Zestril, Prinivil", ["**Non prodrogue**, hydrophile, élimination rénale inchangée"]),
        molc("Périndopril", "Coversyl ; Bipreterax (+ indapamide), Coveram (+ amlodipine)", ["Une prise **le matin, avant le repas**", "Nombreuses associations fixes"]),
        molc("Ramipril", "Triatec", ["Une prise par jour ; titration en insuffisance cardiaque"], "ramipril"),
        molc("Trandolapril", "Odrik", ["Demi-vie longue"]),
        molc("Bénazépril", "Briem, Cibacène", []),
        molc("Fosinopril", "Fozitec", ["Élimination **mixte hépatique et rénale** : peu d'accumulation en insuffisance rénale"]),
        molc("Quinapril", "Korec, Acuitel", []),
        molc("Zofénopril", "Zofenil", ["Post-infarctus"])
      ] }
    ] },

  { id: "statines", nom: "Statines", famille: "cardio", ref: "simvastatine", fiches: ["simvastatine"],
    principe: ["**HMG-CoA réductase** bloquée → synthèse hépatique du cholestérol ↓", "→ récepteurs au LDL ↑ à la surface du foie → **LDL-cholestérol sanguin ↓**", "Effets pléiotropes (stabilisation de la plaque) → événements cardiovasculaires ↓"],
    classe: ["Risque **musculaire** (myalgies → rhabdomyolyse) : majoré par les **inhibiteurs du métabolisme** et les fortes doses", "Le **métabolisme** fait toute la différence : CYP3A4 (simva, atorva), CYP2C9 (fluva), peu ou pas (rosuva, prava)", "Contre-indiquées pendant la **grossesse** et l'allaitement", "Transaminases avant le traitement ; CPK si symptômes ou facteurs de risque"],
    groupes: [
      { titre: "Métabolisées par le CYP3A4", note: "Attention aux macrolides, azolés, inhibiteurs de protéase, pamplemousse.", mols: [
        molc("Simvastatine", "Zocor, Lodalès ; Inegy (+ ézétimibe)", ["Inhibiteurs puissants du CYP3A4 : **contre-indiqués**", "Prise **le soir**", "**80 mg** : non recommandé (risque musculaire)"], "simvastatine"),
        molc("Atorvastatine", "Tahor ; Caduet (+ amlodipine)", ["CYP3A4, sensibilité moindre que la simvastatine", "Prise à tout moment de la journée (demi-vie longue)"])
      ] },
      { titre: "Peu ou pas métabolisées par le CYP3A4", note: "À préférer quand le patient a des interactions.", mols: [
        molc("Rosuvastatine", "Crestor", ["La plus **puissante** ; peu métabolisée", "Dose initiale **5 mg** chez les patients d'origine asiatique", "Contre-indiquée avec la **ciclosporine** ; insuffisance rénale sévère contre-indiquée"]),
        molc("Pravastatine", "Elisor, Vasten", ["**Hydrophile**, non métabolisée par les CYP", "Choix logique en cas de polymédication"]),
        molc("Fluvastatine", "Lescol, Fractal", ["Métabolisée par le **CYP2C9**"])
      ] }
    ] },

  { id: "aod", nom: "Anticoagulants oraux directs (AOD)", famille: "cardio", ref: "apixaban", fiches: ["apixaban"],
    principe: ["Inhibition **directe** d'un facteur de la coagulation, sans antithrombine", "Anti-**Xa** (« xabans ») → génération de thrombine ↓", "Anti-**IIa** (dabigatran) → thrombine bloquée → fibrine ↓"],
    classe: ["Pas de surveillance de l'INR ; **clairance de la créatinine** (Cockcroft) au moins une fois par an", "**AINS, aspirine** en automédication : risque hémorragique", "Inducteurs puissants (rifampicine, millepertuis, carbamazépine) : efficacité ↓", "Oubli : règle propre à chaque molécule (moitié de l'intervalle entre deux prises)", "Carte de porteur d'anticoagulant"],
    groupes: [
      { titre: "Anti-Xa", mols: [
        molc("Apixaban", "Eliquis", ["**Deux prises** par jour", "2,5 mg × 2 si 2 critères sur 3 : 80 ans, 60 kg, créatinine 133 µmol/L"], "apixaban"),
        molc("Rivaroxaban", "Xarelto", ["15 et 20 mg : **à prendre au cours d'un repas** (absorption)", "Une prise par jour en fibrillation atriale"]),
        molc("Édoxaban", "Lixiana", ["Une prise par jour ; **30 mg** si clairance 15 à 50 mL/min, poids de 60 kg ou moins, ou certains inhibiteurs de la P-gp"])
      ] },
      { titre: "Anti-IIa (antithrombine directe)", mols: [
        molc("Dabigatran", "Pradaxa", ["Élimination **rénale** majoritaire (environ 80 %) : la plus sensible à l'insuffisance rénale", "Gélule à **avaler entière**, ne pas ouvrir (absorption ↑) ; garder dans l'emballage d'origine", "Dyspepsie fréquente", "Antidote : **idarucizumab** (Praxbind)"])
      ] }
    ] },

  { id: "aap", nom: "Antiagrégants plaquettaires", famille: "cardio", ref: "clopidogrel", fiches: ["clopidogrel"],
    principe: ["Aspirine : **COX-1** plaquettaire bloquée de façon irréversible → thromboxane A2 ↓", "Anti-**P2Y12** : récepteur à l'ADP bloqué → activation plaquettaire ↓", "Effet irréversible (aspirine, thiénopyridines) → dure la vie de la plaquette, **7 à 10 jours**"],
    classe: ["Double antiagrégation après syndrome coronarien ou stent : **ne jamais arrêter sans avis du cardiologue**", "Saignements : AINS, anticoagulants, ISRS majorent le risque", "Arrêt avant chirurgie : délai propre à chaque molécule"],
    groupes: [
      { titre: "Aspirine à dose antiagrégante", mols: [
        molc("Acide acétylsalicylique", "Kardégic, Resitune", ["**75 à 160 mg** par jour", "Ibuprofène pris avant l'aspirine : peut gêner son effet antiagrégant"])
      ] },
      { titre: "Anti-P2Y12", mols: [
        molc("Clopidogrel", "Plavix ; DuoPlavin (+ aspirine)", ["**Prodrogue** activée par le **CYP2C19**", "Oméprazole et ésoméprazole : association **déconseillée** ; préférer le pantoprazole"], "clopidogrel"),
        molc("Prasugrel", "Efient", ["Prodrogue, activation **peu dépendante du CYP2C19**", "**Contre-indiqué** après un AVC ou un AIT", "Non recommandé à 75 ans ou plus ; **5 mg** si moins de 60 kg"]),
        molc("Ticagrélor", "Brilique", ["**Non prodrogue**, liaison **réversible** : deux prises par jour", "**Dyspnée** fréquente, bradycardie", "Substrat du **CYP3A4** : inhibiteurs puissants contre-indiqués ; aspirine associée limitée à 100 mg ou moins"])
      ] }
    ] },

  { id: "diuretiques", nom: "Diurétiques", famille: "cardio", ref: "furosemide", fiches: ["furosemide", "spironolactone"],
    principe: ["De l'anse : cotransporteur **Na-K-2Cl** de l'anse de Henle bloqué → diurèse **puissante et rapide**", "Thiazidiques : cotransporteur **Na-Cl** du tube distal → diurèse modérée, effet antihypertenseur", "Épargneurs : **aldostérone** bloquée (ou canal ENaC) → Na éliminé, **K retenu**"],
    classe: ["Anse et thiazidiques → **hypokaliémie** (torsades avec les médicaments qui allongent le QT, toxicité de la digoxine)", "Épargneurs → **hyperkaliémie** (IEC, sartans, suppléments potassiques, sujet âgé, insuffisance rénale)", "**Déshydratation** et insuffisance rénale fonctionnelle : surveiller lors des fortes chaleurs, diarrhées", "Prise **le matin** (diurèse nocturne)", "Lithium : lithémie ↑"],
    groupes: [
      { titre: "Diurétiques de l'anse", mols: [
        molc("Furosémide", "Lasilix, Lasilix Spécial 500 mg", ["Action rapide, reste efficace en insuffisance rénale", "**Ototoxicité** à forte dose (aminosides)"], "furosemide"),
        molc("Bumétanide", "Burinex", ["Environ 40 fois plus puissant par milligramme que le furosémide"])
      ] },
      { titre: "Thiazidiques et apparentés", mols: [
        molc("Hydrochlorothiazide", "Esidrex ; nombreuses associations fixes (Co-Renitec, Hyzaar, Fortzaar…)", ["Hyponatrémie (sujet âgé), **hyperuricémie** (goutte), hyperglycémie", "**Photosensibilisation** ; risque de cancer cutané non mélanome à long terme", "Peu efficace si clairance inférieure à 30 mL/min"]),
        molc("Indapamide", "Fludex, Fludex LP ; Bipreterax (+ périndopril)", ["Apparenté thiazidique, une prise par jour"]),
        molc("Chlortalidone", "Associations (Ténorétic, avec l'aténolol)", ["Demi-vie longue"])
      ] },
      { titre: "Épargneurs de potassium", mols: [
        molc("Spironolactone", "Aldactone ; Aldactazine (+ altizide)", ["Effets **antiandrogènes** : gynécomastie, troubles des règles", "Insuffisance cardiaque à petite dose (25 mg)"], "spironolactone"),
        molc("Éplérénone", "Inspra", ["Plus sélective : **moins de gynécomastie**", "Substrat du **CYP3A4** : inhibiteurs puissants contre-indiqués"]),
        molc("Amiloride", "Modamide ; Moduretic (+ hydrochlorothiazide)", ["Bloque le canal sodique ENaC, indépendamment de l'aldostérone"])
      ] }
    ] },

  { id: "potassium", nom: "Suppléments potassiques", famille: "cardio", ref: "potassium", fiches: ["potassium"],
    principe: ["Apport de K+ → corrige l'**hypokaliémie** (diurétiques, vomissements, diarrhées, corticoïdes)"],
    classe: ["Ne jamais associer sans contrôle aux **épargneurs de potassium**, IEC, sartans : hyperkaliémie", "Formes LP : **avaler sans croquer**, en position assise, avec un grand verre d'eau (lésions œsophagiennes, ulcères)", "Kaliémie de contrôle"],
    groupes: [
      { titre: "Formes orales", mols: [
        molc("Chlorure de potassium", "Diffu-K (gélules), Kaleorid LP", ["Gélules ou comprimés à libération prolongée", "Prise pendant ou après le repas"]),
        molc("Gluconate de potassium", "Sirop (nom de spécialité à vérifier)", ["Forme buvable pour l'enfant ou les troubles de la déglutition"]),
        molc("Bicarbonate de potassium", "Préparation hospitalière", ["Corrige aussi une **acidose** métabolique"])
      ] }
    ] },

  /* ---------------- Douleur et inflammation ---------------- */
  { id: "antalg1", nom: "Antalgiques non opioïdes (palier 1)", famille: "douleur", ref: "paracetamol", fiches: ["paracetamol"],
    principe: ["Paracétamol : mécanisme **central** (COX cérébrales, voie sérotoninergique) → antalgique et **antipyrétique**", "**Pas** d'effet anti-inflammatoire ni antiagrégant"],
    classe: ["Antalgique de **première intention**, y compris grossesse et allaitement", "**Hépatotoxicité** en surdosage : compter tous les médicaments qui en contiennent", "Formes **effervescentes** : riches en sodium (régime sans sel, HTA)"],
    groupes: [
      { titre: "Molécules", mols: [
        molc("Paracétamol", "Doliprane, Dafalgan, Efferalgan", ["1 g par prise au maximum, 4 heures entre deux prises", "Enfant : **15 mg/kg toutes les 6 heures** (60 mg/kg/j)"], "paracetamol"),
        molc("Néfopam", "Acupan", ["Antalgique central **non opioïde**, effets **atropiniques** (glaucome, rétention urinaire, tachycardie)", "Forme injectable ; la prise orale sur un sucre est **hors AMM**"])
      ] },
      { titre: "Associations", mols: [
        molc("Paracétamol + caféine", "Plusieurs spécialités (dont Actron, Céphyl : à vérifier)", ["Caféine : potentialise l'effet antalgique ; éviter le soir"])
      ] }
    ] },

  { id: "opio2", nom: "Opioïdes faibles (palier 2)", famille: "douleur", ref: "tramadol", fiches: ["tramadol"],
    principe: ["Agonistes des récepteurs **µ** → antalgie, mais aussi **dépression respiratoire**, constipation, nausées, somnolence", "Tramadol : en plus, **inhibe la recapture de la sérotonine et de la noradrénaline**", "Codéine et tramadol : activés en partie par le **CYP2D6** (métaboliseurs ultrarapides : surdosage)"],
    classe: ["Constipation : laxatif dès le début", "**Dépendance** et mésusage : durée courte, ordonnance pour la codéine et le tramadol", "Association aux **benzodiazépines** et autres dépresseurs : dépression respiratoire", "Sujet âgé : confusion, chutes"],
    groupes: [
      { titre: "Molécules", mols: [
        molc("Tramadol", "Topalgic, Contramal, Zamudol LP ; Ixprim, Zaldiar (+ paracétamol)", ["**Syndrome sérotoninergique** (ISRS, IRSNA, triptans)", "Abaisse le **seuil épileptogène** ; **hyponatrémie**, **hypoglycémie**", "Durée de prescription limitée et passage récent à l'**ordonnance sécurisée** (règles à vérifier)"], "tramadol"),
        molc("Codéine", "Dafalgan codéiné, Codoliprane, Klipal codéine ; Prontalgine", ["**Prodrogue** transformée en morphine par le **CYP2D6**", "**Contre-indiquée avant 12 ans**, pendant l'**allaitement**, après amygdalectomie avant 18 ans", "Sur ordonnance obligatoire depuis 2017 ; ordonnance sécurisée plus récemment (à vérifier)"]),
        molc("Poudre d'opium", "Lamaline, Izalgi (+ paracétamol, caféine pour Lamaline)", ["Alternative à la codéine"]),
        molc("Dihydrocodéine", "Dicodin LP", ["Forme LP, deux prises par jour"])
      ] }
    ] },

  { id: "ains", nom: "Anti-inflammatoires non stéroïdiens (AINS)", famille: "douleur", ref: "ibuprofene", fiches: ["ibuprofene"],
    principe: ["**COX-1** bloquée → prostaglandines protectrices ↓ → **ulcère**, saignement, **rein**", "**COX-2** bloquée → prostaglandines de l'inflammation ↓ → effet anti-inflammatoire, antalgique, antipyrétique", "Coxibs : sélectifs de la COX-2 → moins d'effets digestifs, **risque thrombotique** ↑"],
    classe: ["**Grossesse : contre-indiqués à partir de 24 SA** (6e mois) ; éviter avant", "« **Triple whammy** » : AINS + IEC ou sartan + diurétique → insuffisance rénale aiguë", "Anticoagulants, antiagrégants, ISRS, corticoïdes : **saignements**", "Varicelle : contre-indiqués (infections cutanées graves)", "Durée la plus **courte** possible, dose minimale efficace"],
    groupes: [
      { titre: "Arylpropioniques (profènes)", mols: [
        molc("Ibuprofène", "Advil, Nurofen, Spifen, Antarène", ["**400 mg par prise**, 1 200 mg par jour en automédication", "Enfant dès 3 mois : 20 à 30 mg/kg/j"], "ibuprofene"),
        molc("Kétoprofène", "Profénid, Bi-Profénid ; gel Kétum", ["Gel : **photosensibilisation** grave ; pas de soleil ni d'UV pendant le traitement et **2 semaines** après", "Liste I"]),
        molc("Naproxène", "Apranax, Naprosyne", ["Demi-vie longue : **2 prises** par jour", "Dysménorrhée, crises de migraine"]),
        molc("Flurbiprofène", "Strefen (pastilles)", ["Maux de gorge, à partir de 12 ans (à vérifier)"])
      ] },
      { titre: "Arylacétiques", mols: [
        molc("Diclofénac", "Voltarène ; gels Voltarènactigo, Flector (emplâtre)", ["Risque **cardiovasculaire** proche des coxibs : contre-indiqué en cas de cardiopathie ischémique"]),
        molc("Acéclofénac", "Cartrex", [])
      ] },
      { titre: "Oxicams", mols: [
        molc("Piroxicam", "Feldène, Brexin", ["Risque **cutané grave** et digestif plus élevé : **2e intention**, prescription initiale restreinte"]),
        molc("Méloxicam", "Mobic", ["Une prise par jour"])
      ] },
      { titre: "Fénamates et indoliques", mols: [
        molc("Acide méfénamique", "Ponstyl", ["**Dysménorrhée**, ménorragies"]),
        molc("Acide niflumique", "Nifluril", []),
        molc("Indométacine", "Chrono-Indocid", ["Effets **neurologiques** (céphalées, vertiges)"])
      ] },
      { titre: "Coxibs (sélectifs de la COX-2)", mols: [
        molc("Célécoxib", "Celebrex", ["Contre-indiqué : cardiopathie ischémique, artériopathie, **AVC**, insuffisance cardiaque", "Allergie aux **sulfamides** : contre-indiqué"]),
        molc("Étoricoxib", "Arcoxia", ["Contre-indiqué aussi dans l'**HTA non contrôlée**"])
      ] }
    ] },

  /* ---------------- Anti-infectieux ---------------- */
  { id: "betalact", nom: "Bêta-lactamines (pénicillines, céphalosporines)", famille: "infectio", ref: "amoxicilline", fiches: ["amoxicilline", "cefpodoxime"],
    principe: ["Fixation aux **protéines liant les pénicillines** → synthèse de la paroi (peptidoglycane) bloquée → **bactéricidie**", "Effet **temps-dépendant** → plusieurs prises par jour, régulièrement espacées", "Bêta-lactamases → résistance ; l'**acide clavulanique** les inhibe"],
    classe: ["**Allergie** : demander quelle réaction (urticaire, œdème de Quincke, choc ; toxidermie grave)", "Allergie croisée pénicillines → céphalosporines : faible avec les C3, plus marquée avec les C1", "Diarrhée, candidose ; **colite à Clostridioides difficile**", "Éruption sous amoxicilline pendant une **mononucléose** (pas une allergie vraie)"],
    groupes: [
      { titre: "Pénicillines", mols: [
        molc("Phénoxyméthylpénicilline (pénicilline V)", "Oracilline", ["Angine à streptocoque (alternative)"]),
        molc("Amoxicilline", "Clamoxyl", ["Référence : angine, otite, sinusite, pneumonie", "Enfant : **50 mg/kg/j** (angine) à **80-90 mg/kg/j** (otite), en 2 ou 3 prises"], "amoxicilline"),
        molc("Amoxicilline + acide clavulanique", "Augmentin", ["**Au début du repas** (tolérance digestive)", "Diarrhée plus fréquente ; **hépatite cholestatique** (sujet âgé, traitement long)"]),
        molc("Cloxacilline", "Orbénine", ["Pénicilline M : **staphylocoque** sensible à la méticilline"]),
        molc("Pivmécillinam", "Selexid", ["**Cystite** simple ; libère de la pivalate (carnitine ↓ si traitements longs)"]),
        molc("Benzathine benzylpénicilline", "Extencilline", ["**IM** ; syphilis, prévention du rhumatisme articulaire aigu"])
      ] },
      { titre: "Céphalosporines", mols: [
        molc("Céfaclor", "Alfatil", ["1re génération (orale)"]),
        molc("Céfuroxime axétil", "Zinnat", ["2e génération ; à prendre **pendant le repas**"]),
        molc("Cefpodoxime", "Orelox", ["3e génération orale ; à prendre **pendant le repas**", "Anti-acides, IPP : absorption ↓"], "cefpodoxime"),
        molc("Céfixime", "Oroken", ["3e génération orale ; infections urinaires (relais)"]),
        molc("Ceftriaxone", "Rocéphine", ["Injectable (IM, IV, SC) ; une injection par jour", "Nouveau-né : ne pas mélanger avec des solutions **calciques** (précipités)"])
      ] }
    ] },

  { id: "macrolides", nom: "Macrolides", famille: "infectio", ref: "clarithromycine", fiches: ["clarithromycine"],
    principe: ["Fixation à la sous-unité **50S** du ribosome → synthèse protéique bloquée → **bactériostase**", "Bonne diffusion intracellulaire → **germes atypiques** (Mycoplasma, Chlamydia, Legionella)", "Inhibition du **CYP3A4** (sauf spiramycine, faible pour l'azithromycine) → interactions"],
    classe: ["Interactions majeures : **simvastatine**, colchicine, ergotés, AOD, immunosuppresseurs", "**Allongement du QT**", "Troubles digestifs (effet agoniste de la motiline)"],
    groupes: [
      { titre: "Inhibiteurs puissants du CYP3A4", mols: [
        molc("Clarithromycine", "Zeclar, Monozeclar LP", ["Contre-indiquée avec la simvastatine, la colchicine, les ergotés", "500 mg deux fois par jour au maximum"], "clarithromycine"),
        molc("Érythromycine", "Ery, Egery, Abboticine", ["Inhibiteur **puissant** ; très digestif", "Utilisée aussi comme **prokinétique** (hors AMM)"]),
        molc("Josamycine", "Josacine", ["Suspension pédiatrique ; ergotés contre-indiqués"])
      ] },
      { titre: "Peu ou pas inhibiteurs", mols: [
        molc("Azithromycine", "Zithromax, Orodose", ["**Demi-vie très longue** : traitements de **3 ou 5 jours**, une prise par jour", "Dose unique de 1 g : chlamydia (à vérifier selon les recommandations actuelles)"]),
        molc("Roxithromycine", "Rulid", ["Inhibition modérée du CYP3A4"]),
        molc("Spiramycine", "Rovamycine ; Birodogyl (+ métronidazole)", ["**Pas d'inhibition** du CYP3A4", "**Toxoplasmose** pendant la grossesse ; infections dentaires (Birodogyl)"])
      ] }
    ] },

  { id: "fq", nom: "Fluoroquinolones", famille: "infectio", ref: "levofloxacine", fiches: ["levofloxacine"],
    principe: ["**ADN gyrase** et **topo-isomérase IV** bloquées → réplication de l'ADN bactérien impossible → **bactéricidie**", "Effet **concentration-dépendant** → une à deux prises par jour"],
    classe: ["Restrictions ANSM 2019 : **jamais en 1re intention** pour une infection bénigne", "**Tendinopathies** et ruptures (corticoïdes, plus de 60 ans, transplantés) : arrêter dès la douleur", "**Photosensibilisation** : pas de soleil", "**Cations** (fer, calcium, magnésium, zinc, anti-acides) : **2 heures** d'écart", "QT, dysglycémies, neuropathies, anévrisme aortique, troubles neuropsychiques", "Enfant, grossesse : à éviter"],
    groupes: [
      { titre: "Molécules", mols: [
        molc("Ciprofloxacine", "Ciflox", ["Inhibiteur du **CYP1A2** : **tizanidine** contre-indiquée ; théophylline, clozapine, caféine ↑", "Infections urinaires, digestives"]),
        molc("Lévofloxacine", "Tavanic", ["Fluoroquinolone « **antipneumococcique** » : pneumonie en 2e intention"], "levofloxacine"),
        molc("Ofloxacine", "Oflocet, Monoflocet", ["Infections urinaires, génitales"]),
        molc("Moxifloxacine", "Izilox", ["**QT** le plus marqué, **hépatotoxicité** : dernier recours"]),
        molc("Norfloxacine", "Noroxine", ["Commercialisation à vérifier"])
      ] }
    ] },

  { id: "rifamycines", nom: "Rifamycines", famille: "infectio", ref: "rifampicine", fiches: ["rifampicine"],
    principe: ["**ARN polymérase** bactérienne bloquée → transcription impossible → bactéricidie", "Action d'induction : récepteur **PXR** activé → **CYP3A4, 2C9, 2C19, P-gp** ↑ → concentrations des autres médicaments ↓"],
    classe: ["**Inducteur enzymatique puissant** : contraception estroprogestative inefficace, AOD, AVK, immunosuppresseurs, antirétroviraux", "Effet inducteur maximal en **1 à 2 semaines**, disparaît en 2 à 4 semaines après l'arrêt", "Coloration **orange-rouge** des urines, larmes, **lentilles souples**", "Hépatotoxicité (avec l'isoniazide)", "Toujours en **association** (résistance rapide)"],
    groupes: [
      { titre: "Molécules", mols: [
        molc("Rifampicine", "Rifadine ; Rifinah (+ isoniazide), Rifater (+ isoniazide, pyrazinamide)", ["**À jeun** : 1 heure avant ou 2 heures après le repas", "Tuberculose, infections ostéoarticulaires à staphylocoque, brucellose"], "rifampicine"),
        molc("Rifabutine", "Ansatipine", ["Inducteur **moins puissant** ; substrat du CYP3A4", "**Uvéite** avec les inhibiteurs du CYP3A4"]),
        molc("Rifaximine", "Tixtar", ["**Non absorbée** : action intestinale, prévention de l'encéphalopathie hépatique ; pas d'induction systémique notable"])
      ] }
    ] },

  { id: "antiherpes", nom: "Antiviraux anti-herpès", famille: "infectio", ref: "aciclovir", fiches: ["aciclovir"],
    principe: ["Phosphorylé par la **thymidine kinase virale** (seulement dans les cellules infectées) → triphosphate", "→ **ADN polymérase virale** bloquée → réplication ↓", "Prodrogues (valaciclovir, famciclovir) → meilleure biodisponibilité → **moins de prises**"],
    classe: ["Débuter **le plus tôt possible** (dès les prodromes : picotements, brûlure)", "Élimination **rénale** : adapter la dose ; **neurotoxicité** (confusion) chez le sujet âgé et l'insuffisant rénal", "Bien s'hydrater (cristallurie avec les fortes doses IV)"],
    groupes: [
      { titre: "Molécules", mols: [
        molc("Aciclovir", "Zovirax, Activir (crèmes) ; Zovirax comprimés, IV", ["Crème : **5 applications** par jour pendant 5 à 10 jours", "Voie orale : 5 prises par jour (faible biodisponibilité)"], "aciclovir"),
        molc("Valaciclovir", "Zelitrex", ["Prodrogue de l'aciclovir : **2 à 3 prises** par jour", "Herpès génital, zona, prévention des récurrences"]),
        molc("Famciclovir", "Oravir", ["Prodrogue du **penciclovir** ; zona"]),
        molc("Ganciclovir (collyre)", "Virgan", ["**Kératite** herpétique"])
      ] }
    ] },

  /* ---------------- Neurologie ---------------- */
  { id: "antiepi", nom: "Antiépileptiques", famille: "neuro", ref: "lamotrigine", fiches: ["lamotrigine", "lacosamide"],
    principe: ["Canaux **sodiques** bloqués (lamotrigine, carbamazépine, lacosamide, phénytoïne) → décharges répétitives ↓", "Transmission **GABA** renforcée (benzodiazépines, phénobarbital, valproate) → inhibition ↑", "Libération des neurotransmetteurs ↓ (**SV2A** : lévétiracétam ; canaux calciques α2δ : gabapentine, prégabaline)"],
    classe: ["**Ne jamais arrêter brutalement** : état de mal", "**Inducteurs** (carbamazépine, phénytoïne, phénobarbital) : contraception orale inefficace, nombreuses interactions", "**Grossesse** : valproate et topiramate tératogènes ; acide folique en préconception", "Toxidermies graves en début de traitement (lamotrigine, carbamazépine) : titration lente", "Idées suicidaires : effet de classe à surveiller"],
    groupes: [
      { titre: "Bloqueurs des canaux sodiques", mols: [
        molc("Lamotrigine", "Lamictal", ["Titration **très lente** (toxidermie, syndrome de Lyell)", "Valproate : dose **÷ 2** ; estroprogestatifs : lamotrigine ↓"], "lamotrigine"),
        molc("Carbamazépine", "Tégrétol, Tégrétol LP", ["**Inducteur puissant** (dont son propre métabolisme)", "**Hyponatrémie**, toxidermie (HLA-B*1502 chez les patients d'Asie du Sud-Est), agranulocytose"]),
        molc("Oxcarbazépine", "Trileptal", ["**Hyponatrémie** fréquente ; inducteur plus faible"]),
        molc("Eslicarbazépine", "Zébinix", ["Une prise par jour ; hyponatrémie"]),
        molc("Lacosamide", "Vimpat", ["**Allongement du PR** : prudence avec les troubles de conduction", "Peu d'interactions"], "lacosamide"),
        molc("Phénytoïne", "Di-Hydan", ["**Marge thérapeutique étroite**, cinétique **non linéaire** : dosages", "Inducteur ; hypertrophie gingivale, hirsutisme"])
      ] },
      { titre: "Large spectre et autres mécanismes", mols: [
        molc("Valproate de sodium", "Dépakine, Dépakine Chrono, Micropakine", ["**Tératogène majeur** : contre-indiqué pendant la grossesse et chez la femme en âge de procréer sauf exception (accord de soins, contraception)", "Précautions aussi chez l'**homme** (conception)", "**Inhibiteur** enzymatique ; hépatotoxicité, pancréatite, prise de poids"]),
        molc("Lévétiracétam", "Keppra", ["**Peu d'interactions**", "Irritabilité, troubles de l'humeur"]),
        molc("Brivaracétam", "Briviact", ["Même cible que le lévétiracétam (SV2A)"]),
        molc("Topiramate", "Epitomax", ["**Tératogène** : programme de prévention des grossesses", "Perte de poids, **lithiase** rénale, troubles cognitifs ; aussi prophylaxie de la migraine"]),
        molc("Zonisamide", "Zonegran", ["Sulfamide ; lithiase, perte de poids"]),
        molc("Phénobarbital", "Gardénal, Aparoxal", ["**Inducteur puissant**, sédation"]),
        molc("Éthosuximide", "Zarontin", ["**Absences** de l'enfant"]),
        molc("Pérampanel", "Fycompa", ["Troubles du comportement, agressivité"])
      ] },
      { titre: "Gabapentinoïdes", note: "Surtout utilisés dans la douleur neuropathique.", mols: [
        molc("Gabapentine", "Neurontin", ["Élimination rénale ; somnolence, vertiges"]),
        molc("Prégabaline", "Lyrica", ["**Ordonnance sécurisée** (mésusage) ; durée limitée (à vérifier)", "Dépression respiratoire avec les opioïdes"])
      ] }
    ] },

  { id: "triptans", nom: "Triptans", famille: "neuro", ref: "zolmitriptan", fiches: ["zolmitriptan"],
    principe: ["Agonistes **5-HT1B** → vasoconstriction des artères méningées dilatées", "Agonistes **5-HT1D** → libération des neuropeptides inflammatoires (CGRP) ↓"],
    classe: ["À prendre **dès le début de la céphalée**, pas pendant l'aura", "Pas plus de **2 prises par 24 heures** ; 2e prise seulement si récidive (pas si échec de la 1re)", "**Contre-indiqués** : coronaropathie, **HTA non contrôlée**, AVC, artériopathie ; ergotés", "Abus médicamenteux : **10 jours ou plus par mois**", "Syndrome sérotoninergique avec ISRS, IRSNA (rare, à signaler)"],
    groupes: [
      { titre: "Molécules", note: "Changer de triptan si l'un est inefficace sur 3 crises.", mols: [
        molc("Sumatriptan", "Imigrane (comprimés, spray nasal), injection sous-cutanée", ["Seul triptan **injectable** : algie vasculaire de la face"]),
        molc("Zolmitriptan", "Zomig, Zomigoro (orodispersible) ; spray nasal", ["Cimétidine, fluvoxamine : **5 mg par 24 heures** au maximum"], "zolmitriptan"),
        molc("Rizatriptan", "Maxalt, Maxaltlyo", ["Avec le **propranolol** : **5 mg** seulement"]),
        molc("Élétriptan", "Relpax", ["Substrat du **CYP3A4** : inhibiteurs puissants contre-indiqués"]),
        molc("Naratriptan", "Naramig", ["Action plus lente, mieux tolérée"]),
        molc("Almotriptan", "Almogran", []),
        molc("Frovatriptan", "Isimig, Tigreat", ["**Demi-vie longue** : migraine menstruelle"])
      ] }
    ] },

  { id: "sep", nom: "Traitements de fond de la sclérose en plaques", famille: "neuro", ref: "teriflunomide", fiches: ["teriflunomide"],
    principe: ["Immunomodulateurs → orientation de la réponse immunitaire ↓ inflammatoire", "Immunosuppresseurs ou anticorps → lymphocytes T ou B ↓ ou bloqués hors du cerveau → **poussées ↓**"],
    classe: ["**Médicaments d'exception** ou de prescription hospitalière ; beaucoup sont délivrés en **rétrocession** ou en pharmacie hospitalière", "**Vaccins vivants** contre-indiqués sous immunosuppresseurs", "Infections opportunistes, **LEMP** (leucoencéphalopathie multifocale progressive)", "Grossesse : à anticiper (certains sont tératogènes)"],
    groupes: [
      { titre: "Première ligne", mols: [
        molc("Interférons bêta", "Avonex, Rebif, Betaferon, Plegridy", ["Injections ; **syndrome pseudo-grippal** (paracétamol avant l'injection, injection le soir)", "Bilan hépatique, NFS"]),
        molc("Acétate de glatiramère", "Copaxone", ["Injection sous-cutanée ; réactions au point d'injection", "Possible pendant la grossesse"]),
        molc("Tériflunomide", "Aubagio", ["**Tératogène** : élimination accélérée par colestyramine avant une grossesse", "Bilan hépatique, PA, NFS"], "teriflunomide"),
        molc("Diméthyl fumarate", "Tecfidera", ["**Bouffées de chaleur**, troubles digestifs ; lymphopénie (LEMP)"])
      ] },
      { titre: "Formes actives ou deuxième ligne", mols: [
        molc("Fingolimod", "Gilenya", ["**Bradycardie** à la première dose : surveillance de 6 heures", "Œdème maculaire ; **tératogène**"]),
        molc("Ozanimod, siponimod", "Zeposia, Mayzent", ["Même famille que le fingolimod (modulateurs S1P)"]),
        molc("Natalizumab", "Tysabri", ["Perfusion mensuelle ; **LEMP** (sérologie JC)"]),
        molc("Ocrélizumab", "Ocrevus", ["Anti-CD20 ; perfusion tous les 6 mois"]),
        molc("Ofatumumab", "Kesimpta", ["Anti-CD20 sous-cutané mensuel, auto-injection"]),
        molc("Cladribine", "Mavenclad", ["Comprimés en cures courtes ; **tératogène**, contraception"]),
        molc("Alemtuzumab", "Lemtrada", ["Maladies auto-immunes secondaires (thyroïde, purpura)"])
      ] }
    ] },

  /* ---------------- Psychiatrie ---------------- */
  { id: "bzd", nom: "Benzodiazépines et apparentés", famille: "psy", ref: "clobazam", fiches: ["clobazam"],
    principe: ["Fixation sur le récepteur **GABA-A** → ouverture du canal chlore ↑ → **inhibition neuronale** ↑", "→ anxiolyse, sédation, myorelaxation, effet anticonvulsivant, **amnésie**"],
    classe: ["Durée maximale : **12 semaines** (anxiolytiques), **4 semaines** (hypnotiques)", "**Sujet âgé** : chutes, confusion ; préférer une demi-vie **courte** sans métabolite actif (oxazépam, lorazépam)", "**Dépendance** : arrêt **progressif** (risque de sevrage, convulsions)", "Alcool, opioïdes : **dépression respiratoire**", "Contre-indiquées : insuffisance respiratoire sévère, apnée du sommeil, myasthénie"],
    groupes: [
      { titre: "Anxiolytiques à demi-vie courte ou intermédiaire", mols: [
        molc("Oxazépam", "Séresta", ["**Sans métabolite actif** : choix chez le sujet âgé"]),
        molc("Lorazépam", "Témesta", ["Sans métabolite actif"]),
        molc("Alprazolam", "Xanax", ["Substrat du **CYP3A4** ; effet rebond entre les prises"]),
        molc("Bromazépam", "Lexomil", ["Comprimé quadrisécable"])
      ] },
      { titre: "Anxiolytiques à demi-vie longue", note: "Accumulation chez le sujet âgé.", mols: [
        molc("Diazépam", "Valium", ["Métabolite actif (nordazépam) ; sevrage alcoolique, convulsions (voie rectale)"]),
        molc("Clorazépate", "Tranxène", ["Sevrage alcoolique (Tranxène 50)"]),
        molc("Prazépam", "Lysanxia", []),
        molc("Loflazépate", "Victan", []),
        molc("Nordazépam", "Nordaz", []),
        molc("Clobazam", "Urbanyl, Likozam", ["Anxiolytique et **antiépileptique** (traitement associé)"], "clobazam"),
        molc("Clonazépam", "Rivotril", ["**Ordonnance sécurisée**, prescription initiale par un neurologue ou un pédiatre ; épilepsie seulement"])
      ] },
      { titre: "Hypnotiques", mols: [
        molc("Loprazolam", "Havlane", []),
        molc("Lormétazépam", "Noctamide", []),
        molc("Zolpidem", "Stilnox", ["Apparenté (« Z-drug ») ; **ordonnance sécurisée**", "Somnambulisme, conduites automatiques"]),
        molc("Zopiclone", "Imovane", ["Apparenté ; **goût amer** au réveil"])
      ] }
    ] },

  { id: "thymo", nom: "Thymorégulateurs", famille: "psy", ref: "lithium", fiches: ["lithium"],
    principe: ["Lithium : mécanisme mal connu (GSK-3, inositol) → stabilisation de l'humeur, **prévention des rechutes** et du suicide", "Antiépileptiques thymorégulateurs : canaux sodiques ou GABA → excitabilité ↓"],
    classe: ["Bilan avant traitement et surveillance biologique régulière", "**Grossesse** : lithium (malformations cardiaques), valproate (contre-indiqué) ; anticiper", "Plusieurs antipsychotiques atypiques ont aussi l'indication (quétiapine, aripiprazole, olanzapine)"],
    groupes: [
      { titre: "Molécules", mols: [
        molc("Lithium", "Téralithe 250, Téralithe LP 400", ["**Marge étroite** : lithémie à **12 heures** de la dernière prise, 0,5 à 0,8 (LI) ou 0,8 à 1,2 mmol/L (LP)", "Lithémie ↑ : **AINS, IEC, sartans, diurétiques**, déshydratation, régime sans sel", "Surveillance **rein, thyroïde**, calcémie"], "lithium"),
        molc("Divalproate, valpromide", "Dépakote, Dépamide", ["Mêmes règles que le valproate (**tératogène**)"]),
        molc("Carbamazépine", "Tégrétol", ["Inducteur puissant"]),
        molc("Lamotrigine", "Lamictal", ["Prévention des épisodes **dépressifs** du trouble bipolaire"], "lamotrigine")
      ] }
    ] },

  { id: "antidep", nom: "Antidépresseurs", famille: "psy", ref: "venlafaxine", fiches: ["venlafaxine"],
    principe: ["Recapture de la **sérotonine** (ISRS) ou de la **sérotonine et de la noradrénaline** (IRSNA, tricycliques) bloquée → concentration synaptique ↑", "Adaptation des récepteurs en plusieurs semaines → **délai d'action de 2 à 4 semaines**", "Tricycliques : en plus, effets **atropiniques**, antihistaminiques, α-bloquants"],
    classe: ["Délai d'action : **ne pas arrêter** avant 4 semaines faute d'effet ; traitement de 6 mois au moins après la rémission", "**Levée d'inhibition** en début de traitement (risque suicidaire, jeunes adultes)", "Arrêt **progressif** (syndrome de sevrage)", "**Syndrome sérotoninergique** (tramadol, triptans, millepertuis, IMAO)", "**Hyponatrémie** chez le sujet âgé ; saignements avec AINS et anticoagulants"],
    groupes: [
      { titre: "ISRS", mols: [
        molc("Sertraline", "Zoloft", ["Référence pendant la **grossesse** et l'allaitement"]),
        molc("Fluoxétine", "Prozac", ["**Demi-vie très longue** (métabolite) ; inhibiteur puissant du **CYP2D6**"]),
        molc("Paroxétine", "Deroxat, Divarius", ["Inhibiteur puissant du **CYP2D6** (tamoxifène, métoprolol) ; **sevrage** marqué", "Effets atropiniques légers"]),
        molc("Citalopram", "Seropram", ["**QT** : 20 mg par jour au maximum après 65 ans"]),
        molc("Escitalopram", "Seroplex", ["**QT** : 10 mg par jour au maximum après 65 ans"]),
        molc("Fluvoxamine", "Floxyfral", ["Inhibiteur puissant du **CYP1A2** (tizanidine, agomélatine, duloxétine)"])
      ] },
      { titre: "IRSNA", mols: [
        molc("Venlafaxine", "Effexor LP", ["**HTA** dose-dépendante : surveiller la tension", "Sevrage marqué"], "venlafaxine"),
        molc("Duloxétine", "Cymbalta", ["Douleur neuropathique diabétique", "Substrat du **CYP1A2** : fluvoxamine, ciprofloxacine contre-indiquées ; hépatotoxicité"]),
        molc("Milnacipran", "Ixel", ["Élimination rénale"])
      ] },
      { titre: "Autres mécanismes", mols: [
        molc("Mirtazapine", "Norset", ["**Sédation**, prise de **poids** ; prise **le soir**"]),
        molc("Miansérine", "Athymil", ["Sédatif ; **agranulocytose** (rare)"]),
        molc("Vortioxétine", "Brintellix", ["Nausées ; syndrome sérotoninergique (tramadol)"]),
        molc("Agomélatine", "Valdoxan", ["**Hépatotoxicité** : bilan hépatique ; CYP1A2 (fluvoxamine contre-indiquée)"]),
        molc("Tianeptine", "Stablon", ["**Ordonnance sécurisée** (mésusage, dépendance)"])
      ] },
      { titre: "Tricycliques (imipraminiques)", note: "**Cardiotoxiques en surdosage**. Atropiniques : glaucome à angle fermé, adénome prostatique.", mols: [
        molc("Amitriptyline", "Laroxyl", ["Douleurs neuropathiques à petite dose (gouttes)"]),
        molc("Clomipramine", "Anafranil", ["Troubles obsessionnels compulsifs"]),
        molc("Imipramine", "Tofranil", ["Énurésie (hors première intention)"])
      ] }
    ] },

  { id: "tdah", nom: "Traitements du TDAH (psychostimulants)", famille: "psy", ref: "methylphenidate", fiches: ["methylphenidate"],
    principe: ["Méthylphénidate : recapture de la **dopamine** et de la **noradrénaline** bloquée → attention ↑, impulsivité ↓"],
    classe: ["Règles des **stupéfiants** : ordonnance sécurisée, **28 jours**, prescription initiale et renouvellement annuel **hospitaliers** (ou spécialiste)", "Appétit ↓, insomnie : prise **le matin**, surveiller poids et taille", "Fréquence cardiaque et tension", "Les formes **ne sont pas interchangeables** : profil de libération différent"],
    groupes: [
      { titre: "Méthylphénidate : formes et profils", mols: [
        molc("Méthylphénidate LI", "Ritaline 10 mg", ["Action rapide et courte (environ 4 heures) : **2 à 3 prises**"], "methylphenidate"),
        molc("Méthylphénidate LP (50/50)", "Ritaline LP, Medikinet LP", ["Gélules ouvrables (contenu sur une cuillère de compote)", "Medikinet : à prendre **pendant ou après le petit-déjeuner**"]),
        molc("Méthylphénidate LP (22/78, système osmotique)", "Concerta LP", ["**Avaler entier**, ne pas couper ; l'enveloppe vide peut être retrouvée dans les selles", "Effet sur environ 12 heures"]),
        molc("Méthylphénidate LP (30/70)", "Quasym LP", ["Gélule ouvrable"])
      ] },
      { titre: "Non psychostimulant", mols: [
        molc("Atomoxétine", "Disponibilité et nom en France à vérifier", ["Inhibiteur de la recapture de la noradrénaline ; métabolisé par le CYP2D6"])
      ] }
    ] },

  /* ---------------- Endocrinologie ---------------- */
  { id: "insulines", nom: "Insulines", famille: "endocrino", ref: "insuline-glargine", fiches: ["insuline-glargine", "insuline-asparte"],
    principe: ["Insuline → récepteur → **captation du glucose** (muscle, tissu adipeux) ↑, production hépatique ↓ → **glycémie ↓**", "Schéma **basal-bolus** : une basale (lente) + des bolus (rapides) aux repas", "Le profil (délai, pic, durée) dépend de la **forme** de l'insuline"],
    classe: ["**Hypoglycémie** : resucrage 15 g de sucre, contrôle à 15 minutes ; glucagon (Baqsimi en spray nasal, Glucagen)", "Conservation : **2 à 8 °C** avant ouverture, pas de congélation ; stylo entamé à température ambiante (4 semaines en général)", "**Rotation** des sites d'injection (lipodystrophies)", "Bêtabloquants : masquent les signes d'hypoglycémie"],
    groupes: [
      { titre: "Analogues rapides (prandiales)", note: "Injection juste avant le repas (0 à 15 minutes).", mols: [
        molc("Insuline asparte", "NovoRapid ; Fiasp (plus rapide)", ["Fiasp : injection jusqu'à 20 minutes après le début du repas"], "insuline-asparte"),
        molc("Insuline lispro", "Humalog ; Lyumjev (plus rapide)", ["Humalog existe en U200"]),
        molc("Insuline glulisine", "Apidra", [])
      ] },
      { titre: "Insulines humaines", mols: [
        molc("Insuline humaine rapide", "Actrapid, Umuline Rapide", ["Injection **15 à 30 minutes avant** le repas ; voie IV possible"]),
        molc("Insuline NPH (intermédiaire)", "Insulatard, Umuline NPH", ["**Suspension** laiteuse : rouler et retourner le stylo une dizaine de fois avant l'injection"])
      ] },
      { titre: "Analogues lents (basales)", mols: [
        molc("Insuline glargine U100", "Lantus ; Abasaglar (biosimilaire)", ["Une injection par jour, **à heure fixe**", "Ne jamais mélanger avec une autre insuline"], "insuline-glargine"),
        molc("Insuline glargine U300", "Toujeo", ["3 fois plus concentrée : **ne jamais prélever à la seringue** dans le stylo", "Changement depuis la U100 : doses parfois plus élevées"]),
        molc("Insuline dégludec", "Tresiba", ["Durée de plus de 42 heures : **horaire souple**"]),
        molc("Insuline détémir", "Levemir", ["Arrêt de commercialisation annoncé (à vérifier)"])
      ] },
      { titre: "Mélanges (premix)", mols: [
        molc("Asparte biphasique, lispro biphasique, humaine biphasique", "NovoMix 30, Humalog Mix 25 et 50, Umuline Profil 30", ["Suspensions : **remettre en suspension** avant l'injection"])
      ] }
    ] },

  { id: "thyroide", nom: "Hormones thyroïdiennes", famille: "endocrino", ref: "levothyroxine", fiches: ["levothyroxine"],
    principe: ["Apport de **T4** (prohormone) → conversion périphérique en **T3** active → substitution de l'hypothyroïdie", "Surveillance par la **TSH** (6 à 8 semaines après chaque changement)"],
    classe: ["**Marge étroite** : tout changement de spécialité → **TSH** de contrôle", "**À jeun**, 30 minutes avant le petit-déjeuner", "À distance (au moins 2 heures, 4 heures pour certains) : **calcium, fer**, IPP, anti-acides, résines", "Sujet âgé, coronarien : débuter à faible dose (risque d'angor)", "Inducteurs : besoins ↑"],
    groupes: [
      { titre: "Molécules", mols: [
        molc("Lévothyroxine", "Levothyrox, Thyrofix, TCaps, L-Thyroxin Henning ; L-Thyroxine Serb (gouttes)", ["Gouttes : **nourrisson et enfant**, sujets qui ne peuvent avaler"], "levothyroxine"),
        molc("Liothyronine (T3)", "Cynomel", ["Demi-vie courte, action rapide"]),
        molc("Lévothyroxine + liothyronine", "Euthyral", [])
      ] }
    ] },

  { id: "ats", nom: "Antithyroïdiens de synthèse", famille: "endocrino", ref: "carbimazole", fiches: ["carbimazole"],
    principe: ["**Thyroperoxydase** bloquée → synthèse des hormones thyroïdiennes ↓", "Propylthiouracile : bloque aussi la conversion périphérique de T4 en T3"],
    classe: ["**Agranulocytose** : fièvre, angine → **NFS en urgence**, arrêt", "NFS avant le traitement puis régulièrement les premiers mois", "Hépatotoxicité (surtout propylthiouracile)", "**Grossesse** : propylthiouracile au 1er trimestre (carbimazole : risque malformatif)"],
    groupes: [
      { titre: "Molécules", mols: [
        molc("Carbimazole", "Néo-Mercazole", ["**Prodrogue** du thiamazole", "Contraception efficace (malformations)"], "carbimazole"),
        molc("Thiamazole", "Thyrozol", ["Forme active du carbimazole"]),
        molc("Propylthiouracile", "Propylthiouracile AP-HP", ["**Hépatotoxicité** grave ; préféré au **1er trimestre** de grossesse"]),
        molc("Benzylthiouracile", "Basdène", [])
      ] }
    ] },

  { id: "cortico", nom: "Glucocorticoïdes", famille: "endocrino", ref: "prednisone", fiches: ["prednisone"],
    principe: ["Récepteur nucléaire des glucocorticoïdes → transcription des gènes de l'inflammation ↓ → effet **anti-inflammatoire, immunosuppresseur**", "Effets **métaboliques** : glycémie ↑, catabolisme protidique, rétention hydrosodée", "Freinage de l'**axe corticotrope** → insuffisance surrénalienne à l'arrêt brutal"],
    classe: ["Prise **le matin** (rythme du cortisol, insomnie)", "Plus de 2 à 3 semaines : **décroissance progressive**", "Équivalences anti-inflammatoires : hydrocortisone **20 mg** = prednisone **5 mg** = méthylprednisolone **4 mg** = dexaméthasone **0,75 mg**", "Traitement long : calcium, vitamine D, prévention de l'ostéoporose ; surveiller glycémie, tension, kaliémie", "Vaccins vivants contre-indiqués à dose immunosuppressive"],
    groupes: [
      { titre: "Molécules", mols: [
        molc("Hydrocortisone", "Hydrocortisone Roussel ; injectable", ["Activité **minéralocorticoïde** marquée : **substitution** de l'insuffisance surrénalienne"]),
        molc("Prednisone", "Cortancyl", ["Prodrogue de la prednisolone"], "prednisone"),
        molc("Prednisolone", "Solupred (orodispersible, effervescent)", ["Forme orodispersible pratique chez l'enfant"]),
        molc("Méthylprednisolone", "Médrol ; Solumédrol (IV), Dépo-Médrol (infiltration)", ["Bolus IV dans les poussées (SEP)"]),
        molc("Bétaméthasone", "Célestène (gouttes), Célestène Chronodose (injection)", ["Action **longue**, puissante ; maturation pulmonaire fœtale"]),
        molc("Dexaméthasone", "Néofordex ; injectable", ["Action **longue**, sans effet minéralocorticoïde"])
      ] }
    ] },

  /* ---------------- Os ---------------- */
  { id: "osteo", nom: "Anti-ostéoporotiques", famille: "os", ref: "alendronate", fiches: ["alendronate"],
    principe: ["**Anti-résorbeurs** : bisphosphonates (fixation à l'os → **ostéoclastes** inhibés) ; dénosumab (anticorps anti-**RANKL** → ostéoclastes ne se forment plus)", "**Ostéoformateurs** : tériparatide (analogue de la **PTH** en injections intermittentes → ostéoblastes ↑)", "Romosozumab : anti-**sclérostine** → formation ↑ et résorption ↓", "SERM (raloxifène) : effet **œstrogénique sur l'os**, anti-œstrogénique sur le sein"],
    classe: ["Toujours vérifier **calcium et vitamine D** (corriger une carence avant de commencer)", "**Ostéonécrose de la mâchoire** (bisphosphonates, dénosumab) : bilan dentaire avant, hygiène bucco-dentaire", "**Fractures atypiques du fémur** : douleur de cuisse ou d'aine à signaler", "Durée et relais décidés par le médecin (fenêtre thérapeutique des bisphosphonates)"],
    groupes: [
      { titre: "Bisphosphonates oraux", note: "Règles de prise communes : **à jeun**, grand verre d'**eau plate**, rester **debout ou assis 30 minutes**, ne rien avaler d'autre avant.", mols: [
        molc("Alendronate", "Fosamax ; Fosavance, Adrovance (+ vitamine D3)", ["**70 mg une fois par semaine**", "Insuffisance rénale : non recommandé si clairance inférieure à 35 mL/min"], "alendronate"),
        molc("Risédronate", "Actonel", ["**35 mg** une fois par semaine, ou **75 mg** deux jours de suite par mois", "Non recommandé si clairance inférieure à 30 mL/min"]),
        molc("Ibandronate", "Bonviva", ["**150 mg une fois par mois**", "Rester debout **60 minutes** (au lieu de 30)", "Existe aussi en IV tous les 3 mois"])
      ] },
      { titre: "Bisphosphonate injectable", mols: [
        molc("Acide zolédronique", "Aclasta", ["**5 mg IV une fois par an**", "**Syndrome pseudo-grippal** dans les 3 jours (fièvre, myalgies) : paracétamol", "Bonne hydratation ; vérifier calcémie et vitamine D avant ; contre-indiqué si clairance inférieure à 35 mL/min", "Zometa (4 mg) : autre indication (métastases osseuses)"])
      ] },
      { titre: "Anticorps anti-RANKL", mols: [
        molc("Dénosumab", "Prolia (60 mg) ; Xgeva (120 mg, cancérologie)", ["**Une injection SC tous les 6 mois**", "**Ne jamais arrêter ni retarder** sans relais (bisphosphonate) : **effet rebond**, perte osseuse rapide et **fractures vertébrales multiples**", "**Hypocalcémie** (insuffisance rénale) : calcium et vitamine D", "Pas d'adaptation à la fonction rénale (anticorps)"])
      ] },
      { titre: "Ostéoformateurs", mols: [
        molc("Tériparatide", "Forsteo ; biosimilaires (Movymia, Terrosa…)", ["**Injection SC quotidienne**, stylo au **réfrigérateur**", "Durée maximale **24 mois**, une seule fois dans la vie", "Ostéoporose **sévère** (fractures vertébrales) ; prescription restreinte", "Hypotension orthostatique après les premières injections ; hypercalcémie transitoire", "Contre-indiqué : maladie de Paget, irradiation osseuse, hypercalcémie, sujet en croissance"]),
        molc("Romosozumab", "Evenity", ["**2 injections SC une fois par mois pendant 12 mois**, puis relais par un anti-résorbeur", "**Contre-indiqué** après un **infarctus du myocarde ou un AVC** (signal cardiovasculaire)", "Prise en charge et conditions de prescription en France à vérifier"])
      ] },
      { titre: "Modulateurs sélectifs des récepteurs aux œstrogènes (SERM)", mols: [
        molc("Raloxifène", "Evista, Optruma", ["Femme ménopausée, plutôt jeune, sans risque thrombotique", "**Contre-indiqué** : antécédent de **thrombose veineuse** ; arrêt avant une immobilisation", "Bouffées de chaleur, crampes ; réduit le risque de cancer du sein"]),
        molc("Bazédoxifène", "Conbriza", ["Mêmes règles que le raloxifène"])
      ] }
    ] },

  { id: "vitd", nom: "Vitamine D et calcium", famille: "os", ref: "cholecalciferol", fiches: ["cholecalciferol"],
    principe: ["Vitamine D native (D3, D2) → **25-OH-D** (foie) → **1,25-(OH)2-D** active (rein)", "→ absorption intestinale du **calcium** et du phosphore ↑ → minéralisation osseuse"],
    classe: ["Formes **natives** (D3, D2) pour la carence ; formes **hydroxylées** actives (calcitriol, alfacalcidol) pour l'insuffisance rénale et l'hypoparathyroïdie : **risque d'hypercalcémie**", "Le dosage de référence est la **25-OH-D**", "**Calcium** : à distance (2 heures) de la lévothyroxine, du fer, des bisphosphonates, des cyclines et des fluoroquinolones", "Surdosage : hypercalcémie (nausées, soif, polyurie, confusion)"],
    groupes: [
      { titre: "Formes natives", mols: [
        molc("Cholécalciférol (D3)", "ZymaD (gouttes, ampoules), ZymaDuo (+ fluor), Uvédose, Adrigyl", ["Gouttes quotidiennes chez l'enfant ; ampoules espacées chez l'adulte", "Prise avec un repas contenant des graisses"], "cholecalciferol"),
        molc("Ergocalciférol (D2)", "Stérogyl (gouttes)", [])
      ] },
      { titre: "Formes hydroxylées", mols: [
        molc("Calcifédiol (25-OH-D3)", "Dédrogyl", ["Ne nécessite pas l'hydroxylation hépatique"]),
        molc("Calcitriol (1,25-(OH)2-D3)", "Rocaltrol", ["Forme **active** : insuffisance rénale chronique ; calcémie à surveiller"]),
        molc("Alfacalcidol", "Un-Alfa", ["Hydroxylé en 1 : activé par le foie ; mêmes indications que le calcitriol"])
      ] },
      { titre: "Associations calcium + vitamine D3", mols: [
        molc("Carbonate de calcium + cholécalciférol", "Cacit Vitamine D3, Orocal Vitamine D3, Calcidose Vitamine D, Calciprat D3", ["Souvent 1 000 mg de calcium + 800 à 880 UI de D3 par jour", "Constipation ; prise au milieu du repas"])
      ] }
    ] },

  /* ---------------- Digestif ---------------- */
  { id: "ipp", nom: "Inhibiteurs de la pompe à protons (IPP)", famille: "gastro", ref: "omeprazole", fiches: ["omeprazole"],
    principe: ["Prodrogues activées en milieu acide → blocage **irréversible** de la **H+/K+-ATPase** de la cellule pariétale → sécrétion acide ↓", "Les pompes doivent être actives : prise **avant un repas** (le matin, 30 minutes avant le petit-déjeuner)"],
    classe: ["Formes **gastrorésistantes** : avaler sans croquer (certaines gélules peuvent être ouvertes, granules dans un liquide acide)", "Au long cours : **hypomagnésémie**, carence en **vitamine B12**, fractures, infections digestives (C. difficile)", "**Réévaluer** l'indication : beaucoup de prescriptions sont sans indication durable", "Absorption ↓ des médicaments qui ont besoin d'acidité (kétoconazole, itraconazole, cefpodoxime, fer)"],
    groupes: [
      { titre: "Molécules", note: "Différence principale : l'inhibition du **CYP2C19**.", mols: [
        molc("Oméprazole", "Mopral, Zoltum ; Mopralpro (automédication)", ["Inhibiteur du **CYP2C19** : **clopidogrel** déconseillé ; méthotrexate"], "omeprazole"),
        molc("Ésoméprazole", "Inexium", ["Énantiomère de l'oméprazole : mêmes interactions (**clopidogrel** déconseillé)"]),
        molc("Pantoprazole", "Eupantol, Inipomp", ["**Moins d'interactions** CYP2C19 : choix avec le **clopidogrel**"]),
        molc("Lansoprazole", "Lanzor, Ogast, Ogastoro (orodispersible)", ["Forme orodispersible"]),
        molc("Rabéprazole", "Pariet", ["Activation moins dépendante du CYP2C19"])
      ] }
    ] },

  { id: "asa5", nom: "Aminosalicylés (5-ASA)", famille: "gastro", ref: "mesalazine", fiches: ["mesalazine"],
    principe: ["Acide **5-aminosalicylique** → action anti-inflammatoire **locale** sur la muqueuse colique", "Formes galéniques conçues pour libérer le principe actif dans l'**intestin** (pH-dépendantes, microgranules, voie rectale)"],
    classe: ["Rectocolite hémorragique surtout (traitement d'attaque et d'entretien)", "**Néphrotoxicité** (néphrite interstitielle) : créatinine régulièrement", "Formes **non interchangeables** (libération différente)", "Toxicité hématologique rare : NFS"],
    groupes: [
      { titre: "Molécules", mols: [
        molc("Mésalazine", "Pentasa (comprimés, granulés, suppositoires, lavements), Rowasa, Fivasa, Mezavant", ["Voie **rectale** pour les formes distales (rectite)", "Comprimés gastrorésistants : avaler entiers"], "mesalazine"),
        molc("Sulfasalazine", "Salazopyrine", ["Sulfapyridine + 5-ASA : effets d'un **sulfamide** (allergie, hémolyse en cas de déficit en G6PD)", "**Coloration orangée** des urines et des **lentilles** ; oligospermie réversible ; carence en folates", "Aussi en rhumatologie (polyarthrite)"]),
        molc("Olsalazine", "Dipentum", ["Diarrhée ; commercialisation à vérifier"])
      ] }
    ] },

  /* ---------------- Allergie et urgences ---------------- */
  { id: "antih1", nom: "Antihistaminiques H1", famille: "allergie", ref: "doxylamine", fiches: ["doxylamine"],
    principe: ["Antagonistes (agonistes inverses) des récepteurs **H1** → prurit, rhinorrhée, éternuements, urticaire ↓", "1re génération : passent la **barrière hémato-encéphalique** → **sédation**, et bloquent les récepteurs **muscariniques** → effets **atropiniques**", "2e génération : peu de passage cérébral, peu ou pas d'effet atropinique"],
    classe: ["1re génération : **contre-indiqués** dans le glaucome à angle fermé et la rétention urinaire (adénome prostatique)", "Sujet âgé : **éviter la 1re génération** (confusion, chutes, rétention)", "Somnolence : prudence en conduisant ; pas d'alcool", "Certains allongent le **QT** (hydroxyzine, méquitazine, mizolastine)"],
    groupes: [
      { titre: "1re génération (sédatifs, atropiniques)", mols: [
        molc("Doxylamine", "Donormyl, Lidène", ["Insomnie occasionnelle de l'adulte : **2 à 5 jours**"], "doxylamine"),
        molc("Hydroxyzine", "Atarax", ["Anxiété, prurit ; **allongement du QT** : dose maximale réduite, à éviter chez le sujet âgé"]),
        molc("Dexchlorphéniramine", "Polaramine (comprimés, injectable)", ["Urgence allergique (injectable)"]),
        molc("Prométhazine", "Phénergan", ["Phénothiazine, très sédatif"]),
        molc("Méquitazine", "Primalan", ["QT"]),
        molc("Diphénhydramine, dimenhydrinate", "Nautamine, Mercalm, Nausicalm", ["**Mal des transports**"])
      ] },
      { titre: "2e génération", note: "Rhinite allergique, urticaire. Une prise par jour.", mols: [
        molc("Cétirizine", "Zyrtec, Virlix", ["Dès 2 ans (gouttes) ; un peu sédative chez certains"]),
        molc("Lévocétirizine", "Xyzall", ["Énantiomère de la cétirizine"]),
        molc("Loratadine", "Clarityne", ["Peu sédative"]),
        molc("Desloratadine", "Aerius", ["Métabolite de la loratadine"]),
        molc("Fexofénadine", "Telfast", ["**Jus de fruits** (pamplemousse, orange, pomme) : absorption ↓"]),
        molc("Bilastine", "Inorial, Bilaska", ["À prendre **à jeun** (1 heure avant ou 2 heures après un repas ou un jus de fruits)"]),
        molc("Ébastine", "Kestin", []),
        molc("Rupatadine", "Wystamm", ["Substrat du CYP3A4"])
      ] }
    ] },

  { id: "adre", nom: "Adrénaline auto-injectable", famille: "allergie", ref: "adrenaline", fiches: ["adrenaline"],
    principe: ["Agoniste **α1** → vasoconstriction → pression artérielle ↑, œdème ↓", "Agoniste **β1** → débit cardiaque ↑ ; **β2** → **bronchodilatation**, libération des médiateurs ↓"],
    classe: ["**Anaphylaxie** : injecter **sans attendre**, face **antérolatérale de la cuisse**, à travers les vêtements si besoin", "Appeler le **15** (ou 112) ; allonger (jambes surélevées), assis si gêne respiratoire", "2e injection après **5 à 15 minutes** si pas d'amélioration : toujours **2 stylos** sur soi", "Dose : **150 µg** de 15 à 30 kg, **300 µg** au-delà (500 µg possible chez l'adulte lourd selon le stylo)", "Vérifier la **date de péremption** ; ne pas exposer au froid ni à la chaleur"],
    groupes: [
      { titre: "Stylos et formes", note: "Les stylos ne s'utilisent pas tous de la même façon : faire une démonstration avec un stylo d'entraînement.", mols: [
        molc("Adrénaline", "Anapen (150, 300, 500 µg)", ["Retirer les deux capuchons ; maintenir **10 secondes**"], "adrenaline"),
        molc("Adrénaline", "EpiPen (150, 300 µg)", ["Capuchon bleu retiré, embout orange sur la cuisse ; maintenir **3 secondes** (à vérifier sur la notice actuelle)"]),
        molc("Adrénaline", "Jext (150, 300 µg)", ["Maintenir **10 secondes**"]),
        molc("Adrénaline (spray nasal)", "EURneffy", ["AMM européenne en 2024 ; commercialisation en France à vérifier"])
      ] }
    ] },

  /* ---------------- Contraception ---------------- */
  { id: "contra", nom: "Contraception hormonale", famille: "femme", ref: "estroprogestatif", fiches: ["estroprogestatif"],
    principe: ["Estroprogestatifs : **ovulation bloquée** (rétrocontrôle sur FSH et LH) + glaire épaissie + endomètre atrophié", "Progestatifs seuls : surtout **glaire** imperméable (microprogestatifs), ovulation bloquée (désogestrel, implant)", "Le **progestatif** définit la « génération » ; l'**éthinylestradiol** porte l'essentiel du risque thrombotique"],
    classe: ["Estroprogestatifs : **risque thromboembolique veineux** (plus élevé avec 3e et 4e générations) et artériel (**tabac** après 35 ans, migraine avec aura)", "**Inducteurs enzymatiques** (rifampicine, carbamazépine, millepertuis…) : efficacité ↓ → DIU au cuivre", "Oubli : délai propre à chaque pilule (**12 heures** pour la plupart, 3 heures pour certains microprogestatifs)", "Vomissements ou diarrhée dans les 3 à 4 heures : considérer comme un oubli"],
    groupes: [
      { titre: "Estroprogestatifs oraux", mols: [
        molc("Éthinylestradiol + lévonorgestrel (2e génération)", "Minidril, Leeloo, Optilova, Trinordiol", ["**1re intention** (risque thrombotique le plus faible)"], "estroprogestatif"),
        molc("Éthinylestradiol + désogestrel ou gestodène (3e génération)", "Varnoline, Mercilon, Harmonet, Mélodia", ["Risque thrombotique plus élevé"]),
        molc("Éthinylestradiol + drospirénone (4e génération)", "Jasmine, Jasminelle, Yaz", ["Effet **antiminéralocorticoïde** : kaliémie si IEC, épargneurs"]),
        molc("Estradiol + nomégestrol ; estradiol + diénogest", "Zoely ; Qlaira", ["**Estradiol** naturel au lieu de l'éthinylestradiol"]),
        molc("Estétrol + drospirénone", "Drovelis", [])
      ] },
      { titre: "Autres voies estroprogestatives", mols: [
        molc("Patch", "Evra", ["Un patch par semaine pendant 3 semaines"]),
        molc("Anneau vaginal", "Nuvaring, Etoring", ["3 semaines en place, 1 semaine sans"])
      ] },
      { titre: "Progestatifs seuls", note: "Possibles quand les œstrogènes sont contre-indiqués (thrombose, tabac après 35 ans, allaitement).", mols: [
        molc("Désogestrel", "Cérazette, Antigone", ["**En continu** ; oubli toléré 12 heures", "Saignements irréguliers"]),
        molc("Drospirénone seule", "Slinda", ["24 + 4 comprimés"]),
        molc("Implant d'étonogestrel", "Nexplanon", ["**3 ans** ; inducteurs : efficacité ↓"]),
        molc("DIU au lévonorgestrel", "Mirena, Donasert, Kyleena, Jaydess", ["De 3 à 8 ans selon le dispositif"])
      ] },
      { titre: "Contraception d'urgence", mols: [
        molc("Lévonorgestrel 1,5 mg", "Norlevo", ["Jusqu'à **72 heures** ; sans ordonnance, gratuite"]),
        molc("Ulipristal 30 mg", "EllaOne", ["Jusqu'à **120 heures** ; reprendre la pilule **5 jours après** (sinon efficacité ↓)"])
      ] }
    ] },

  /* ---------------- Urologie ---------------- */
  { id: "antimusc", nom: "Antimuscariniques urinaires", famille: "uro", ref: "solifenacine", fiches: ["solifenacine"],
    principe: ["Récepteurs muscariniques **M3** du détrusor bloqués → contractions involontaires ↓ → **urgenturies** ↓ (vessie hyperactive)", "Blocage muscarinique ailleurs → **bouche sèche, constipation**, vision floue, tachycardie, **confusion**"],
    classe: ["**Contre-indiqués** : glaucome à angle fermé, rétention urinaire, myasthénie, colite sévère", "**Charge anticholinergique** chez le sujet âgé : confusion, chutes, déclin cognitif (cumul avec d'autres atropiniques)", "Évaluer l'efficacité à **4 à 12 semaines**"],
    groupes: [
      { titre: "Molécules", note: "Différence principale : le passage dans le cerveau.", mols: [
        molc("Oxybutynine", "Ditropan, Driptane", ["**Passe la barrière hémato-encéphalique** : à éviter chez le sujet âgé (confusion)"]),
        molc("Solifénacine", "Vesicare", ["Une prise par jour ; substrat du CYP3A4 (inhibiteurs puissants : 5 mg au maximum)"], "solifenacine"),
        molc("Toltérodine", "Détrusitol", ["CYP2D6 et 3A4"]),
        molc("Fésotérodine", "Toviaz", ["Prodrogue (métabolite actif de la toltérodine)"]),
        molc("Trospium", "Céris", ["**Ammonium quaternaire** : passe peu dans le cerveau", "À prendre **à jeun** ; élimination rénale"])
      ] }
    ] },

  /* ---------------- Cancérologie ---------------- */
  { id: "fluoropyr", nom: "Fluoropyrimidines", famille: "onco", ref: "capecitabine", fiches: ["capecitabine"],
    principe: ["5-FU → métabolites qui bloquent la **thymidylate synthase** et s'incorporent à l'ARN et l'ADN → cellules en division tuées", "Le 5-FU est dégradé à 80 % par la **DPD** → déficit en DPD → **accumulation, toxicité grave**"],
    classe: ["**Uracilémie** obligatoire avant la 1re dose ; mention « **résultats uracilémie pris en compte** » sur l'ordonnance", "**Syndrome main-pied**, mucite, diarrhée, neutropénie", "**AVK** (INR ↑), phénytoïne : interactions", "Brivudine (Zostex) : **contre-indication absolue** (inhibe la DPD)"],
    groupes: [
      { titre: "Molécules", mols: [
        molc("Capécitabine", "Xeloda", ["**Prodrogue orale** du 5-FU ; dans les **30 minutes après** le repas", "Avaler sans écraser ; se laver les mains après manipulation"], "capecitabine"),
        molc("Fluorouracile (5-FU)", "Injectable ; Efudix (crème)", ["Perfusion à l'hôpital (schémas FOLFOX, FOLFIRI)", "Crème : kératoses actiniques (pas de recherche d'uracilémie)"]),
        molc("Trifluridine + tipiracil", "Lonsurf", ["Cancer colorectal métastatique ; **non dégradé par la DPD**", "Neutropénie"])
      ] }
    ] },

  /* ---------------- Phytothérapie ---------------- */
  { id: "phyto", nom: "Phytothérapie (humeur, anxiété, sommeil)", famille: "phyto", ref: "millepertuis", fiches: ["millepertuis"],
    principe: ["Millepertuis (hyperforine) : recapture de la sérotonine ↓ → effet antidépresseur léger", "Hyperforine → récepteur **PXR** activé → **CYP3A4 et P-gp ↑** → **inducteur puissant**"],
    classe: ["« Naturel » ne veut pas dire sans risque : **toujours demander** la phytothérapie et les compléments", "Millepertuis : **contre-indiqué** avec contraception hormonale, AOD, AVK, immunosuppresseurs, antirétroviraux, ISRS", "Plantes sédatives : somnolence additive avec benzodiazépines et alcool"],
    groupes: [
      { titre: "Plantes et apparentés", mols: [
        molc("Millepertuis (Hypericum perforatum)", "Mildac ; nombreux compléments alimentaires", ["Dépression légère ; **inducteur puissant** (voir ci-dessus)", "**Photosensibilisation**"], "millepertuis"),
        molc("Valériane", "Spécialités et compléments ; Euphytose (association)", ["Troubles mineurs du sommeil ; somnolence"]),
        molc("Passiflore", "Spécialités, Euphytose (association)", ["Nervosité, anxiété légère"]),
        molc("Aubépine", "Spécialités et compléments", ["Palpitations, nervosité ; prudence avec les médicaments cardiaques"]),
        molc("Eschscholtzia", "Spécialités et compléments", ["Troubles mineurs du sommeil"]),
        molc("Mélatonine", "Circadin 2 mg LP (sur ordonnance) ; compléments", ["**Insomnie du sujet de 55 ans ou plus** (Circadin)", "Fluvoxamine : mélatonine ↑ (CYP1A2)"])
      ] }
    ] }
];

/* Classe de chaque fiche détaillée. */
const CLASSE_DE = {};
CLASSES.forEach((c) => c.fiches.forEach((d) => { CLASSE_DE[d] = c.id; }));
CLASSES.forEach((c) => { c.statut = "a_verifier"; c.note = NOTE_CLASSE + "La fiche détaillée de référence garde son propre statut."; c.sources = ["bdpm"]; });

DATA.CLASSES = CLASSES; DATA.FAMILLES = FAMILLES; DATA.CLASSE_DE = CLASSE_DE;
