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
- 36 ordonnances :
  - o1 et o2 : exemples validés ;
  - o3 : sujet âgé, d'après le cours de commentaire d'ordonnance ;
  - o4 à o8 : pédiatrie, d'après l'ED de pédiatrie ; corrections construites à partir des recommandations du cours ;
  - o9 à o12 (lot 7) : ordonnances d'entraînement inventées (ostéoporose, AVC, grossesse, infection de prothèse) ;
  - o13 à o28 (lot 8) : tirées des documents du projet claude.ai « Pharma Yous » : ED de M. Boulin (o13, o14, o19), de M. Fagnoni (o15, o16), de Mme Cransac (o17 TDAH, o18 ostéoporose), annales 2021-22 (o20, o21), 2022-23 (o22 à o25), 2024-25 (o26 à o28). Correction de l'enseignant quand l'ED la donne ; sinon correction construite et signalée.
  - o29 à o36 (lot 10) : les 7 ordonnances de l'ED de Mme Freppel (SEP, MICI, Basedow, diabète de type 1, épilepsie, bipolaire, migraine) et la capécitabine de l'annale 2021-22 (mention « résultats uracilémie pris en compte »).
- 21 cas de comptoir :
  - c1 à c7 : toux sous IEC, œil rouge sous lentilles, conjonctivite allergique, sevrage tabagique (×2), paludisme, fièvre au retour de voyage ;
  - c8 à c21 (lot 6) : deux par thème restant (otologie, dermatologie, sportif, anxiété, insomnie, fatigue, premiers soins et urgences).
- 41 fiches médicaments, **toutes au format détaillé** (modèle ramipril) ; celles des lots 9 et 10 sont marquées « vérifié en partie » avec les points à relire dans la note.
- **Onglet Médicaments organisé par classe (lot 11, `src/data11.js`)** : 35 classes rangées en 13 familles (cœur et vaisseaux, douleur, anti-infectieux…). Chaque classe = la fiche détaillée de référence (modèle ramipril) + une section « Molécules de la classe » placée après le mécanisme : principe de la classe en chaîne de flèches, règles communes, puis les molécules par sous-groupe (ex. bêtabloquants cardiosélectifs / non cardiosélectifs) avec DCI, noms commerciaux français et particularités propres (posologie, voie, effets indésirables, interactions). Environ 260 molécules listées, statut « à vérifier » (écrites de mémoire, à relire sur la base publique). La recherche trouve une classe, une DCI ou un nom commercial (ex. « Prolia »).
- 50 cartes FSRS, 6 rappels de cours (statines, médicaments à prendre à distance, inducteurs enzymatiques, benzodiazépines chez le sujet âgé, écrire au prescripteur, traitements qui imposent une contraception).
- Niveaux de problème : en plus des 5 niveaux d'interaction, « inap » (médicament inadapté au patient, pentagone marron) et « reg » (réglementation, document gris).
- Tests : `node test/core.test.js` ; parcours navigateur : `NODE_PATH=<node_modules contenant playwright> node test/parcours.js` (Chrome dans /usr/bin/google-chrome).

## Règles de contenu (demandes de l'utilisatrice)
- Fiabilité absolue :
  - chaque donnée porte un statut (verifie / partiel / a_verifier), une note et des sources ;
  - ne rien inventer, signaler toute incertitude ;
  - le RCP est la source principale des interactions : le Thésaurus ANSM n'est plus mis à jour depuis septembre 2023 ;
  - consigne actuelle : vérifier un peu moins, produire plus.
- Fiches médicaments : **toujours le format détaillé et complet** du modèle ramipril (identité, mécanisme, indications, posologies, plafonds, administration, contre-indications, interactions, grossesse et allaitement, effets indésirables, surveillance, cinétique). **Jamais de fiche « courte »** (l'ancien format posologie/alertes/conseils, jugé incomplet) : tout nouveau médicament reçoit directement sa fiche détaillée.
- **Organisation par classe** (demande du 14/11/2026) : tout médicament appartient à une classe. Une nouvelle classe reçoit une fiche détaillée de référence **et** la liste complète de ses molécules (DCI, noms commerciaux, particularités). Un nouveau médicament d'une classe existante : l'ajouter à la liste, et lui faire une fiche détaillée s'il sert dans une ordonnance ou un cas. Classes encore absentes à créer en priorité : ARA2, inhibiteurs calciques, AVK et héparines, antidiabétiques non insuliniques, antipsychotiques, opioïdes forts, laxatifs et antidiarrhéiques, bronchodilatateurs et corticoïdes inhalés.
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

## À faire
1. Documents du projet encore à exploiter (dans « Fusion cas cliniques ») : AVC (3 cas de M. Fagnoni), goutte (2 cas), mucoviscidose (2 cas, ordre d'administration), infection ostéoarticulaire (relais oral), cas de gynécologie (Monazole, lupus, SEP sous fentanyl), ordonnances de la personne âgée (Meloux ; mirtazapine, Dépamide, rispéridone ; miansérine, prazépam), BPCO/ostéoporose cas 2 (Brintellix + tramadol). Annale 2021-22 : courrier clopidogrel + ésoméprazole (partie 2). Les ordonnances sont des images dans les PDF : les lire avec `project_read` et `original: true`. Les annales 2023-24 ne sont pas dans le projet.
2. Cas de comptoir : les 2 par thème sont faits ; en ajouter sur les thèmes de l'an dernier (rhinite allergique, douleurs, fièvre, diarrhée, constipation, hémorroïdes, toux, maux de gorge, RGO, nausées…).
3. Relire sur la base publique les listes de molécules du lot 11 (noms commerciaux, commercialisation, chiffres marqués « à vérifier »), puis créer les classes manquantes (voir Règles).
4. Fiches : relire sur les RCP les points signalés dans les notes des fiches des lots 9 et 10 ; chaque nouveau médicament reçoit directement une fiche détaillée.
5. Nouveaux exercices tirés des annales : courrier ou mail au prescripteur, questions courtes notées, fiche SFPC à remplir, calcul de dose pédiatrique sans calculatrice, protocole de déprescription. Plus tard : CLEO.
6. Points qu'elle doit vérifier : ils sont marqués dans l'appli (statut et note).
7. **À rappeler à l'utilisateur** : les annales 2023-24 manquent dans les documents du projet ; lui demander de les ajouter (demande du 14/11/2026).
