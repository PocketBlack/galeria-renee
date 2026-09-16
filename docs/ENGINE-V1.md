# Gallery Engine V1

The Gallery Engine is the reusable runtime layer between artist configuration/catalog data and the visual gallery.

## Responsibility

The engine currently owns:

1. Loading the configured catalog source.
2. Parsing the published Google Sheets CSV.
3. Normalizing the V1 catalog contract.
4. Rendering featured artworks.
5. Rendering the complete catalog.
6. Exposing a `gallery:ready` event for later UI integrations.

## Inputs

The engine expects `js/config.js` to be loaded first and reads:

- `ARTIST.catalog.url`
- the V1 catalog fields: `titulo`, `archivo`, `tipo`, `estado`, `destacada`

## Output

The engine exposes `window.GalleryEngine` with:

- `loadCatalog()`
- `renderCatalog(catalog, selectors)`
- `mount(selectors)`
- `normalizeRow(columns)`

## Validation strategy

`system-test.html` is an isolated validation surface. It does not replace the production page and does not modify `index.html`.

The test proves this chain:

```text
Artist Config
     ↓
Google Sheets CSV
     ↓
Catalog Normalization
     ↓
Gallery Engine
     ↓
Featured + Complete Catalog
```

## Next integration step

After visual validation, integrate the engine into the production gallery while preserving the current Renée presentation layer. The production page should consume configuration and engine behavior without requiring Renée-specific catalog logic inside `index.html`.
