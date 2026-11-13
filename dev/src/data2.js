/* Lot 2 : cartes restructurées, fiches détaillées (modèle), rappels de cours, méthode en 10 points.
   Dans les textes, **…** marque une information clé à mettre en valeur. */
SRC.simva = { label: "RCP Simvastatine Cristers Pharma 20 mg (02/07/2026)", url: "https://base-donnees-publique.medicaments.gouv.fr/medicament/63025508/extrait" };
SRC.lyon = { label: "Cours Hypolipémiants, Université Lyon 1 (source secondaire)", url: "https://moodle.univ-lyon1.fr/pluginfile.php/105504/mod_folder/content/0/S3/Supports/Hypolip%C3%A9miants%20IFSI%202019-2020.pdf" };
SRC.statRevue = { label: "Revue sur les interactions des statines, Acta Pharm. 2013 (source secondaire)", url: "https://hrcak.srce.hr/file/150439" };
NOTIONS.perso = "Mes cartes";
NOTIONS["statines"] = "Statines : métabolisme et surveillance";

const METHODE = [
  ["Patient à risque", "Oui ou non, et pourquoi : âge, grossesse possible, fonction rénale ou hépatique."],
  ["Pour chaque médicament", "Indication, mécanisme d'action, effets indésirables, cinétique particulière."],
  ["Interactions", "Niveau, mécanisme, conséquence."],
  ["Pathologies traitées", "Ce que l'ordonnance, vue dans son ensemble, traite."],
  ["Posologie", "Conforme ou non, adaptée au patient."],
  ["Plan de prise", "Quel médicament, à quel moment de la journée."],
  ["Délivrance", "Oui ou non, et à quelle condition."],
  ["Conseils", "Au moins trois."],
  ["Surveillance", "Clinique et biologique."],
  ["Automédication à éviter", "Ce que le patient ne doit pas prendre seul."]
];

const RAPPELS = {
  "statines-metabolisme": {
    titre: "Métabolisme des statines",
    intro: "La voie de métabolisme prédit le risque d'interaction. Plus la statine dépend du CYP3A4, plus un inhibiteur augmente son exposition.",
    colonnes: ["Statine", "Voie principale", "Risque d'interaction"],
    lignes: [
      ["**Simvastatine**", "**CYP3A4** (prodrogue)", "Élevé : inhibiteurs puissants contre-indiqués"],
      ["**Atorvastatine**", "**CYP3A4**", "Élevé"],
      ["Fluvastatine", "CYP2C9", "Modéré"],
      ["Rosuvastatine", "Peu métabolisée (CYP2C9 mineur)", "Modéré"],
      ["Pravastatine", "Pas de CYP (sulfatation)", "Faible"]
    ],
    reflexe: "Réflexe au comptoir : statine + macrolide, antifongique azolé ou jus de pamplemousse → penser CYP3A4 et douleurs musculaires.",
    statut: "partiel",
    note: "Simvastatine : vérifié dans le RCP. Les autres lignes viennent de sources secondaires, à vérifier sur son cours.",
    sources: ["simva", "lyon", "statRevue"]
  }
};

