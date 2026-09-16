# Architectural Decisions V1

## ADR-001 — No SPA fallback

**Decision:** remove the global `/* /index.html 200` rewrite.

**Reason:** the current gallery is a static site without client-side routes. Netlify documents the rule as an SPA rewrite pattern. Keeping it would make nonexistent paths resolve to the home document instead of naturally producing a missing-resource response.

## ADR-002 — Absolute social image URLs

**Decision:** Open Graph and Twitter image metadata use the production canonical domain.

**Reason:** social crawlers receive an unambiguous resource URL and the metadata remains independent of document-relative resolution.

## ADR-003 — No framework migration yet

**Decision:** keep the current HTML/CSS/JavaScript implementation while extracting the architecture.

**Reason:** the objective is to prove reusability before adding framework complexity.

## ADR-004 — Google Sheets remains the catalog source for V1

**Decision:** retain the existing published CSV model.

**Reason:** it already provides a lightweight content workflow without introducing a backend or CMS dependency.
