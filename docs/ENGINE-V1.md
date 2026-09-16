# Gallery Engine V1

The Gallery Engine is the reusable runtime layer between artist configuration/catalog data and the visual gallery.

## Responsibility

The engine currently owns:

1. Loading the configured catalog source.
2. Parsing the published Google Sheets CSV.
3. Normalizing the V1 catalog contract.
4. Rendering featured artworks.
5. Rendering the non-featured complete catalog.
6. Generating artwork inquiry links from artist contact configuration.
7. Exposing a `gallery:ready` event for later UI integrations.

## Inputs

The engine expects `js/config.js` to be loaded first and reads:

- `ARTIST.catalog.url`
- `ARTIST.catalog.medium` (optional presentation metadata)
- `ARTIST.contact.whatsapp`
- `ARTIST.contact.message`
- the V1 catalog fields: `titulo`, `archivo`, `tipo`, `estado`, `destacada`

## Presentation contract

The engine deliberately emits the existing gallery DOM contract rather than introducing a second visual component model:

```text
art-frame-wrapper
└── art-frame + vertical-frame | horizontal-frame
    └── img
└── art-info
    ├── h3
    ├── p
    └── status-badge
```

This keeps the current Renée CSS and visual treatment reusable while moving catalog logic out of the production page.

## Featured semantics

`destacada = true` renders in `#carousel-destacados`.

`destacada = false` renders in `#grilla-completa`.

Featured works are intentionally not duplicated in the complete catalog. This preserves the existing exhibition model and prevents the engine from changing the user's browsing experience.

## Safety and normalization

Catalog text is inserted through DOM properties such as `textContent`; the engine does not build artwork cards from untrusted HTML strings. Status values are normalized into safe CSS tokens before being used as class names.

## Output

The engine exposes `window.GalleryEngine` with:

- `loadCatalog()`
- `renderCatalog(catalog, selectors)`
- `mount(selectors)`
- `normalizeRow(columns)`
- `createArtworkCard(obra, index)`

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
Presentation Contract
     ↓
Featured + Complete Catalog
```

## Next integration step

After visual validation, integrate the engine into the production gallery while preserving the current Renée presentation layer. The production page should consume configuration and engine behavior without requiring Renée-specific catalog loading/rendering logic inside `index.html`.
