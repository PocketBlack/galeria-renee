# V1.1 — Hardening + Architecture Foundation

This release candidate establishes the technical and product foundation for the Artist Gallery System.

## Implemented

- absolute social preview image URLs
- removal of unnecessary SPA rewrite
- baseline security headers
- artist configuration contract
- first `js/config.js` configuration layer
- technical audit
- architecture specification
- catalog schema
- QA checklist
- security baseline
- implementation protocol
- product definition
- Case 01 definition
- second-artist reuse test
- roadmap and architecture decisions

## Important

`js/config.js` is intentionally introduced before wiring the complete application to it. The next implementation step should migrate references incrementally so that the production experience remains stable throughout the extraction.
