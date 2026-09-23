// Deploy-time configuration. Edit this file (not main.js) when you deploy
// the site — mirrors how norme_app configures API_BASE_URL via its own
// .env file.
//
// This repo (sebaisfly/norme-website) is the published copy served by
// GitHub Pages, so it points at the real deployed backend on the Contabo
// VPS (Caddy + sslip.io, auto-HTTPS, no custom domain needed). The
// separate norme_website/ folder in the main app repo is for local dev
// and stays pointed at 127.0.0.1 instead.
window.NORME_API_BASE_URL = "https://144-91-125-51.sslip.io";