Object.assign(DRUGS.simvastatine, {
  statut: "verifie", note: "Fiche rédigée à partir du RCP du 02/07/2026, lu par extraits. À relire.", sources: ["simva", "clari"],
  poso: ["**Une prise par jour, le soir**", "10 à 40 mg par jour le plus souvent"],
  alertes: ["**Douleur musculaire inexpliquée** : à signaler tout de suite", "Contre-indiquée avec les **inhibiteurs puissants du CYP3A4** (clarithromycine, azolés)", "Contre-indiquée pendant la **grossesse** et l'**allaitement**"],
  conseils: ["Signaler toute douleur, crampe ou faiblesse musculaire inexpliquée", "**Pas de jus de pamplemousse**", "Prévenir avant tout nouveau médicament, surtout antibiotique ou antifongique", "Poursuivre le régime alimentaire", "Arrêt en cas de grossesse ou de projet de grossesse : en parler au médecin"],
  rappels: ["statines-metabolisme"],
  complet: {
    identite: [["Spécialités", "Zocor, génériques"], ["Classe", "Inhibiteur de l'HMG-CoA réductase (statine), ATC C10AA01"], ["Délivrance", "Liste I"], ["Formes", "Comprimés pelliculés, dont 10, 20 et 40 mg"], ["Conservation", "3 ans, pas de condition particulière"]],
    mecanisme: ["**Prodrogue** : lactone inactive", "Hydrolysée dans le foie en bêta-hydroxyacide actif", "Inhibe l'**HMG-CoA réductase**, enzyme limitante de la synthèse du cholestérol", "Induction des récepteurs du LDL", "**Baisse du LDL-cholestérol** : environ 30 % à 10 mg, 38 % à 20 mg, 41 % à 40 mg"],
    indications: ["Hypercholestérolémie primaire ou dyslipidémie mixte, en complément du régime", "Hypercholestérolémie familiale homozygote, en complément des autres traitements", "**Prévention cardiovasculaire** : athérosclérose avérée ou diabète, que le cholestérol soit normal ou élevé"],
    posologies: [["Plage", "5 à 80 mg par jour, en **une prise le soir**. Ajustement toutes les 4 semaines au moins"], ["Hypercholestérolémie", "Début à 10 ou 20 mg par jour ; 20 à 40 mg si la baisse de LDL visée dépasse 45 %"], ["Prévention cardiovasculaire", "20 à 40 mg par jour"], ["Forme familiale homozygote", "40 mg par jour"], ["80 mg", "Réservé aux formes sévères à haut risque, objectif non atteint à dose plus faible"], ["Insuffisance rénale", "Pas d'ajustement si modérée. **Clairance sous 30 mL/min : prudence au-delà de 10 mg**"], ["Sujet âgé", "Pas d'ajustement"], ["Enfant", "Forme familiale hétérozygote, 10 à 17 ans : 10 à 40 mg par jour"]],
    plafonds: [["**20 mg par jour au maximum**", "avec amiodarone, amlodipine, vérapamil, diltiazem"], ["**10 mg par jour au maximum**", "avec un fibrate autre que le fénofibrate"], ["40 mg par jour au maximum", "avec ticagrélor ou lomitapide"]],
    administration: ["Voie orale, le soir, en une prise", "Les aliments ne modifient pas l'absorption", "Résine chélatrice des acides biliaires : prendre la simvastatine 2 heures avant ou 4 heures après"],
    ci: ["Hypersensibilité", "Affection hépatique évolutive ou élévation prolongée inexpliquée des transaminases", "**Grossesse et allaitement**", "**Inhibiteurs puissants du CYP3A4** : itraconazole, kétoconazole, posaconazole, voriconazole, inhibiteurs de protéase du VIH, érythromycine, **clarithromycine**, télithromycine, cobicistat", "Gemfibrozil, ciclosporine, danazol"],
    interactions: [["ci", "Inhibiteurs puissants du CYP3A4", "Exposition multipliée par 5 ou plus → rhabdomyolyse. Si l'inhibiteur est indispensable : **interrompre la simvastatine** pendant le traitement"], ["ci", "Gemfibrozil, ciclosporine, danazol", "Risque musculaire majoré"], ["ci", "Acide fusidique par voie générale", "Ne pas associer, ni dans les 7 jours qui suivent son arrêt"], ["pe", "Amiodarone, amlodipine, vérapamil, diltiazem", "Plafond de 20 mg par jour"], ["pe", "Antivitamines K", "Contrôler l'INR au début et à chaque changement de dose"], ["apec", "Jus de pamplemousse", "À éviter : plus d'un litre par jour multiplie l'exposition par 7"], ["apec", "Rifampicine", "Exposition très diminuée : perte d'efficacité possible"]],
    grossesse: { g: "ci", gTexte: "Contre-indiquée. Arrêt pendant la grossesse ou tant qu'elle n'est pas écartée.", a: "ci", aTexte: "Contre-indiqué.", f: "Pas de donnée clinique." },
    ei: { frequents: ["Le RCP ne classe aucun effet comme fréquent ou très fréquent"], rares: ["**Myalgies, crampes**, élévation des CPK", "Troubles digestifs : constipation, douleurs abdominales, nausées, diarrhée", "Céphalées, vertiges, paresthésies", "Élévation des transaminases", "Éruption, prurit, alopécie"], graves: ["**Rhabdomyolyse**, avec ou sans insuffisance rénale aiguë", "Hépatite, insuffisance hépatique", "Pancréatite", "Myopathie nécrosante auto-immune", "Pneumopathie interstitielle", "Myasthénie déclenchée ou aggravée"], classe: "Rapportés avec certaines statines : troubles du sommeil et cauchemars, troubles sexuels, **diabète**, troubles de la mémoire." },
    surveillance: ["**CPK** avant traitement chez les patients à risque : plus de 65 ans, femme, insuffisance rénale, hypothyroïdie non contrôlée, antécédent musculaire, alcool. Pas de dosage après un effort intense", "**Arrêt si CPK supérieures à 5 fois la normale** avec symptômes musculaires", "**Transaminases** avant traitement, puis si besoin. Arrêt si elles restent au-dessus de 3 fois la normale", "Glycémie chez les patients à risque de diabète", "Interruption quelques jours avant une chirurgie majeure"],
    cinetique: ["Premier passage hépatique très important : **biodisponibilité inférieure à 5 %**", "Liaison aux protéines supérieure à 95 %", "Substrat du **CYP3A4**", "Entrée dans l'hépatocyte par le transporteur **OATP1B1** (gène SLCO1B1) : un polymorphisme augmente l'exposition", "Demi-vie courte du métabolite actif, environ 2 heures", "Élimination surtout fécale (60 %), urinaire 13 %"]
  }
});

