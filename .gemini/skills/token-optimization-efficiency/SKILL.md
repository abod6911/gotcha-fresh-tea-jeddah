---
name: token-optimization-efficiency
description: High-efficiency context management, targeted code edits, minimal token overhead, concise communications, precise file slice viewing, and zero unnecessary re-summarizations.
---

# Token Optimization & Context Efficiency Skill

## Overview
This skill enforces strict token conservation protocols to maximize context efficiency, reduce API overhead, speed up response times, and prevent context window exhaustion during complex development sessions.

---

## Token Conservation Protocols

### 1. High-Density Surgical Code Edits
- **Targeted Chunk Edits**: Always use `replace_file_content` with concise `StartLine`/`EndLine` ranges or `multi_replace_file_content` for non-contiguous changes. Never overwrite whole files to change a few lines.
- **Diff Minimization**: Keep ReplacementContent focused strictly on necessary modifications. Do not re-format unchanged surrounding lines unless asked.

### 2. Context-Aware Targeted File Reading
- **Slice Viewing**: Always specify exact `StartLine` and `EndLine` parameters in `view_file` (e.g. 30–60 lines max) based on symbol location rather than fetching 800 lines indiscriminately.
- **Precise Search Tracing**: Use targeted regex queries with `grep_search` to find exact symbol definitions before calling `view_file`.

### 3. Concise & Direct Natural Language Responses
- **No Unnecessary Re-Summarization**: After editing or building files, summarize accomplishments in concise, bulleted natural language. Never output large raw code dumps or re-quote entire modified files in chat text.
- **Direct Next Steps**: End responses with clear, actionable summaries and status updates without redundant pleasantries.

### 4. Background Task Efficiency & Reactive Wakeup
- **No Status Loop Polling**: When running background commands via `run_command` or subagents via `invoke_subagent`, stop calling tools or set bounded timers. Rely on automatic system reactive wakeup notifications to avoid context-cluttering poll loops.

### 5. Persistent Artifact Memory
- Store multi-step research findings, task checklists, and architectural implementation plans in structured markdown artifacts (`.md` files) rather than dumping large unstructured text blocks into the main conversation context.
