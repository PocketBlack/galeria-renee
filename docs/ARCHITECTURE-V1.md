# Artist Gallery System — Arquitectura V1

## Principio

Una arquitectura base → múltiples artistas → adaptaciones controladas.

## Capas

### 1. Core

Responsable de la experiencia común:

- navegación y estructura de página
- hero
- exposición destacada
- catálogo
- tarjetas de obra
- estados de disponibilidad
- CTA de contacto
- footer

### 2. Artist Configuration

Datos que cambian entre implementaciones:

- nombre
- ubicación
- título
- descripción
- contacto
- WhatsApp
- assets principales
- fuente del catálogo

### 3. Catalog

Modelo inicial observado en Renée:

- título
- archivo de imagen
- tipo/orientación
- estado
- destacada

Evolución posterior posible:

- año
- técnica
- dimensiones
- precio
- descripción
- orden editorial

No incorporar campos hasta que exista una necesidad real.

### 4. Visual Layer

Variables personalizables sin alterar el motor:

- tipografías
- paleta
- hero
- estilo de marcos
- espaciado
- dirección editorial

### 5. Commercial Layer

Responsable de transformar exposición en oportunidad:

- disponibilidad
- consulta
- adquisición
- contacto directo

### 6. Technical Layer

Estándares que deben repetirse en todos los proyectos:

- canonical
- Open Graph
- Twitter/X metadata
- favicon
- HTTPS
- headers
- accesibilidad
- performance
- responsive
- deployment

## Regla de diseño

Si una modificación sirve únicamente para Renée, pertenece a configuración o contenido.

Si una modificación puede beneficiar a cualquier artista, debe evaluarse como parte del Core.

## Próximo objetivo

Extraer `ARTIST CONFIG` del `index.html` sin modificar la experiencia visual. Después se podrá demostrar la arquitectura con un segundo artista ficticio antes de comercializar el sistema.
