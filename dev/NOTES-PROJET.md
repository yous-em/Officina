# Officina — état du projet et règles de travail

Notes de passation pour reprendre le projet dans une nouvelle conversation.
Projet public : aucune donnée personnelle ici.

## Le projet
Appli de révision pour une étudiante en 5e année de pharmacie, parcours officine, qui prépare la 6e année.
Elle sert pour les examens et pour la pratique clinique.
- Appli web installable (PWA) en un seul fichier HTML, en JS sans dépendance. Mode jour uniquement, pensée pour le téléphone.
- Hébergée sur GitHub Pages (dépôt yous-em/officina). Le site est à la racine du dépôt, les sources dans `dev/`.
- Sa progression reste sur son téléphone (localStorage). Elle peut l'exporter en fichier vers Fichiers ou iCloud, avec un rappel au bout de 7 jours.
- Pour mettre à jour : `dev/deploy.sh "message"`, qui construit, teste et pousse. Cloner le dépôt et travailler depuis `dev/`.
- Une version de prévisualisation existe aussi en artefact Claude « Officina ». L'utilisatrice se sert de l'appli installée.

## Contenu actuel
- 8 ordonnances :
  - o1 et o2 : exemples validés ;
  - o3 : sujet âgé, d'après le cours de commentaire d'ordonnance ;
  - o4 à o8 : pédiatrie, d'après l'ED de pédiatrie ; corrections construites à partir des recommandations du cours.
- 7 cas de comptoir : toux sous IEC, œil rouge sous lentilles, conjonctivite allergique, sevrage tabagique (×2), paludisme, fièvre au retour de voyage.
- 12 fiches médicaments (11 détaillées, sur le modèle du ramipril, et l'amoxicilline en fiche courte) et 19 cartes FSRS.

## Règles de contenu (demandes de l'utilisatrice)
- Fiabilité absolue :
  - chaque donnée porte un statut (verifie / partiel / a_verifier), une note et des sources ;
  - ne rien inventer, signaler toute incertitude ;
  - le RCP est la source principale des interactions : le Thésaurus ANSM n'est plus mis à jour depuis septembre 2023 ;
  - consigne actuelle : vérifier un peu moins, produire plus.
- Fiches médicaments dans l'ordre du modèle ramipril : identité, mécanisme, indications, posologies, plafonds, administration, contre-indications, interactions, grossesse et allaitement, effets indésirables, surveillance, cinétique.
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

## Thèmes de comptoir au programme
- Cette année : sevrage tabagique, voyageur, ophtalmologie, otologie, dermatologie, pathologies du sportif, anxiété, insomnie, fatigue, premiers soins et urgences.
- L'an dernier : rhinite allergique, douleurs, fièvre, diarrhée, constipation, hémorroïdes, toux, maux de gorge, RGO, ulcère, gastralgies, nausées et vomissements, dyspepsie, rhume.

## À faire
1. Ordonnances de ses cours : grossesse, cas avec courrier au prescripteur, autres chapitres (infections ostéoarticulaires, AVC, mucoviscidose, ostéoporose), annales 2021 à 2025 (dont TDAH : méthylphénidate + cefpodoxime). Les PDF sont à redemander à l'utilisateur : ils ne sont pas dans le dépôt.
2. Cas de comptoir sur les thèmes restants (environ 2 par thème).
3. Fiches détaillées pour chaque nouveau médicament.
4. Nouveaux exercices tirés des annales : courrier ou mail au prescripteur, questions courtes notées, fiche SFPC à remplir, calcul de dose pédiatrique sans calculatrice, protocole de déprescription. Plus tard : CLEO.
5. Points qu'elle doit vérifier : ils sont marqués dans l'appli (statut et note).
EOF
