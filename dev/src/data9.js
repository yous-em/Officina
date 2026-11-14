/* Lot 9 : les 14 fiches restantes passent au modèle détaillé (même ordre que la fiche ramipril).
   Rédigées à partir des RCP déjà consultés pour l'appli et des connaissances classiques ; ce qui n'a pas été
   relu dans un RCP est marqué « à vérifier » dans la note. */
Object.assign(SRC, {
  edIoa: { label: "ED 2 Dispensation, infections ostéoarticulaires, 06/11/2026 (notes d'étudiants)", url: "" },
  rcpBase: { label: "RCP de la spécialité, base de données publique des médicaments (à relire)", url: "https://base-donnees-publique.medicaments.gouv.fr/" }
});
const NOTE_D = "Fiche détaillée rédigée à partir des RCP consultés pour l'appli et de connaissances classiques. Points à relire sur le RCP : ";
const detail = (id, statut, note, complet) => Object.assign(DRUGS[id], { statut, note: NOTE_D + note, complet });

detail("amoxicilline", "partiel", "plafond adulte, adaptation rénale, niveaux d'interaction.", {
  identite: [["Spécialités", "Clamoxyl, génériques"], ["Classe", "Pénicilline A, bêta-lactamine"], ["Délivrance", "Liste I"], ["Formes", "Gélules 500 mg, comprimés dispersibles 1 g, poudre pour suspension 125, 250 et 500 mg/5 mL"], ["Conservation", "Suspension reconstituée : durée et température **variables selon le générique**"]],
  mecanisme: ["Se fixe aux **protéines liant les pénicillines**", "Bloque la synthèse de la **paroi bactérienne**", "Effet **bactéricide**, dépendant du temps passé au-dessus de la CMI", "D'où **2 à 3 prises par jour**"],
  indications: ["**Otite moyenne aiguë purulente** (1re intention)", "**Angine à TROD positif** (1re intention)", "Sinusite, pneumonie communautaire", "Érythème migrant (maladie de Lyme)", "Éradication d'*Helicobacter pylori* (en association)", "Prophylaxie de l'endocardite"],
  posologies: [["OMA de l'enfant", "**80 à 100 mg/kg/j** en 2 à 3 prises, maximum 3 g/j ; **10 jours avant 2 ans, 5 jours après**"], ["Angine de l'enfant", "**50 mg/kg/j** en 2 prises, maximum 2 g/j, **6 jours**"], ["Adulte", "1 g 2 à 3 fois par jour selon l'infection"], ["Insuffisance rénale", "Espacer les prises si la clairance est basse (seuil à vérifier)"]],
  plafonds: [["Enfant", "La dose par kilo ne dépasse jamais la dose adulte"]],
  administration: ["Voie orale, **avant le repas** chez le nourrisson (il le prend mieux, moins de régurgitation)", "Suspension : montrer le **trait de reconstitution**, bien agiter", "Jamais dans le biberon", "Deux flacons non ouverts si l'enfant va à la crèche"],
  ci: ["**Allergie aux pénicillines**", "Antécédent de réaction allergique **immédiate sévère** à une autre bêta-lactamine"],
  interactions: [["asdec", "Méthotrexate", "Toxicité du méthotrexate augmentée"], ["apec", "Allopurinol", "Éruptions cutanées plus fréquentes"], ["apec", "AVK", "INR qui monte pendant l'infection et l'antibiotique : contrôler l'INR"]],
  grossesse: { g: "ok", gTexte: "Utilisable pendant toute la grossesse : antibiotique de référence.", a: "ok", aTexte: "Possible ; surveiller diarrhée ou candidose chez le nourrisson.", f: "Pas d'effet connu." },
  ei: { frequents: ["**Diarrhée**, nausées", "Éruption cutanée (fréquente en cas de **mononucléose**)", "Candidose"], rares: ["Hépatite, néphrite interstitielle", "Convulsions à forte dose chez l'insuffisant rénal"], graves: ["**Anaphylaxie**", "**Colite à *Clostridioides difficile***", "Réactions cutanées graves (DRESS, pustulose)"], classe: "" },
  surveillance: ["Signes d'allergie, surtout à la première prise", "Diarrhée sévère ou sanglante : consulter", "Reconsulter si les symptômes persistent 4 jours après la fin du traitement"],
  cinetique: ["Bonne absorption orale, **non modifiée par les repas**", "**Demi-vie courte, environ 1 heure**", "Élimination **rénale** sous forme active"]
});

detail("aciclovir", "partiel", "interactions (aucune connue par voie locale) et données d'allaitement.", {
  identite: [["Spécialités", "Activir, génériques « conseil »"], ["Classe", "Antiviral, analogue nucléosidique de la guanosine"], ["Délivrance", "Sans ordonnance (crème 5 %)"], ["Formes", "Crème à 5 %, tube de 2 g ou pompe"], ["Conservation", "Pas de condition particulière (à vérifier selon la spécialité)"]],
  mecanisme: ["Phosphorylé par la **thymidine kinase du virus** dans la cellule infectée", "Devient **aciclovir triphosphate**", "Bloque l'**ADN polymérase virale**", "Arrête la multiplication du virus, **n'élimine pas le virus latent**"],
  indications: ["**Poussée d'herpès labial** localisé (bouton de fièvre) chez l'adulte et l'enfant de plus de 6 ans"],
  posologies: [["Adulte et enfant de plus de 6 ans", "**5 applications par jour**, espacées d'environ 4 heures, sans application la nuit"], ["Durée", "Au moins **5 jours**, **10 jours au maximum** ; sans amélioration à 5 jours : avis médical"]],
  plafonds: [],
  administration: ["Voie cutanée, **lèvres uniquement**", "Commencer **dès les premiers picotements**", "Se laver les mains avant et après", "Déborder largement autour de la lésion"],
  ci: ["Hypersensibilité à l'aciclovir ou au valaciclovir", "**Enfant de moins de 6 ans**"],
  interactions: [["apec", "Aucune interaction connue par voie locale", "Passage dans le sang négligeable"]],
  grossesse: { g: "ok", gTexte: "Application locale possible.", a: "pe", aTexte: "Possible, avec prudence ; ne pas appliquer sur le sein.", f: "Sans objet." },
  ei: { frequents: ["Picotements, brûlures passagères", "Sécheresse, desquamation de la peau"], rares: ["Érythème, eczéma de contact"], graves: ["Réaction allergique (rare)"], classe: "" },
  surveillance: ["Lésion qui s'étend, touche l'œil, s'accompagne de fièvre, ou terrain immunodéprimé : **médecin**", "Récidives très fréquentes : avis médical"],
  cinetique: ["Passage systémique **négligeable**", "Plus efficace si débuté tôt"]
});

