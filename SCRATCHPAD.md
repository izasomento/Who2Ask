# SCRATCHPAD

## Current State

**Status**: IN PROGRESS
**Active milestone**: M3 — Polish & Finalize
**Last session**: 2026-04-20

**Next actions**:
- [ ] User review of the new Ranking & Comparison feature
- [ ] Final content check for ranking summaries

**Open questions**:
- [None]

---

## Milestones

### M0 — Project Initialization

- [x] Fill in GEMINI.md project identity section
- [x] **Define AI Guardrails**: Documented in `DECISIONS.md`.
- [x] Define milestones M1–M3 below
- [ ] Push initial commit to GitHub (User action)
- [ ] Enable GitHub Pages (User action)
- [ ] Confirm live URL (User action)

### M1 — Core Questionnaire & Logic

Build the core questionnaire and scoring logic so users can evaluate whether someone is a strong recommender choice.

**Values checklist**:
- [x] **Learning**: Deepens understanding of what makes a strong recommender.
- [x] **Agency**: Provides reflection prompts for student decision-making.
- [x] **Privacy**: No PII stored or transmitted.
- [x] **Transparency**: AI use disclosed.

**Acceptance criteria**:
- [x] Home page with clear purpose and "Start" button.
- [x] 8-question guided questionnaire.
- [x] Working scoring logic based on user answers.

### M2 — Results & Guidance

Create the results page with personalized guidance, next steps, and a checklist of what to prepare before asking.

**Values checklist**:
- [x] Learning
- [x] Agency
- [x] Privacy
- [x] Transparency

**Acceptance criteria**:
- [x] Results page showing one of three categories (Strong Choice, Could Work, Not the Best Fit).
- [x] Personalized explanation and next steps.
- [x] Checklist of materials to prepare.

### M3 — Polish & Finalize

Polish the design, improve responsiveness/accessibility, and finalize the content and README.

**Values checklist**:
- [x] Learning
- [x] Agency
- [x] Privacy
- [x] Transparency

**Acceptance criteria**:
- [x] Mobile-responsive and accessible UI.
- [x] Clean, student-friendly visual style.
- [x] Complete README and finalized app content.
- [x] **Comparison Feature**: Users can name, save, and rank multiple recommenders in a session.

---

## Session Log

### 2026-04-20

**State found**: App MVP complete and functional.
**Action taken**: Added a comparison and ranking feature. Users can now input a name for each recommender, save results to a session-based list, and view a ranked ranking page. Refined the UI with academic-editorial styling. Renamed the app to "Letters for Minerva".
**State left**: App with multi-recommender comparison is functional.

**Disclosure**:
**AI Tool(s) Used**: Gemini CLI
**Purpose**: Feature implementation and UI refinement.
**Modifications & Verification**: Implementation follows the session-based state requirement. Tested navigation flow from Name -> Questionnaire -> Result -> Ranking.
**Learning Reflection**: Adding session-based state management without a backend demonstrates the power of vanilla JS for complex user flows.
