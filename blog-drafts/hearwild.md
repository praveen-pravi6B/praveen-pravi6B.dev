---
title: HearWild — An AI That Listens to Birds, Then Gets Out of Your Way
date: Oct 10 2026
summary: An open-source offline bird sound identifier that uses local AI to recognise species from a 6-second recording — then encourages you to put your phone down and go outside.
tags: ai|opensource|local-ai|vue|nature
---

# HearWild — An AI That Listens to Birds, Then Gets Out of Your Way

Most AI products are designed to keep you on the screen. HearWild is designed to do the opposite.

---

## What I Built

**HearWild** is an open-source AI nature companion. You record a bird sound for 6 seconds, it identifies the species using a local AI model, tells you something about the bird — and then encourages you to go back outside.

- New bird → **+100 XP**, added to your Flock
- Repeat bird → **+25 XP**
- Model not confident → nothing shown, nothing added

There is no feed. No map. No account. Just record, discover, go.

---

## The Problem

Every bird identification app I tried was built to maximise engagement — maps, leaderboards, social feeds. You came to go outside and ended up scrolling for 20 minutes.

The other problem: most apps send your audio to a cloud API. If you're on a trail with no signal, they stop working.

---

## How It Works

The browser's `MediaRecorder` API captures 6 seconds of audio and sends it to a local FastAPI backend. FFmpeg converts the WebM/Opus recording to WAV. BirdNET V3 (running via its ONNX export) processes the audio and returns a species prediction with a confidence score.

```
Record 6 seconds
      ↓
FastAPI → FFmpeg (WebM → WAV)
      ↓
BirdNET V3 ONNX inference
      ↓
Confidence check
  70%+  → add to Flock + earn XP
  20–69% → show result only
  < 20%  → say "I'm not sure"
      ↓
Wikimedia Commons → bird image (cached in SQLite)
```

The confidence thresholds are intentional. If the model isn't sure, HearWild doesn't guess. That keeps your collection meaningful.

---

## Stack

- **Vue 3 + Vite** — frontend recording UI and Flock view
- **FastAPI + Python** — backend inference server
- **FFmpeg** — audio format conversion
- **BirdNET V3 ONNX** — local bird identification (6,000+ species)
- **SQLite** — local Flock storage and image cache
- **Wikimedia Commons API** — bird images

---

## What I Learned

**Confidence thresholds matter more than accuracy.** A model that says "I'm not sure" at the right time is more trustworthy than one that always gives an answer. The 70% threshold was tuned by ear — literally, by testing recordings in different conditions.

**Short interaction loops reduce app stickiness — in a good way.** The whole experience is 15 seconds. That's intentional. An app that respects your time is a better app.

**Local AI is genuinely ready for domain-specific tasks.** BirdNET V3 running on a laptop CPU is fast enough to feel instant. You don't need a GPU for single-clip inference.

---

## Links

- **GitHub:** [praveen-pravi6B/hearwild](https://github.com/praveen-pravi6B/hearwild)
