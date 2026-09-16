# Artist Configuration Contract V1

Este contrato define qué información debe poder cambiarse sin modificar el motor de galería.

```javascript
const ARTIST = {
  identity: {
    name: "Nombre del artista",
    location: {
      city: "Ciudad",
      country: "País"
    }
  },

  positioning: {
    title: "Título de la experiencia",
    description: "Descripción SEO y comercial"
  },

  contact: {
    whatsapp: "Número internacional",
    message: "Mensaje inicial"
  },

  assets: {
    hero: "hero.jpg",
    og: "og.jpg",
    favicon: "favicon.png"
  },

  catalog: {
    source: "google-sheets",
    url: "URL del CSV publicado"
  }
};
```

## Regla

El motor no debe conocer datos específicos de Renée.

Renée debe ser una instancia de esta configuración.

## No hacer todavía

No mover toda la aplicación a múltiples archivos ni introducir un framework. La primera extracción debe ser pequeña, reversible y demostrable.
