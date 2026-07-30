---
name: motion-graphics-animation
description: Advanced UI animation, physics-based springs, Framer Motion transitions, WebGL/Canvas micro-interactions, scroll-driven storytelling, and fluid visual effects.
---

# Motion Graphics & Advanced UI Animation Skill

## Overview
This skill equips the agent with industry-leading motion design, physics-driven Framer Motion animation patterns, WebGL canvas shaders, interactive scroll effects, and 60fps micro-interactions.

---

## Core Animation Principles

### 1. Physics-Based Spring Dynamics
- **Natural Motion**: Prefer spring physics (`type: "spring", stiffness: 300, damping: 25`) over rigid linear ease for UI components.
- **Gesture Physics**: Implement drag-to-close, swipe-to-dismiss, and hover tilt effects with realistic momentum.

### 2. Scroll-Driven Storytelling
- **Scroll Offset Triggers**: Use viewport intersection hooks (`useReveal`, `useScroll`) with thresholding so elements enter smoothly as the user scrolls.
- **Parallax Layers**: Create depth with multi-layered background parallax shifts (`translateY` keyed to scroll percentage).

### 3. High Performance 60FPS Render
- **Hardware Acceleration**: Only animate GPU-accelerated CSS properties (`transform`, `opacity`, `filter`). Avoid animating layout properties (`width`, `height`, `margin`, `padding`, `top`, `left`).
- **Will-Change Optimization**: Apply `will-change: transform` sparingly on complex animated layers to hint the browser compositor thread.

### 4. Micro-Interactions & Feedback
- **Active Click Feedback**: Scale down slightly on click (`active:scale-95`), scale up on hover (`hover:scale-105`).
- **Staggered Sequences**: Apply progressive delay to list items (`delay: index * 0.05s`) for rhythmic entrance animations.
