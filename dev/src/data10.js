/* Lot 10 : les sept ordonnances de l'ED de Mme Freppel (femme jeune, pathologies chroniques et grossesse)
   et l'ordonnance de capécitabine de l'annale 2021-22. Seize nouveaux médicaments, tous en fiche détaillée.
   La correction de l'ED est reprise quand elle existe ; ce que l'ED ne traite pas est construit et signalé. */
Object.assign(SRC, {
  ansmDpd: { label: "Chimiothérapies à base de 5-FU ou capécitabine : recherche obligatoire du déficit en DPD, ANSM (2019, rappel 2023)", url: "https://ansm.sante.fr/actualites/chimiotherapies-a-base-de-5-fu-ou-capecitabine-la-recherche-dun-deficit-en-dpd-dihydropyrimidine-deshydrogenase-est-obligatoire-avant-tout-debut-de-traitement" },
  carbimazoleAnsm: { label: "Carbimazole, thiamazole : pancréatite aiguë et malformations congénitales, lettre aux professionnels de santé, ANSM (2019)", url: "https://archive.ansm.sante.fr/content/download/156181/2048767/version/1/file/Dhpc-190205-Carbimazole.pdf" },
  carbimazoleVidal: { label: "Néo-Mercazole, monographie Vidal", url: "https://www.vidal.fr/Medicament/neo_mercazole-11579-indications.htm" },
  atsRevPrat: { label: "Surveillance d'un patient sous antithyroïdiens de synthèse, La Revue du Praticien", url: "https://www.larevuedupraticien.fr/article/surveillance-dun-patient-sous-antithyroidiens-de-synthese" },
  lithiumGrossesse: { label: "Lithium pendant la grossesse (étude du Lancet Psychiatry et position du CRAT), Le Quotidien du Médecin", url: "https://www.lequotidiendumedecin.fr/actus-medicales/medicament/lithium-pendant-la-grossesse-des-malformations-foetales-mais-moins-quon-pensait-et-pas-cardiaques" }
});
Object.assign(DOMAINES, { gastro: { label: "Gastro-entérologie" } });
Object.assign(NOTIONS, {
  "surveillance-bio": "Surveillance clinique et biologique d'un traitement",
  "contraception": "Contraception : interactions et terrain",
  "corticotherapie": "Corticothérapie orale",
  "insuline": "Insulinothérapie",
  "lithium": "Lithium et antidépresseurs",
  "migraine": "Migraine et triptans",
  "chimio-orale": "Chimiothérapie orale",
  "thyroide": "Hyperthyroïdie et antithyroïdiens"
});

Object.assign(RAPPELS, {
  "teratogenes-femme": {
    titre: "Femme en âge de procréer : les traitements qui imposent une contraception",
    intro: "Chez une femme jeune, chaque ordonnance se lit avec deux questions : quelle contraception, et y a-t-il un projet de grossesse ? Les médicaments ci-dessous sont ceux des ED de Mme Freppel.",
    colonnes: ["Médicament", "Risque", "Ce que fait le pharmacien"],
    lignes: [
      ["**Tériflunomide** (Aubagio)", "Contre-indiqué pendant la grossesse ; **demi-vie très longue** (cycle entéro-hépatique)", "Contraception vérifiée à chaque délivrance ; projet de grossesse → **procédure d'élimination accélérée** (colestyramine)"],
      ["**Lithium** (Téralithe)", "Malformations, surtout **cardiaques** (maladie d'Ebstein)", "Contraception ; projet de grossesse → consultation préconceptionnelle, lithémies rapprochées"],
      ["**Carbimazole** (Néo-Mercazole)", "Malformations au **1er trimestre** (aplasie du cuir chevelu…)", "Contraception efficace ; grossesse envisagée → endocrinologue, **propylthiouracile** au 1er trimestre"],
      ["**Valproate, topiramate**", "Les deux antiépileptiques **à proscrire** chez la femme enceinte", "Valproate : accord de soins et contraception obligatoires"],
      ["**Lamotrigine**", "Antiépileptique **de référence** pendant la grossesse", "Mais **interaction avec la pilule** : concentration divisée par deux"],
      ["**Millepertuis**", "Inducteur : **échec de la pilule**", "Le déconseiller dès qu'une contraception hormonale est en cours"]
    ],
    reflexe: "Réflexe : femme jeune + traitement chronique → contraception (laquelle, prise régulièrement ?), projet de grossesse, et le CRAT.",
    statut: "partiel", note: "Synthèse des ED de Mme Freppel ; les points de grossesse sont à confirmer sur le CRAT, molécule par molécule.", sources: ["edFreppel", "crat", "carbimazoleAnsm"]
  }
});

/* ---------- Médicaments : entrée de comptoir ---------- */
Object.assign(DRUGS, {
  solifenacine: { dci: "Solifénacine", classe: "Antimuscarinique urinaire (anticholinergique)", domaine: "neuro",
    poso: ["**5 mg** une fois par jour, **10 mg** au maximum", "**5 mg au maximum** : insuffisance rénale sévère, insuffisance hépatique modérée, inhibiteur puissant du CYP3A4"],
    alertes: ["Effets **atropiniques** : bouche sèche, constipation, rétention urinaire, troubles visuels, confusion", "Contre-indiquée : **glaucome à angle fermé**, rétention urinaire, myasthénie", "Demi-vie **très longue** (45 à 68 heures)"],
    conseils: ["Une prise par jour, avec ou sans repas", "Constipation, bouche sèche : fréquentes", "Difficulté à uriner, douleur de l'œil : consulter"],
    statut: "partiel", note: "Fiche de l'ED de Mme Freppel complétée par le RCP (à relire).", sources: ["edFreppel", "rcpBase"] },
  teriflunomide: { dci: "Tériflunomide", classe: "Immunomodulateur de la sclérose en plaques", domaine: "neuro",
    poso: ["**14 mg** une fois par jour (adulte, et enfant de plus de 40 kg)", "**7 mg** par jour chez l'enfant de 40 kg ou moins"],
    alertes: ["**Contre-indiqué pendant la grossesse** : contraception efficace obligatoire", "**Élimination très lente** : 8 mois en moyenne, jusqu'à 2 ans", "Projet de grossesse : **procédure d'élimination accélérée** (colestyramine)", "Surveillance : **transaminases**, **NFS**, **tension**"],
    conseils: ["Une prise par jour, avec ou sans repas", "Ne pas oublier la contraception", "Fièvre, toux, infection : consulter", "Pas de vaccin vivant sans avis"],
    statut: "partiel", note: "Points du cours (ED de Mme Freppel) et du CRAT ; rythme de surveillance à relire sur le RCP.", sources: ["edFreppel", "crat", "rcpBase"] },
  propranolol: { dci: "Propranolol", classe: "Bêtabloquant **non cardiosélectif**, sans activité sympathomimétique intrinsèque", domaine: "cardio",
    poso: ["**Instauration progressive** ; dose selon l'indication", "Tremblement, migraine : 40 mg par jour au départ, à augmenter (doses à vérifier sur le RCP)"],
    alertes: ["**Contre-indiqué dans l'asthme** (non cardiosélectif) : **bronchospasme**", "**Bradycardie**, hypotension, Raynaud", "**Masque les signes d'hypoglycémie** (diabétique sous insuline)", "Cauchemars (lipophile)", "Pas d'arrêt brutal"],
    conseils: ["Ne jamais arrêter d'un coup", "Essoufflement, sifflement : consulter", "Diabétique : contrôler la glycémie plus souvent, les palpitations ne préviennent plus de l'hypoglycémie"],
    statut: "partiel", note: "Mécanisme et effets indésirables de l'ED de Mme Freppel ; posologies par indication à relire sur le RCP.", sources: ["edFreppel", "rcpBase"] },
  estroprogestatif: { dci: "Éthinylestradiol + lévonorgestrel", classe: "Contraceptif estroprogestatif oral de 2e génération", domaine: "grossesse",
    poso: ["**1 comprimé par jour** à heure fixe, **21 jours**, puis **7 jours d'arrêt**", "Minidril : monophasique ; Trinordiol : triphasique (respecter l'ordre des comprimés)"],
    alertes: ["**Risque thromboembolique** veineux et artériel : tabac, âge, migraine avec aura, HTA", "**Millepertuis : contre-indiqué** (échec)", "**Inducteurs enzymatiques** : association déconseillée", "**Lamotrigine** : concentration de lamotrigine divisée par deux"],
    conseils: ["Oubli de **moins de 12 heures** : prendre le comprimé, continuer normalement", "Oubli de **plus de 12 heures** : prendre le comprimé, **préservatif 7 jours** ; rapport dans les 5 jours précédents → contraception d'urgence", "Douleur, gonflement d'un mollet, essoufflement, douleur thoracique : urgence"],
    statut: "partiel", note: "Règles d'oubli et contre-indications classiques ; à relire sur le RCP et les recommandations HAS.", sources: ["edFreppel", "hasContra", "thesaurus"] },
  mesalazine: { dci: "Mésalazine", classe: "Anti-inflammatoire intestinal, 5-ASA (acide 5-aminosalicylique)", domaine: "gastro",
    poso: ["Poussée de RCH : jusqu'à **4 g par jour**", "Entretien : **2 g par jour** environ"],
    alertes: ["**Néphrite interstitielle** : créatinine avant puis régulièrement", "Allergie aux **salicylés** : contre-indiquée", "Rares : pancréatite, péricardite, troubles hématologiques"],
    conseils: ["Comprimé avalé entier ou dispersé dans l'eau, **ne pas croquer**", "Faire les prises de sang prévues", "Fièvre, douleur thoracique, saignements : consulter"],
    statut: "partiel", note: "Fiche de l'ED de Mme Freppel complétée par le RCP (doses à relire).", sources: ["edFreppel", "rcpBase"] },
  prednisone: { dci: "Prednisone", classe: "Glucocorticoïde (corticoïde de synthèse)", domaine: "rhumato",
    poso: ["Dose d'attaque puis **décroissance progressive**", "MICI : de l'ordre de 40 mg/j au départ (ici 40 → 5 mg sur 5 semaines)"],
    alertes: ["Mnémotechnique **COR TICOIDES** : cutané, ostéoporose, rétention hydrosodée, triglycérides, infections, cataracte, obésité, insuffisance surrénalienne, diabète, état psychique, sevrage", "Sur 5 semaines : **ne pas évoquer** la bosse de bison ni l'insuffisance surrénalienne", "**Pas d'arrêt brutal** après un traitement prolongé"],
    conseils: ["Une prise **le matin**, au cours du repas", "Respecter le schéma de décroissance", "Insomnie, excitation, appétit augmenté : possibles"],
    statut: "partiel", note: "Points de l'ED de Mme Freppel ; seuils de sevrage et de vaccination à relire sur le RCP.", sources: ["edFreppel", "rcpBase"] },
  cholecalciferol: { dci: "Cholécalciférol (vitamine D3)", classe: "Vitamine D", domaine: "rhumato",
    poso: ["Uvédose **100 000 UI** : une ampoule, schéma selon le prescripteur (souvent tous les 3 mois)", "**Ne pas dépasser 600 000 UI par an**"],
    alertes: ["Surdosage : **hypercalcémie**, lithiase calcique", "Insuffisance rénale terminale : pas d'activation rénale → **alfacalcidol** (Un-Alfa)", "Vérifier les autres apports (lait enrichi, compléments)"],
    conseils: ["Ampoule bue pure ou dans un peu de liquide, de préférence **au cours d'un repas**", "Noter la date de prise"],
    statut: "partiel", note: "Points de l'ED de Mme Freppel ; schémas posologiques à relire sur le RCP.", sources: ["edFreppel", "rcpBase"] },
  carbimazole: { dci: "Carbimazole", classe: "Antithyroïdien de synthèse (dérivé imidazolé)", domaine: "endocrino",
    poso: ["Attaque : 20 à 60 mg/j selon la sévérité", "Puis dose réduite dès l'euthyroïdie ; lévothyroxine ajoutée si besoin"],
    alertes: ["**Agranulocytose** : fièvre, mal de gorge, ulcérations buccales → **arrêt et NFS en urgence**", "**Malformations** au 1er trimestre : contraception efficace", "Hépatite cholestatique, **pancréatite aiguë**"],
    conseils: ["Fièvre au-delà de 38 °C, frissons, angine : **NFS le jour même** et prévenir le médecin", "Faire les bilans prévus (NFS, bilan hépatique, T4 libre)", "Projet de grossesse : en parler à l'endocrinologue avant"],
    statut: "verifie", note: "Agranulocytose, grossesse et pancréatite lus dans le Vidal et la lettre de l'ANSM ; doses d'attaque à relire sur le RCP.", sources: ["edFreppel", "carbimazoleVidal", "carbimazoleAnsm"] },
  "insuline-glargine": { dci: "Insuline glargine", classe: "Analogue lent de l'insuline (insuline basale)", domaine: "endocrino",
    poso: ["**Une injection par jour, à la même heure**", "Dose individuelle, adaptée sur la **glycémie à jeun**"],
    alertes: ["**Hypoglycémie**", "**Lipodystrophie** : changer de site", "Bêtabloquant non cardiosélectif : masque l'hypoglycémie"],
    conseils: ["Avant ouverture : réfrigérateur (2 à 8 °C), **ne pas congeler**", "Stylo en cours : à température ambiante (sous 30 °C), **28 jours**", "Toujours avoir du sucre sur soi"],
    statut: "partiel", note: "Points de l'ED de Mme Freppel et du RCP d'Abasaglar (durées de conservation à relire).", sources: ["edFreppel", "rcpBase"] },
  "insuline-asparte": { dci: "Insuline asparte", classe: "Analogue rapide de l'insuline (insuline prandiale)", domaine: "endocrino",
    poso: ["Injection **juste avant le repas** (0 à 10 minutes)", "Dose adaptée sur les glycémies **pré et post-prandiales** et le repas"],
    alertes: ["**Hypoglycémie**, surtout si le repas est sauté", "Lipodystrophie", "Bêtabloquant non cardiosélectif : masque l'hypoglycémie"],
    conseils: ["Pas de repas, pas d'injection", "Conservation : comme l'insuline lente ; stylo entamé **4 semaines** sous 30 °C", "Reboucher le stylo (sensible à la lumière)"],
    statut: "partiel", note: "Points de l'ED de Mme Freppel ; délais d'action et conservation à relire sur le RCP de NovoRapid.", sources: ["edFreppel", "rcpBase"] },
  lacosamide: { dci: "Lacosamide", classe: "Antiépileptique (canaux sodiques)", domaine: "neuro",
    poso: ["Adulte : 50 mg deux fois par jour au départ, paliers hebdomadaires", "Arrêt **progressif** (comme ici : paliers de 7 jours)"],
    alertes: ["**Vertiges**, diplopie, céphalées", "**Allongement du PR**, bloc auriculoventriculaire", "Idées suicidaires (classe des antiépileptiques)"],
    conseils: ["Ne pas arrêter brutalement : risque de crises", "Vertiges : prudence au volant", "Malaise, palpitations : consulter"],
    statut: "partiel", note: "Points de l'ED de Mme Freppel ; doses à relire sur le RCP.", sources: ["edFreppel", "rcpBase"] },
  clobazam: { dci: "Clobazam", classe: "Benzodiazépine (1,5-benzodiazépine)", domaine: "psy",
    poso: ["Anxiété : 5 à 30 mg/j ; **12 semaines au maximum**, sevrage compris", "Épilepsie (en association) : durée non limitée"],
    alertes: ["**Dépendance**, tolérance, sevrage", "**Amnésie antérograde**, somnolence", "**Dépression respiratoire** avec alcool ou opioïdes"],
    conseils: ["Pas d'alcool", "Prudence au volant", "Ne pas arrêter brutalement après une prise régulière"],
    statut: "partiel", note: "Points de l'ED de Mme Freppel (« non dit cette année ») ; durée et doses à relire sur le RCP.", sources: ["edFreppel", "rcpBase"] },
  lithium: { dci: "Lithium (carbonate)", classe: "Thymorégulateur, **marge thérapeutique étroite**", domaine: "psy",
    poso: ["Dose adaptée sur la **lithémie**", "Téralithe LP 400 : lithémie cible **0,8 à 1,2 mmol/L**, **12 heures** après la prise du soir"],
    alertes: ["Mnémotechnique **LITR** : liquide (soif, polyurie), irrégularités cardiaques, thyroïde, rein", "Surdosage : tremblement grossier, diarrhée, vomissements, confusion → **lithémie en urgence**", "**AINS, IEC, sartans, diurétiques** : lithémie qui monte", "**Tératogène** : contraception"],
    conseils: ["Boire normalement, **ne pas supprimer le sel**", "Diarrhée, vomissements, fièvre, canicule : risque de surdosage, prévenir", "Pas d'AINS en automédication", "Faire les lithémies prévues"],
    statut: "partiel", note: "Points de l'ED de Mme Freppel ; cible et rythme des lithémies à relire sur le RCP.", sources: ["edFreppel", "rcpBase", "thesaurus"] },
  venlafaxine: { dci: "Venlafaxine", classe: "Antidépresseur inhibiteur de la recapture de la sérotonine et de la noradrénaline (IRSNA)", domaine: "psy",
    poso: ["**75 mg** une fois par jour, au cours d'un repas", "Paliers de 75 mg toutes les 2 semaines au moins si besoin"],
    alertes: ["**Levée d'inhibition** : risque suicidaire les premières semaines", "**Syndrome sérotoninergique** : tramadol, triptans, lithium, millepertuis", "**IMAO : contre-indiqués**", "Hypertension dose-dépendante, **sevrage marqué**", "Trouble bipolaire : **virage maniaque**"],
    conseils: ["Effet en 2 à 4 semaines, ne pas arrêter seul", "Arrêt **très progressif**", "Agitation, fièvre, tremblements, diarrhée : consulter"],
    statut: "partiel", note: "Points de l'ED de Mme Freppel ; doses et seuils à relire sur le RCP.", sources: ["edFreppel", "rcpBase"] },
  zolmitriptan: { dci: "Zolmitriptan", classe: "Triptan, agoniste des récepteurs sérotoninergiques **5-HT1B/1D**", domaine: "neuro",
    poso: ["**2,5 mg** dès le début de la céphalée", "Récidive : 2e prise **au moins 2 heures** après", "Ici : **2 prises par jour au maximum**"],
    alertes: ["Contre-indiqué : **HTA non contrôlée**, coronaropathie, **antécédent d'AVC**, artériopathie", "**IMAO-A (moclobémide) : contre-indiqué**", "Prises répétées : **céphalées par abus médicamenteux**"],
    conseils: ["Prendre **dès la céphalée**, pas pendant l'aura", "Inefficace sur 3 crises : en parler au médecin", "Tenir un **carnet de crises**"],
    statut: "verifie", note: "Contre-indications et interaction avec le moclobémide lues dans le RCP de Zomig ; règles de prise de l'ED de Mme Freppel.", sources: ["edFreppel", "zomigRcp"] },
  capecitabine: { dci: "Capécitabine", classe: "Anticancéreux oral, **prodrogue du 5-fluorouracile** (fluoropyrimidine)", domaine: "onco",
    poso: ["Avec la radiothérapie : **825 mg/m² deux fois par jour**", "Seule : 1 250 mg/m² deux fois par jour, 14 jours sur 21"],
    alertes: ["**Uracilémie obligatoire** avant la première dose : la mention « **résultats uracilémie pris en compte** » doit figurer sur l'ordonnance", "Déficit complet en DPD : **contre-indication** (toxicité mortelle)", "**Syndrome main-pied**, diarrhée, mucite, neutropénie", "**AVK** : INR qui monte"],
    conseils: ["Dans les **30 minutes après le repas**, matin et soir, à 12 heures d'intervalle", "Avaler entier, ne pas écraser ; se laver les mains", "Oubli : **ne pas doubler** la dose suivante", "Diarrhée de plus de 4 selles par jour, fièvre, mains rouges et douloureuses : appeler le service"],
    statut: "partiel", note: "Obligation DPD vérifiée sur le site de l'ANSM ; posologie et conduite à tenir à relire sur le RCP.", sources: ["ansmDpd", "rcpBase", "annales2122"] }
});

