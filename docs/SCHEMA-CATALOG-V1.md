# Artwork Catalog Schema V1

The current Renée catalog is intentionally small and should remain small until the product requires more.

## Current fields

| Field | Purpose |
|---|---|
| `titulo` | Artwork title |
| `archivo` | Image filename |
| `tipo` | Orientation/type used by presentation logic |
| `estado` | Availability state |
| `destacada` | Whether the artwork appears in the featured exhibition |

## Future optional fields

- `id`
- `anio`
- `tecnica`
- `dimensiones`
- `precio`
- `moneda`
- `descripcion`
- `orden`

## Rule

Do not convert the catalog into a complex CMS prematurely. The existing Google Sheets → CSV workflow is part of the V1 proof and should be preserved until a real operational constraint justifies replacing it.
