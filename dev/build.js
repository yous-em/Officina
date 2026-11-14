// Assemble src/* en un seul fichier dist/index.html.
const fs = require("fs"), path = require("path");
const r = (f) => fs.readFileSync(path.join(__dirname, "src", f), "utf8");
const strip = (js) => js.replace(/\nif \(typeof module[^\n]*\n/g, "\n");
const page = (pwa) => `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Officina</title>${pwa ? PWA_HEAD : ""}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Figtree:wght@400;500;600;700&display=swap">
<style>
${r("styles.css")}</style>
</head>
<body>
<div id="app"></div>
<script>
${strip(r("data.js"))}
${strip(r("data2.js"))}
${strip(r("data3.js"))}
${strip(r("data4.js"))}
${strip(r("data5.js"))}
${strip(r("data6.js"))}
${strip(r("data7.js"))}
${strip(r("data8.js"))}
${strip(r("data9.js"))}
${strip(r("data10.js"))}
${strip(r("data11.js"))}
${strip(r("data12.js"))}
${strip(r("data13.js"))}
${strip(r("core.js"))}
${r("ui.js")}</script>${pwa ? PWA_SW : ""}
</body>
</html>
`;
const PWA_HEAD = `
<meta name="theme-color" content="#F3F5F4">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Officina">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="apple-touch-icon.png">`;
const PWA_SW = `
<script>if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js");</script>`;
// 1. Version publiée dans Claude
fs.mkdirSync(path.join(__dirname, "dist"), { recursive: true });
const html = page(false);
fs.writeFileSync(path.join(__dirname, "dist", "index.html"), html);
console.log("dist/index.html", html.length, "caractères");
// 2. Application installable (dépôt GitHub) : le site à la racine, les sources dans dev/
const site = path.join(__dirname, "site"); fs.rmSync(site, { recursive: true, force: true }); fs.mkdirSync(site, { recursive: true });
fs.writeFileSync(path.join(site, "index.html"), page(true));
for (const f of fs.readdirSync(path.join(__dirname, "pwa"))) fs.copyFileSync(path.join(__dirname, "pwa", f), path.join(site, f));
const dev = path.join(site, "dev");
for (const d of ["src", "test", "pwa"]) fs.cpSync(path.join(__dirname, d), path.join(dev, d), { recursive: true });
for (const f of ["build.js", "LISEZMOI.md", "deploy.sh", "NOTES-PROJET.md"]) fs.copyFileSync(path.join(__dirname, f), path.join(dev, f));
console.log("site/ prêt");
