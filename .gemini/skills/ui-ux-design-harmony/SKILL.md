---
name: ui-ux-design-harmony
description: Professional UI/UX design rules, layout alignment harmony, 8dp grid systems, micro-interactions, dark/light glassmorphic styling, responsive typography scales, color contrast (WCAG AAA), and wowed-by-first-glance interfaces.
---

# UI/UX Design & Layout Harmony Skill

## Overview
This skill provides comprehensive rules for designing ultra-luxury, high-contrast, visually harmonious digital interfaces that deliver an immediate "WOW" factor across all screen sizes and languages (RTL/LTR).

---

## Design System Architecture

### 1. Spatial Grid & Layout Harmony
- **8dp / 4dp Grid System**: All margins, paddings, gaps, and component dimensions must strictly adhere to increments of 4px / 8px (e.g., 4, 8, 12, 16, 24, 32, 48, 64px).
- **Flexbox & Grid Alignment**: Use flex alignment (`items-center`, `justify-between`) and grid gaps instead of arbitrary pixel offsets (`top-[12px]`, `left-[7px]`).
- **Responsive Layout Harmony**: Maintain perfect symmetry across Mobile (<640px), Tablet (640-1024px), Desktop (1024-1280px), and Ultra-Wide (1280px+).

### 2. Typography Hierarchy & Readability
- **Curated Type Scale**: Use modular type ratios (e.g., 1.125 Major Second or 1.25 Major Third).
- **High-Contrast Text**: Ensure body text has a contrast ratio of at least 4.5:1 (WCAG AA) or 7:1 (WCAG AAA) against its backdrop.
- **RTL Connectivity**: For Arabic scripts, enforce `letter-spacing: normal !important;` to ensure Arabic letters remain connected and legible.
- **Comfortable Line Heights**: Line height for body copy should be between 1.5x and 1.8x (`leading-relaxed` or `leading-loose`).

### 3. Glassmorphism & Color Palettes
- **Rich Aesthetic Tokens**: Combine dark plum/midnight backdrops with soft pastel glass cards (`bg-white/90` or `bg-card/95` with `backdrop-blur-md` and `border-white/30`).
- **Dynamic Multi-Tone Gradients**: Use curated color transitions (`from-pink-500 via-rose-500 to-pink-600`) with subtle ambient background glows (`blur-2xl opacity-40`).
- **3D Depth & Elevation**: Utilize layered box shadows (`shadow-soft`, `shadow-glow`) and 3D borders to create tactile, interactive UI elements.

### 4. Micro-Interactions & Motion Language
- **Purposeful Transitions**: Keep hover, active, and focus transitions snappy (between 150ms and 300ms) with custom easing (`cubic-bezier(0.22, 1, 0.36, 1)`).
- **Hover Lift**: Apply subtle scale transforms (`hover:scale-105 hover:-translate-y-0.5`) to clickable cards, pills, and buttons.
- **Touch Target Integrity**: Ensure every clickable element has a minimum touch target size of 40x40px (`h-10 w-10`).
