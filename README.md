# Norme — landing site (published copy)

This repo exists only so GitHub Pages can serve the Norme landing site
publicly — GitHub Pages doesn't work on a private repo without a paid
plan, and the main `Norme` app repo stays private. Live at
https://sebaisfly.github.io/norme-website/

**Source of truth is `norme_website/` in the main (private) `Norme` repo.**
For any content/design change: edit it there, verify locally, then copy
the changed files here and push (see "Updating this repo" below). Don't
make one-off edits directly in this repo — they'll get overwritten the
next time someone copies from the source folder without noticing the
drift.

A static marketing site: hero, feature showcase, brand manifesto, a
waitlist signup wired to the real backend, and an Android APK download.
No build step, no framework — plain HTML/CSS/JS.

## Waitlist signups

The form posts to the real deployed backend (`js/config.js` sets
`NORME_API_BASE_URL`) — `core.WaitlistEntry` model, `POST /api/waitlist/`.
Signups land in the backend's database; view/export them via Django admin
(`/admin/core/waitlistentry/`) on that backend. Rate-limited (5/hour per
IP) and rejects duplicate emails with a friendly message instead of an
error.

## APK download

`downloads/norme-app.apk` is a stable filename the site links to (nav +
hero) — it's the file that changes on update, not the link, so the button
never breaks across releases.

**Updating it after a new release**, from the main `Norme` repo:

```bash
gh release download vX.Y.Z --repo sebaisfly/Norme --pattern "*.apk" --dir /tmp
cp /tmp/norme-vX.Y.Z.apk /path/to/this/repo/downloads/norme-app.apk
git add downloads/norme-app.apk && git commit -m "Update downloadable APK to vX.Y.Z" && git push
```

This is a manual step today. Automating it (a CI step in the main repo's
`build-apk.yml` that pushes the new APK here on every tagged release)
would need a token with write access to this repo, stored as a secret in
the main repo — not set up yet.

## Local dev

This repo is the *published* copy only — for local development, use
`norme_website/` in the main repo instead (`python -m http.server 3000`
there, per its own README). This repo's `js/config.js` points at the real
deployed backend, not `127.0.0.1`.

## Deploying

Static site, served via GitHub Pages from this repo's `main` branch root
(already configured in repo Settings → Pages). Before pointing it at a
different backend:

1. **`js/config.js`** — set `window.NORME_API_BASE_URL`.
2. **Backend CORS** — add this site's real domain to `CORS_ALLOWED_ORIGINS`
   (and `CSRF_TRUSTED_ORIGINS`) in the backend's environment, or the
   waitlist form fails with a CORS error even though the API is reachable.
