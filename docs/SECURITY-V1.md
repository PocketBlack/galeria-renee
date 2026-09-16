# Security Baseline V1

## Current controls

- HTTPS through Netlify/custom domain
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- no application secrets in the repository
- no backend credentials required by the current gallery

## Data flow

The browser requests the published Google Sheets CSV directly. This is public catalog data and must not contain private information or credentials.

## Future controls

Before introducing authenticated APIs, forms, payments or private artist data, reassess the architecture and secrets management. Do not put API keys or private credentials into client-side JavaScript.
