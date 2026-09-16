# Galería Renée — Auditoría Técnica V1

## Objetivo

Convertir la implementación de Renée Figuera en la primera base demostrable del **Artist Gallery System** de NEXOLAB.

## Estado actual

- Sitio estático funcional sobre Netlify.
- Catálogo dinámico alimentado desde Google Sheets publicado como CSV.
- Experiencia visual editorial/premium.
- Conversión directa mediante WhatsApp.
- SEO básico implementado.
- Social metadata implementada, ahora con URLs absolutas para imágenes.

## Hallazgos principales

### P0 — Social preview

Las URLs de Open Graph y Twitter deben ser absolutas y apuntar al dominio canónico. La versión actual usa `https://renee.nexolab.lat/artista-2026.jpg`.

### P0 — Routing

El proyecto no utiliza rutas de aplicación que requieran una SPA fallback. La regla global `/* /index.html 200` fue eliminada en la rama de hardening porque convertía cualquier ruta inexistente en una respuesta HTML 200. Netlify documenta que un redirect con estado 200 es un rewrite y que el fallback global se utiliza principalmente para aplicaciones SPA. 

### P1 — Headers

Se agregó `_headers` con una línea base de seguridad:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

### P1 — Arquitectura

`index.html` concentra estructura, estilos y lógica. Esto es aceptable para el caso base, pero no es todavía una arquitectura reusable.

## Próxima extracción arquitectónica

Separar conceptualmente:

1. **CORE** — componentes y comportamiento reutilizable.
2. **ARTIST CONFIG** — identidad, contacto, ubicación y posicionamiento.
3. **CATALOG** — fuente y estructura de obras.
4. **VISUAL** — hero, tipografía, paleta y dirección artística.
5. **COMMERCIAL** — consulta, disponibilidad y adquisición.
6. **TECHNICAL** — SEO, social metadata, accesibilidad y deployment.

## Criterio de evolución

No reconstruir Renée desde cero. Extraer progresivamente lo que ya funciona y convertirlo en una arquitectura capaz de recibir un segundo artista sin duplicar todo el proyecto.

## Estado de esta auditoría

Rama: `hardening/v1-1`

Objetivo de la rama: endurecimiento técnico V1.1 antes de iniciar la extracción del motor reutilizable.
