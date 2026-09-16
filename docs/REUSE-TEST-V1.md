# Reuse Test V1

The architectural test is simple:

> Can the system produce a second artist gallery without copying the Renée project and rewriting the application?

## Test artist

Use a fictitious artist for validation before a real client.

Suggested profile:

- Name: Clara Montevideo
- City: Montevideo
- Country: Uruguay
- Medium: acrylic on canvas

## Pass criteria

- artist identity changes through configuration
- hero and OG assets change through configuration
- WhatsApp/contact changes through configuration
- catalog source changes through configuration
- visual variables can change without changing core logic
- no Renée-specific strings remain in core code

## Failure condition

If the second implementation requires copying the repository and editing multiple Renée-specific code paths, extraction is incomplete.
