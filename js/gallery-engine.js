// Artist Gallery System — Gallery Engine V1
// Reusable catalog loading, normalization and rendering layer.

(function () {
  'use strict';

  function normalizeBoolean(value) {
    const normalized = String(value ?? '').trim().toLowerCase();
    return normalized === 'true' || normalized === 'verdadero' || normalized === '1' || normalized === 'si';
  }

  function parseCsvLine(line) {
    const cells = [];
    let current = '';
    let quoted = false;

    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      const next = line[i + 1];

      if (char === '"' && quoted && next === '"') {
        current += '"';
        i += 1;
      } else if (char === '"') {
        quoted = !quoted;
      } else if (char === ',' && !quoted) {
        cells.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    cells.push(current.trim());
    return cells;
  }

  function parseCsv(text) {
    return text
      .replace(/^\uFEFF/, '')
      .split(/\r?\n/)
      .filter((line) => line.trim() !== '')
      .map(parseCsvLine);
  }

  function normalizeRow(columns) {
    return {
      titulo: columns[0] || 'Obra sin título',
      archivo: columns[1] || '',
      tipo: (columns[2] || 'v').toLowerCase(),
      estado: (columns[3] || 'disponible').toLowerCase(),
      destacada: normalizeBoolean(columns[4])
    };
  }

  function createArtworkCard(obra, index) {
    const wrapper = document.createElement('article');
    wrapper.className = `artwork-card ${obra.tipo === 'h' ? 'landscape' : 'portrait'}`;
    wrapper.dataset.index = String(index);
    wrapper.dataset.status = obra.estado;

    const image = document.createElement('img');
    image.src = obra.archivo;
    image.alt = obra.titulo;
    image.loading = index < 4 ? 'eager' : 'lazy';
    image.decoding = 'async';

    const info = document.createElement('div');
    info.className = 'artwork-info';

    const title = document.createElement('h3');
    title.textContent = obra.titulo;

    const status = document.createElement('span');
    status.className = `artwork-status ${obra.estado}`;
    status.textContent = obra.estado === 'disponible' ? 'Disponible' : obra.estado;

    info.append(title, status);
    wrapper.append(image, info);

    return wrapper;
  }

  async function loadCatalog() {
    if (!window.ARTIST || !ARTIST.catalog || !ARTIST.catalog.url) {
      throw new Error('Artist catalog configuration is missing.');
    }

    const response = await fetch(ARTIST.catalog.url, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Catalog request failed with HTTP ${response.status}.`);
    }

    const rows = parseCsv(await response.text());
    if (!rows.length) return [];

    return rows.slice(1).map(normalizeRow).filter((obra) => obra.archivo);
  }

  function renderCatalog(catalog, selectors) {
    const featuredContainer = document.querySelector(selectors.featured);
    const completeContainer = document.querySelector(selectors.complete);

    if (!featuredContainer || !completeContainer) {
      throw new Error('Gallery containers were not found.');
    }

    featuredContainer.replaceChildren();
    completeContainer.replaceChildren();

    catalog
      .filter((obra) => obra.destacada)
      .forEach((obra, index) => featuredContainer.appendChild(createArtworkCard(obra, index)));

    catalog.forEach((obra, index) => completeContainer.appendChild(createArtworkCard(obra, index)));
  }

  async function mount(selectors) {
    const loading = document.querySelector(selectors.loading);
    const error = document.querySelector(selectors.error);

    try {
      const catalog = await loadCatalog();
      renderCatalog(catalog, selectors);

      if (loading) loading.hidden = true;
      if (error) error.hidden = true;

      document.dispatchEvent(new CustomEvent('gallery:ready', {
        detail: { artist: ARTIST, catalog }
      }));

      return catalog;
    } catch (err) {
      console.error('[Gallery Engine]', err);
      if (loading) loading.hidden = true;
      if (error) {
        error.hidden = false;
        error.textContent = 'No fue posible cargar el catálogo. Verifica la fuente de datos.';
      }
      throw err;
    }
  }

  window.GalleryEngine = {
    loadCatalog,
    renderCatalog,
    mount,
    normalizeRow
  };
})();