/* ---------- Médicaments : fiches détaillées ---------- */
const NOTE_F = "Fiche détaillée : reprend l'ED de Mme Freppel, complétée par le RCP (non relu en entier). Points à relire : ";
const detailF = (id, statut, note, complet) => Object.assign(DRUGS[id], { statut, note, complet });
detailF("solifenacine", "partiel", NOTE_F + "sécabilité du comprimé à 5 mg, liste complète des interactions.", {
  identite: [["Spécialités", "Vesicare, génériques"], ["Classe", "Antimuscarinique, sélectif de la vessie"], ["Délivrance", "Liste I"], ["Formes", "Comprimés pelliculés à **5 mg** et **10 mg**"], ["Conservation", "Pas de condition particulière"]],
  mecanisme: ["**Bloque les récepteurs muscariniques** (M3) de la vessie", "Moins de contractions involontaires du détrusor", "Moins d'urgences, de fuites et de mictions", "Bloque aussi les récepteurs **ailleurs** : effets atropiniques"],
  indications: ["**Hyperactivité vésicale** : urgenturie, pollakiurie, incontinence par impériosité", "Dans la SEP : troubles urinaires, souvent parmi les **premiers symptômes**"],
  posologies: [["Adulte", "**5 mg** une fois par jour, jusqu'à **10 mg**"], ["Insuffisance rénale sévère, hépatique modérée", "**5 mg au maximum**"], ["Inhibiteur puissant du CYP3A4", "**5 mg au maximum**"]],
  plafonds: [["Kétoconazole, itraconazole, clarithromycine…", "**5 mg/j** au maximum"]],
  administration: ["Voie orale, **avec ou sans repas**", "Avaler entier avec de l'eau", "Une prise par jour, à heure fixe"],
  ci: ["**Rétention urinaire**", "**Glaucome à angle fermé**", "**Myasthénie**", "Affection digestive sévère (mégacôlon toxique)", "Insuffisance hépatique sévère, hémodialyse", "Insuffisance rénale sévère ou hépatique modérée **avec** un inhibiteur puissant du CYP3A4"],
  interactions: [["pe", "Inhibiteurs puissants du CYP3A4", "Exposition augmentée : 5 mg au maximum"], ["apec", "**Autres atropiniques**", "Effets additifs : bouche sèche, constipation, rétention, confusion"], ["apec", "Inducteurs du CYP3A4 (rifampicine, millepertuis)", "Efficacité diminuée"]],
  grossesse: { g: "pe", gTexte: "Données limitées : éviter sauf nécessité.", a: "asdec", aTexte: "Passe dans le lait chez l'animal : déconseillé.", f: "Pas de donnée chez l'humain." },
  ei: { frequents: ["**Bouche sèche**", "**Constipation**", "Vision floue", "Nausées, dyspepsie"], rares: ["Rétention urinaire", "Confusion, hallucinations (sujet âgé)", "Allongement du QT"], graves: ["**Rétention aiguë d'urine**", "Angio-œdème, anaphylaxie", "Occlusion fécale"], classe: "Classe des anticholinergiques : à éviter chez le sujet âgé (charge atropinique)." },
  surveillance: ["Efficacité à évaluer après quelques semaines", "Constipation, difficultés à uriner", "Troubles de la mémoire ou confusion"],
  cinetique: ["Bonne absorption, **non modifiée par l'alimentation**", "Métabolisme hépatique par le **CYP3A4**", "**Demi-vie très longue : 45 à 68 heures**"]
});

detailF("teriflunomide", "partiel", NOTE_F + "rythme exact du bilan hépatique, statut de médicament d'exception, niveaux d'interaction.", {
  identite: [["Spécialités", "Aubagio, génériques"], ["Classe", "Immunomodulateur, métabolite actif du léflunomide"], ["Délivrance", "Liste I ; prescription réservée au **neurologue** (renouvellement annuel selon l'ED) ; médicament d'exception selon l'ED"], ["Formes", "Comprimés pelliculés à **7 mg** et **14 mg**"], ["Conservation", "Pas de condition particulière"]],
  mecanisme: ["Inhibe la **dihydro-orotate déshydrogénase** (enzyme **mitochondriale**)", "Bloque la synthèse des **pyrimidines**", "Les **lymphocytes activés** prolifèrent moins", "Moins de poussées inflammatoires dans le système nerveux"],
  indications: ["**Sclérose en plaques récurrente-rémittente** (adulte, enfant à partir de 10 ans)"],
  posologies: [["Adulte", "**14 mg** une fois par jour"], ["Enfant de plus de 40 kg", "**14 mg** par jour"], ["Enfant de 40 kg ou moins", "**7 mg** par jour"]],
  plafonds: [],
  administration: ["Voie orale, **avec ou sans repas**", "Une prise par jour"],
  ci: ["**Grossesse**, et femme en âge de procréer **sans contraception efficace**", "**Allaitement**", "Insuffisance hépatique sévère", "Immunodépression sévère, infection active sévère", "Atteinte sévère de la moelle osseuse (anémie, leucopénie, thrombopénie importantes)", "Insuffisance rénale sévère sous dialyse, hypoprotéinémie sévère"],
  interactions: [["asdec", "**Vaccins vivants**", "Risque d'infection vaccinale"], ["apec", "Rifampicine et autres inducteurs", "Exposition au tériflunomide diminuée"], ["pe", "Rosuvastatine (substrat de BCRP)", "Exposition à la statine augmentée : dose réduite"], ["apec", "Répaglinide (CYP2C8)", "Exposition augmentée"], ["apec", "Warfarine", "INR un peu diminué : surveiller"], ["apec", "Contraceptifs oraux", "Exposition à l'éthinylestradiol **augmentée** : pas de perte d'efficacité contraceptive"]],
  grossesse: { g: "ci", gTexte: "**Contre-indiqué.** Avant une conception : arrêt et **procédure d'élimination accélérée** (colestyramine ou charbon activé, environ 11 jours), puis concentration **inférieure à 0,02 mg/L** vérifiée deux fois. Sans procédure, le CRAT donne un délai d'au moins 3,5 mois.", a: "ci", aTexte: "Contre-indiqué.", f: "La procédure d'élimination est aussi recommandée chez l'homme qui veut concevoir (à vérifier sur le RCP)." },
  ei: { frequents: ["**Diarrhée, nausées**", "**Amincissement des cheveux**", "**Élévation des transaminases**", "Céphalées, paresthésies", "**Hausse de la tension artérielle**"], rares: ["Neuropathie périphérique", "Neutropénie, lymphopénie"], graves: ["**Atteinte hépatique**", "**Infections graves**", "Réactions cutanées graves, pneumopathie interstitielle"], classe: "" },
  surveillance: ["**Avant** : NFS, transaminases, tension", "Puis **transaminases** régulièrement (rapprochées les premiers mois), **NFS** selon la clinique, **tension**", "Fièvre, toux, infection : consulter", "**Contraception** vérifiée à chaque délivrance", "**Clinique** (neurologue au moins une fois par an) et **biologique**"],
  cinetique: ["Élimination surtout **biliaire** : **cycle entéro-hépatique**", "**Demi-vie d'environ 20 jours**", "Concentration indétectable en **8 mois** en moyenne, jusqu'à **2 ans**", "La **colestyramine** (résine) interrompt le cycle et accélère l'élimination"]
});

