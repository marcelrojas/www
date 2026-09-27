# Arquitectura Frontend y Design Tokens de Apple
A continuación, se presenta el desglose estructurado sobre la ingeniería detrás de las interfaces web de Apple (apple.com, developer.apple.com, apps.apple.com), recopilado para proceder con el desarrollo del sistema de siseño y componentes interactivos.

## 1. Ingeniería Inversa de los Design Tokens
El análisis de las metodologías de Apple Marcom (Interactive Experiences) revela un sistema de diseño estrictamente cerrado pero deductivamente brillante, enfocado en el rendimiento y la precisión geométrica:

Sistema Tipográfico Híbrido: * Textos de Exhibición (Hero/H1): Emplean matemáticas fluidas (clamp()) para que la tipografía escale dinámicamente con el viewport, usando siempre unidades rem por accesibilidad.

Textos de Cuerpo (Body): Utilizan escalado discreto a través de breakpoints fijos. Evitan los valores fraccionados para garantizar que los párrafos mantengan un renderizado nítido de los píxeles.

Tracking Dinámico: El espacio entre letras se vuelve más negativo a medida que la fuente crece para mantener la cohesión óptica.

Gestión de Variables: Siguen la separación semántica del W3C (Tokens Primitivos vs. Semánticos) y aplican un scoping local agresivo a nivel de componente para evitar la cascada accidental de estilos.

Integración Nivel-Hardware: Implementan llamadas directas a las tipografías del sistema (SF Pro) y emplean propiedades CSS indocumentadas (como -apple-system-glass-material) para delegar el difuminado acrílico al motor gráfico nativo del sistema operativo.

## 2. Estructuración del Sistema (JSON a CSS)
Se diseñó un modelo práctico para replicar este sistema en entornos modernos:

Single Source of Truth: Se estructuró un archivo tokens.json que emula la arquitectura de Apple, separando la paleta de colores base y las definiciones tipográficas fluidas/discretas.

Compilación y Herramientas: Se planteó el flujo de trabajo utilizando Style Dictionary (gestionado eficientemente vía pnpm) para transformar el JSON en variables CSS utilizables, garantizando la inyección de código limpio y el cumplimiento de estándares de usabilidad (A11y) y contraste WCAG.

## 3. Arquitectura Profunda de CSS Custom Properties
Se profundizó en cómo Apple manipula el DOM para lograr una fluidez visual extrema (cercana a los 60/120Hz) evitando el Layout Thrashing:

El Fin del :root Monolítico: En lugar de saturar el documento global, las variables de tema (como luz/oscuridad) se reasignan exclusivamente dentro de las capas contextuales o selectores específicos de cada módulo.

Animaciones por Composición: Las interacciones vinculadas al scroll no animan las propiedades CSS tradicionales. En su lugar, un observador en JavaScript actualiza una única variable local (ej. --scroll-progress), permitiendo que CSS procese matemáticamente transformaciones aceleradas por GPU (transform, opacity).

Diseño Espacial Matemático: Uso intensivo de calc(), min(), max() y clamp() combinados con variables locales para crear layouts adaptativos sin depender excesivamente de Media Queries. Se recomendó el uso de herramientas como Lightning CSS para procesar esta sintaxis moderna.