detail("doxylamine", "verifie", "rien de majeur : contre-indications, posologie, durée et interactions lues dans deux RCP.", {
  identite: [["Spécialités", "Donormyl, génériques"], ["Classe", "Antihistaminique H1 de la famille des éthanolamines, sédatif et **atropinique**"], ["Délivrance", "Sans ordonnance (comprimés à 15 mg)"], ["Formes", "Comprimés pelliculés sécables et effervescents à 15 mg"], ["Conservation", "Pas de condition particulière"]],
  mecanisme: ["**Bloque les récepteurs H1** centraux : sédation", "Réduit le délai d'endormissement", "Bloque aussi les récepteurs **muscariniques** : effets atropiniques"],
  indications: ["**Insomnie occasionnelle de l'adulte**"],
  posologies: [["Adulte", "**7,5 à 15 mg** le soir, jusqu'à 30 mg si nécessaire"], ["Sujet âgé, insuffisant rénal ou hépatique", "**Dose réduite**"], ["Durée", "**2 à 5 jours** ; au-delà, réévaluer"]],
  plafonds: [],
  administration: ["Une prise **15 à 30 minutes avant le coucher**", "Avec un peu d'eau", "Effervescent : **riche en sodium** (régime sans sel)"],
  ci: ["**Glaucome par fermeture de l'angle**", "**Troubles urétroprostatiques** à risque de rétention urinaire", "**Enfant de moins de 15 ans**", "Hypersensibilité aux antihistaminiques"],
  interactions: [["asdec", "**Alcool**", "Sédation majorée : vigilance, conduite"], ["asdec", "Oxybate de sodium", "Dépression centrale majorée"], ["apec", "**Autres atropiniques** (tricycliques, anti-H1 atropiniques, antispasmodiques, neuroleptiques phénothiaziniques)", "Rétention urinaire, constipation, sécheresse buccale"], ["apec", "**Autres sédatifs** (morphiniques, benzodiazépines, hypnotiques)", "Dépression centrale"]],
  grossesse: { g: "ok", gTexte: "Utilisation possible quel que soit le terme ; en fin de grossesse, surveiller le nouveau-né (sédation, effets atropiniques).", a: "asdec", aTexte: "Déconseillée : sédation ou excitation possible du nouveau-né.", f: "Sans objet." },
  ei: { frequents: ["**Somnolence le lendemain**", "Bouche sèche, **constipation**", "Troubles de l'accommodation, palpitations"], rares: ["Rétention urinaire, confusion (sujet âgé)"], graves: ["**Chutes** chez le sujet âgé", "Surdosage : convulsions, coma, **rhabdomyolyse**"], classe: "Classe des anti-H1 de 1re génération : à éviter chez le sujet âgé (Beers, REMEDIES)." },
  surveillance: ["Somnolence diurne : réduire la dose", "Sujet âgé : levers nocturnes, chutes, confusion", "Insomnie qui dure plus de 5 jours : rechercher une cause"],
  cinetique: ["Pic en **1 heure**", "**Demi-vie d'environ 10 heures**, nettement allongée chez le sujet âgé : accumulation", "60 % éliminés **inchangés dans les urines**"]
});

