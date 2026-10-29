---
title: Rebuilding Nokia's Space Impact in Vue 3 — A Refactoring Story
date: 2026
summary: How I took monolithic spaghetti JavaScript from a classic Nokia game and refactored it into a clean, class-based Vue 3 architecture — and what I learned about separating concerns in game code.
tags: vue|javascript|game|refactoring|vite
---

# Rebuilding Nokia's Space Impact in Vue 3 — A Refactoring Story

Classic browser game code is some of the most tangled JavaScript in existence. Game loop, collision detection, rendering, and state all fused into one file. I used Space Impact as a controlled exercise to fix that.

---

## What I Built

A modern, playable remake of Nokia's **Space Impact** — the side-scrolling space shooter from the early 2000s — built with Vue 3 and Vite, using a clean class-based game engine underneath.

The game runs in the browser, works on mobile with touch controls, and holds the classic feel while running on a modern architecture.

**Live:** [space-impact-vue.vercel.app](https://space-impact-vue.vercel.app/)

---

## The Problem

The original open-source ports of Space Impact were single-file JavaScript: player position, bullet logic, collision detection, score tracking, and rendering all mixed together. Every concern was tangled with every other.

Want to change how scoring works? Good luck finding all the places `score` is mutated. Want to add a new enemy type? Prepare to break collision detection.

This is a pattern I've seen in production codebases too. I wanted to practice the refactoring discipline somewhere low-stakes.

---

## How It Works

I broke the game into focused classes, each owning exactly one concern:

```
GameEngine        — orchestrates the game loop
Player            — movement, shooting, health
Enemy             — behaviour, movement patterns
Bullet            — position, velocity, collision box
CollisionSystem   — detects and resolves all collisions
ScoreSystem       — tracks score, high score, multipliers
Renderer          — draws everything, knows nothing else
InputHandler      — keyboard/touch, emits events
```

Each class has a clean public interface. The `CollisionSystem` doesn't know what a `Player` is — it processes objects with a bounding box. The `Renderer` doesn't know the game state — it draws what it's given.

**Vue 3** handles everything outside the game loop: menus, HUD overlay, touch controls, settings. The engine runs in a `<canvas>` element. Vue wraps it but never touches the loop internals — game state never goes into reactive refs.

---

## Stack

- **Vue 3 + Vite** — shell, menus, HUD, touch controls
- **Canvas API** — game rendering (no game framework)
- **Vanilla JavaScript classes** — game engine
- **Vercel** — deployment

---

## What I Learned

**Classes are organisation, not magic.** They don't add performance. They add clarity. An 80-line `CollisionSystem` is easier to reason about than 400 lines spread across a file.

**Keep the game loop away from Vue reactivity.** Vue's reactive system is excellent for UI. It's a poor fit for 60fps game loops where every re-render costs time. Keep them completely separate.

**Refactoring is better than rewriting for learning.** When you rewrite from scratch, you miss the subtle bugs that taught the original author things. Refactoring forces you to understand *why* things were done before you change them.

---

## Links

- **GitHub:** [praveen-pravi6B/space-impact-vue](https://github.com/praveen-pravi6B/space-impact-vue)
- **Live:** [space-impact-vue.vercel.app](https://space-impact-vue.vercel.app/)
