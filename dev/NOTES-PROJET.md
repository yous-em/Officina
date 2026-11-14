# Officina — état du projet et règles de travail

Notes de passation pour reprendre le projet dans une nouvelle conversation.
Projet public : aucune donnée personnelle ici.

## Le projet
Appli de révision pour une étudiante en 5e année de pharmacie, parcours officine, qui prépare la 6e année.
Elle sert pour les examens et pour la pratique clinique.
- Appli web installable (PWA) en un seul fichier HTML, en JS sans dépendance. Mode jour uniquement, pensée pour le téléphone.
- Hébergée sur GitHub Pages (dépôt yous-em/officina). Le site est à la racine du dépôt, les sources dans `dev/`.
- Sa progression reste sur son téléphone (localStorage). Elle peut l'exporter en fichier vers Fichiers ou iCloud, avec un rappel au bout de 7 jours.
- Pour mettre à jour : cloner le dépôt, copier `dev/` dans un dossier de travail hors du clone (le script vide le clone avant de recopier le site), y modifier `src/`, puis lancer `OFFICINA_REPO=<chemin du clone> ./deploy.sh "message"`, qui construit, teste et pousse.
- Une version de prévisualisation existe aussi en artefact Claude « Officina ». L'utilisatrice se sert de l'appli installée.

## Contenu actuel
- 50 ordonnances :
  - o1 et o2 : exemples validés ;
  - o3 : sujet âgé, d'après le cours de commentaire d'ordonnance ;
  - o4 à o8 : pédiatrie, d'après l'ED de pédiatrie ; corrections construites à partir des recommandations du cours ;
  - o9 à o12 (lot 7) : ordonnances d'entraînement inventées (ostéoporose, AVC, grossesse, infection de prothèse) ;
  - o13 à o28 (lot 8) : tirées des documents du projet claude.ai « Pharma Yous » : ED de M. Boulin (o13, o14, o19), de M. Fagnoni (o15, o16), de Mme Cransac (o17 TDAH, o18 ostéoporose), annales 2021-22 (o20, o21), 2022-23 (o22 à o25), 2024-25 (o26 à o28). Correction de l'enseignant quand l'ED la donne ; sinon correction construite et signalée.
  - o29 à o36 (lot 10) : les 7 ordonnances de l'ED de Mme Freppel (SEP, MICI, Basedow, diabète de type 1, épilepsie, bipolaire, migraine) et la capécitabine de l'annale 2021-22 (mention « résultats uracilémie pris en compte »).
  - o37 à o50 (lot 14, `src/data18.js`, **chargé avant `data17.js`**) : les cas restants de « Fusion cas cliniques » : AVC (o37 à o39), goutte (o40, o41), mucoviscidose (o42, o43), relais oral d'une ostéite (o44), gynécologie (o45 à o47 ; le cas salpingite, sans ordonnance, est traité dans o45), personne âgée (o48, o49), BPCO (o50). Les points où les notes d'ED semblent fausses sont corrigés et signalés (altéplase 0,9 mg/kg, INR et thrombolyse, morphine + rifampicine, pravastatine, colchicine + statine, salpingite et pénicillines). 20 nouvelles molécules (fiches détaillées dans `DRUGS`, rattachées aux classes AVK, biguanides, alpha-bloquants, colchicine, inhibiteurs de la xanthine oxydase, opioïdes forts, ISRS, benzodiazépines, antiémétiques antidopaminergiques) et 6 classes nouvelles : modulateurs CFTR, ADNase, antipaludéens de synthèse, résines échangeuses de potassium, antidépresseurs antagonistes alpha-2, antidépresseur multimodal (114 fiches de classe).
- 21 cas de comptoir :
  - c1 à c7 : toux sous IEC, œil rouge sous lentilles, conjonctivite allergique, sevrage tabagique (×2), paludisme, fièvre au retour de voyage ;
  - c8 à c21 (lot 6) : deux par thème restant (otologie, dermatologie, sportif, anxiété, insomnie, fatigue, premiers soins et urgences).