detailF("propranolol", "partiel", NOTE_F + "posologies par indication, niveaux d'interaction.", {
  identite: [["Spécialités", "Avlocardyl, génériques (Propranolol Teva, Biogaran…)"], ["Classe", "**Antagoniste des récepteurs bêta-adrénergiques**, non cardiosélectif, sans activité sympathomimétique intrinsèque, lipophile"], ["Délivrance", "Liste I"], ["Formes", "Comprimés sécables à **40 mg** ; gélules LP à **160 mg**"], ["Conservation", "Pas de condition particulière"]],
  mecanisme: ["Bloque les récepteurs **bêta-1** (cœur) : fréquence et force de contraction diminuées", "Bloque aussi les **bêta-2** (bronches, vaisseaux) : **bronchoconstriction**", "**Sans activité sympathomimétique intrinsèque** : blocage complet, **très bradycardisant**", "**Lipophile** : passe dans le cerveau (cauchemars ; action sur le tremblement et la migraine)"],
  indications: ["**Tremblement essentiel**", "**Prophylaxie de la migraine**", "Hypertension (ni en monothérapie ni en 1re intention selon l'ED)", "Angor, post-infarctus, tachycardies", "**Manifestations cardiaques de l'hyperthyroïdie**", "Prévention de l'hémorragie digestive (hypertension portale)", "Anxiété : hors AMM"],
  posologies: [["Instauration", "**Doses progressives**, forte variabilité entre patients"], ["Tremblement, migraine", "Souvent 40 mg/j au départ, à augmenter selon la réponse (doses à relire)"], ["Hyperthyroïdie", "Jusqu'à 40 mg trois fois par jour, puis décroissance quand l'antithyroïdien agit"]],
  plafonds: [],
  administration: ["Voie orale", "Comprimé sécable", "**Jamais d'arrêt brutal** : décroissance progressive"],
  ci: ["**Asthme**, BPCO sévère", "Insuffisance cardiaque non contrôlée", "**Bloc auriculoventriculaire** de haut degré non appareillé, bradycardie importante", "**Syndrome de Raynaud** sévère, artériopathie sévère", "Phéochromocytome non traité", "Hypotension, angor de Prinzmetal"],
  interactions: [["asdec", "Fingolimod", "Bradycardie excessive"], ["pe", "**Rizatriptan**", "Exposition au triptan augmentée : dose réduite"], ["pe", "**Insulines, sulfamides**", "**Signes d'hypoglycémie masqués** (palpitations, tremblement)"], ["apec", "Vérapamil, diltiazem, amiodarone", "Bradycardie, troubles de conduction"], ["apec", "Antihypertenseurs, alpha-bloquants", "Hypotension"]],
  grossesse: { g: "ok", gTexte: "Utilisable ; en fin de grossesse, surveiller le nouveau-né (bradycardie, hypoglycémie).", a: "pe", aTexte: "Possible ; surveiller l'enfant.", f: "Pas d'effet connu." },
  ei: { frequents: ["**Fatigue**, extrémités froides", "**Cauchemars**, insomnie", "Troubles digestifs"], rares: ["Hypotension", "**Syndrome de Raynaud**", "Psoriasis aggravé"], graves: ["**Bradycardie** sévère", "**Bronchospasme**", "Intoxication volontaire : très grave (l'ANSM alerte sur les surdosages)"], classe: "Les deux effets à retenir en priorité : **bradycardie** et **bronchospasme**." },
  surveillance: ["**Pouls**, tension", "Essoufflement, sifflements", "Diabétique : glycémies", "Humeur, idées suicidaires"],
  cinetique: ["**Fort effet de premier passage hépatique**", "**Forte variabilité** entre individus", "**Demi-vie courte** (quelques heures) : plusieurs prises, ou forme LP", "Métabolisme hépatique (CYP1A2, CYP2D6)"]
});

detailF("estroprogestatif", "partiel", NOTE_F + "règles d'oubli et liste des inducteurs selon la HAS et le RCP.", {
  identite: [["Spécialités", "**Minidril** (monophasique, 30 µg + 150 µg), **Trinordiol** (triphasique), Leeloo, Optilova…"], ["Classe", "Estroprogestatif de **2e génération** (lévonorgestrel)"], ["Délivrance", "Liste I ; renouvellement possible par le pharmacien une fois, pour 6 mois au maximum (règle à vérifier)"], ["Formes", "Plaquettes de 21 comprimés"], ["Conservation", "Pas de condition particulière"]],
  mecanisme: ["Rétrocontrôle sur l'hypothalamus et l'hypophyse : **FSH et LH freinées**", "**Pas d'ovulation**", "Glaire cervicale épaissie, endomètre moins réceptif"],
  indications: ["**Contraception orale**"],
  posologies: [["Schéma", "**1 comprimé par jour, 21 jours**, puis **7 jours d'arrêt**"], ["Début", "1er jour des règles : efficace d'emblée"], ["Triphasique", "Respecter l'**ordre des comprimés** sur la plaquette"]],
  plafonds: [],
  administration: ["Voie orale, **à heure fixe**", "Vomissement ou diarrhée sévère dans les 3 à 4 heures : comme un oubli"],
  ci: ["**Antécédent de thrombose** veineuse ou artérielle, thrombophilie", "**Migraine avec aura**", "**Tabac après 35 ans**", "HTA non contrôlée, diabète compliqué, dyslipidémie sévère", "Cancer du sein, maladie hépatique sévère", "Certains antiviraux de l'hépatite C"],
  interactions: [["ci", "**Millepertuis**", "Échec de la contraception"], ["asdec", "**Inducteurs enzymatiques** (rifampicine, carbamazépine, phénytoïne…)", "Échec : méthode mécanique pendant et un cycle après"], ["asdec", "**Lamotrigine**", "Concentration de lamotrigine **divisée par deux** ; association déconseillée pendant l'ajustement de la lamotrigine, précaution d'emploi sinon"], ["asdec", "Topiramate à 200 mg/j ou plus", "Échec possible"], ["pe", "Aprépitant, bosentan, rufinamide", "Méthode mécanique pendant et un cycle après"]],
  grossesse: { g: "ok", gTexte: "Inutile pendant la grossesse ; une prise par erreur en début de grossesse **n'est pas tératogène**.", a: "asdec", aTexte: "Déconseillé pendant les premiers mois d'allaitement : préférer un progestatif.", f: "Retour de la fertilité dès l'arrêt." },
  ei: { frequents: ["Nausées, tension mammaire", "Saignements entre les règles (spotting)", "Céphalées"], rares: ["Hausse de la tension", "Modification de l'humeur, de la libido"], graves: ["**Thrombose veineuse profonde, embolie pulmonaire**", "**AVC**, infarctus (tabac, migraine avec aura)"], classe: "Le lévonorgestrel (2e génération) a le risque veineux le plus faible des pilules combinées." },
  surveillance: ["**Tension** : avant, à 3 mois, puis chaque année", "Bilan lipidique et glycémie à jeun (3 à 6 mois après le début, puis tous les 5 ans)", "Signes d'alerte : mollet gonflé, essoufflement, douleur thoracique, céphalée inhabituelle, trouble visuel ou de la parole"],
  cinetique: ["Éthinylestradiol et lévonorgestrel métabolisés par le **CYP3A4** : sensibles aux **inducteurs**", "L'éthinylestradiol induit la **glucuronoconjugaison** : d'où la baisse de la lamotrigine", "Cycle entéro-hépatique de l'éthinylestradiol"]
});

detailF("mesalazine", "partiel", NOTE_F + "doses maximales par spécialité, rythme de la surveillance rénale.", {
  identite: [["Spécialités", "**Pentasa** (comprimés 500 mg et 1 g, sachets, suppositoires, lavements), Rowasa, Fivasa"], ["Classe", "Anti-inflammatoire intestinal, **5-ASA**"], ["Délivrance", "Liste II (à vérifier)"], ["Formes", "Comprimés à libération prolongée, granulés, formes rectales"], ["Conservation", "Pas de condition particulière"]],
  mecanisme: ["Agit **localement** sur la muqueuse intestinale", "Freine les médiateurs de l'inflammation (prostaglandines, leucotriènes, NF-κB)", "Peu d'effet général : **bien toléré**"],
  indications: ["**Rectocolite hémorragique** : poussées légères à modérées, **entretien**", "Maladie de Crohn (selon la spécialité)"],
  posologies: [["Poussée", "Jusqu'à **4 g par jour**, en plusieurs prises (l'ED cite jusqu'à 6 comprimés par jour)"], ["Entretien", "**2 g par jour**"], ["Ici", "1 g matin et soir : **correct**"]],
  plafonds: [],
  administration: ["Comprimé avalé entier ou **dispersé dans de l'eau**", "**Ne pas croquer** ni écraser", "Avec ou sans repas"],
  ci: ["Hypersensibilité aux **salicylés**", "**Insuffisance rénale** sévère", "Insuffisance hépatique sévère"],
  interactions: [["apec", "Azathioprine, 6-mercaptopurine", "**Myélotoxicité** augmentée : NFS"], ["apec", "AVK", "Effet anticoagulant possiblement diminué"], ["apec", "Médicaments néphrotoxiques (AINS…)", "Risque rénal additif"]],
  grossesse: { g: "ok", gTexte: "Utilisable pendant la grossesse ; l'ED la cite en vue d'une grossesse.", a: "ok", aTexte: "Possible ; surveiller la diarrhée chez le nourrisson.", f: "Pas d'effet connu chez la femme." },
  ei: { frequents: ["Douleurs abdominales, **diarrhée**, nausées", "Céphalées", "Éruption cutanée"], rares: ["**Néphrite interstitielle**", "Pancréatite", "Péricardite, myocardite", "Atteinte hématologique"], graves: ["**Insuffisance rénale**", "Réactions cutanées graves", "Agranulocytose"], classe: "" },
  surveillance: ["**Créatinine** avant le traitement, puis régulièrement", "Bandelette urinaire", "NFS si signes (fièvre, angine, saignements)"],
  cinetique: ["Le comprimé libère des **microgranules dans le duodénum**", "Libération **tout le long du tube digestif**, environ **70 % au côlon**", "Acétylée dans la muqueuse et le foie, élimination **rénale**"]
});

detailF("prednisone", "partiel", NOTE_F + "seuils de dose et de durée (sevrage, vaccins vivants), interactions.", {
  identite: [["Spécialités", "**Cortancyl**, génériques"], ["Classe", "Glucocorticoïde de synthèse, **prodrogue de la prednisolone**"], ["Délivrance", "Liste I"], ["Formes", "Comprimés à **1, 5 et 20 mg**"], ["Conservation", "Pas de condition particulière"]],
  mecanisme: ["Transformée en **prednisolone** par le foie", "Se fixe sur les **récepteurs nucléaires des glucocorticoïdes**", "**Active** les gènes anti-inflammatoires, **réprime** les gènes pro-inflammatoires", "Plus une action **non génomique** rapide"],
  indications: ["**Poussée de MICI** (Crohn, RCH)", "Maladies inflammatoires, allergiques, auto-immunes", "Nombreuses indications rhumatologiques, respiratoires, hématologiques"],
  posologies: [["MICI", "Dose d'attaque (ici **40 mg/j**), puis **décroissance de 10 mg par semaine** jusqu'à 5 mg"], ["Règle", "La dose la plus faible et la plus courte possible"]],
  plafonds: [],
  administration: ["**Une prise le matin**, au cours du petit-déjeuner (rythme du cortisol)", "Comprimés de 20 et 5 mg combinés selon la semaine", "**Pas d'arrêt brutal** après un traitement prolongé"],
  ci: ["Infection évolutive non contrôlée (virale : herpès oculaire, varicelle, zona…)", "**Vaccins vivants** à doses immunosuppressives", "États psychotiques non contrôlés"],
  interactions: [["asdec", "**Vaccins vivants**", "Infection vaccinale (doses immunosuppressives)"], ["pe", "Inducteurs (rifampicine, carbamazépine…)", "Effet diminué"], ["pe", "**Hypokaliémiants**, médicaments torsadogènes", "Hypokaliémie, torsades de pointes"], ["apec", "**AINS**, aspirine", "Ulcère, saignement digestif"], ["apec", "Antidiabétiques", "**Glycémie qui monte**"]],
  grossesse: { g: "ok", gTexte: "Utilisable pendant la grossesse (l'ED le rappelle).", a: "ok", aTexte: "Possible.", f: "Pas d'effet connu aux doses usuelles." },
  ei: { frequents: ["**Insomnie**, excitation, appétit augmenté", "**Rétention hydrosodée**, hausse de la tension", "**Glycémie** augmentée"], rares: ["Troubles de l'humeur", "Acné"], graves: ["**Ulcère** gastroduodénal", "**Infections**", "Décompensation d'un diabète", "Au long cours : **ostéoporose**, cataracte, **insuffisance surrénalienne**, syndrome de Cushing"], classe: "Mnémotechnique de l'ED : **CORTICOIDES**. Ne citer que les effets compatibles avec la durée du traitement." },
  surveillance: ["Poids, **tension**, **glycémie**, kaliémie", "Triglycérides, LDL-cholestérol, créatinine (liste de l'ED)", "Infections, humeur, sommeil"],
  cinetique: ["**Prodrogue** : activée en prednisolone par le **foie**", "Absorption rapide", "Demi-vie plasmatique de **3 heures** environ, effet biologique plus long (12 à 36 heures)"]
});