detail("millepertuis", "partiel", "indication exacte et posologie selon la spécialité, données de grossesse.", {
  identite: [["Spécialités", "Mildac 600 mg, Arkogélules Millepertuis…"], ["Classe", "Médicament de phytothérapie (extrait d'*Hypericum perforatum*), **inducteur enzymatique**"], ["Délivrance", "Sans ordonnance"], ["Formes", "Comprimés, gélules"], ["Conservation", "Pas de condition particulière"]],
  mecanisme: ["Extrait de plante : **hyperforine**, hypéricine", "Effet antidépresseur modeste (recapture des monoamines)", "**Induit les CYP3A4, 2C9, 2C19 et la glycoprotéine P**", "Les autres médicaments sont éliminés plus vite et marchent moins"],
  indications: ["Manifestations dépressives légères et transitoires (selon l'AMM de la spécialité, à vérifier)"],
  posologies: [["Adulte", "Selon la notice de la spécialité (à vérifier)"], ["Délai d'action", "Premiers effets en **3 à 4 semaines** ; sans amélioration : consulter"]],
  plafonds: [],
  administration: ["Voie orale", "Déconseillé avant 18 ans"],
  ci: ["**Contraceptifs hormonaux** (estroprogestatifs et progestatifs)", "**AVK**", "**Immunosuppresseurs** (ciclosporine, tacrolimus…)", "Inhibiteurs de protéase (VIH, hépatite C)", "Antiépileptiques métabolisés, **digoxine**, théophylline, vérapamil", "Azolés (itraconazole, voriconazole), irinotécan, inhibiteurs de tyrosine kinase"],
  interactions: [["ci", "**Contraceptifs hormonaux**", "**Échec de la contraception** : grossesse"], ["ci", "AVK", "INR qui baisse : thrombose ; à l'arrêt du millepertuis, INR qui remonte"], ["ci", "Digoxine, immunosuppresseurs", "Perte d'efficacité, rejet de greffe"], ["asdec", "Amitriptyline", "Moins d'efficacité de l'antidépresseur"], ["apec", "Antidépresseurs sérotoninergiques", "Syndrome sérotoninergique possible"]],
  grossesse: { g: "asdec", gTexte: "Pas de données suffisantes : à éviter.", a: "asdec", aTexte: "À éviter.", f: "Pas de donnée." },
  ei: { frequents: ["Troubles digestifs", "Fatigue, agitation"], rares: ["**Photosensibilisation**", "Réactions allergiques"], graves: ["**Échec d'autres traitements** par induction (grossesse, rejet, thrombose)"], classe: "" },
  surveillance: ["Toujours demander : pilule, implant, anticoagulant, traitement chronique", "À l'arrêt : l'induction persiste **environ 1 semaine** ; ne pas arrêter brutalement s'il est associé à un médicament dosé (INR…)"],
  cinetique: ["Induction qui s'installe en quelques jours", "Persiste **environ 1 semaine** après l'arrêt"]
});

detail("adrenaline", "verifie", "interactions (niveaux indicatifs).", {
  identite: [["Spécialités", "EpiPen, Jext, Emerade, Anapen"], ["Classe", "Sympathomimétique alpha et bêta"], ["Délivrance", "Liste I"], ["Formes", "Stylos auto-injecteurs à **0,15 mg** et **0,30 mg** (Emerade existe aussi en 0,5 mg)"], ["Conservation", "Sous 25 °C, **pas au réfrigérateur**, à l'abri de la lumière ; solution limpide et incolore"]],
  mecanisme: ["**Alpha-1** : vasoconstriction, remonte la tension, réduit les œdèmes", "**Bêta-1** : cœur plus fort et plus rapide", "**Bêta-2** : **bronchodilatation**", "Freine la libération des médiateurs des mastocytes"],
  indications: ["**Traitement d'urgence de l'anaphylaxie** (piqûres d'insectes, aliments, médicaments, effort)"],
  posologies: [["Plus de 30 kg", "**0,30 mg**"], ["15 à 30 kg", "**0,15 mg**"], ["Moins de 15 kg", "Le stylo ne délivre pas moins de 0,15 mg : avis médical"], ["Deuxième injection", "Nouveau stylo après **5 à 15 minutes** si pas d'amélioration"]],
  plafonds: [],
  administration: ["**Intramusculaire, face antérolatérale de la cuisse**, à travers les vêtements", "**Jamais dans la fesse**, ni dans les doigts, ni en intraveineuse", "Maintenir le stylo contre la cuisse quelques secondes (3 secondes pour EpiPen)", "**Injecter d'abord, puis appeler le 15**"],
  ci: ["Aucune contre-indication absolue dans l'anaphylaxie"],
  interactions: [["apec", "**Bêtabloquants**", "Réponse à l'adrénaline diminuée ; anaphylaxie plus sévère"], ["apec", "Antidépresseurs tricycliques, IMAO", "Effets cardiovasculaires de l'adrénaline augmentés"]],
  grossesse: { g: "ok", gTexte: "Utilisable en urgence : l'anaphylaxie est plus dangereuse que le traitement.", a: "ok", aTexte: "Utilisable.", f: "Sans objet." },
  ei: { frequents: ["Palpitations, tachycardie", "Tremblements, anxiété, pâleur", "Céphalées, sueurs, nausées"], rares: ["Hypertension"], graves: ["Troubles du rythme, ischémie myocardique (cardiopathie)", "Injection accidentelle dans un doigt : ischémie"], classe: "" },
  surveillance: ["Toujours une **prise en charge médicale** après l'injection (réaction en deux temps possible)", "Bilan allergologique ensuite", "Vérifier la **date de péremption** et avoir **2 stylos** sur soi"],
  cinetique: ["Action en **quelques minutes**", "Effet **bref** : d'où la deuxième dose possible"]
});

