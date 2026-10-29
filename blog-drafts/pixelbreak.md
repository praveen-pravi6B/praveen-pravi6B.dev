---
title: PixelBreak — Catching Frontend Regressions Before They Ship
date: Oct 25 2026
summary: A local-first pre-commit hook that automatically catches responsive layout failures and visual regressions — no cloud, no subscriptions, no screenshots leaving your machine.
tags: devtools|frontend|ai|opensource
---

# PixelBreak — Catching Frontend Regressions Before They Ship

You change a CSS variable, commit, push — and 20 minutes later someone on Slack sends a screenshot of the mobile layout completely broken. The fix takes 30 seconds. Finding it costs 20 minutes.

---

## What I Built

**PixelBreak** is a pre-commit hook + CLI tool that automatically scans your frontend at every configured viewport width and blocks the commit if anything breaks.

```bash
git commit -m "style: update primary color"

🔍 Running pre-commit checks...
🚀 Scanning: 375px, 768px, 1024px, 1280px, 1440px, 1920px

🚨 BLOCKED [HIGH] horizontal-overflow @ 375px — overflows by 857px
🚨 BLOCKED [MODERATE] visual-regression @ 1024px — 787 pixels changed

❌ Commit blocked. Dashboard: http://localhost:3847
```

A localhost dashboard shows baseline vs current screenshots side by side with the diff image. A local AI explains the root cause and proposes a CSS fix — no API key, no cloud.

---

## The Problem

Manual responsive testing is skipped 90% of the time. Hosted tools like Percy and Chromatic are subscription-based and send your screenshots to their servers — a non-starter for internal dashboards or confidential UIs.

I wanted something that runs on every commit, costs nothing, and never touches a cloud service.

---

## How It Works

**Breakpoint Detective** — Playwright loads your app at each configured viewport and measures `scrollWidth` vs `clientWidth` in the browser. Offending elements are reported with exact pixel geometry.

**PixelTruth** — Screenshots are compared pixel-by-pixel using `pixelmatch`. Changed regions are highlighted in a diff image. Severity is assigned by measurement: 2%+ diff → HIGH, 0.05–2% → MODERATE.

**Git-aware baseline** — No manual `baseline update` step. PixelBreak runs `git show HEAD:<file>` to screenshot the previous version automatically, then compares against your staged version.

**Local AI** — When a finding blocks your commit, a local `llama.cpp` instance (Qwen2.5-Coder) explains the cause and proposes a fix. Severity is determined by measurement — the AI is advisory only.

---

## Stack

- **Playwright** — Chromium automation at each viewport
- **pixelmatch** — pixel-level image comparison
- **Zod** — schema validation for AI output, config, and waivers
- **llama.cpp** — local AI explanations (Qwen2.5-Coder-Instruct)
- **React + Vite** — localhost report dashboard
- **Node.js `http`** — dashboard server, no Express needed
- **pnpm workspaces** — TypeScript monorepo

---

## What I Learned

**Deterministic first, AI second.** Measured overflow of 857px is a fact. The AI adds the *why* — valuable, but advisory. The blocking decision should never depend on a model output.

**Screenshot noise is real.** CSS animations, async content, and font loading all cause false positives. Suppressing animations before screenshotting and adding a 300ms settle eliminated 90% of flakiness.

**Run a security audit before publishing.** A structured review found 9 vulnerabilities — command injection via file paths, path traversal in the dashboard server, and prototype pollution via YAML. Worth finding before users do.

---

## Links

- **GitHub:** [praveen-pravi6B/pixelbreak](https://github.com/praveen-pravi6B/pixelbreak)