detailF("cholecalciferol", "partiel", NOTE_F + "schémas posologiques, interactions.", {
  identite: [["Spécialités", "**Uvédose 100 000 UI**, ZymaD, Zyma 50 000 UI…"], ["Classe", "Vitamine D3"], ["Délivrance", "Liste I pour Uvédose (à vérifier)"], ["Formes", "**Ampoule buvable** de 2 mL à 100 000 UI ; gouttes"], ["Conservation", "À l'abri de la lumière"]],
  mecanisme: ["Absorbée par l'intestin", "**Foie** : 25-hydroxyvitamine D (forme de réserve, celle qu'on dose)", "**Rein** : **1,25-dihydroxyvitamine D**, forme **active**", "Absorption intestinale du **calcium** et du phosphore augmentée, os minéralisé"],
  indications: ["**Prévention et traitement de la carence** en vitamine D", "**Prévention de l'ostéoporose cortisonique** (en association)"],
  posologies: [["Uvédose", "**Une ampoule**, puis selon le prescripteur (souvent tous les 3 mois)"], ["Plafond", "**600 000 UI par an** au maximum"]],
  plafonds: [],
  administration: ["Voie orale, ampoule bue pure ou diluée", "De préférence **au cours d'un repas** (vitamine liposoluble)", "Noter la date pour ne pas répéter trop tôt"],
  ci: ["**Hypercalcémie**, hypercalciurie", "**Lithiase calcique**", "Hypersensibilité"],
  interactions: [["apec", "Diurétiques thiazidiques", "Risque d'**hypercalcémie**"], ["apec", "Digitaliques", "Hypercalcémie : toxicité du digitalique"], ["apec", "Orlistat, colestyramine", "Absorption diminuée"]],
  grossesse: { g: "ok", gTexte: "Utilisable aux doses recommandées.", a: "ok", aTexte: "Utilisable aux doses recommandées.", f: "Sans objet." },
  ei: { frequents: ["Aucun aux doses usuelles"], rares: ["Troubles digestifs"], graves: ["**Surdosage** : hypercalcémie (soif, nausées, confusion), lithiase, néphrocalcinose"], classe: "" },
  surveillance: ["Calcémie et 25-OH vitamine D si traitement prolongé ou à forte dose", "Insuffisance rénale terminale : **pas d'effet** (pas d'activation rénale) → **alfacalcidol** (Un-Alfa)"],
  cinetique: ["Stockée dans le **tissu adipeux**", "**Demi-vie longue** (l'ED donne 40 jours pour la 25-OH vitamine D)", "Activation hépatique puis rénale"]
});

detailF("carbimazole", "verifie", "Fiche détaillée. Agranulocytose, malformations et pancréatite lues dans le Vidal et la lettre de l'ANSM ; doses d'attaque et rythme de la NFS à relire sur le RCP.", {
  identite: [["Spécialités", "**Néo-Mercazole** 5 et 20 mg"], ["Classe", "Antithyroïdien de synthèse, **dérivé imidazolé** ; prodrogue du **thiamazole**"], ["Délivrance", "Liste I"], ["Formes", "Comprimés à 5 mg (tube de 50) et 20 mg (tube de 30)"], ["Conservation", "Sous 25 °C, **à l'abri de l'humidité**, tube bien fermé"]],
  mecanisme: ["Transformé en **thiamazole**", "Inhibe la **thyroperoxydase**", "Bloque l'**organification de l'iode** et le couplage", "Moins de T3 et de T4 produites ; le stock déjà formé doit s'épuiser : **délai de 3 à 6 semaines**"],
  indications: ["**Hyperthyroïdie** de l'adulte et de l'enfant, dont la **maladie de Basedow**"],
  posologies: [["Attaque", "20 à 60 mg/j selon la sévérité (ici 30 mg/j pendant 3 semaines)"], ["Entretien", "Dose réduite à l'euthyroïdie (ici 20 mg/j)"], ["Schéma « bloquer-remplacer »", "Dose maintenue + **lévothyroxine** pour éviter l'hypothyroïdie"]],
  plafonds: [],
  administration: ["Voie orale, en une ou plusieurs prises", "Avec ou sans repas"],
  ci: ["Antécédent d'**atteinte hématologique grave** sous antithyroïdien", "Antécédent de **pancréatite aiguë** sous carbimazole ou thiamazole", "Hypersensibilité"],
  interactions: [["apec", "**AVK**", "L'euthyroïdie modifie l'INR : contrôles rapprochés"], ["apec", "Médicaments myélotoxiques", "Risque hématologique additif"]],
  grossesse: { g: "asdec", gTexte: "**Malformations** possibles, surtout au **1er trimestre** et à forte dose (aplasie du cuir chevelu…) : **contraception efficace**. Projet de grossesse : **propylthiouracile** au 1er trimestre. L'ED précise que ce n'est pas une vraie contre-indication.", a: "asdec", aTexte: "Passe dans le lait : le RCP recommande de ne pas allaiter.", f: "Une légère hyperthyroïdie vaut mieux qu'une hypothyroïdie au moment de la conception (risque pour le développement de l'enfant, selon l'ED)." },
  ei: { frequents: ["Éruption cutanée, prurit", "Troubles digestifs", "Arthralgies"], rares: ["Hépatite **cholestatique**", "Perte de goût"], graves: ["**Agranulocytose** (des décès rapportés)", "Aplasie, thrombopénie", "**Pancréatite aiguë**"], classe: "" },
  surveillance: ["**NFS** avant le traitement puis régulièrement (ici à 15 jours puis tous les mois)", "**Bilan hépatique** (ASAT, ALAT, GGT, PAL)", "**T4 libre** (la TSH seule ne suffit pas au début)", "**Fièvre, angine, ulcérations buccales** : arrêt et **NFS en urgence**"],
  cinetique: ["Absorption rapide", "Conversion en **thiamazole**, la forme active", "Accumulation dans la thyroïde : **une prise par jour** suffit souvent"]
});

detailF("insuline-glargine", "partiel", NOTE_F + "durée de conservation après ouverture selon la spécialité.", {
  identite: [["Spécialités", "**Abasaglar KwikPen** (biosimilaire), Lantus, Toujeo (300 U/mL)"], ["Classe", "**Analogue lent** de l'insuline humaine"], ["Délivrance", "Liste II"], ["Formes", "Stylo prérempli **100 U/mL**, 3 mL"], ["Conservation", "Avant ouverture : **réfrigérateur 2 à 8 °C**, **ne pas congeler** ; en cours : **sous 30 °C, 28 jours**, à l'abri de la lumière"]],
  mecanisme: ["Injectée en sous-cutané, elle **précipite** au pH du tissu", "Libération **lente et régulière** : **environ 24 heures**, **sans pic**", "Couvre les besoins de **base** (production hépatique de glucose)", "L'insuline : **captation du glucose** par muscles et tissu adipeux, **production hépatique** freinée"],
  indications: ["**Diabète de type 1** (avec une insuline rapide)", "Diabète de type 2"],
  posologies: [["Diabète de type 1", "Dose individuelle, **une fois par jour à la même heure** (ici 16 UI le soir)"], ["Adaptation", "Sur la **glycémie à jeun**"]],
  plafonds: [],
  administration: ["**Sous-cutanée** : abdomen, cuisses, bras, fesses", "**Rotation des sites**, 1 cm entre deux injections, jamais dans une zone de lipodystrophie", "Mêmes zones aux mêmes heures", "**Ne pas mélanger**, jamais en intraveineuse", "**Une aiguille neuve** à chaque injection ; purge de 2 unités"],
  ci: ["Hypersensibilité"],
  interactions: [["pe", "**Bêtabloquants**", "Signes d'**hypoglycémie masqués**"], ["apec", "**Corticoïdes**, diurétiques, sympathomimétiques", "**Glycémie qui monte**"], ["apec", "**Alcool**", "Hypoglycémie"]],
  grossesse: { g: "ok", gTexte: "Utilisable : l'insuline doit être **maintenue** chez la femme en âge de procréer et pendant la grossesse.", a: "ok", aTexte: "Utilisable ; les besoins diminuent souvent.", f: "Un diabète équilibré avant la conception réduit les malformations." },
  ei: { frequents: ["**Hypoglycémie**", "**Lipodystrophie**", "Réaction au point d'injection"], rares: ["Œdèmes en début de traitement", "Prise de poids"], graves: ["**Hypoglycémie sévère** : perte de connaissance, convulsions"], classe: "" },
  surveillance: ["**Glycémie à jeun** : objectif **1 à 1,2 g/L**", "**HbA1c** (reflet des 2 à 3 derniers mois) : **moins de 7 %**", "Sites d'injection (lipodystrophie)"],
  cinetique: ["Début d'action en 1 à 2 heures", "**Durée d'environ 24 heures, sans pic**", "Une injection par jour"]
});

detailF("insuline-asparte", "partiel", NOTE_F + "délais exacts d'action et conservation.", {
  identite: [["Spécialités", "**NovoRapid FlexPen**, Fiasp (version plus rapide)"], ["Classe", "**Analogue rapide** de l'insuline humaine"], ["Délivrance", "Liste II"], ["Formes", "Stylo prérempli **100 U/mL**, 3 mL ; flacons, cartouches"], ["Conservation", "Avant ouverture : réfrigérateur 2 à 8 °C, ne pas congeler ; en cours : **sous 30 °C, 4 semaines**, **capuchon remis** (lumière)"]],
  mecanisme: ["Analogue modifié qui **se dissocie vite** sous la peau", "Absorption **rapide** : agit en **10 à 20 minutes**", "Couvre la **hausse de glycémie du repas**"],
  indications: ["**Diabète de type 1** (schéma basal-bolus)", "Diabète de type 2 insulinorequérant"],
  posologies: [["Diabète de type 1", "Dose à chaque repas (ici **12 UI** matin, midi et soir)"], ["Adaptation", "Sur les glycémies **avant et 2 heures après** les repas et la quantité de glucides"]],
  plafonds: [],
  administration: ["Sous-cutanée, **juste avant le repas** (0 à 10 minutes), ou juste après si besoin", "**Pas de repas, pas d'injection**", "Rotation des sites", "Pompe à insuline possible"],
  ci: ["Hypoglycémie", "Hypersensibilité"],
  interactions: [["pe", "**Bêtabloquants**", "Signes d'hypoglycémie masqués"], ["apec", "**Corticoïdes**", "Glycémie qui monte"], ["apec", "Alcool", "Hypoglycémie"]],
  grossesse: { g: "ok", gTexte: "Utilisable ; besoins variables selon le trimestre.", a: "ok", aTexte: "Utilisable.", f: "Sans objet." },
  ei: { frequents: ["**Hypoglycémie**", "Lipodystrophie", "Réaction locale"], rares: ["Œdèmes", "Troubles de la réfraction transitoires en début de traitement"], graves: ["**Hypoglycémie sévère**"], classe: "" },
  surveillance: ["Glycémies **pré-prandiales** : **0,8 à 1,2 g/L**", "Glycémies **2 heures après** le repas : **1,2 à 1,8 g/L**", "Hypoglycémies notées et analysées"],
  cinetique: ["Début d'action en **10 à 20 minutes**", "Pic entre 1 et 3 heures", "Durée de 3 à 5 heures"]
});

detailF("lacosamide", "partiel", NOTE_F + "doses, adaptation rénale, données de grossesse et d'allaitement.", {
  identite: [["Spécialités", "**Vimpat**, génériques"], ["Classe", "Antiépileptique"], ["Délivrance", "Liste I"], ["Formes", "Comprimés à **50, 100, 150 et 200 mg** ; sirop ; solution injectable"], ["Conservation", "Pas de condition particulière"]],
  mecanisme: ["Renforce l'**inactivation lente** des **canaux sodium voltage-dépendants**", "Stabilise les membranes neuronales **hyperexcitables**", "Moins de décharges répétées"],
  indications: ["Crises **focales** avec ou sans généralisation (monothérapie ou association)", "Crises tonico-cloniques généralisées (en association)"],
  posologies: [["Adulte", "50 mg deux fois par jour au départ, paliers hebdomadaires, souvent 100 à 200 mg deux fois par jour"], ["Arrêt", "**Décroissance progressive** (ici paliers de 7 jours jusqu'à l'arrêt, relais par la lamotrigine)"], ["Insuffisance rénale sévère", "Dose maximale réduite"]],
  plafonds: [],
  administration: ["Voie orale, deux prises par jour", "Avec ou sans repas"],
  ci: ["**Bloc auriculoventriculaire du 2e ou 3e degré**", "Hypersensibilité"],
  interactions: [["pe", "Médicaments qui **allongent le PR** (bêtabloquants, carbamazépine, lamotrigine…)", "Troubles de conduction : ECG"], ["apec", "Autres dépresseurs du système nerveux", "Vertiges, somnolence"]],
  grossesse: { g: "pe", gTexte: "Le CRAT préfère un autre antiépileptique ; **en l'absence d'alternative**, envisageable. Dosage de référence avant la grossesse.", a: "asdec", aTexte: "Passe dans le lait : à discuter (à vérifier sur le CRAT).", f: "Pas de donnée." },
  ei: { frequents: ["**Vertiges**", "Céphalées, diplopie", "Nausées"], rares: ["Allongement du PR, bloc AV", "Troubles de l'humeur"], graves: ["Troubles de conduction", "**Idées suicidaires**", "DRESS (rare)"], classe: "" },
  surveillance: ["ECG chez le patient cardiaque", "Humeur", "Vertiges, chutes"],
  cinetique: ["**Pas de particularité notable** selon l'ED", "Biodisponibilité orale **proche de 100 %**", "Demi-vie d'environ **13 heures**", "Élimination **rénale** en partie sous forme inchangée"]
});

