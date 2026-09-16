# Artwork Catalog Schema V1

The current Renée catalog is intentionally small and should remain small until the product requires more.

## V1 source of truth

The artist catalog is maintained in Google Sheets and published as CSV for the website to consume.

The current sheet has been validated against the V1 implementation and exposes exactly these five columns:

| Column | Field | Purpose |
|---|---|---|
| A | `titulo` | Artwork title |
| B | `archivo` | Image filename |
| C | `tipo` | Orientation/type used by presentation logic (`v` / `h`) |
| D | `estado` | Availability state (`disponible`, etc.) |
| E | `destacada` | Whether the artwork appears in the featured exhibition (`verdadero` / `falso`) |

### Current catalog examples

The sheet currently contains the following works in the visible dataset:

- Canto Libre
- Acordes de Pasión
- Armonía Estructural
- Mirada de África
- Retrato Messi
- La Novia
- Capitán Miranda
- Alma Libre
- Mirada de África II

The first three are marked as featured; the remaining visible works are not featured. The visible dataset currently marks all listed works as available.

## Normalization contract

The website normalizes each CSV row into this internal object:

```js
{
  titulo,
  archivo,
  tipo,
  estado,
  destacada
}
```

The current implementation accepts Spanish boolean values (`verdadero` / `falso`) and normalizes `tipo` and `estado` to lowercase for presentation logic.

## Future optional fields

These fields remain candidates for a later catalog version, but must not be added to the sheet or rendering engine until there is a concrete operational need:

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