Object.assign(DRUGS.ramipril, {
  statut: "verifie", note: "Fiche rédigée à partir du RCP Ramipril Krka du 22/04/2020, lu par extraits. À relire.", sources: ["rami"],
  poso: ["**Hypertension** : début à 2,5 mg, **maximum 10 mg par jour**", "Insuffisance cardiaque : début à 1,25 mg", "Une prise par jour le plus souvent"],
  alertes: ["**Angio-œdème** : gonflement du visage, des lèvres, de la langue → arrêt et **15**", "**Toux sèche** persistante, fréquente", "**Hyperkaliémie** avec potassium, épargneurs de potassium, AINS", "Contre-indiqué aux **2e et 3e trimestres** de grossesse"],
  complet: {
    identite: [["Spécialités", "Triatec, génériques"], ["Classe", "Inhibiteur de l'enzyme de conversion (IEC), ATC C09AA05"], ["Délivrance", "Liste I"], ["Formes", "Comprimés à 1,25, 2,5, 5 et 10 mg"], ["Conservation", "3 ans, à 25 °C au maximum, dans l'emballage d'origine, à l'abri de l'humidité"]],
    mecanisme: ["**Prodrogue** transformée en **ramiprilate**, seul métabolite actif", "Inhibe l'**enzyme de conversion**", "Moins d'**angiotensine II** et moins d'aldostérone : vasodilatation, baisse de la pression artérielle", "Dégradation de la **bradykinine** ralentie : vasodilatation, mais aussi **toux** et angio-œdème"],
    indications: ["**Hypertension artérielle**", "Prévention cardiovasculaire : maladie athérothrombotique avérée, ou diabète avec au moins un facteur de risque", "Néphropathie diabétique débutante ou manifeste, néphropathie non diabétique avec protéinurie d'au moins 3 g par jour", "**Insuffisance cardiaque** symptomatique", "Après un infarctus avec signes d'insuffisance cardiaque, à partir de 48 heures"],
    posologies: [["Hypertension", "**2,5 mg par jour**, doublé toutes les 2 à 4 semaines, **maximum 10 mg par jour**"], ["Prévention cardiovasculaire", "2,5 mg, doublé après 1 à 2 semaines, cible 10 mg par jour"], ["Néphropathie", "1,25 mg, puis 2,5 mg après 2 semaines, puis 5 mg"], ["Insuffisance cardiaque", "**1,25 mg par jour**, doublé toutes les 1 à 2 semaines, maximum 10 mg, de préférence en 2 prises"], ["Après un infarctus", "2,5 mg deux fois par jour, cible 5 mg deux fois par jour"], ["Patient sous diurétique", "Arrêter le diurétique 2 à 3 jours avant si possible, sinon début à 1,25 mg"], ["Insuffisance rénale", "Clairance de 30 à 60 mL/min : **maximum 5 mg**. De 10 à 30 : début à 1,25 mg, maximum 5 mg"], ["Insuffisance hépatique", "Maximum 2,5 mg par jour, sous surveillance étroite"], ["Sujet âgé", "Dose de départ plus basse, augmentation plus lente"]],
    plafonds: [],
    administration: ["Voie orale, **chaque jour à la même heure**", "Pendant ou en dehors des repas, avec une boisson", "Ne pas écraser ni mâcher"],
    ci: ["Hypersensibilité au ramipril ou à un autre IEC", "**Antécédent d'angio-œdème**, quelle qu'en soit la cause", "**Sténose bilatérale des artères rénales**, ou sur rein unique", "**2e et 3e trimestres de grossesse**", "Hypotension ou instabilité hémodynamique", "Association au **sacubitril/valsartan** : 36 heures d'écart", "Association à l'aliskiren en cas de diabète ou de DFG sous 60", "Dialyse ou aphérèse sur certaines membranes"],
    interactions: [["ci", "Sacubitril/valsartan", "Angio-œdème. Respecter 36 heures entre les deux"], ["asdec", "Autre bloqueur du système rénine-angiotensine (sartan, aliskiren)", "Hypotension, hyperkaliémie, insuffisance rénale aiguë"], ["asdec", "Potassium, diurétiques épargneurs de potassium, sels de régime, triméthoprime", "**Hyperkaliémie**. Surveiller la kaliémie"], ["pe", "AINS", "Effet antihypertenseur réduit, risque d'**insuffisance rénale aiguë** et d'hyperkaliémie"], ["pe", "Diurétiques", "Hypotension au début du traitement"], ["asdec", "Lithium", "Lithémie augmentée : toxicité"], ["apec", "Antidiabétiques, insuline", "Hypoglycémie possible"], ["apec", "Racécadotril, gliptines, inhibiteurs de mTOR", "Angio-œdème plus fréquent"]],
    grossesse: { g: "ci", gTexte: "1er trimestre : non recommandé. **2e et 3e trimestres : contre-indiqué** (atteinte rénale du fœtus, oligoamnios).", a: "asdec", aTexte: "Non recommandé, surtout pour un nouveau-né ou un prématuré.", f: "Le RCP lu ne donne pas d'information." },
    ei: { frequents: ["**Toux sèche**, bronchite, sinusite, essoufflement", "**Hypotension**, y compris orthostatique, vertiges, syncope", "Céphalées, fatigue", "Troubles digestifs", "**Hyperkaliémie**", "Éruption cutanée, crampes"], rares: ["Peu fréquents : altération de la fonction rénale, angio-œdème, troubles du goût, bronchospasme, dysfonction érectile"], graves: ["**Angio-œdème**, avec risque d'obstruction des voies aériennes", "Hyperkaliémie sévère", "Insuffisance rénale aiguë", "Neutropénie, agranulocytose", "Pancréatite, atteinte hépatique", "Réactions cutanées sévères"], classe: "" },
    surveillance: ["**Créatinine** avant et pendant le traitement, surtout les premières semaines", "**Kaliémie** et natrémie, surtout chez le sujet âgé, l'insuffisant rénal et le diabétique", "Pression artérielle après la première dose et à chaque augmentation", "Numération en cas de signe d'infection", "Interrompre la veille d'une chirurgie si possible"],
    cinetique: ["Prodrogue : pic du ramiprilate en 2 à 4 heures", "Absorption non modifiée par les aliments", "**Demi-vie du ramiprilate : 13 à 17 heures**, d'où une prise par jour", "**Élimination rénale** : l'exposition augmente si la fonction rénale baisse", "Effet maximal sur la pression après 3 à 4 semaines", "Pas d'effet rebond à l'arrêt"]
  }
});

