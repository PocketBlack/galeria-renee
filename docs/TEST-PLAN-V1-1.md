# Test Plan V1.1

## Static asset test

Check that `/artista-2026.jpg`, `/hero-arte.jpg`, `/favicon.png` and catalog images resolve as their intended media types.

## Social metadata test

Check that the production HTML exposes absolute `og:image`, `og:image:secure_url` and `twitter:image` values.

## Routing test

Check that an intentionally nonexistent asset does not receive the home HTML as a successful `200` response.

## Regression test

Check that the home page, catalog, WhatsApp CTA, audio control and responsive layout remain functional.

## Catalog test

Check that the published Google Sheets CSV remains accessible and the artwork list renders without JavaScript errors.
