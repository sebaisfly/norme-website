# Norme — landing site

A static marketing site: hero, feature showcase, brand manifesto, and a
waitlist signup wired to the real backend (`norme_backend`, `core` app —
`WaitlistEntry` model + `POST /api/waitlist/`). No build step, no
framework — plain HTML/CSS/JS.

## Run it locally

From this folder:

```bash
python -m http.server 3000
```

Then open `http://localhost:3000`. Port 3000 is already in the backend's
default `CORS_ALLOWED_ORIGINS` fallback list, so the waitlist form works
against a locally running backend with no extra config.

Make sure the backend is up (`docker compose up -d` from `norme_backend/`)
and that `js/config.js` points at a URL you can actually reach:

- Against the local docker-compose stack: `http://127.0.0.1` (port 80,
  via nginx — the `web` container's port 8000 is only exposed *inside*
  the Docker network, not to the host).
- Against a deployed backend: that backend's real URL.

## Deploying

This is a static site — host it anywhere that serves static files
(Vercel, Netlify, GitHub Pages, S3+CloudFront, or the same nginx already
fronting the backend). There's no build step: just upload/point at this
folder.

Before going live:

1. **`js/config.js`** — set `window.NORME_API_BASE_URL` to the deployed
   backend's real URL.
2. **Backend CORS** — add the site's real domain to `CORS_ALLOWED_ORIGINS`
   (and `CSRF_TRUSTED_ORIGINS`, which falls back to the same list) in the
   backend's environment. Without this, the waitlist form will fail with
   a CORS error even though the API itself is reachable.
3. **Favicon/logo** — `assets/norme_logo.png` is copied from
   `norme_app/assets/icon/norme_logo.png`. If that source logo changes,
   re-copy it here too — it's not symlinked.

## Waitlist signups

Stored in the backend's `core.WaitlistEntry` model — view/export them via
Django admin (`/admin/core/waitlistentry/`). The endpoint is rate-limited
(`waitlist: 5/hour` per IP, in `norme_backend/norme_backend/settings.py`)
and rejects duplicate emails with a friendly "already on the list"
response rather than an error.