detail("alendronate", "partiel", "seuil rénal exact, durée de traitement recommandée.", {
  identite: [["Spécialités", "Fosamax, Fosavance (avec vitamine D3), génériques"], ["Classe", "Bisphosphonate"], ["Délivrance", "Liste I"], ["Formes", "Comprimé à 70 mg (hebdomadaire) ; 10 mg (quotidien)"], ["Conservation", "Pas de condition particulière"]],
  mecanisme: ["Se fixe sur l'**hydroxyapatite** de l'os", "**Inhibe les ostéoclastes** : moins de résorption osseuse", "Densité osseuse qui augmente", "Moins de **fractures** vertébrales et de la hanche"],
  indications: ["**Ostéoporose post-ménopausique**", "Ostéoporose de l'homme", "Ostéoporose cortisonique (selon le dosage)"],
  posologies: [["Ostéoporose", "**70 mg une fois par semaine**, toujours le même jour, ou 10 mg par jour"], ["Durée", "Réévaluer après environ 5 ans (à vérifier)"]],
  plafonds: [],
  administration: ["**Au réveil, à jeun**", "Avec un **grand verre d'eau du robinet** (pas d'eau minérale riche en calcium, ni café, ni jus)", "**30 minutes** avant le premier aliment, boisson ou médicament", "**Rester assis ou debout 30 minutes** ; ne pas croquer ni sucer le comprimé"],
  ci: ["**Anomalies de l'œsophage** qui retardent la vidange (sténose, achalasie)", "**Impossibilité de rester debout ou assis 30 minutes**", "**Hypocalcémie**", "Hypersensibilité", "Insuffisance rénale sévère : non recommandé (seuil à vérifier, environ 35 mL/min)"],
  interactions: [["pe", "**Calcium, antiacides, fer, magnésium**", "Absorption diminuée : prendre l'alendronate seul, à jeun, le calcium au moins 30 minutes à 2 heures après"], ["apec", "AINS, aspirine", "Irritation digestive majorée"]],
  grossesse: { g: "ci", gTexte: "Ne doit pas être utilisé.", a: "ci", aTexte: "Ne doit pas être utilisé.", f: "Pas de donnée chez l'humain." },
  ei: { frequents: ["Douleurs abdominales, dyspepsie, reflux", "Douleurs musculaires, osseuses, articulaires"], rares: ["Ulcères de l'œsophage", "Uvéite"], graves: ["**Œsophagite**, ulcère de l'œsophage", "**Ostéonécrose de la mâchoire**", "**Fractures atypiques du fémur**", "Ostéonécrose du conduit auditif"], classe: "" },
  surveillance: ["Corriger une hypocalcémie et une **carence en vitamine D** avant de commencer", "**Bilan dentaire** et hygiène bucco-dentaire", "Douleur à la cuisse ou à l'aine : fracture atypique à rechercher", "Brûlure ou douleur en avalant : arrêter et consulter"],
  cinetique: ["**Biodisponibilité inférieure à 1 %**, encore diminuée par les aliments", "Se fixe sur l'os : **demi-vie osseuse de plus de 10 ans**", "La fraction non fixée est éliminée par le **rein**"]
});

detail("levothyroxine", "partiel", "doses initiales, interactions avec les IPP et l'orlistat.", {
  identite: [["Spécialités", "Levothyrox, L-Thyroxine, Tcaps, génériques"], ["Classe", "Hormone thyroïdienne (T4)"], ["Délivrance", "Liste I"], ["Formes", "Comprimés de 25 à 200 µg, solution buvable, capsules"], ["Conservation", "Selon la spécialité ; **changement de spécialité = contrôle de la TSH**"]],
  mecanisme: ["**T4** de synthèse, transformée en **T3** active dans les tissus", "Remplace l'hormone manquante", "Freine la TSH"],
  indications: ["**Hypothyroïdie**", "Après thyroïdectomie, freinage dans certains cancers", "Goitre", "Avec un antithyroïdien (maladie de Basedow) pour éviter l'hypothyroïdie"],
  posologies: [["Adulte", "Dose progressive, adaptée à la **TSH** (souvent 1,5 à 1,8 µg/kg/j à l'équilibre)"], ["Sujet âgé, coronarien", "Début **très faible** (12,5 à 25 µg), paliers lents"], ["Contrôle", "**TSH 6 à 8 semaines** après chaque changement"]],
  plafonds: [],
  administration: ["**Le matin à jeun**, environ 30 minutes avant le petit-déjeuner, avec de l'eau", "Toujours de la même façon", "**Calcium, fer, pansements digestifs : à plus de 2 heures**"],
  ci: ["Hyperthyroïdie non traitée", "Insuffisance surrénale non corrigée", "Infarctus du myocarde aigu, myocardite"],
  interactions: [["pe", "**Sels de calcium, fer**, pansements digestifs, résines", "Absorption diminuée : **plus de 2 heures** d'écart"], ["pe", "**Inducteurs enzymatiques** (rifampicine, carbamazépine, phénytoïne)", "Besoins augmentés : TSH à contrôler"], ["apec", "IPP", "Absorption parfois diminuée"], ["apec", "AVK", "Effet anticoagulant augmenté en cas de correction d'une hypothyroïdie"]],
  grossesse: { g: "ok", gTexte: "À poursuivre : **besoins augmentés**, contrôler la TSH dès le début de la grossesse.", a: "ok", aTexte: "Possible.", f: "Une hypothyroïdie non traitée réduit la fertilité." },
  ei: { frequents: ["Liés au **surdosage** : palpitations, tachycardie, tremblements, insomnie, nervosité", "Amaigrissement, diarrhée, sueurs"], rares: ["Céphalées"], graves: ["**Troubles du rythme**, angor chez le coronarien", "Perte osseuse en cas de surdosage prolongé"], classe: "" },
  surveillance: ["**TSH** (avec T4 libre si besoin) 6 à 8 semaines après tout changement, puis annuellement", "Signes de surdosage ou de sous-dosage (fatigue, frilosité, prise de poids)"],
  cinetique: ["Absorption **meilleure à jeun**", "**Demi-vie d'environ 7 jours** : équilibre en 4 à 6 semaines", "**Marge thérapeutique étroite**"]
});

