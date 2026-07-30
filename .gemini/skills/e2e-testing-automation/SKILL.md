---
name: e2e-testing-automation
description: End-to-end testing protocols, Playwright/Vitest test suite design, automated accessibility auditing (axe-core), visual regression testing, and CI verification pipelines.
---

# End-to-End Testing & Automated Quality Assurance Skill

## Overview
This skill establishes automated testing protocols, unit test design, end-to-end integration flows, accessibility audits, and regression verification pipelines.

---

## Quality Assurance Directives

### 1. End-to-End User Flow Coverage
- **Critical Path Verification**: Write Playwright/Cypress E2E tests for core user journeys: product selection, customizer modal toggling, cart additions, and checkout generation.
- **Multi-Device Viewport Testing**: Validate flows across desktop (1920x1080), tablet (768x1024), and mobile (375x812) device profiles.

### 2. Automated Accessibility Auditing
- **Axe-Core Automated Compliance**: Audit interfaces to guarantee WCAG 2.1 AA compliance (zero missing aria-labels, zero broken contrast ratios, zero keyboard focus traps).
- **Keyboard Navigation Testing**: Verify full app navigability using `Tab`, `Shift+Tab`, `Space`, `Enter`, and `Escape`.

### 3. Visual Regression & Snapshot Verification
- **DOM & Layout Screenshots**: Capture baseline screenshots of major components and sections across RTL/LTR modes to catch visual drift before deployment.
- **Zero Console Errors**: Enforce clean browser console output during test runs with zero unhandled promise rejections or React warnings.