detailF("clobazam", "partiel", NOTE_F + "durée maximale selon l'indication, doses, demi-vies.", {
  identite: [["Spécialités", "**Urbanyl** 10 et 20 mg, Likozam (suspension)"], ["Classe", "Benzodiazépine (**1,5-benzodiazépine**)"], ["Délivrance", "Liste I ; anxiété : **12 semaines** au maximum"], ["Formes", "Comprimés sécables à 10 et 20 mg ; suspension buvable"], ["Conservation", "Pas de condition particulière"]],
  mecanisme: ["**Modulateur allostérique positif** des récepteurs **GABA-A**", "Augmente l'ouverture du canal chlorure en présence de GABA", "Hyperpolarisation : neurones moins excitables"],
  indications: ["**Anxiété** sévère, invalidante", "**Épilepsie**, en association"],
  posologies: [["Anxiété", "5 à 30 mg/j, ou **à la demande** comme ici"], ["Épilepsie", "Doses progressives, en association"], ["Durée", "Anxiété : **12 semaines**, sevrage compris ; épilepsie : non limitée"]],
  plafonds: [],
  administration: ["Voie orale", "Le soir si une seule prise (sédation)", "**Arrêt progressif** après une prise régulière"],
  ci: ["**Insuffisance respiratoire** sévère", "**Syndrome d'apnées du sommeil**", "Insuffisance hépatique sévère", "**Myasthénie**", "Hypersensibilité aux benzodiazépines"],
  interactions: [["asdec", "**Alcool**", "Sédation majorée"], ["pe", "**Opioïdes**", "**Dépression respiratoire**"], ["apec", "Autres sédatifs", "Somnolence"], ["apec", "Stiripentol, inhibiteurs du CYP2C19", "Concentration du métabolite actif augmentée"]],
  grossesse: { g: "pe", gTexte: "Prise ponctuelle possible ; en fin de grossesse, **imprégnation** puis **sevrage** du nouveau-né.", a: "asdec", aTexte: "Déconseillé en prise régulière (sédation de l'enfant).", f: "Sans objet." },
  ei: { frequents: ["**Somnolence**", "Fatigue, vertiges"], rares: ["Réactions paradoxales (agitation)", "Chutes"], graves: ["**Amnésie antérograde**", "**Dépendance** physique et psychique", "**Dépression respiratoire**"], classe: "Cinq propriétés des benzodiazépines : **anxiolytique, anticonvulsivante, hypnotique, myorelaxante, amnésiante**." },
  surveillance: ["Durée de prescription", "Somnolence, chutes", "Signes de dépendance, demandes répétées"],
  cinetique: ["**Demi-vie longue** (environ 20 heures selon l'ED)", "Métabolite actif (N-desméthylclobazam) à demi-vie plus longue encore", "Métabolisme hépatique (CYP3A4, CYP2C19)"]
});

detailF("lithium", "partiel", NOTE_F + "cible et rythme des lithémies, niveaux d'interaction dans le Thésaurus, données de grossesse selon le CRAT.", {
  identite: [["Spécialités", "**Téralithe** 250 mg (libération immédiate) et **LP 400 mg**"], ["Classe", "**Thymorégulateur**, marge thérapeutique **étroite**"], ["Délivrance", "Liste I"], ["Formes", "Comprimés sécables"], ["Conservation", "Pas de condition particulière"]],
  mecanisme: ["Mécanisme encore mal connu", "Inhibe l'**inositol monophosphatase** et la **GSK-3**", "Module la transmission **sérotoninergique** (l'ED : l'active)", "Stabilise l'humeur, réduit les rechutes"],
  indications: ["**Prévention des rechutes** du trouble bipolaire", "Traitement des épisodes maniaques", "Prévention des troubles schizo-affectifs"],
  posologies: [["Dose", "Adaptée sur la **lithémie**"], ["Téralithe LP 400", "Lithémie **12 heures** après la prise du soir : **0,8 à 1,2 mmol/L**"], ["Téralithe 250", "Lithémie résiduelle plus basse (0,5 à 0,8 mmol/L)"]],
  plafonds: [],
  administration: ["LP 400 : **une prise le soir**, **au cours du repas**", "Ne pas écraser la forme LP", "Apports en **sel et en eau** réguliers"],
  ci: ["**Insuffisance rénale**", "Insuffisance cardiaque mal équilibrée", "**Régime sans sel**, déshydratation, hyponatrémie", "Grossesse (selon le cours) et allaitement"],
  interactions: [["asdec", "**AINS**", "Lithémie augmentée : surdosage"], ["asdec", "**IEC, sartans**", "Lithémie augmentée"], ["asdec", "**Diurétiques**", "Lithémie augmentée (perte de sodium)"], ["apec", "**Antidépresseurs sérotoninergiques** (venlafaxine, ISRS)", "**Syndrome sérotoninergique** possible (niveau à vérifier)"], ["apec", "Neuroleptiques (halopéridol…)", "Neurotoxicité"]],
  grossesse: { g: "asdec", gTexte: "Le cours le donne en **contre-indication formelle** (malformations **cardiaques**, maladie d'Ebstein). Le CRAT nuance : arrêt de la conception jusqu'à la fin de l'organogenèse cardiaque, ou autre traitement, ou poursuite **sous surveillance** si l'arrêt menace l'équilibre de la mère.", a: "ci", aTexte: "Contre-indiqué (passe fortement dans le lait).", f: "Sans objet." },
  ei: { frequents: ["**Tremblement fin**", "**Soif, polyurie**", "Prise de poids, troubles digestifs"], rares: ["**Hypothyroïdie**, goitre", "Hypercalcémie (hyperparathyroïdie)", "Acné, psoriasis aggravé"], graves: ["**Surdosage** : tremblement grossier, ataxie, confusion, vomissements, diarrhée, convulsions", "**Diabète insipide néphrogénique**, insuffisance rénale", "Troubles du rythme"], classe: "Mnémotechnique de l'ED : **LITR** (liquide, irrégularités cardiaques, thyroïde, rein)." },
  surveillance: ["**Lithémie** : 5 jours après le début ou chaque changement, puis régulièrement (rythme à relire)", "**Créatinine**, **TSH**, **calcémie**, ionogramme", "ECG avant le traitement", "Signes de surdosage, situations de **déshydratation**"],
  cinetique: ["Pas de métabolisme : élimination **rénale**", "Réabsorbé avec le **sodium** : moins de sel → plus de lithium", "Demi-vie d'environ **24 heures**, plus longue chez le sujet âgé"]
});

detailF("venlafaxine", "partiel", NOTE_F + "paliers de dose, dose maximale, niveaux d'interaction.", {
  identite: [["Spécialités", "**Effexor LP**, génériques"], ["Classe", "**IRSNA**"], ["Délivrance", "Liste I"], ["Formes", "Gélules à libération prolongée à **37,5 et 75 mg**"], ["Conservation", "Pas de condition particulière"]],
  mecanisme: ["Bloque la **recapture de la sérotonine**, et de la **noradrénaline** à dose plus forte", "Plus de monoamines dans la synapse", "Adaptation des récepteurs en **2 à 4 semaines** : délai d'effet"],
  indications: ["**Épisode dépressif caractérisé**, prévention des récidives", "Trouble anxieux généralisé, phobie sociale, trouble panique"],
  posologies: [["Dépression", "**75 mg** une fois par jour, paliers de 75 mg toutes les 2 semaines au moins"], ["Ici", "75 mg par jour : **correct**"]],
  plafonds: [],
  administration: ["Une prise par jour **au cours d'un repas**, à heure fixe", "Gélule avalée entière", "**Arrêt très progressif**"],
  ci: ["**IMAO non sélectifs** (et 14 jours après leur arrêt)", "Hypersensibilité"],
  interactions: [["ci", "**IMAO non sélectifs**", "Syndrome sérotoninergique grave"], ["asdec", "Linézolide, bleu de méthylène", "Syndrome sérotoninergique"], ["apec", "**Tramadol, triptans, lithium, millepertuis**", "**Syndrome sérotoninergique**"], ["apec", "**AINS, anticoagulants, antiagrégants**", "Saignements"]],
  grossesse: { g: "pe", gTexte: "Utilisable si nécessaire ; en fin de grossesse, **syndrome d'imprégnation ou de sevrage** du nouveau-né (à vérifier sur le CRAT).", a: "asdec", aTexte: "Passe dans le lait : préférer une alternative (à vérifier sur le CRAT).", f: "Pas d'effet connu." },
  ei: { frequents: ["**Nausées** (début de traitement)", "Sueurs, insomnie, céphalées", "Troubles sexuels"], rares: ["**Hypertension** dose-dépendante", "**Hyponatrémie** (sujet âgé)", "Saignements"], graves: ["**Levée d'inhibition**, idées suicidaires (les 3 premiers mois, moins de 25 ans)", "**Syndrome sérotoninergique**", "**Virage maniaque** (trouble bipolaire)", "**Syndrome de sevrage** marqué"], classe: "" },
  surveillance: ["**Idées suicidaires** les premières semaines", "**Tension**", "Natrémie chez le sujet âgé", "Signes de virage de l'humeur"],
  cinetique: ["**Demi-vie courte** (environ 5 heures ; 11 heures pour le métabolite actif) : forme LP, sevrage marqué", "Métabolisée par le **CYP2D6** en O-desméthylvenlafaxine (active)", "Élimination rénale"]
});

detailF("zolmitriptan", "partiel", "Fiche détaillée. Contre-indications et interaction avec le moclobémide lues dans le RCP de Zomig ; doses maximales et données de grossesse à relire.", {
  identite: [["Spécialités", "**Zomig**, Zomigoro, génériques"], ["Classe", "**Triptan**"], ["Délivrance", "Liste I"], ["Formes", "Comprimés et comprimés orodispersibles à **2,5 mg** ; pulvérisation nasale à 5 mg"], ["Conservation", "Pas de condition particulière"]],
  mecanisme: ["**Agoniste des récepteurs 5-HT1B/1D**", "**Vasoconstriction** des vaisseaux de la dure-mère (5-HT1B)", "Inhibition de l'**inflammation neurogène** et de la libération des neuropeptides (5-HT1D)", "Inhibition des fibres sensorielles du **noyau du trijumeau**"],
  indications: ["**Traitement de la crise** de migraine, avec ou sans aura"],
  posologies: [["Crise", "**2,5 mg** dès le début de la céphalée"], ["Récidive", "2e prise **au moins 2 heures** après la première"], ["Maximum", "Ici **2 prises par jour** (le RCP fixe un plafond en mg sur 24 heures, à relire)"], ["Inhibiteurs du CYP1A2", "Dose maximale réduite (fluvoxamine, ciprofloxacine…)"]],
  plafonds: [["Fluvoxamine, quinolones (CYP1A2)", "Dose maximale réduite sur 24 heures (à relire)"]],
  administration: ["**Dès le début de la céphalée**, au stade le plus précoce", "**Inefficace pendant l'aura** : attendre la céphalée", "Inefficace sur la 1re prise : pas de 2e prise pour la même crise"],
  ci: ["**HTA** modérée, sévère ou non contrôlée", "**Coronaropathie**, angor, infarctus", "**Antécédent d'AVC ou d'AIT**", "Artériopathie périphérique", "Wolff-Parkinson-White", "**Ergotés** et autres triptans", "**IMAO-A** (moclobémide)"],
  interactions: [["ci", "**Moclobémide** (IMAO-A)", "Exposition augmentée, syndrome sérotoninergique"], ["ci", "**Ergotamine, dihydroergotamine**, autres triptans", "Vasoconstriction : 24 heures d'écart"], ["pe", "Inhibiteurs du **CYP1A2**", "Dose maximale réduite"], ["apec", "**ISRS, IRSNA**", "Syndrome sérotoninergique"]],
  grossesse: { g: "pe", gTexte: "Les triptans ne sont **pas contre-indiqués** pendant la grossesse (ED) ; le CRAT a plus de recul sur le sumatriptan (à vérifier).", a: "pe", aTexte: "Passe dans le lait : le RCP conseille d'espacer l'allaitement après la prise (délai à relire).", f: "Pas de donnée." },
  ei: { frequents: ["**Sensation d'oppression** thoracique, de lourdeur", "Paresthésies, bouffées de chaleur", "**Palpitations** transitoires, somnolence"], rares: ["Hausse de la tension", "Syndrome de Raynaud"], graves: ["**Ischémie** coronaire, spasme", "**Céphalées par abus** médicamenteux en cas de prises répétées"], classe: "" },
  surveillance: ["**Carnet de crises** : date, médicament, durée, facteurs déclenchants, intensité", "Nombre de jours de prise par mois", "Contraception (migraine avec aura et estroprogestatif : risque d'AVC)"],
  cinetique: ["**Demi-vie courte** (2,5 à 3 heures) : **récidives** fréquentes dans la journée", "Métabolite actif (N-desméthyl) via le **CYP1A2**", "Pour les récidives fréquentes : triptan à demi-vie plus longue (**naratriptan**, **frovatriptan**)"]
});

detailF("capecitabine", "partiel", "Fiche détaillée. Obligation DPD vérifiée sur le site de l'ANSM ; doses, conduite devant les toxicités et conditions de prescription à relire sur le RCP.", {
  identite: [["Spécialités", "**Xeloda**, génériques (Biogaran, Accord…)"], ["Classe", "Anticancéreux, **fluoropyrimidine** orale"], ["Délivrance", "Liste I ; prescription réservée aux spécialistes en oncologie (à vérifier)"], ["Formes", "Comprimés pelliculés à **150 mg** et **500 mg**"], ["Conservation", "Pas de condition particulière ; **cytotoxique** : ne pas couper, ne pas écraser"]],
  mecanisme: ["**Prodrogue** du **5-fluorouracile** (5-FU)", "Activée en trois étapes ; la dernière par la **thymidine phosphorylase**, plus abondante dans la **tumeur**", "Le 5-FU inhibe la **thymidylate synthase**", "Synthèse de l'ADN bloquée ; effet **radiosensibilisant** avec la radiothérapie"],
  indications: ["**Cancer colorectal** (adjuvant, métastatique)", "**Cancer du rectum** : radiochimiothérapie", "Cancer du sein, cancer gastrique"],
  posologies: [["Avec la radiothérapie", "**825 mg/m² deux fois par jour**"], ["Seule", "**1 250 mg/m² deux fois par jour**, 14 jours sur 21"], ["Ici", "1 650 mg deux fois par jour = 825 × **2,0 m²** : surface corporelle à vérifier"], ["Déficit partiel en DPD", "**Dose réduite** selon l'uracilémie"]],
  plafonds: [],
  administration: ["**Dans les 30 minutes après le repas**, matin et soir", "Avaler entier avec de l'eau", "Oubli : **ne pas doubler**", "Se laver les mains après manipulation"],
  ci: ["**Déficit complet en DPD** (uracilémie de **150 ng/mL ou plus**)", "**Brivudine** (et dans les 4 semaines après)", "**Insuffisance rénale sévère**", "Neutropénie, thrombopénie sévères", "**Grossesse**, allaitement"],
  interactions: [["ci", "**Brivudine**", "Inhibe la DPD : toxicité mortelle du 5-FU"], ["asdec", "**AVK**", "**INR qui monte**, saignements"], ["pe", "Phénytoïne", "Concentration de phénytoïne augmentée"], ["apec", "Acide folinique", "Toxicité du 5-FU augmentée"]],
  grossesse: { g: "ci", gTexte: "Contre-indiquée : contraception pendant et après le traitement.", a: "ci", aTexte: "Contre-indiqué.", f: "Altération possible de la fertilité." },
  ei: { frequents: ["**Syndrome main-pied** (rougeur, douleur, desquamation)", "**Diarrhée**", "**Mucite**, nausées", "Fatigue"], rares: ["Hyperbilirubinémie", "Douleur thoracique (spasme coronaire)"], graves: ["**Neutropénie fébrile**", "Diarrhée sévère, déshydratation", "**Toxicité mortelle** en cas de déficit en DPD"], classe: "" },
  surveillance: ["**Uracilémie avant la première dose** : mention « **résultats uracilémie pris en compte** » sur l'ordonnance, vérifiée par le pharmacien", "NFS, créatinine, bilirubine", "Mains et pieds, nombre de selles, fièvre", "INR si AVK"],
  cinetique: ["Absorption rapide", "**Demi-vie courte** (moins d'une heure) : deux prises par jour", "5-FU dégradé à 80 % par la **DPD**", "Élimination rénale des métabolites"]
});

