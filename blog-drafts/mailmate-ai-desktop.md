---
title: MailMate AI — A Local-First Email Assistant That Only Pings You When It Matters
date: Nov 2026
summary: A macOS email assistant that reads your Gmail, prioritises each email using a local AI model, and notifies you via Telegram — so you only act on what actually matters.
tags: ai|productivity|python|macos|local-ai
---

# MailMate AI — A Local-First Email Assistant That Only Pings You When It Matters

A critical deadline from a client sits in the same inbox as a newsletter and a shipping notification. Your brain has to process all three to know which one matters. MailMate AI does that processing for you.

---

## What I Built

**MailMate AI** is a macOS menu bar app that reads your Gmail in the background, summarises and prioritises each email, then sends a Telegram notification only when something genuinely needs your attention.

```
📧 P1 — [Action Required] Contract review by Friday
From: client@example.com
Summary: Client requesting final sign-off on Q4 contract before Nov 15 deadline.

[✅ Create Task]  [❌ Skip]  [📋 View Summary]
```

P0 and P1 items create tasks automatically. P2 (routine) items ask for confirmation first. Informational emails are summarised and set aside.

---

## The Problem

Email volume is manageable. Email noise is not. Everything arrives at the same priority level — the app has no idea what matters to you.

Existing AI email tools either send your full inbox to a cloud service or require complex setup. I wanted something that runs locally, integrates with tools I already use (Gmail, Telegram), and doesn't require trusting a third party with my email.

---

## How It Works

```
Gmail API (read-only)
      ↓
Summarise email (GPT-OSS-120b via HuggingFace — 1-2 sentences only)
      ↓
Classify priority (Laya — runs on local CPU)
      ↓
Policy engine (deterministic — model predicts, policy decides)
      ↓
Telegram notification with inline buttons
      ↓
SQLite task store
```

**Priority levels:**

| Level | Action |
|-------|--------|
| P0 Critical | Auto-create task + notify immediately |
| P1 Important | Auto-create task + notify |
| P2 Routine | Ask for confirmation before creating |
| OTHER | Summarise only |

**Deadline safety gates** prevent tasks with ambiguous dates ("ASAP", "end of week") from being created without clarification.

---

## Stack

- **Python 3.11 + rumps** — macOS menu bar app
- **Gmail API** — read-only OAuth, never writes or deletes
- **HuggingFace Inference API** — email summarisation (GPT-OSS-120b)
- **Laya** — local CPU classification model for priority + deadline
- **Telegram Bot API** — notifications with inline confirm buttons
- **Google Calendar API** — optional task scheduling
- **SQLite** — local task store with idempotency guarantees

---

## What I Learned

**Separate prediction from decision.** The Laya model predicts priority. A deterministic policy layer decides what action to take. This means I can change the policy (e.g. "never auto-create tasks for P1 after 6pm") without retraining anything.

**Dry-run mode should be the default.** The first version created real tasks immediately. I switched to dry-run by default and made live mode an explicit opt-in. Much less stressful to test.

**361 unit tests against mocks before any live data.** Testing email assistants against real inboxes is a bad idea. Mocking Gmail, Telegram, and Calendar responses meant I could run the full pipeline safely.

---

## Links

- **GitHub:** [praveen-pravi6B/mailmate-ai-desktop](https://github.com/praveen-pravi6B/mailmate-ai-desktop)
