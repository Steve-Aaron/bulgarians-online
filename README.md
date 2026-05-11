# Bulgarians Online — bulgarians-online.com

React website hosted on GitHub Pages. Built with Vite + React Router, bubblemorphism/claymation design, Montserrat font, Bulgarian/English language toggle.

## Pages

- `/` — Homepage (hero, about, survey CTA, team, socials, final CTA)
- `/survey` — 7-question survey with webhook submission
- `/privacy` — Privacy policy
- `/contact` — Contact form

## Setup

```bash
npm install
cp .env.example .env
# Edit .env with your webhook URL
npm run dev
```

## Setting up the Notion webhook

Survey and contact form submissions POST JSON to `VITE_WEBHOOK_URL`.

**Recommended: Zapier**
1. Go to https://zapier.com → Create Zap
2. Trigger: **Webhooks by Zapier** → **Catch Hook** → copy the webhook URL
3. Action: **Notion** → **Create Database Item** → select your Notion database
4. Map fields: `q1_priorities`, `q2_good_job`, `q3_unemployment`, `q4_inflation`, `q5_russia`, `q6_eu`, `q7_country_direction`, `timestamp`, `language`
5. Paste the Zapier webhook URL into `.env` as `VITE_WEBHOOK_URL`

**Alternative: Make (formerly Integromat)**
Same flow — use a Webhooks module as trigger and a Notion module as action.

## Deploy to GitHub Pages

```bash
# 1. Create a repo: github.com/new → bulgarians-online
git init
git remote add origin https://github.com/YOUR_USERNAME/bulgarians-online.git

# 2. Deploy
npm run deploy
```

Then in GitHub repo Settings → Pages → set Source to `gh-pages` branch.

For the custom domain `bulgarians-online.com`, add a CNAME DNS record pointing to `YOUR_USERNAME.github.io`.

## Updating content

- **Translations**: `src/utils/translations.js` — all Bulgarian + English strings
- **Survey questions**: same file, under `survey.questions`
- **Team members**: `src/pages/HomePage.jsx` → `TeamSection`, update names/bios
- **Social links**: `src/components/Footer.jsx` and `src/pages/HomePage.jsx` → `SOCIALS` arrays
- **Webhook URL**: `.env` file → `VITE_WEBHOOK_URL`
- **Hero image**: replace `public/radev_hero.jpg`