detail("clopidogrel", "partiel", "interaction avec le répaglinide, durée de la double antiagrégation après un AVC.", {
  identite: [["Spécialités", "Plavix, génériques ; associé à l'aspirine (Duoplavin)"], ["Classe", "Antiagrégant plaquettaire, inhibiteur du récepteur **P2Y12** (thiénopyridine)"], ["Délivrance", "Liste I"], ["Formes", "Comprimés à 75 mg et 300 mg"], ["Conservation", "Pas de condition particulière"]],
  mecanisme: ["**Prodrogue** activée par le foie (**CYP2C19** surtout)", "Le métabolite actif **bloque le récepteur P2Y12** de l'ADP", "Blocage **irréversible** : toute la vie de la plaquette (7 à 10 jours)", "Moins d'agrégation : moins de thrombose artérielle"],
  indications: ["Prévention après **infarctus**, **AVC ischémique**, artériopathie des membres inférieurs", "Syndrome coronarien aigu, angioplastie, avec l'aspirine", "**AIT ou AVC mineur**, avec l'aspirine pour une durée courte"],
  posologies: [["Entretien", "**75 mg une fois par jour**"], ["Dose de charge", "300 mg (syndrome coronarien, AVC mineur ; sans dose de charge après 75 ans dans certains cas)"], ["AVC mineur ou AIT", "Associé à l'aspirine quelques semaines (21 jours, à vérifier), puis seul"]],
  plafonds: [],
  administration: ["Voie orale, avec ou sans repas", "À heure régulière"],
  ci: ["**Lésion hémorragique évolutive** (ulcère, hémorragie intracrânienne)", "**Insuffisance hépatique sévère**", "Hypersensibilité"],
  interactions: [["asdec", "**Oméprazole, ésoméprazole** (inhibiteurs du CYP2C19)", "Moins de métabolite actif : **antiagrégation insuffisante** ; éviter les IPP sauf nécessité"], ["asdec", "Anticoagulants oraux", "Association non recommandée : saignements"], ["apec", "**AINS**, aspirine, ISRS", "Risque hémorragique majoré"], ["asdec", "Répaglinide", "Concentrations de répaglinide augmentées : hypoglycémies (niveau à vérifier)"]],
  grossesse: { g: "asdec", gTexte: "Par précaution, à éviter.", a: "asdec", aTexte: "Par précaution, l'allaitement n'est pas recommandé.", f: "Pas de donnée." },
  ei: { frequents: ["**Saignements** : hématomes, épistaxis, saignements digestifs", "Diarrhée, douleurs abdominales"], rares: ["Éruptions cutanées"], graves: ["**Hémorragies graves**, intracrâniennes", "Purpura thrombotique thrombocytopénique", "Neutropénie, agranulocytose"], classe: "" },
  surveillance: ["Signes de saignement : selles noires, urines rouges, hématomes", "Avant une chirurgie ou un soin dentaire : prévenir (l'effet dure environ 7 jours)", "**Ne jamais arrêter sans avis**, surtout après un stent"],
  cinetique: ["**Prodrogue** : environ 85 % transformés en dérivé inactif, une petite part activée par les CYP", "Métaboliseurs lents du **CYP2C19** : réponse diminuée", "Effet **irréversible** malgré une demi-vie courte"]
});

detail("rifampicine", "a_verifier", "posologies par indication, contre-indications, données de grossesse : à relire entièrement sur le RCP.", {
  identite: [["Spécialités", "Rifadine, Rimactan ; associations antituberculeuses"], ["Classe", "Antibiotique de la famille des rifamycines"], ["Délivrance", "Liste I"], ["Formes", "Gélules à 300 mg, suspension buvable, forme injectable"], ["Conservation", "Pas de condition particulière (à vérifier)"]],
  mecanisme: ["**Inhibe l'ARN polymérase** bactérienne", "Effet **bactéricide**", "Résistances rapides en monothérapie : **toujours associée**", "**Inducteur enzymatique puissant** (CYP3A4, glycoprotéine P…)"],
  indications: ["**Tuberculose** (en association)", "**Infections à staphylocoque**, notamment ostéoarticulaires (en association)", "Lèpre, brucellose", "Prophylaxie des sujets contacts d'une **méningite à méningocoque**"],
  posologies: [["Tuberculose", "Environ 10 mg/kg/j, maximum 600 mg/j (à vérifier)"], ["Infection ostéoarticulaire (ED)", "**600 mg en une prise le matin à jeun** (2 gélules de 300 mg)"], ["Prophylaxie du méningocoque", "Dose et durée courtes (à vérifier)"]],
  plafonds: [],
  administration: ["**À jeun** : 30 minutes avant ou 2 heures après un repas", "Une prise par jour de préférence (meilleure cinétique)"],
  ci: ["Hypersensibilité aux rifamycines", "Porphyrie", "Insuffisance hépatique sévère (à vérifier)", "Associations contre-indiquées avec certains antirétroviraux et antifongiques"],
  interactions: [["asdec", "**Contraceptifs hormonaux**", "Échec de contraception : méthode non hormonale"], ["pe", "**Anticoagulants** (AVK, apixaban…)", "Effet diminué d'environ 50 % pour l'apixaban : avis du prescripteur"], ["pe", "**Corticoïdes**", "Effet diminué : adapter la dose pendant et après"], ["pe", "Lévothyroxine, antiépileptiques, immunosuppresseurs", "Effet diminué"], ["ci", "Certains antirétroviraux, voriconazole", "Perte d'efficacité (à vérifier selon la molécule)"]],
  grossesse: { g: "pe", gTexte: "Utilisable si nécessaire (tuberculose) ; vitamine K à la mère et au nouveau-né en fin de grossesse (à vérifier).", a: "pe", aTexte: "Possible, surveiller le nourrisson (à vérifier).", f: "Sans objet." },
  ei: { frequents: ["Coloration **orange-rouge** des urines, larmes, sueur, **lentilles souples**", "Troubles digestifs", "Hausse des transaminases"], rares: ["Syndrome pseudo-grippal en prise intermittente"], graves: ["**Hépatite** (surtout avec l'isoniazide)", "Thrombopénie, anémie hémolytique, insuffisance rénale aiguë immunoallergiques", "DRESS"], classe: "" },
  surveillance: ["**Bilan hépatique**, NFS, fonction rénale", "Dosage des antibiotiques dans les infections ostéoarticulaires", "Revoir **tous les autres traitements** au début et à l'arrêt"],
  cinetique: ["Absorption **diminuée par les aliments**", "Élimination **biliaire**, cycle entérohépatique", "**Induction** qui s'installe en quelques jours et **persiste 1 à 2 semaines après l'arrêt**"]
});

