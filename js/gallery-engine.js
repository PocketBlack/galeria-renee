// Artist Gallery System — Gallery Engine V1
// Reusable catalog loading, normalization and rendering layer.
// Presentation contract intentionally matches the existing Renée gallery.

(function () {
  'use strict';

  const DEFAULT_SELECTORS = {
    featured: '#carousel-destacados',
    complete: '#grilla-completa',
    loading: '#gallery-loading',
    error: '#gallery-error'
  };

  function normalizeBoolean(value) {
    const normalized = String(value ?? '').trim().toLowerCase();
    return normalized === 'true' || normalized === 'verdadero' || normalized === '1' || normalized === 'si';
  }

  function normalizeToken(value, fallback) {
    const token = String(value ?? '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9_-]/g, '-');

    return token || fallback;
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
      titulo: String(columns[0] || 'Obra sin título').trim(),
      archivo: String(columns[1] || '').trim(),
      tipo: normalizeToken(columns[2], 'v'),
      estado: normalizeToken(columns[3], 'disponible'),
      destacada: normalizeBoolean(columns[4])
    };
  }

  function getOrientationClass(tipo) {
    return tipo === 'h' || tipo === 'horizontal'
      ? 'horizontal-frame'
      : 'vertical-frame';
  }

  function getStatusLabel(status) {
    const labels = {
      disponible: 'Disponible',
      reservada: 'Reservada',
      reservado: 'Reservado',
      vendida: 'Vendida',
      vendido: 'Vendido'
    };

    return labels[status] || status.replace(/[-_]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function buildWhatsAppUrl(obra) {
    const contact = typeof ARTIST !== 'undefined' ? ARTIST.contact : null;
    if (!contact || !contact.whatsapp) return '';

    const baseMessage = contact.message || 'Hola, me gustaría consultar por una obra.';
    const message = `${baseMessage} Obra: ${obra.titulo}`;
    return `https://wa.me/${String(contact.whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
  }

  function createArtworkCard(obra, index) {
    const wrapper = document.createElement('a');
    wrapper.className = 'art-frame-wrapper';
    wrapper.dataset.index = String(index);
    wrapper.dataset.status = obra.estado;
    wrapper.setAttribute('aria-label', `Consultar por ${obra.titulo}`);

    const whatsappUrl = buildWhatsAppUrl(obra);
    if (whatsappUrl) {
      wrapper.href = whatsappUrl;
      wrapper.target = '_blank';
      wrapper.rel = 'noopener noreferrer';
    } else {
      wrapper.href = '#';
    }

    const frame = document.createElement('div');
    frame.className = `art-frame ${getOrientationClass(obra.tipo)}`;

    const image = document.createElement('img');
    image.src = obra.archivo;
    image.alt = obra.titulo;
    image.loading = index < 4 ? 'eager' : 'lazy';
    image.decoding = 'async';

    const info = document.createElement('div');
    info.className = 'art-info';

    const title = document.createElement('h3');
    title.textContent = obra.titulo;

    const description = document.createElement('p');
    const medium = typeof ARTIST !== 'undefined' && ARTIST.catalog
      ? ARTIST.catalog.medium
      : '';
    description.textContent = medium || 'Obra original';

    const status = document.createElement('span');
    status.className = `status-badge ${obra.estado}`;
    status.textContent = getStatusLabel(obra.estado);

    frame.appendChild(image);
    info.append(title, description, status);
    wrapper.append(frame, info);

    return wrapper;
  }

  async function loadCatalog() {
    if (typeof ARTIST === 'undefined' || !ARTIST.catalog || !ARTIST.catalog.url) {
      throw new Error('Artist catalog configuration is missing.');
    }

    const response = await fetch(ARTIST.catalog.url, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Catalog request failed with HTTP ${response.status}.`);
    }

    const rows = parseCsv(await response.text());
    if (!rows.length) return [];

    return rows
      .slice(1)
      .map(normalizeRow)
      .filter((obra) => obra.archivo);
  }

  function renderCatalog(catalog, selectors = DEFAULT_SELECTORS) {
    const featuredContainer = document.querySelector(selectors.featured);
    const completeContainer = document.querySelector(selectors.complete);

    if (!featuredContainer || !completeContainer) {
      throw new Error('Gallery containers were not found.');
    }

    featuredContainer.replaceChildren();
    completeContainer.replaceChildren();

    const featured = catalog.filter((obra) => obra.destacada);
    const complete = catalog.filter((obra) => !obra.destacada);

    featured.forEach((obra, index) => {
      featuredContainer.appendChild(createArtworkCard(obra, index));
    });

    complete.forEach((obra, index) => {
      completeContainer.appendChild(createArtworkCard(obra, index));
    });

    return { featured, complete };
  }

  async function mount(selectors = DEFAULT_SELECTORS) {
    const loading = selectors.loading ? document.querySelector(selectors.loading) : null;
    const error = selectors.error ? document.querySelector(selectors.error) : null;

    try {
      const catalog = await loadCatalog();
      const rendered = renderCatalog(catalog, selectors);

      if (loading) loading.hidden = true;
      if (error) error.hidden = true;

      document.dispatchEvent(new CustomEvent('gallery:ready', {
        detail: {
          artist: ARTIST,
          catalog,
          featured: rendered.featured,
          complete: rendered.complete
        }
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
    normalizeRow,
    createArtworkCard
  };
})();