/* ---------- Ordonnances ---------- */
const FREPPEL = "Correction de l'ED de Mme Freppel (notes d'étudiants).";
ORDOS.push(
{ id: "o29", titre: "Femme de 38 ans, sclérose en plaques : quatre lignes du neurologue", domaines: ["neuro", "grossesse"], niveau: 2, resume: "ED Freppel, 4 lignes, aucune interaction, 3 vérifications",
  patient: { nom: "Mme S.", details: "38 ans", chips: ["Sclérose en plaques", "Tremblement", "Troubles urinaires"], contexte: "Prescription d'un neurologue, pour 30 jours." },
  lignes: [
    L("l1", "Vesicare 5 mg (solifénacine)", "1/2 comprimé le matin", "30 jours", "Neurologue", "solifenacine"),
    L("l2", "Aubagio 14 mg (tériflunomide)", "1 comprimé le matin", "30 jours", "Neurologue", "teriflunomide"),
    L("l3", "Propranolol 40 mg Teva, comprimé sécable", "1 comprimé matin et soir", "30 jours", "Neurologue", "propranolol"),
    L("l4", "Trinordiol (lévonorgestrel, éthinylestradiol)", "1 comprimé le soir", "30 jours", "Neurologue", "estroprogestatif")],
  problemes: [
    PB({ id: "p1", titre: "Tériflunomide : tératogène, la contraception conditionne la délivrance", lignes: ["l2", "l4"], cle: ["l2"], niveau: "apec", notion: "grossesse-risque", sfpc: ["10"], interv: ["4"],
      mecanisme: ["Tériflunomide **contre-indiqué pendant la grossesse**", "Élimination **biliaire**, **cycle entéro-hépatique** : **demi-vie d'environ 20 jours**", "Contraception délivrée régulièrement = **condition de délivrance**", "Projet de grossesse → **colestyramine** pour accélérer l'élimination, jusqu'à **moins de 0,02 mg/L**"],
      conduite: "Délivrer en vérifiant que la contraception est prise régulièrement. Rappeler de parler de tout projet de grossesse au neurologue avant l'arrêt de la pilule. Surveillance clinique (neurologue au moins une fois par an) et biologique (NFS, transaminases), tension.",
      statut: "verifie", note: FREPPEL + " Délai du CRAT : au moins 3,5 mois sans procédure d'élimination.", sources: ["edFreppel", "crat"] }),
    PB({ id: "p2", titre: "Propranolol : bêtabloquant non cardiosélectif", lignes: ["l3"], cle: ["l3"], niveau: "apec", notion: "surveillance-bio", sfpc: ["10"], interv: ["4"],
      mecanisme: ["**Antagoniste bêta-adrénergique** non cardiosélectif, sans activité sympathomimétique intrinsèque", "Contre-indiqué dans l'**asthme** : **bronchospasme**", "Très **bradycardisant**", "Le tériflunomide peut **augmenter la tension** : surveiller les constantes"],
      conduite: "Vérifier l'absence d'asthme, conseiller de surveiller pouls et tension, ne jamais arrêter brutalement. Indication ici : le tremblement.",
      statut: "verifie", note: FREPPEL, sources: ["edFreppel"] }),
    PB({ id: "p3", titre: "Estroprogestatif : terrain vasculaire et automédication", lignes: ["l4"], cle: ["l4"], niveau: "apec", notion: "contraception", sfpc: ["10"], interv: ["4"],
      mecanisme: ["**Risque thromboembolique** (TVP, embolie pulmonaire), HTA", "Patiente **fumeuse** : particulièrement à risque", "**Millepertuis** : échec de la contraception, à signaler dès qu'il y a une pilule"],
      conduite: "Demander tabac, migraine avec aura, tension. Insister sur l'observance de la pilule. Pas de millepertuis en automédication.",
      statut: "verifie", note: FREPPEL, sources: ["edFreppel", "thesaurus"] })],
  sansProbleme: ["**Aucune interaction** sur l'ordonnance : pas de baisse d'efficacité de la contraception (le tériflunomide augmente même un peu l'éthinylestradiol).", "Vesicare : antimuscarinique, l'incontinence urinaire est un des premiers symptômes de la SEP. L'ED juge la posologie correcte ; vérifier sur le RCP si le comprimé à 5 mg est sécable, sinon 5 mg un jour sur deux n'est pas l'équivalent : en parler au prescripteur.", "Aubagio 14 mg : dose adulte (plus de 40 kg). Prescription par le neurologue."],
  patientDire: "Pilule tous les jours à heure fixe, c'est la condition de l'Aubagio. Projet de grossesse : en parler d'abord au neurologue. Fièvre, toux, infection : consulter. Prises de sang régulières. Propranolol : ne jamais arrêter d'un coup. Pas de millepertuis.",
  retenir: "Ordonnance sans interaction : l'analyse porte sur la surveillance (clinique et biologique) et la grossesse. Cinétique attendue à l'examen : prise alimentaire, demi-vie, cytochromes.",
  rappels: ["teratogenes-femme"] },

{ id: "o30", titre: "Femme de 30 ans, MICI : mésalazine et corticothérapie courte", domaines: ["gastro", "grossesse"], niveau: 1, resume: "ED Freppel, 3 lignes, corticoïde en décroissance",
  patient: { nom: "Mme M.", details: "30 ans", chips: ["Maladie inflammatoire chronique de l'intestin", "Poussée"], contexte: "Ordonnance d'une clinique de gastro-entérologie (numéro FINESS)." },
  lignes: [
    L("l1", "Pentasa 1 g (mésalazine), comprimé", "1 g matin et soir", "", "Gastro-entérologue", "mesalazine"),
    L("l2", "Cortancyl 20 mg (prednisone), comprimé", "40 mg/j semaine 1, 30 mg semaine 2, 20 mg semaine 3, 10 mg semaine 4, 5 mg semaine 5", "5 semaines", "Gastro-entérologue", "prednisone"),
    L("l3", "Uvédose 100 000 UI (cholécalciférol), ampoule buvable", "À avaler en une prise", "", "Gastro-entérologue", "cholecalciferol")],
  problemes: [
    PB({ id: "p1", titre: "Corticothérapie de 5 semaines : schéma et effets attendus", lignes: ["l2"], cle: ["l2"], niveau: "apec", notion: "corticotherapie", sfpc: ["10"], interv: ["3"],
      mecanisme: ["Récepteurs **nucléaires des glucocorticoïdes** : gènes anti-inflammatoires activés", "Prise **le matin** : rythme du cortisol", "**Décroissance progressive** : correcte", "Sur 5 semaines : rétention hydrosodée, glycémie, insomnie ; **pas** de bosse de bison ni d'insuffisance surrénalienne à évoquer"],
      conduite: "Délivrer en expliquant le schéma semaine par semaine (les comprimés de 20 mg ne suffisent pas pour 30, 10 et 5 mg : vérifier qu'elle peut faire les doses, sinon demander des comprimés de 5 mg). Prise le matin, au repas.",
      statut: "partiel", note: FREPPEL + " La question des dosages de comprimés est ajoutée (non traitée en ED).", sources: ["edFreppel"] }),
    PB({ id: "p2", titre: "Mésalazine : surveillance rénale", lignes: ["l1"], cle: ["l1"], niveau: "apec", notion: "surveillance-bio", sfpc: ["10"], interv: ["4"],
      mecanisme: ["**5-ASA** à action anti-inflammatoire **intestinale**", "Globalement **bien tolérée** (troubles digestifs)", "Risque de **néphrite interstitielle** : créatinine régulière"],
      conduite: "Délivrer. Comprimé avalé ou dispersé dans l'eau, pas croqué. Rappeler les prises de sang (créatinine) et la consultation annuelle du gastro-entérologue.",
      statut: "partiel", note: FREPPEL + " La surveillance rénale vient du RCP.", sources: ["edFreppel", "rcpBase"] })],
  sansProbleme: ["**Aucune interaction.**", "Uvédose : prévention de l'ostéoporose cortico-induite ; pas plus de 600 000 UI par an. Insuffisant rénal terminal : alfacalcidol (Un-Alfa).", "Grossesse : mésalazine, corticoïdes et vitamine D sont utilisables."],
  patientDire: "Cortancyl le matin au petit-déjeuner, en suivant la décroissance semaine par semaine. Pentasa matin et soir, sans croquer. Uvédose en une fois, au cours d'un repas. Prises de sang prévues. Insomnie, excitation, appétit : effets possibles et passagers.",
  retenir: "Ne citer que les effets indésirables compatibles avec la durée du traitement. Surveillance de l'ED : poids, kaliémie, triglycérides, tension, créatinine, glycémie, LDL-cholestérol." },

{ id: "o31", titre: "Femme de 31 ans, maladie de Basedow : instauration du traitement", domaines: ["endocrino", "grossesse"], niveau: 2, resume: "ED Freppel, 3 lignes et sa pilule, NFS à programmer",
  patient: { nom: "Mme C.", details: "31 ans", chips: ["Maladie de Basedow", "Sous Minidril"], contexte: "Endocrinologue, 29/08/2024. QSP 1 mois, à renouveler 3 fois. Un bilan est prescrit : NFS et bilan hépatique dans 15 jours, puis T4 libre, bilan hépatique et NFS tous les mois pendant 4 mois ; NFS en urgence si fièvre au-delà de 38 °C, frissons ou signe d'infection." },
  lignes: [
    L("l1", "Néo-Mercazole 20 mg (carbimazole)", "20 mg le matin et 10 mg le soir pendant 3 semaines, puis 20 mg le matin à partir du 19/09/24", "1 mois, à renouveler 3 fois", "Endocrinologue", "carbimazole"),
    L("l2", "Propranolol 40 mg Biogaran, comprimé sécable", "1 comprimé matin, midi et soir 1 mois ; puis 1/2 comprimé matin, midi et soir 1 mois ; puis 1/2 comprimé si palpitations, 3 par jour au maximum", "1 mois, à renouveler 3 fois", "Endocrinologue", "propranolol"),
    L("l3", "Levothyrox 25 µg, comprimé sécable", "Attendre l'accord du médecin pour débuter", "", "Endocrinologue", "levothyroxine"),
    L("l4", "Minidril (lévonorgestrel, éthinylestradiol)", "1 comprimé par jour", "En cours", "Historique", "estroprogestatif")],
  problemes: [
    PB({ id: "p1", titre: "Carbimazole : agranulocytose, la conduite à tenir en cas de fièvre", lignes: ["l1"], cle: ["l1"], niveau: "apec", notion: "surveillance-bio", sfpc: ["10"], interv: ["4"],
      mecanisme: ["Antithyroïdien de synthèse : **agranulocytose** rare mais grave", "Mal de gorge, fièvre, ulcérations buccales = **signes d'alerte**", "**NFS en urgence**, arrêt du traitement", "Bilan : NFS, bilan hépatique, **T4 libre** (la TSH seule ne veut rien dire au début)"],
      conduite: "Délivrer en expliquant les signes d'alerte : fièvre ou angine → NFS le jour même et appel du médecin. Vérifier que les bilans prévus sont faits.",
      statut: "verifie", note: FREPPEL, sources: ["edFreppel", "carbimazoleVidal"] }),
    PB({ id: "p2", titre: "Pilule à poursuivre : le carbimazole est tératogène", lignes: ["l4", "l1"], cle: ["l4"], niveau: "apec", notion: "grossesse-risque", sfpc: ["10"], interv: ["4"],
      mecanisme: ["Carbimazole : **malformations** au 1er trimestre, à forte dose", "**Contraception efficace** pendant le traitement", "Projet de grossesse : **propylthiouracile** de préférence au 1er trimestre", "Mieux vaut concevoir en **légère hyperthyroïdie** qu'en hypothyroïdie"],
      conduite: "Insister sur l'observance de la pilule. Tout projet de grossesse : prévenir l'endocrinologue pour revoir le traitement.",
      statut: "verifie", note: FREPPEL + " L'ED précise que ce n'est pas une vraie contre-indication.", sources: ["edFreppel", "carbimazoleAnsm", "atsRevPrat"] }),
    PB({ id: "p3", titre: "Levothyrox : délivré mais pas commencé", lignes: ["l3"], cle: ["l3"], niveau: "apec", notion: "thyroide", sfpc: ["10"], interv: ["3"],
      mecanisme: ["Schéma où le carbimazole est poursuivi et la **lévothyroxine ajoutée** pour éviter l'**hypothyroïdie**", "Le début dépend du bilan (T4 libre) : **accord du médecin**", "À terme, selon l'ED, la patiente ne prendra plus que le Néo-Mercazole"],
      conduite: "Délivrer en expliquant clairement de **ne pas commencer** avant l'appel du médecin ; noter la consigne sur la boîte. Le jour venu : à jeun, 30 minutes avant le petit-déjeuner.",
      statut: "partiel", note: FREPPEL + " Les conseils de prise de la lévothyroxine viennent de sa fiche.", sources: ["edFreppel"] })],
  sansProbleme: ["**Pas d'interaction** sur l'ordonnance.", "Propranolol : traite la **tachycardie** de l'hyperthyroïdie, en décroissance (dates ajoutées par le pharmacien sur l'ordonnance).", "Néo-Mercazole : 30 mg/j pendant 3 semaines puis 20 mg, posologie correcte. Le démarrage d'un traitement de Basedow est prudent et réévalué souvent."],
  patientDire: "Fièvre, mal de gorge, frissons : prise de sang (NFS) en urgence et appel du médecin. Bilans prévus à 15 jours puis tous les mois. Ne pas commencer le Levothyrox avant l'accord du médecin. Pilule à ne pas oublier ; projet de grossesse : en parler avant.",
  retenir: "Basedow chez une femme jeune : agranulocytose (conduite en cas de fièvre), contraception, et propylthiouracile en cas de projet de grossesse.",
  rappels: ["teratogenes-femme"] },

{ id: "o32", titre: "Femme de 30 ans, diabète de type 1 : schéma basal-bolus", domaines: ["endocrino"], niveau: 1, resume: "ED Freppel, 6 lignes, un oubli à repérer",
  patient: { nom: "Mme D.", details: "30 ans", chips: ["Diabète de type 1"], contexte: "Ordonnance d'une clinique d'endocrinologie (numéro FINESS)." },
  lignes: [
    L("l1", "Abasaglar KwikPen (insuline glargine) 100 UI/mL, stylo", "16 UI le soir", "", "Endocrinologue", "insuline-glargine"),
    L("l2", "NovoRapid FlexPen (insuline asparte) 100 UI/mL, stylo", "12 UI matin, midi et soir", "", "Endocrinologue", "insuline-asparte"),
    L("l3", "Aiguilles NovoFine", "", "", "Endocrinologue"),
    L("l4", "Capteur FreeStyle Libre 2", "1 capteur tous les 14 jours", "", "Endocrinologue"),
    L("l5", "Bandelettes", "Si le capteur ne fonctionne pas", "", "Endocrinologue"),
    L("l6", "Lancettes", "", "", "Endocrinologue")],
  problemes: [
    PB({ id: "p1", titre: "Pas de glucagon prescrit", lignes: ["l2"], cle: ["l2"], niveau: "apec", notion: "insuline", sfpc: ["5"], interv: ["5"],
      mecanisme: ["Insulinothérapie : risque d'**hypoglycémie sévère**", "Perte de connaissance : le sucre par la bouche est impossible", "L'entourage doit disposer de **glucagon** (injectable ou nasal) et savoir l'utiliser"],
      conduite: "Demander si elle a du glucagon à la maison et s'il est périmé ; sinon proposer au prescripteur de l'ajouter. Rappeler : toujours du sucre sur soi.",
      statut: "partiel", note: "Point construit, non traité dans l'ED de Mme Freppel ; à valider avec l'enseignant.", sources: ["edFreppel"] }),
    PB({ id: "p2", titre: "Doses à adapter : objectifs glycémiques", lignes: ["l1"], cle: ["l1"], niveau: "apec", notion: "insuline", sfpc: ["10"], interv: ["4"],
      mecanisme: ["Insuline **basale** adaptée sur la **glycémie à jeun** (1 à 1,2 g/L)", "Insuline **rapide** adaptée sur les glycémies **avant** (0,8 à 1,2 g/L) et **2 heures après** les repas (1,2 à 1,8 g/L)", "**HbA1c inférieure à 7 %**, sans hypoglycémie"],
      conduite: "Vérifier qu'elle sait adapter ses doses (les 12 UI de rapide ne sont pas figées) et lire les données du capteur. Orienter vers le diabétologue si hypoglycémies répétées.",
      statut: "verifie", note: FREPPEL, sources: ["edFreppel"] }),
    PB({ id: "p3", titre: "Technique d'injection et conservation", lignes: ["l3"], cle: ["l3"], niveau: "apec", notion: "insuline", sfpc: ["10"], interv: ["3"],
      mecanisme: ["**Rotation des sites** : cuisse, abdomen, bras, fesses ; 1 cm entre deux injections", "Pas d'injection dans une zone de **lipodystrophie** : absorption irrégulière", "Avant ouverture : **réfrigérateur** ; ensuite **température ambiante 4 à 6 semaines** ; pas de congélation ; **reboucher** le stylo (lumière)"],
      conduite: "Revoir la technique, une aiguille neuve à chaque injection, et remettre un collecteur pour les déchets piquants (DASRI).",
      statut: "partiel", note: FREPPEL + " Le collecteur DASRI est ajouté.", sources: ["edFreppel"] })],
  sansProbleme: ["**Pas d'interaction.** Délivrance : oui, l'insuline doit être maintenue chez la femme en âge de procréer et pendant la grossesse.", "NovoRapid : délai d'action d'environ 10 minutes, à injecter avant le repas.", "FreeStyle Libre 2 : un capteur tous les 14 jours ; bandelettes de secours si le capteur ne fonctionne pas."],
  patientDire: "Insuline lente le soir à heure fixe, rapide juste avant chaque repas (pas de repas, pas d'injection). Changer de site à chaque fois. Stylos d'avance au réfrigérateur, stylo en cours à température ambiante. Sucre toujours sur soi ; glucagon pour l'entourage.",
  retenir: "Ordonnance sans interaction : l'intervention utile est l'oubli (glucagon) et l'éducation (adaptation des doses, sites, conservation)." },

{ id: "o33", titre: "Femme de 32 ans, épilepsie : passage du lacosamide à la lamotrigine", domaines: ["neuro", "grossesse"], niveau: 3, resume: "ED Freppel, 3 lignes et sa pilule, 3 problèmes",
  patient: { nom: "Mme E.", details: "32 ans", chips: ["Épilepsie"], contexte: "Prescription d'un neurologue, à renouveler 12 mois. Historique : Minidril, 1 boîte de 3 plaquettes il y a 4 mois." },
  lignes: [
    L("l1", "Vimpat 150 mg (lacosamide)", "1 comprimé matin et soir 7 jours, puis 100/150 mg, 100/100 mg, 50/100 mg, 50/50 mg, puis 50 mg le soir, chaque palier 7 jours, puis stop", "6 semaines", "Neurologue", "lacosamide"),
    L("l2", "Urbanyl 10 mg (clobazam), comprimé sécable", "1 comprimé à la demande", "À renouveler 12 mois", "Neurologue", "clobazam"),
    L("l3", "Lamictal 200 mg (lamotrigine), comprimé dispersible", "1 comprimé matin et soir", "30 jours, à renouveler 12 mois", "Neurologue", "lamotrigine"),
    L("l4", "Minidril (lévonorgestrel, éthinylestradiol)", "1 boîte de 3 plaquettes", "Il y a 4 mois", "Historique", "estroprogestatif")],
  problemes: [
    PB({ id: "p1", titre: "Lamotrigine et pilule estroprogestative", lignes: ["l3", "l4"], cle: ["l3"], niveau: "asdec", notion: "contraception", sfpc: ["3.3"], interv: ["6", "4"],
      mecanisme: ["L'éthinylestradiol **induit la glucuronoconjugaison** (UGT)", "**Concentration de lamotrigine divisée par deux** : risque de **crises**", "Semaine d'arrêt de la pilule : la lamotrigine remonte (effets indésirables)", "Thésaurus : **association déconseillée** pendant l'ajustement de la lamotrigine, **précaution d'emploi** sinon"],
      conduite: "Prévenir le neurologue : soit une contraception **non estroprogestative** (DIU), soit une posologie de lamotrigine adaptée avec dosage. Tout début ou arrêt de pilule doit lui être signalé.",
      statut: "verifie", note: FREPPEL + " Niveau lu dans le Thésaurus de l'ANSM (« ASDEC - PE »).", sources: ["edFreppel", "thesaurus"],
      devenir: { scenario: "Le neurologue conseille un DIU au cuivre et garde la lamotrigine à 400 mg/j avec un dosage dans un mois.", code: "1" } }),
    PB({ id: "p2", titre: "Pilule non renouvelée depuis plus d'un mois", lignes: ["l4"], cle: ["l4"], niveau: "apec", notion: "grossesse-risque", sfpc: ["10"], interv: ["4"],
      mecanisme: ["3 plaquettes = **3 mois**, délivrées il y a **4 mois**", "Contraception **interrompue** ou obtenue ailleurs ?", "Si arrêt : **grossesse** possible, et **lamotrigine qui remonte** (vertiges, diplopie)"],
      conduite: "Lui demander où elle en est de sa contraception. Si elle l'a arrêtée : le dire au neurologue (dose de lamotrigine) et parler d'une consultation préconceptionnelle si elle a un projet de grossesse.",
      statut: "partiel", note: FREPPEL + " La lecture de l'historique (3 mois délivrés il y a 4 mois) est ajoutée.", sources: ["edFreppel"] }),
    PB({ id: "p3", titre: "Clobazam à la demande renouvelable 12 mois", lignes: ["l2"], cle: ["l2"], niveau: "reg", notion: "reglementation", sfpc: ["9"], interv: ["3"],
      mecanisme: ["Benzodiazépine : **dépendance**, tolérance", "Dans l'**anxiété**, prescription limitée à **12 semaines**", "En **épilepsie** (en association), pas de limite", "« À la demande » évoque une indication anxiolytique ou une prise de secours en crise"],
      conduite: "Clarifier l'indication avec le neurologue. Pour l'anxiété, délivrer dans la limite de 12 semaines. Rappeler : pas d'alcool, prudence au volant.",
      statut: "partiel", note: FREPPEL + " Point « non dit cette année » dans l'ED ; la question de l'indication est construite.", sources: ["edFreppel"] })],
  sansProbleme: ["Vimpat : **décroissance progressive** jusqu'à l'arrêt, relais par la lamotrigine en monothérapie ; ne pas interrompre brutalement.", "Lamotrigine 400 mg/j : pleine dose déjà atteinte (l'instauration se fait à 25 mg puis paliers de 2 semaines, risque de décollement cutané).", "Grossesse : lamotrigine = antiépileptique de **référence** ; lacosamide envisageable en l'absence d'alternative (CRAT). Valproate et topiramate à proscrire."],
  patientDire: "Signaler au neurologue tout début ou arrêt de pilule. Éruption cutanée : arrêt et appel immédiat du médecin. Ne jamais arrêter un antiépileptique seule. Projet de grossesse : consultation préconceptionnelle avec le neurologue. Urbanyl : pas d'alcool, pas de conduite si somnolence.",
  retenir: "Interaction dans les deux sens entre lamotrigine et estroprogestatif. L'historique de dispensation dit si la pilule est vraiment prise.",
  rappels: ["teratogenes-femme"] },

{ id: "o34", titre: "Femme de 30 ans, trouble bipolaire : lithium et venlafaxine", domaines: ["psy", "grossesse"], niveau: 2, resume: "ED Freppel, 2 lignes et sa pilule, 3 points de vigilance",
  patient: { nom: "Mme B.", details: "30 ans", chips: ["Trouble bipolaire", "Phase dépressive probable", "Sous Minidril"], contexte: "Ordonnance d'une clinique de psychiatrie (numéro FINESS)." },
  lignes: [
    L("l1", "Téralithe LP 400 mg (carbonate de lithium), comprimé sécable", "2 comprimés le soir pendant le repas", "", "Psychiatre", "lithium"),
    L("l2", "Effexor LP 75 mg (venlafaxine), gélule", "1 gélule par jour", "", "Psychiatre", "venlafaxine"),
    L("l3", "Minidril (lévonorgestrel, éthinylestradiol)", "1 comprimé par jour", "En cours", "Historique", "estroprogestatif")],
  problemes: [
    PB({ id: "p1", titre: "Lithium : marge étroite, lithémie et situations à risque", lignes: ["l1"], cle: ["l1"], niveau: "apec", notion: "lithium", sfpc: ["10"], interv: ["4"],
      mecanisme: ["**Marge thérapeutique étroite**, élimination **rénale**", "Lithémie LP : **0,8 à 1,2 mmol/L**, 12 heures après la prise", "Déshydratation, régime sans sel, **AINS, IEC, diurétiques** : surdosage", "Effets : **LITR** (soif, cœur, thyroïde, rein)"],
      conduite: "Vérifier que les lithémies, la créatinine et la TSH sont faites. Expliquer les signes de surdosage. Pas d'AINS en automédication.",
      statut: "partiel", note: FREPPEL + " Cible de lithémie et interactions ajoutées (RCP, Thésaurus).", sources: ["edFreppel", "thesaurus"] }),
    PB({ id: "p2", titre: "Venlafaxine chez une patiente bipolaire sous lithium", lignes: ["l2", "l1"], cle: ["l2"], niveau: "apec", notion: "lithium", sfpc: ["3.1"], interv: ["4"],
      mecanisme: ["**IRSNA** : la patiente est sans doute en **phase dépressive**", "Antidépresseur chez un bipolaire : risque de **virage maniaque** (d'où le lithium associé)", "**Levée d'inhibition** : risque suicidaire les 3 premiers mois", "Avec le lithium et d'autres sérotoninergiques (tramadol…) : **syndrome sérotoninergique**"],
      conduite: "Délivrer. Conseiller de signaler une agitation, une insomnie avec euphorie, des idées noires. Pas de tramadol, de triptan ni de millepertuis sans avis.",
      statut: "partiel", note: FREPPEL + " Le virage maniaque est ajouté.", sources: ["edFreppel"] }),
    PB({ id: "p3", titre: "Lithium tératogène : la contraception fait partie de la dispensation", lignes: ["l3", "l1"], cle: ["l3"], niveau: "apec", notion: "grossesse-risque", sfpc: ["10"], interv: ["4"],
      mecanisme: ["Lithium : malformations **cardiaques** (maladie d'Ebstein)", "Le cours : **contre-indication formelle** pendant la grossesse", "Le CRAT est plus nuancé (arrêt jusqu'à la fin de l'organogenèse cardiaque, ou poursuite sous surveillance)"],
      conduite: "Vérifier que la pilule est prise régulièrement. Projet de grossesse : à préparer avec le psychiatre, jamais d'arrêt brutal du lithium.",
      statut: "verifie", note: FREPPEL + " Nuance du CRAT ajoutée.", sources: ["edFreppel", "lithiumGrossesse"] })],
  sansProbleme: ["Pas d'interaction entre le lithium, la venlafaxine et la pilule au niveau de l'efficacité contraceptive.", "Téralithe LP 400 : 800 mg le soir au repas, posologie habituelle à confirmer par la lithémie."],
  patientDire: "Lithium le soir au repas, boire normalement, ne pas supprimer le sel. Diarrhée, vomissements, fièvre, forte chaleur, tremblements importants : appeler le médecin (lithémie). Pas d'AINS. Venlafaxine : effet en quelques semaines, ne jamais arrêter seule. Pilule tous les jours.",
  retenir: "Lithium = marge étroite (LITR, lithémie, AINS/IEC/diurétiques) et tératogène : la contraception fait partie des conditions de dispensation.",
  rappels: ["teratogenes-femme"] },

{ id: "o35", titre: "Femme de 30 ans, migraine : triptan et traitement de fond", domaines: ["neuro"], niveau: 1, resume: "ED Freppel, 2 lignes, conseils de prise",
  patient: { nom: "Mme Z.", details: "30 ans", chips: ["Migraine"], contexte: "Ordonnance d'une clinique de neurologie (numéro FINESS)." },
  lignes: [
    L("l1", "Zomig 2,5 mg (zolmitriptan), comprimé", "1 comprimé si migraine, 2 par jour au maximum, au moins 2 heures entre les 2 prises", "", "Neurologue", "zolmitriptan"),
    L("l2", "Propranolol Teva 40 mg, comprimé sécable", "1 comprimé par jour", "", "Neurologue", "propranolol")],
  problemes: [
    PB({ id: "p1", titre: "Triptan : règles de prise et terrain vasculaire", lignes: ["l1"], cle: ["l1"], niveau: "apec", notion: "migraine", sfpc: ["10"], interv: ["3"],
      mecanisme: ["Agoniste **5-HT1B/1D** : **vasoconstriction**", "Contre-indiqué : **HTA**, coronaropathie, **AVC** ; à éviter chez la fumeuse, l'obèse, en cas d'hyperlipidémie", "**Demi-vie courte** : récidive fréquente, 2e prise possible, **2 par jour au maximum**", "Prises répétées : **céphalées par abus**"],
      conduite: "Expliquer : dès le début de la céphalée (pas pendant l'aura), 2e prise 2 à 4 heures plus tard si récidive, carnet de crises. Inefficace sur 3 crises : changer de triptan. Demander tabac, tension, aura et contraception (estroprogestatif + migraine avec aura : risque d'AVC).",
      statut: "verifie", note: FREPPEL, sources: ["edFreppel", "zomigRcp"] }),
    PB({ id: "p2", titre: "Propranolol en traitement de fond", lignes: ["l2"], cle: ["l2"], niveau: "apec", notion: "migraine", sfpc: ["10"], interv: ["4"],
      mecanisme: ["**Prophylaxie** de la migraine (indication du propranolol)", "Non cardiosélectif : contre-indiqué dans l'**asthme**", "Bradycardie, fatigue, cauchemars", "Effet du traitement de fond jugé après **plusieurs semaines**"],
      conduite: "Vérifier l'absence d'asthme, conseiller une prise quotidienne régulière même sans crise, jamais d'arrêt brutal.",
      statut: "partiel", note: "Point construit à partir de la fiche du propranolol (ED de Mme Freppel) ; non détaillé pour cette ordonnance.", sources: ["edFreppel"] })],
  sansProbleme: ["Les AINS sont la 1re ligne de la crise, mais **contre-indiqués pendant la grossesse** (en pratique toute la grossesse) ; les triptans ne le sont pas.", "Récidives fréquentes : triptan à demi-vie plus longue (naratriptan 6 h, frovatriptan 26 h).", "Propranolol et zolmitriptan : pas d'interaction retenue par l'ED (à la différence du rizatriptan, dont la dose est réduite avec le propranolol)."],
  patientDire: "Zomig dès que la céphalée commence ; si elle revient, 2e comprimé au moins 2 heures après, jamais plus de 2 par jour. Carnet de crises. Propranolol tous les jours, même sans crise. Douleur thoracique après la prise : consulter.",
  retenir: "Triptan : stade précoce de la céphalée, 2 prises par jour au maximum, 3 crises pour juger, et terrain vasculaire (HTA, tabac, aura et pilule)." },

{ id: "o36", titre: "Radiochimiothérapie : capécitabine, résultats DPD en attente", domaines: ["onco"], niveau: 2, resume: "Annale 2021-22, 2 lignes, que faire au comptoir ?",
  patient: { nom: "M. ou Mme R.", details: "Adulte, poids et taille non précisés", chips: ["Radiothérapie en cours"], contexte: "Ordonnance du 06/12/2021 : « Soit capécitabine 1 650 mg matin et soir du 21.12.2021 jusqu'au 25.01.2021 les jours de radiothérapie. À prendre après accord du médecin car résultats DPD en attente. Les médicaments peuvent être substitués sauf mention contraire manuscrite. »" },
  lignes: [
    L("l1", "Capécitabine 500 mg Biogaran, comprimé", "3 comprimés à 8 h, 3 comprimés à 20 h", "45 jours", "Oncologue", "capecitabine"),
    L("l2", "Capécitabine 150 mg Accord, comprimé", "1 comprimé à 8 h, 1 comprimé à 20 h", "45 jours", "Oncologue", "capecitabine")],
  problemes: [
    PB({ id: "p1", titre: "Uracilémie non prise en compte : délivrance impossible en l'état", lignes: ["l1"], cle: ["l1"], niveau: "reg", priorite: 1, notion: "chimio-orale", sfpc: ["9"], interv: ["7"],
      mecanisme: ["Capécitabine = **prodrogue du 5-FU**, dégradé par la **DPD**", "Déficit en DPD : **toxicité grave, parfois mortelle**", "Depuis 2019 : **uracilémie obligatoire** avant la 1re dose", "Le prescripteur écrit « **résultats uracilémie pris en compte** » ; le pharmacien **vérifie** cette mention avant toute dispensation"],
      conduite: "Ne pas délivrer tant que la mention n'y est pas. Appeler le service : obtenir le résultat de l'uracilémie, une dose éventuellement adaptée et une ordonnance portant la mention. Expliquer au patient pourquoi.",
      statut: "verifie", note: NOTE_ANNALE + " L'obligation est vérifiée sur le site de l'ANSM.", sources: ["annales2122", "ansmDpd"],
      devenir: { scenario: "Le service rappelle deux jours plus tard : uracilémie normale, la dose est maintenue et une nouvelle ordonnance avec la mention est faxée.", code: "1" } }),
    PB({ id: "p2", titre: "Dates incohérentes et quantité à délivrer", lignes: ["l2"], cle: ["l2"], niveau: "reg", notion: "chimio-orale", sfpc: ["9"], interv: ["3"],
      mecanisme: ["Fin indiquée le **25.01.2021**, avant le début (21.12.2021) : **erreur d'année**", "« 45 jours » ne correspond pas à la période (environ 5 semaines)", "Prise **uniquement les jours de radiothérapie** (pas le week-end en général) : quantité à calculer"],
      conduite: "Faire préciser la date de fin et le calendrier des séances ; délivrer la quantité juste (pas de stock inutile d'un cytotoxique). Remettre un calendrier de prise.",
      statut: "partiel", note: NOTE_ANNALE, sources: ["annales2122"] })],
  sansProbleme: ["Dose : 1 650 mg deux fois par jour = **825 mg/m² × 2,0 m²**, la dose de la radiochimiothérapie ; vérifier poids et taille.", "Deux génériques de laboratoires différents, substituables : garder les mêmes boîtes d'une délivrance à l'autre si possible.", "Interactions à rechercher : AVK (INR), phénytoïne, brivudine (contre-indiquée)."],
  patientDire: "Ne rien prendre avant l'accord du médecin. Ensuite : dans les 30 minutes après le repas, à 8 h et 20 h, seulement les jours de radiothérapie. Avaler sans écraser, se laver les mains. Oubli : ne pas doubler. Diarrhée importante, fièvre, mains et pieds rouges et douloureux, aphtes : appeler le service.",
  retenir: "Capécitabine ou 5-FU : pas de délivrance sans la mention « résultats uracilémie pris en compte » sur l'ordonnance." }
);

