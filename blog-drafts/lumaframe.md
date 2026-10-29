---
title: LumaFrame — A Studio Light for Your Browser
date: 2026
summary: A Chrome extension that adds a soft, adjustable studio-light frame around your browser for creators, streamers, and anyone who works in a dark room.
tags: chrome-extension|javascript|creative-tools|productivity
---

# LumaFrame — A Studio Light for Your Browser

Screen sharing, recording tutorials, or streaming in a dark room — the harsh contrast between a bright monitor and a dark face makes everything look amateur. I fixed it with a Chrome extension.

---

## What I Built

**LumaFrame** is a Chrome extension that adds a soft, adjustable warm-white glow around the edges of your browser window. The content area stays completely untouched. Only the frame glows.

```
┌─────────────────────────────────────────┐
│  [soft warm glow — border area only]   │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │     Your actual browser content   │  │
│  │     completely unchanged          │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│  [soft warm glow — border area only]   │
└─────────────────────────────────────────┘
```

Controls: intensity, colour temperature (warm 3200K to daylight 5600K), and frame width. One click to toggle.

---

## The Problem

Professional streamers use softboxes and ring lights for fill lighting. Those work — but they're expensive, they clutter your desk, and they look fake on camera.

The screen already produces light. The question was whether I could shape it into something flattering rather than harsh.

---

## How It Works

A content script injects a fixed-position `div` overlay with a radial gradient — transparent at the centre, glowing at the edges.

```javascript
const overlay = document.createElement('div')
overlay.style.cssText = `
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2147483647;
  background: radial-gradient(
    ellipse at center,
    transparent ${config.innerRadius}%,
    ${config.color} 100%
  );
  opacity: ${config.intensity};
`
document.body.appendChild(overlay)
```

`pointer-events: none` means clicks pass straight through. `z-index: 2147483647` (maximum) ensures the frame sits above everything. The radial gradient creates the soft fall-off from transparent centre to glowing edge.

Settings persist via `chrome.storage.sync` — they follow you across devices automatically.

---

## Stack

- **Manifest V3** — Chrome extension
- **Vanilla JavaScript** — content script, popup controls
- **CSS radial-gradient** — light simulation
- **chrome.storage.sync** — settings persistence

---

## What I Learned

**CSS gradients simulate light convincingly.** A radial gradient from transparent to warm white with the right falloff actually reads as diffused light in a camera. The browser's compositing handles the blending naturally.

**`pointer-events: none` is the most important property for overlays.** Building something that sits on top of the page without interfering with it is almost entirely about this one line.

**Extensions are simpler than they look.** `manifest.json` + a content script + a popup is the whole thing. The hard parts are the content security policy and not conflicting with page styles — both solvable with careful scoping.

---

## Links

- **GitHub:** [praveen-pravi6B/LumaFrame](https://github.com/praveen-pravi6B/LumaFrame)
