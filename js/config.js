// Deploy-time configuration. Edit this file (not main.js) when you deploy
// the site — mirrors how norme_app configures API_BASE_URL via its own
// .env file. Point this at your deployed backend's URL.
//
// For local dev against the docker-compose stack: the "web" container
// only exposes port 8000 *inside* the Docker network — nginx is what's
// actually published to the host, on port 80. So this is 127.0.0.1, not
// 127.0.0.1:8000 (the same gotcha norme_app's own .env has to account for).
window.NORME_API_BASE_URL = "http://127.0.0.1";
