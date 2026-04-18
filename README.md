# learn.cetiai.co

**Live (dev preview)**: https://dev-learn.cetiai.co
**Repo**: https://github.com/ceti-ai-services/ceti-claude-code-course

CETI.AI's Claude Code course — landing site + enrollment funnel.

Three tiers: **🥉 Bronze** (free, invite-only, 7-module self-serve), **🥈 Silver** ($499, 4-week cohort), **🥇 Gold** ($2,500, 1:1 integration).

## Quick start

```bash
npm install
cp .env.example .env     # fill in Stripe + ticket codes
npm run dev              # http://localhost:3000
```

## Build / deploy

```bash
npm run generate         # static output in .output/public
npx vercel --prod --yes
```

## Layout

- `app/pages/` — landing, `/start` (Bronze gate), `/silver`, `/gold`, `/thanks`
- `server/api/enroll.post.ts` — ticket-code gate
- `server/api/checkout/{silver,gold}.post.ts` — Stripe Checkout (placeholders)
- `content/start/` — lesson markdown
- `content/videos/` — teleprompter scripts
- `bronze-kit-src/` → `public/bronze-kit.zip`

See `CLAUDE.md` for the full course spec, tone invariants, and design system.