/* L'option « interrompre la simvastatine » est maintenant vérifiée dans son RCP. */
ORDOS[0].problemes[0].statut = "verifie";
ORDOS[0].problemes[0].note = "RCP clarithromycine (rubrique 4.3) et RCP simvastatine (rubriques 4.3 et 4.4).";
ORDOS[0].problemes[0].sources = ["clari", "simva"];
ORDOS[0].problemes[0].conduite = "Ne pas délivrer en l'état. Appeler le prescripteur. Si la clarithromycine est indispensable, la simvastatine doit être interrompue pendant tout le traitement ; sinon, choisir un antibiotique sans interaction.";
ORDOS[0].rappels = ["statines-metabolisme"];

const CARDS = [
  { id: "k1", notion: "cyp3a4-statine", drug: "simvastatine", recto: "Un patient sous simvastatine reçoit de la clarithromycine. Niveau de l'interaction, qui inhibe quoi, quel risque ?", cle: "**Contre-indication** · risque de **rhabdomyolyse**",
    points: [["Qui inhibe", "La **clarithromycine**, inhibiteur puissant du **CYP3A4**"], ["Conséquence", "La simvastatine n'est plus métabolisée : son exposition augmente fortement"], ["Conduite", "Appeler le prescripteur. Si l'antibiotique est indispensable : **interrompre la simvastatine** le temps du traitement"]] },
  { id: "k2", notion: "aod-dose", drug: "apixaban", recto: "Apixaban dans la fibrillation atriale : quels sont les 3 critères de réduction de dose, et combien en faut-il ?", cle: "**2,5 mg × 2 par jour** dès **2 critères sur 3**",
    points: [["Âge", "**80 ans** ou plus"], ["Poids", "**60 kg** ou moins"], ["Créatinine", "**133 µmol/L** ou plus"], ["Aussi", "Si la clairance est entre 15 et 29 mL/min"]] },
  { id: "k3", notion: "paracetamol-dose", drug: "paracetamol", recto: "Paracétamol chez un adulte de plus de 50 kg sans facteur de risque : dose par prise, intervalle, dose par jour ?", cle: "**1 g** · **4 heures** · **3 g par jour**",
    points: [["Par prise", "1 g au maximum"], ["Intervalle", "4 heures au minimum"], ["Par jour", "3 g ; **4 g seulement sur avis médical**"]] },
  { id: "k4", notion: "paracetamol-dose", drug: "paracetamol", recto: "Paracétamol quand la clairance est entre 10 et 50 mL/min : quel intervalle, quelle dose par jour ?", cle: "**6 heures** · **3 g par jour**",
    points: [["Intervalle", "6 heures au minimum entre deux prises"], ["Par jour", "3 g au maximum"]] },
  { id: "k5", notion: "ains-anticoagulant", drug: "ibuprofene", recto: "Un patient sous anticoagulant oral demande ou reçoit un AINS. Niveau de l'interaction, quel risque ?", cle: "**Association déconseillée** · risque **hémorragique**",
    points: [["Mécanisme", "L'AINS agresse la muqueuse gastroduodénale ; l'anticoagulant fait saigner"], ["Conduite", "Éviter. Si inévitable : surveillance clinique étroite"], ["Au comptoir", "**Jamais d'AINS ni d'aspirine en automédication** sous anticoagulant"]] },
  { id: "k6", notion: "ains-rein", drug: "ibuprofene", recto: "AINS chez un patient sous IEC ou sous diurétique : niveau, risque, quels patients sont les plus exposés ?", cle: "**Précaution d'emploi** · **insuffisance rénale aiguë**",
    points: [["Mécanisme", "Moins de prostaglandines rénales → la filtration glomérulaire chute"], ["Patients à risque", "**Âgé**, **déshydraté**, **sous diurétiques**, **fonction rénale altérée**"], ["Conduite", "Hydrater, surveiller la fonction rénale"]] },
  { id: "k7", notion: "hyperkaliemie", drug: "potassium", recto: "Supplément de potassium chez un patient sous spironolactone : niveau de l'interaction, quel risque, quelle exception ?", cle: "**Association déconseillée** · **hyperkaliémie** potentiellement létale",
    points: [["Exception", "Sauf en cas d'**hypokaliémie**"], ["Aggravé par", "Une fonction rénale altérée"]] },
  { id: "k8", notion: "hyperkaliemie", drug: "spironolactone", recto: "Spironolactone dans l'insuffisance cardiaque : à quelles kaliémies augmenter, réduire, arrêter ?", cle: "Seuils : **5** · **5,5** · **6 mmol/L**",
    points: [["Sous 5", "Augmentation possible à 50 mg"], ["Au-dessus de 5,5", "**Réduire** la dose"], ["À partir de 6", "**Arrêter**"]] },
  { id: "k9", notion: "ains-dose", drug: "ibuprofene", recto: "Ibuprofène 400 mg chez l'adulte en automédication : intervalle entre deux prises, dose maximale par jour, 2 contre-indications de terrain ?", cle: "**6 à 8 heures** · **1 200 mg par jour**",
    points: [["Contre-indiqué", "Insuffisance **rénale** sévère, insuffisance **cardiaque** sévère"], ["Conseil", "Pendant un repas, dose la plus faible, durée la plus courte"]] },
  { id: "k10", notion: "iec-toux", drug: "ramipril", recto: "Un patient traité pour l'hypertension tousse à sec depuis 3 semaines. Quelle classe chercher dans son traitement, et que faire ?", cle: "Un **IEC** · **orienter sans arrêter** le traitement",
    points: [["Fréquence", "1 à 10 patients sur 100"], ["Mécanisme", "Accumulation de **bradykinine**"], ["Évolution", "Disparaît à l'arrêt, décidé par le médecin"], ["À ne pas faire", "Délivrer un antitussif comme solution"]] },
  { id: "k11", notion: "iec-toux", drug: "ramipril", recto: "Sous IEC, quels signes imposent d'appeler le 15 ?", cle: "**Angio-œdème** : visage, lèvres, langue qui gonflent",
    points: [["Signes", "Gonflement du visage, des lèvres, de la langue ; gêne pour respirer ou avaler"], ["Conduite", "**Arrêt de l'IEC** et **appel au 15**"], ["Ensuite", "Contre-indication définitive des IEC"]] },
  { id: "k12", notion: "betabloquant-ic", drug: "bisoprolol", recto: "Bisoprolol dans l'insuffisance cardiaque : dose de départ, dose cible, moment de prise, règle d'arrêt ?", cle: "**1,25 mg → 10 mg** par paliers · le **matin** · **jamais d'arrêt brutal**",
    points: [["Paliers", "Augmentation progressive, une prise par jour"], ["Arrêt", "Toujours progressif : risque de dégradation aiguë"]] },
  { id: "k13", notion: "iec-usage", drug: "ramipril", recto: "Ramipril dans l'hypertension : dose de départ, dose maximale, dose maximale si la clairance est entre 30 et 60 mL/min ?", cle: "**2,5 mg** · **10 mg** · **5 mg** si clairance 30 à 60",
    points: [["Rythme", "Une prise par jour, à heure fixe, avec ou sans repas"], ["Augmentation", "Dose doublée toutes les 2 à 4 semaines"]] },
  { id: "k14", notion: "aod-dose", drug: "apixaban", recto: "Un patient a oublié une prise d'apixaban. Que lui dire ?", cle: "**Prendre la dose tout de suite**, puis continuer normalement",
    points: [["Rythme", "Reprendre les deux prises par jour habituelles"]] },
  { id: "k15", notion: "statines", drug: "simvastatine", recto: "Simvastatine : à quel moment de la journée la prendre, avec ou sans repas, et quelle boisson éviter ?", cle: "Le **soir**, en une prise",
    points: [["Repère", "Demi-vie courte du métabolite actif, environ 2 heures"], ["Aliments", "Ne modifient pas l'absorption"], ["À éviter", "**Jus de pamplemousse** (inhibe le CYP3A4)"]] },
  { id: "k16", notion: "statines", drug: "simvastatine", recto: "Sous statine, quel symptôme le patient doit-il signaler tout de suite, et quel dosage le confirme ?", cle: "**Douleur ou faiblesse musculaire inexpliquée** · dosage des **CPK**",
    points: [["Seuil d'arrêt", "CPK supérieures à **5 fois la normale** avec symptômes"], ["Piège", "Pas de dosage après un effort intense"], ["Risque", "Rhabdomyolyse, avec insuffisance rénale aiguë"]] },
  { id: "k17", notion: "statines", drug: "simvastatine", recto: "Avec quels médicaments la simvastatine est-elle plafonnée à 20 mg par jour ?", cle: "**Amiodarone, amlodipine, vérapamil, diltiazem**",
    points: [["Pourquoi", "Ils augmentent l'exposition à la simvastatine"], ["Plafond à 10 mg", "Avec un fibrate autre que le fénofibrate"]] },
  { id: "k18", notion: "iec-usage", drug: "ramipril", recto: "IEC et grossesse : que retenir trimestre par trimestre ?", cle: "**Contre-indiqué aux 2e et 3e trimestres**",
    points: [["1er trimestre", "Non recommandé"], ["Risque", "Atteinte rénale du fœtus, oligoamnios"], ["Au comptoir", "Projet de grossesse : orienter vers le médecin pour changer de traitement"]] },
  { id: "k19", notion: "iec-usage", drug: "ramipril", recto: "Ramipril : quelles sont les 2 surveillances biologiques, et quand surtout ?", cle: "**Créatinine** et **kaliémie**",
    points: [["Quand", "Avant le traitement, puis surtout les premières semaines"], ["Patients à risque", "Sujet âgé, insuffisant rénal, diabétique"], ["Pourquoi", "Élimination rénale et effet hyperkaliémiant"]] }
];

