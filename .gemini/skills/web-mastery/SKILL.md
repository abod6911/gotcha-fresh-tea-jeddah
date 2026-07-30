---
name: web-mastery
description: Expert full-stack web development rules, state management, modern frameworks (React, Vite, Next.js, TypeScript), SEO optimization, build tooling, performance budgets, and zero-defect code practices.
---

# Web Mastery & Full-Stack Development Skill

## Overview
This skill equips the agent with industry-leading full-stack web architecture, clean code practices, modern React/TypeScript patterns, performance budgets, and strict SEO standards.

---

## Core Engineering Principles

### 1. Zero-Defect Code Architecture
- **Type Safety**: Strictly avoid `any` in TypeScript. Define precise interfaces, enums, and generics.
- **Component Decoupling**: Keep UI components pure, modular, and focused. Separate data fetching and business logic from presentation.
- **API Integrity**: Always maintain backward compatibility on public props, hooks, and function signatures. Never break existing invocations.

### 2. State & Data Flow Management
- **Single Source of Truth**: Elevate shared state to Context/Store providers instead of duplicating transient local states.
- **Immutability**: Treat state objects as immutable. Use functional updates or produce patterns.
- **Optimistic Updates**: Provide instant UI feedback for user actions while performing background network sync.

### 3. High Performance & Bundle Optimization
- **Code Splitting**: Dynamic imports (`import()`) for non-critical route chunks.
- **Asset Compression**: Optimize vector SVGs, compress images (WebP/AVIF), and load third-party scripts asynchronously (`async`/`defer`).
- **Render Budget**: Target <100ms for user interactions and <2.5s for Largest Contentful Paint (LCP).

### 4. SEO & Accessibility (A11y)
- **Semantic HTML**: Use proper HTML5 tags (`<main>`, `<article>`, `<header>`, `<footer>`, `<nav>`).
- **Structured Metadata**: Include Open Graph tags, Twitter Cards, meta descriptions, and JSON-LD schema markup on every page.
- **Keyboard & Screen Reader Support**: Explicit `aria-label`, visible focus rings, logical heading levels (`h1` -> `h6`), and minimum touch targets of 44x44px.
