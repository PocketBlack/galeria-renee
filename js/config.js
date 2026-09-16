// Artist Gallery System — V1
// Artist-specific configuration. Core rendering should not depend on Renée-specific values.

const ARTIST = {
  identity: {
    name: 'Renée Figuera',
    location: {
      city: 'San Carlos',
      country: 'Uruguay'
    }
  },

  positioning: {
    title: 'Galería de Arte Digital Premium',
    description: 'Explora la colección oficial de Renée Figuera. Obras originales en óleo sobre lienzo, exposiciones exclusivas y adquisición directa de arte premium.'
  },

  contact: {
    whatsapp: '598091261846',
    message: 'Hola Renée, vi tu galería y me gustaría consultar por una obra.'
  },

  assets: {
    hero: 'hero-arte.jpg',
    og: 'artista-2026.jpg',
    favicon: 'favicon.png'
  },

  catalog: {
    source: 'google-sheets',
    medium: 'Óleo sobre lienzo',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRX-af1gvV0QIMY0u3oHIkAmQjR-KCvEE9-S946QsvanhblkMA4zJ8kvhttBFsfKWW83vsSg85xGmWV/pub?output=csv'
  }
};