/* ---------- Cartes ---------- */
CARDS.push(
  { id: "k42", notion: "grossesse-risque", drug: "teriflunomide", recto: "Tériflunomide et projet de grossesse : pourquoi attendre, comment accélérer ?", cle: "**Cycle entéro-hépatique** · **colestyramine** · **moins de 0,02 mg/L**",
    points: [["Sans procédure", "Jusqu'à **2 ans** (CRAT : au moins 3,5 mois)"], ["Procédure", "Colestyramine ou charbon activé environ **11 jours**"], ["Contrôle", "Deux dosages à 14 jours d'intervalle (à vérifier)"]] },
  { id: "k43", notion: "contraception", drug: "lamotrigine", recto: "Lamotrigine et pilule estroprogestative : effet, niveau, solution ?", cle: "Lamotrigine **÷ 2** · **ASDEC - PE** · **DIU**",
    points: [["Mécanisme", "L'éthinylestradiol **induit la glucuronoconjugaison**"], ["Semaine d'arrêt", "La lamotrigine **remonte**"], ["Sinon", "Adapter la dose avec un **dosage**"]] },
  { id: "k44", notion: "surveillance-bio", drug: "carbimazole", recto: "Patiente sous Néo-Mercazole : fièvre et mal de gorge. Que faites-vous ?", cle: "**Agranulocytose** · **NFS en urgence** · arrêt et appel du médecin",
    points: [["Bilan habituel", "NFS, bilan hépatique, **T4 libre**"], ["Autres", "Hépatite cholestatique, **pancréatite**"]] },
  { id: "k45", notion: "lithium", drug: "lithium", recto: "Téralithe LP 400 : quand prélever la lithémie et quelle cible ?", cle: "**12 heures** après la prise du soir · **0,8 à 1,2 mmol/L**",
    points: [["Quand", "5 jours après le début ou chaque changement, puis régulièrement"], ["Avec", "Créatinine, **TSH**, calcémie"]] },
  { id: "k46", notion: "lithium", drug: "lithium", recto: "Lithium : quels médicaments et quelles situations font monter la lithémie ?", cle: "**AINS, IEC, sartans, diurétiques** · **déshydratation, régime sans sel**",
    points: [["Niveau", "**Associations déconseillées**"], ["Effets du lithium", "**LITR** : liquide, irrégularités cardiaques, thyroïde, rein"], ["Surdosage", "Tremblement grossier, diarrhée, confusion"]] },
  { id: "k47", notion: "migraine", drug: "zolmitriptan", recto: "Triptan : quand le prendre, combien, et quand le juger inefficace ?", cle: "**Dès la céphalée** (pas pendant l'aura) · **2 par jour** au maximum · **3 crises**",
    points: [["Récidive", "2e prise **2 heures** après au moins"], ["Contre-indications", "**HTA**, coronaropathie, **AVC**, moclobémide"], ["Suivi", "**Carnet de crises**"]] },
  { id: "k48", notion: "insuline", drug: "insuline-asparte", recto: "Stylos d'insuline : conservation avant et après ouverture ?", cle: "Avant : **2 à 8 °C**, pas de congélation · après : **température ambiante, 4 semaines**",
    points: [["Lumière", "**Reboucher** le stylo"], ["Injection", "**Rotation** des sites, pas dans une lipodystrophie"]] },
  { id: "k49", notion: "chimio-orale", drug: "capecitabine", recto: "Capécitabine : quelle mention doit figurer sur l'ordonnance pour délivrer ?", cle: "« **Résultats uracilémie pris en compte** »",
    points: [["Pourquoi", "Déficit en **DPD** : toxicité du 5-FU parfois mortelle"], ["Depuis", "**2019** (ANSM, INCa, HAS)"], ["Uracilémie de 150 ng/mL ou plus", "Déficit complet : **contre-indication**"]] },
  { id: "k50", notion: "corticotherapie", drug: "prednisone", recto: "Corticothérapie orale de 5 semaines : moment de prise et effets à évoquer ?", cle: "**Le matin** · décroissance · effets **compatibles avec la durée**",
    points: [["À évoquer", "Insomnie, rétention hydrosodée, glycémie, appétit"], ["À ne pas évoquer", "Bosse de bison, insuffisance surrénalienne"], ["Mnémotechnique", "**CORTICOIDES**"]] },
  { id: "k51", notion: "surveillance-bio", drug: "propranolol", recto: "Propranolol : quelles particularités et les deux effets indésirables à retenir ?", cle: "**Non cardiosélectif**, sans ASI · **bradycardie** et **bronchospasme**",
    points: [["Contre-indication", "**Asthme**"], ["Lipophile", "Cauchemars"], ["Diabétique", "Masque l'**hypoglycémie**"]] }
);