detail("levofloxacine", "a_verifier", "posologies par indication, seuils d'adaptation rénale, niveaux d'interaction.", {
  identite: [["Spécialités", "Tavanic, génériques"], ["Classe", "Fluoroquinolone"], ["Délivrance", "Liste I"], ["Formes", "Comprimés à 500 mg, solution pour perfusion"], ["Conservation", "Pas de condition particulière"]],
  mecanisme: ["Inhibe l'**ADN gyrase** et la **topoisomérase IV** bactériennes", "Effet **bactéricide**, dépendant de la concentration", "Biodisponibilité orale proche de 100 % : la voie orale vaut la voie IV"],
  indications: ["Pneumonie communautaire, pyélonéphrite, prostatite", "Infections ostéoarticulaires (relais oral, en association)", "Sinusite, exacerbation de BPCO, cystite : **seulement s'il n'y a pas d'autre option** (restrictions de 2019)"],
  posologies: [["Adulte", "500 mg une ou deux fois par jour selon l'infection"], ["Insuffisance rénale", "Dose réduite si la clairance est sous 50 mL/min (à vérifier)"]],
  plafonds: [],
  administration: ["Voie orale, avec ou sans repas", "**Calcium, fer, magnésium, zinc, antiacides : à 2 heures d'écart**"],
  ci: ["**Moins de 18 ans** (cartilage de croissance)", "**Épilepsie**", "**Antécédent de tendinopathie** liée à une quinolone", "**Grossesse et allaitement**", "Hypersensibilité aux quinolones"],
  interactions: [["pe", "**Cations** : calcium, fer, magnésium, zinc, antiacides", "Absorption diminuée : 2 heures d'écart"], ["apec", "**Corticoïdes**", "**Tendinopathie**, rupture du tendon"], ["pe", "AVK", "INR augmenté"], ["pe", "Médicaments qui allongent le QT", "Torsades de pointes"], ["apec", "Antidiabétiques", "Dysglycémies, hypoglycémies"]],
  grossesse: { g: "ci", gTexte: "Contre-indiquée.", a: "ci", aTexte: "Contre-indiquée.", f: "Pas de donnée." },
  ei: { frequents: ["Nausées, diarrhée", "Céphalées, vertiges, insomnie"], rares: ["**Photosensibilisation**", "Troubles psychiques"], graves: ["**Tendinopathie, rupture du tendon d'Achille**", "**Allongement du QT**", "Anévrisme, dissection aortique", "Neuropathie périphérique, effets invalidants persistants", "Hypoglycémie sévère", "Colite à *Clostridioides difficile*"], classe: "Effets de classe des fluoroquinolones : réservées aux situations sans alternative." },
  surveillance: ["**Douleur d'un tendon** : arrêter et consulter", "Glycémie chez le diabétique", "ECG si facteurs de risque de QT long"],
  cinetique: ["Biodisponibilité **environ 100 %**", "Demi-vie de 6 à 8 heures", "Élimination **rénale** sous forme inchangée"]
});

detail("methylphenidate", "partiel", "posologies initiales par spécialité, liste des contre-indications cardiovasculaires.", {
  identite: [["Spécialités", "Ritaline (LI), Ritaline LP, Concerta LP, Quasym LP, Medikinet LM"], ["Classe", "Psychostimulant, sympathomimétique d'action centrale"], ["Délivrance", "**Stupéfiant** : ordonnance sécurisée, **28 jours**, prescription initiale **annuelle** par psychiatre, neurologue ou pédiatre"], ["Formes", "Comprimés LI 10 mg, gélules LP et LM, comprimés LP"], ["Conservation", "Pas de condition particulière"]],
  mecanisme: ["**Inhibe la recapture de la dopamine et de la noradrénaline**", "Plus de dopamine et de noradrénaline dans la synapse", "Meilleure **attention**, moins d'impulsivité et d'hyperactivité"],
  indications: ["**TDAH de l'enfant de 6 ans et plus** (et de l'adulte pour certaines spécialités)", "Narcolepsie (forme LI)"],
  posologies: [["Instauration", "**Augmentation progressive**, par paliers"], ["Maximum", "**60 mg/j chez l'enfant**, 80 mg/j chez l'adulte ; environ 1 mg/kg/j"], ["Effet insuffisant l'après-midi", "Ajout d'une forme LI, ou changement de spécialité (parts LI/LP différentes)"]],
  plafonds: [],
  administration: ["**Le matin**", "Ritaline LP, Medikinet : **gélule ouvrable** (microbilles sur un aliment, sans croquer)", "Spécialités **non substituables** entre elles", "**Pas de prise le jour d'une anesthésie générale**"],
  ci: ["**Glaucome**", "**IMAO** (et 14 jours après)", "Hyperthyroïdie, phéochromocytome", "**Troubles cardiovasculaires ou cérébrovasculaires graves**, HTA sévère", "Troubles psychiatriques graves : dépression sévère, idées suicidaires, psychose, trouble bipolaire non contrôlé"],
  interactions: [["ci", "IMAO", "Crise hypertensive"], ["ci", "**Vasoconstricteurs, sympathomimétiques** (décongestionnants)", "Vasoconstriction, poussées hypertensives (selon le cours)"], ["pe", "Anesthésiques halogénés", "Poussée hypertensive : ne pas prendre le jour de l'intervention"], ["apec", "Antihypertenseurs", "Effet diminué"]],
  grossesse: { g: "asdec", gTexte: "Pas recommandé, sauf décision médicale.", a: "asdec", aTexte: "À éviter.", f: "Pas de donnée." },
  ei: { frequents: ["**Baisse de l'appétit**, perte de poids", "**Insomnie**, nervosité, céphalées", "Douleurs abdominales", "Tachycardie, hausse de la tension"], rares: ["Tics, irritabilité"], graves: ["**Ralentissement de la croissance**", "Troubles psychiatriques (psychose, idées suicidaires)", "Troubles cardiovasculaires", "Abaissement du seuil épileptogène", "Mésusage"], classe: "" },
  surveillance: ["**Poids, taille** (courbe de croissance)", "**Tension et pouls** à chaque changement de dose", "État psychique, comportement", "Pression intraoculaire (selon le cours)"],
  cinetique: ["Forme LI : demi-vie de 2 à 3 heures", "Formes LP et LM : une part à libération immédiate, une part prolongée (**50/50 pour Ritaline LP**)", "Effet rapide (1 à 2 heures), couverture de la journée scolaire"]
});