/* Fiche d'intervention pharmaceutique SFPC, version officine : points 4 (problème), 5 (intervention), 6 (devenir). */
SRC.sfpc = { label: "Fiche d'intervention pharmaceutique officine, SFPC (Act-IP)", url: "https://actip.sfpc.eu/" };
const SFPC = {
  problemes: [["1", "Contre-indication ou non-conformité aux référentiels"], ["2", "Problème de posologie"], ["3", "Interaction médicamenteuse"], ["4", "Effet indésirable"], ["5", "Oubli de prescription"], ["6", "Médicament ou dispositif non reçu"], ["7", "Médicament non justifié"], ["8", "Redondance"], ["9", "Prescription non conforme"], ["10", "Monitorage à suivre"], ["11", "Pharmacodépendance"]],
  inter: [["3.1", "À prendre en compte", "apec"], ["3.2", "Précaution d'emploi", "pe"], ["3.3", "Association déconseillée", "asdec"], ["3.4", "Association contre-indiquée", "ci"], ["3.5", "Publiée", ""]],
  interventions: [["1", "Adaptation posologique"], ["2", "Choix de la voie d'administration"], ["3", "Amélioration de la dispensation ou de l'administration"], ["4", "Suivi thérapeutique"], ["5", "Ajout (prescription nouvelle)"], ["6", "Changement de médicament"], ["7", "Arrêt ou refus de délivrer"]],
  devenirs: [["1", "Acceptée par le prescripteur"], ["2", "Non acceptée par le prescripteur, sans motif"], ["3", "Non acceptée par le prescripteur, avec motif"], ["4", "Refus de délivrance avec appel au prescripteur"], ["5", "Refus de délivrance sans appel au prescripteur"], ["6", "Acceptation du patient, prescripteur non contacté"], ["7", "Non-acceptation du patient"]]
};
const coder = (o, p, sfpc, interv, devenir) => Object.assign(ORDOS[o].problemes[p], { sfpc, interv, devenir: devenir || null });
coder(0, 0, ["3.4"], ["6", "7"], { scenario: "Le médecin, joint par téléphone, remplace la clarithromycine par un autre antibiotique.", code: "1" });
coder(1, 0, ["3.3"], ["6", "7"], { scenario: "Vous appelez le médecin remplaçant. Il maintient l'ibuprofène sans donner de raison. Vous ne le délivrez pas.", code: "4" });
coder(1, 1, ["3.2"], ["6", "7", "4"]);
coder(1, 2, ["3.3"], ["7", "4"], { scenario: "Le cardiologue refuse d'arrêter le potassium : la kaliémie était basse le mois dernier, il la recontrôle cette semaine.", code: "3" });
coder(1, 3, ["2"], ["1"], { scenario: "Le cardiologue confirme 2,5 mg deux fois par jour.", code: "1" });
coder(1, 4, ["2"], ["1"], { scenario: "Le prescripteur est injoignable. Vous expliquez à la patiente de ne pas dépasser 3 comprimés par jour, à 6 heures d'intervalle. Elle est d'accord.", code: "6" });
coder(1, 5, ["3.2", "10"], ["4"]);

const DATA = { SRC, NIVEAUX, NOTIONS, DOMAINES, DRUGS, ORDOS, CAS, CARDS, RAPPELS, METHODE, SFPC };
if (typeof module !== "undefined") module.exports = DATA;