- 61 fiches médicaments (molécules, dans `DRUGS`), **toutes au format détaillé** (modèle ramipril) ; celles des lots 9, 10 et 14 sont marquées « vérifié en partie » avec les points à relire dans la note.
- **Onglet Médicaments = fiches de CLASSE (lots 11 à 13, `src/data11.js` à `data17.js`, `data17.js` en dernier : tables `CLASSE_DE` et `REFLEXES`)** : **108 fiches** en 17 spécialités (lot 13 : 64 classes nouvelles, de l'inhibiteur calcique au méthotrexate, plus le tamoxifène ajouté aux SERM) (une classe = un mécanisme commun : bêtabloquants, IEC, sartans, bisphosphonates, anti-RANKL, analogues de la PTH…), rangées par spécialité (`SPE`). Les 41 anciennes fiches par molécule (`DRUGS`) restent dans les données pour les ordonnances, cartes et rappels, mais ne sont plus affichées : un médicament ouvre la fiche de sa classe (`CLASSE_DE`) avec sa ligne surlignée. Ordre FIXE des rubriques : molécules (DCI, noms commerciaux, mention « prodrogue ») → réflexes au comptoir → mécanisme → indications → posologies et administration (tableau Molécule / Dose / Rythme / Voie en abréviations PO, IV, SC…) → contre-indications → interactions → grossesse et allaitement → effets indésirables → surveillance → cinétique → associations fixes. Dans chaque rubrique : la classe d'abord, puis seulement si utile une ligne par molécule (`[DCI, texte]`, étiquette noire). Statut « vérifié en partie » si la classe reprend une ancienne fiche vérifiée, sinon « à vérifier ».
- **Réflexe au comptoir sur l'accueil** : tiré au hasard parmi tous les réflexes des fiches (`REFLEXES`), change à chaque passage sur l'accueil, bouton « Un autre réflexe » et lien vers la fiche.
- 62 cartes FSRS, 7 rappels de cours (ordre des traitements dans la mucoviscidose, statines, médicaments à prendre à distance, inducteurs enzymatiques, benzodiazépines chez le sujet âgé, écrire au prescripteur, traitements qui imposent une contraception).
- Niveaux de problème : en plus des 5 niveaux d'interaction, « inap » (médicament inadapté au patient, pentagone marron) et « reg » (réglementation, document gris).
- Tests : `node test/core.test.js` ; parcours navigateur : `NODE_PATH=<node_modules contenant playwright> node test/parcours.js` (Chrome dans /usr/bin/google-chrome).

## Règles de contenu (demandes de l'utilisatrice)
- Fiabilité absolue :
  - chaque donnée porte un statut (verifie / partiel / a_verifier), une note et des sources ;
  - ne rien inventer, signaler toute incertitude ;
  - le RCP est la source principale des interactions : le Thésaurus ANSM n'est plus mis à jour depuis septembre 2023 ;
  - consigne actuelle : vérifier un peu moins, produire plus.
- Fiches médicaments : **toujours le format détaillé et complet** du modèle ramipril (identité, mécanisme, indications, posologies, plafonds, administration, contre-indications, interactions, grossesse et allaitement, effets indésirables, surveillance, cinétique). **Jamais de fiche « courte »** (l'ancien format posologie/alertes/conseils, jugé incomplet) : tout nouveau médicament reçoit directement sa fiche détaillée.
- **Organisation par classe** (demandes du 14/11/2026) : jamais de fiche centrée sur une molécule. Une classe = des molécules au mécanisme proche (bisphosphonates et anti-RANKL séparés ; bêtabloquants, IEC, sartans séparés), jamais une maladie. Tri par spécialité conservé. Toujours le même ordre de rubriques (voir Contenu). Particularités par molécule seulement si pertinentes (posologies différentes, effet indésirable propre…). Mettre des encadrés « Réflexe au comptoir » pertinents dans chaque fiche. Classes encore absentes (secondaires) : antibiotiques hospitaliers (aminosides, glycopeptides, carbapénèmes), antituberculeux autres que la rifampicine, antirétroviraux, antiparasitaires (ivermectine, pédiculicides, albendazole), méfloquine, anticancéreux oraux autres (inhibiteurs de tyrosine kinase…), immunosuppresseurs (ciclosporine, tacrolimus, azathioprine, mycophénolate), biothérapies (anti-TNF…), antipsychotiques retard en détail, hypnotiques non benzodiazépiniques autres, anti-H2, THM, collyres autres (bêtabloquants, inhibiteurs de l'anhydrase carbonique, antiallergiques), antiseptiques, vaccins.
- Dans chaque correction : rappeler les conseils au comptoir et les posologies usuelles.
- Elle est très visuelle :
  - couleurs et formes réservées à la gravité (CI octogone rouge, déconseillé triangle orange, précaution losange jaune, à prendre en compte cercle bleu, posologie carré violet) ;
  - mécanismes présentés en chaînes de flèches ;
  - emplacements fixes, surlignage `**…**` ;
  - beaucoup de liens et de rappels de cours.
- Ordonnances longues pour la difficulté, avec de faux pièges.
- Fiche d'intervention pharmaceutique SFPC : les points 4 (classer le problème, très important), 5 (intervention) et 6 (devenir) sont essentiels. La cotation CLEO viendra plus tard.
- Cas de comptoir :
  - une mauvaise orientation vers le médecin est éliminatoire ;
  - cas scénarisés, sans IA intégrée.
- Format : gros lots.
- Ordre de production (consigne du 14/11/2026) : épuiser d'abord la banque de documents fournie (fichiers du projet claude.ai « Pharma Yous », lus avec l'outil Projects), n'inventer qu'ensuite.

## Thèmes de comptoir au programme
- Cette année : sevrage tabagique, voyageur, ophtalmologie, otologie, dermatologie, pathologies du sportif, anxiété, insomnie, fatigue, premiers soins et urgences.
- L'an dernier : rhinite allergique, douleurs, fièvre, diarrhée, constipation, hémorroïdes, toux, maux de gorge, RGO, ulcère, gastralgies, nausées et vomissements, dyspepsie, rhume.

## Travail en parallèle
- Le 14/11/2026, deux conversations ont déposé en même temps : `deploy.sh` vide le clone et recopie `dev/`, donc **un dépôt fait depuis une copie de travail ancienne efface le travail des autres**. Toujours repartir du dépôt à jour (`git pull`, puis recopier `dev/`) juste avant de modifier et de déposer.

## À faire
1. Banque de documents du projet : **épuisée** pour les ordonnances et cas cliniques (reste le courrier clopidogrel + ésoméprazole de l'annale 2021-22, partie 2, à faire en exercice de courrier). Prochaine étape : inventer, selon la consigne. Les annales 2023-24 ne sont pas dans le projet.
2. Cas de comptoir : les 2 par thème sont faits ; en ajouter sur les thèmes de l'an dernier (rhinite allergique, douleurs, fièvre, diarrhée, constipation, hémorroïdes, toux, maux de gorge, RGO, nausées…).
3. Relire sur les RCP les 108 fiches de classe (statut « à vérifier » pour les 64 du lot 13 ; mentions « à vérifier » dans le texte : commercialisations, règles de prescription récentes) ; créer les classes secondaires restantes (voir Règles) si utile.
4. Fiches : relire sur les RCP les points signalés dans les notes des fiches des lots 9, 10 et 14 ; chaque nouveau médicament reçoit directement une fiche détaillée.
5. Nouveaux exercices tirés des annales : courrier ou mail au prescripteur, questions courtes notées, fiche SFPC à remplir, calcul de dose pédiatrique sans calculatrice, protocole de déprescription. Plus tard : CLEO.
6. Points qu'elle doit vérifier : ils sont marqués dans l'appli (statut et note).
7. **À rappeler à l'utilisateur** : les annales 2023-24 manquent dans les documents du projet ; lui demander de les ajouter (demande du 14/11/2026).
