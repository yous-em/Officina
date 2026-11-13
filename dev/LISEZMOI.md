# Officina — sources

Application de révision de pharmacie d'officine. Le site publié est à la racine du dépôt ; ce dossier `dev/` contient les sources.

- `src/` : données (`data*.js`), logique (`core.js`), interface (`ui.js`), styles.
- `pwa/` : manifeste, service worker, icônes.
- `build.js` : `node build.js` assemble `dist/index.html` et `site/` (à copier à la racine du dépôt).
- `test/` : `node test/core.test.js` ; parcours navigateur avec Playwright (`test/parcours.js`).

La progression de l'utilisatrice n'est jamais dans le dépôt : elle reste sur son téléphone et dans ses fichiers de sauvegarde exportés.
