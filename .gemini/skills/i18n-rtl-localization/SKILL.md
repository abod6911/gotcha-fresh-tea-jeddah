---
name: i18n-rtl-localization
description: Internationalization mastery, bi-directional (RTL/LTR) layout alignment, Arabic typography scaling, localized dates/currency, and seamless language switching.
---

# Internationalization & Bi-Directional RTL/LTR Mastery Skill

## Overview
This skill provides comprehensive engineering rules for building bi-directional multilingual web applications with flawless Arabic (RTL) and English (LTR) layout alignment, typography connection, and dynamic language state toggling.

---

## Bi-Directional Engineering Directives

### 1. Logical Property System
- **Use Logical CSS Properties**: Replace directional physical properties (`left`, `right`, `margin-left`, `padding-right`) with logical equivalents (`start`, `end`, `margin-inline-start`, `padding-inline-end`).
- **Flex & Grid Direction**: Utilize `dir="rtl"` and `dir="ltr"` at root element level, ensuring icons, indicators, and sidebars flip symmetrically.

### 2. Arabic Typography Protection
- **Connected Arabic Script**: Enforce `letter-spacing: normal !important;` for all Arabic elements (`[dir="rtl"] *, html[lang="ar"] *`). Never apply positive letter-spacing to Arabic text.
- **Font Scale Balance**: Increase font weight and line height for Arabic typefaces (e.g. Cairo / Tajawal) to achieve optical visual parity with Latin fonts (Poppins / Inter).

### 3. Bi-Directional SVG Curves & Coordinates
- **Flipped Coordinate Paths**: When rendering directional SVG paths or canvas graphs, mirror X-coordinates dynamically based on language direction (`isRtl ? pathB : pathA`).
- **Icon Rotation**: Flip directional arrows (`ChevronLeft`/`ChevronRight`, `ArrowRight`) dynamically based on active direction context.