detail("cefpodoxime", "partiel", "conservation de la suspension, contre-indications, adaptation rénale.", {
  identite: [["Spécialités", "Orelox, génériques"], ["Classe", "Céphalosporine de 3e génération orale"], ["Délivrance", "Liste I"], ["Formes", "Comprimés à 100 mg, granulés pour suspension à 40 mg/5 mL"], ["Conservation", "Suspension reconstituée : **au réfrigérateur**, environ 10 jours (à vérifier)"]],
  mecanisme: ["Prodrogue (**cefpodoxime proxétil**) hydrolysée dans l'intestin", "Se fixe aux **protéines liant les pénicillines**", "Bloque la synthèse de la paroi : **bactéricide**"],
  indications: ["**OMA** et **angine** de l'enfant en **2e intention** (allergie non grave à la pénicilline, échec)", "Sinusite", "Pneumonie, infections urinaires (adulte)"],
  posologies: [["Enfant", "**8 mg/kg/j en 2 prises**, maximum **400 mg/j**"], ["Durée chez l'enfant", "OMA et angine : **5 jours** après 2 ans, 10 jours avant 2 ans ; sinusite : 10 jours (ED)"], ["Adulte", "100 à 200 mg deux fois par jour selon l'infection"], ["Plus de 25 kg", "Le comprimé à 100 mg est plus pratique que la pipette"]],
  plafonds: [],
  administration: ["**Au cours du repas** (absorption meilleure)", "Suspension : reconstituer, agiter, pipette graduée en kilos", "Ne pas mélanger les pipettes de plusieurs médicaments"],
  ci: ["**Allergie aux céphalosporines**", "Antécédent de réaction allergique **grave** aux pénicillines (réaction croisée possible)"],
  interactions: [["apec", "Antiacides, anti-H2, IPP", "Absorption diminuée (pH gastrique plus élevé)"], ["apec", "AVK", "INR augmenté pendant l'infection : contrôler"]],
  grossesse: { g: "ok", gTexte: "Utilisable si nécessaire.", a: "ok", aTexte: "Possible ; surveiller diarrhée ou candidose chez le nourrisson.", f: "Pas d'effet connu." },
  ei: { frequents: ["Diarrhée, nausées", "Éruption cutanée"], rares: ["Hausse des transaminases"], graves: ["**Anaphylaxie**", "**Colite à *Clostridioides difficile***", "Réactions cutanées graves"], classe: "" },
  surveillance: ["Allergie, diarrhée sévère", "Reconsulter si les symptômes persistent après la fin du traitement"],
  cinetique: ["**Prodrogue** : absorption augmentée par le repas, diminuée par les antiacides", "Demi-vie d'environ 2,5 heures : 2 prises par jour", "Élimination **rénale**"]
});

detail("tramadol", "partiel", "posologie de l'enfant et niveau des interactions avec les antidépresseurs.", {
  identite: [["Spécialités", "Topalgic, Contramal, Orozamudol, génériques ; associé au paracétamol (Ixprim, Zaldiar)"], ["Classe", "Antalgique opioïde de **palier 2**"], ["Délivrance", "Liste I, **ordonnance sécurisée depuis le 1er mars 2025** : dosage, posologie et durée **en toutes lettres**, **12 semaines** au maximum"], ["Formes", "Gélules 50 mg, LP 100 à 200 mg, solution buvable **100 mg/mL (1 goutte = 2,5 mg)**"], ["Conservation", "Pas de condition particulière ; flacon hors de portée des enfants"]],
  mecanisme: ["**Agoniste faible des récepteurs mu**, surtout par son métabolite **M1** (formé par le **CYP2D6**)", "**Inhibe la recapture de la sérotonine et de la noradrénaline**", "Agit aussi sur la composante **neuropathique** de la douleur"],
  indications: ["Douleurs modérées à intenses, ou ne répondant pas aux antalgiques de palier 1"],
  posologies: [["Adulte", "50 à 100 mg toutes les 4 à 6 heures, **maximum 400 mg/j**"], ["Forme LP", "100 à 200 mg matin et soir"], ["Enfant à partir de 3 ans", "Solution buvable, environ 1 à 2 mg/kg par prise (à vérifier sur le RCP)"], ["Plus de 75 ans, insuffisance rénale ou hépatique", "Espacer les prises"]],
  plafonds: [],
  administration: ["Voie orale, avec ou sans repas", "Gouttes : compter précisément, diluer dans un peu d'eau", "Ne pas croquer les formes LP"],
  ci: ["**IMAO**", "**Épilepsie non contrôlée**", "Insuffisance respiratoire sévère", "Intoxication aiguë par l'alcool ou des psychotropes"],
  interactions: [["ci", "IMAO", "Syndrome sérotoninergique"], ["apec", "**Antidépresseurs sérotoninergiques** (ISRS, IRSNA, tricycliques)", "**Syndrome sérotoninergique**, **convulsions**"], ["asdec", "Alcool", "Sédation majorée"], ["apec", "Autres sédatifs, morphiniques", "Dépression respiratoire"], ["apec", "Inhibiteurs du CYP2D6 (paroxétine, fluoxétine)", "Moins de métabolite actif : efficacité diminuée"]],
  grossesse: { g: "asdec", gTexte: "À éviter ; en fin de grossesse, risque de syndrome de sevrage chez le nouveau-né.", a: "asdec", aTexte: "Prise unique possible ; à éviter en traitement prolongé.", f: "Pas de donnée." },
  ei: { frequents: ["**Nausées, vomissements**, vertiges", "Somnolence, céphalées", "Constipation, sueurs, bouche sèche"], rares: ["Hypoglycémie, hyponatrémie"], graves: ["**Convulsions**", "**Syndrome sérotoninergique**", "Dépression respiratoire (surdosage, métaboliseurs ultrarapides)", "**Dépendance**, mésusage"], classe: "Tolérance très variable d'une personne à l'autre." },
  surveillance: ["Efficacité et tolérance (nausées, vertiges) au début", "Signes de mésusage ou de dépendance", "Réévaluer avant de renouveler"],
  cinetique: ["Biodisponibilité orale d'environ 70 %", "Activation par le **CYP2D6** (variabilité génétique)", "Demi-vie d'environ 6 heures ; élimination rénale"]
});

