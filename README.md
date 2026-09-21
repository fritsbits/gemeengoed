# Gemeen Goed

Source of [gemeengoed.studio](https://gemeengoed.studio/), the one-pager for Gemeen Goed.
Gemeen Goed builds software for social organisations, shared across many of them so each pays a fraction of custom work.
The site is in Dutch.

## Stack

- [Astro](https://astro.build/), a single static page in `src/pages/index.astro`
- Plain CSS, scoped in the page
- Self-hosted fonts and images in `public/`
- Deployed on Netlify

## Develop

Requires Node 22.12 or newer.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve the built site
```

## Deploy

Netlify runs `npm run build` and publishes `dist/` (see `netlify.toml`).
Headers live in `public/_headers`.

## Copyright

The code, copy and design in this repository are not licensed for reuse.
