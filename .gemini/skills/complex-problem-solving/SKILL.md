---
name: complex-problem-solving
description: Advanced systematic debugging, empirical log inspection, root cause tracing, multi-layered problem breakdown, state isolation, edge case handling, and zero symptom patching.
---

# Complex Problem Solving & Root Cause Debugging Skill

## Overview
This skill governs the systematic diagnosis and resolution of complex, multi-variable engineering bugs, runtime crashes, layout misalignments, and state desynchronizations.

---

## Systematic Debugging Protocol

### 1. Empirical Evidence First
- **Read Full Stack Traces**: Never formulate diagnostic hypotheses without reading un-truncated error tracebacks and runtime logs.
- **Isolate the Failure**: Identify the exact symbol, component, line number, or state transition where the runtime invariant was violated.

### 2. Root Cause Tracing
- **No Superficial Symptom Patches**: Never swallow exceptions with empty `catch` blocks, return dummy fallback values, or comment out failing assertions.
- **Trace Upstream Data Providers**: If a component receives `undefined` or malformed data, trace the upstream state provider or API payload instead of wrapping the call in a silent `if (data)` guard.

### 3. Multi-Layer Problem Decomposition
- Break complex problems down into 3 isolated layers:
  1. **Data Layer**: Schema validation, state initialization, and hook dependencies.
  2. **Logic Layer**: Control flow, event propagation, and async lifecycle triggers.
  3. **Presentation Layer**: DOM node hierarchy, CSS box model calculation, and viewport/direction (RTL/LTR) boundaries.

### 4. Verification & Regression Testing
- **Empirical Proof**: Always verify fixes by running clean production builds (`npx vite build` / unit tests) and validating runtime behavior.
- **Edge Case Audit**: Test boundary conditions (empty lists, long strings, mobile viewports, RTL/LTR switching, rapid user clicks).
