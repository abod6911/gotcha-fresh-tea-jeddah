---
name: devops-ci-cd-deployment
description: Continuous integration and deployment pipelines, Cloudflare Workers/Pages, GitHub Actions automation, static asset bundling, and zero-downtime releases.
---

# DevOps & CI/CD Deployment Automation Skill

## Overview
This skill governs continuous integration, automated production builds, Cloudflare Edge deployment, GitHub Pages gh-pages branching, static bundle verification, and zero-downtime releases.

---

## Deployment & Pipeline Directives

### 1. Build Verification & Integrity
- **Clean Build Protocol**: Execute production build commands (`npx vite build`) and verify zero errors before committing or pushing code.
- **Asset Hashing**: Ensure output assets include content hashes for efficient long-term HTTP caching (`Cache-Control: public, max-age=31536000, immutable`).

### 2. Multi-Branch Dual Deployment
- **Main Branch Sync**: Push clean feature commits to the primary repository `main` branch.
- **GH-Pages Edge Publishing**: Initialize and force-push built static artifacts from `.output/public` to `gh-pages` branch on target remote repositories (`abod6911/gotcha-fresh-tea-jeddah` & `work77889/clever-creator-box`).

### 3. Edge Routing & Fallbacks
- **404 Fallback Matching**: Sync `index.html` with `404.html` in static deployment directories to guarantee client-side route hydration on refresh.
- **Brotli & Gzip Compression**: Serve compressed bundles to achieve lightning-fast edge response times (<50ms).