detail("lamotrigine", "partiel", "schémas de titration exacts et niveau de l'interaction avec le valproate.", {
  identite: [["Spécialités", "Lamictal, génériques"], ["Classe", "Antiépileptique, thymorégulateur"], ["Délivrance", "Liste I"], ["Formes", "Comprimés de 25 à 200 mg, comprimés dispersibles 2 à 100 mg"], ["Conservation", "Pas de condition particulière"]],
  mecanisme: ["**Bloque les canaux sodiques voltage-dépendants**", "Stabilise les membranes neuronales", "Diminue la libération de **glutamate**"],
  indications: ["**Épilepsie** (adulte et enfant, selon les formes)", "**Trouble bipolaire** : prévention des épisodes dépressifs"],
  posologies: [["Instauration en monothérapie", "**25 mg/j** 2 semaines, puis **50 mg/j** 2 semaines, puis paliers toutes les 1 à 2 semaines"], ["Entretien", "Souvent 100 à 200 mg/j"], ["Avec le valproate", "Doses **divisées par deux** (titration plus lente)"], ["Avec un inducteur ou une pilule estroprogestative", "Doses plus élevées (concentrations diminuées)"]],
  plafonds: [],
  administration: ["Voie orale, avec ou sans repas", "Comprimés dispersibles : dans un peu d'eau", "**Arrêt de plus de 5 demi-vies : reprendre la titration depuis le début**"],
  ci: ["Hypersensibilité à la lamotrigine"],
  interactions: [["asdec", "**Valproate**", "Concentrations de lamotrigine **doublées** : risque de réactions cutanées graves (niveau à vérifier)"], ["pe", "**Contraceptifs estroprogestatifs**", "Concentration de lamotrigine **divisée par deux** ; elle remonte à l'arrêt de la pilule"], ["pe", "Inducteurs (carbamazépine, phénytoïne, rifampicine)", "Concentrations diminuées : adapter la dose"]],
  grossesse: { g: "pe", gTexte: "**Antiépileptique de référence** pendant la grossesse ; consultation préconceptionnelle, surveiller les concentrations (elles baissent).", a: "pe", aTexte: "Possible ; surveiller le nourrisson (somnolence, éruption).", f: "Pas d'effet connu." },
  ei: { frequents: ["Céphalées, vertiges, diplopie", "Somnolence, nausées", "**Éruptions cutanées**"], rares: ["Insomnie, irritabilité"], graves: ["**Syndrome de Stevens-Johnson, de Lyell, DRESS** (surtout les 8 premières semaines, chez l'enfant, avec le valproate, en cas de titration trop rapide)", "Syndrome d'activation macrophagique", "Méningite aseptique"], classe: "" },
  surveillance: ["**Toute éruption** : arrêter et consulter en urgence", "Respect du **schéma de titration**", "Tout changement de **contraception** : prévenir le neurologue"],
  cinetique: ["Métabolisée par **glucuronoconjugaison** (UGT), **pas par les CYP**", "Demi-vie d'environ 30 heures : environ 15 heures avec un inducteur, environ 70 heures avec le valproate", "Les estrogènes **accélèrent** sa conjugaison"]
});

/* Ordonnance o12 : dose de rifampicine alignée sur l'ED des infections ostéoarticulaires. */
(() => { const o = ORDOS.find((x) => x.id === "o12"); const l = o.lignes.find((x) => x.id === "l1"); l.poso = "2 gélules le matin, à jeun";
  o.sansProbleme[0] = "Rifampicine 600 mg en une prise le matin à jeun : schéma donné en ED pour les infections ostéoarticulaires. Lévofloxacine 1 g par jour : dose à vérifier sur son cours ; la clairance de 65 mL/min ne demande pas d'adaptation.";
  o.problemes.forEach((p) => { if (!p.sources.includes("edIoa")) p.sources = p.sources.concat(p.id === "p1" ? ["edIoa"] : []); }); })();
