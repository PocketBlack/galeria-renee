# V1.1 Go / No-Go

## Go criteria

- Social metadata uses absolute production URLs.
- No unnecessary global SPA rewrite remains.
- Baseline headers are defined.
- The current production case remains intact on `main` until review.
- The hardening branch contains no framework migration.
- The next architecture step is explicitly defined.

## No-Go criteria

- Public deployment has not been re-tested.
- Static assets return HTML instead of their intended media.
- The catalog fails.
- WhatsApp conversion fails.
- The branch introduces a visual regression.

## Decision point

After public QA, merge V1.1 if all Go criteria pass. Then proceed to the first real extraction of the rendering layer from `index.html`.
