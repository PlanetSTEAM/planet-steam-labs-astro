# Planet STEAM Labs — Astro

Portada y catálogo de servicios en un solo proyecto Astro + TypeScript + Tailwind. Implementación independiente; conserva la web HTML original.

## Ejecutar

Requiere Node.js 22.12 o posterior (CI usa Node 24).

```powershell
npm ci
npm run dev
```

Abrir http://127.0.0.1:8092/ . La telemetría de Astro se desactiva para estos comandos sin modificar la configuración global.

```powershell
npm run verify
npm run preview
```

La exportación de producción usa `/planet-steam-labs-astro/`; su preview está en http://127.0.0.1:8092/planet-steam-labs-astro/ . Detener `dev` antes de iniciar `preview` si usan el mismo puerto.

## URLs

- Original: https://planetsteam.github.io/planet-steam-labs/
- Astro: https://planetsteam.github.io/planet-steam-labs-astro/
- Comparación publicada: https://planetsteam.github.io/planet-steam-labs-astro/comparar/
- Comparación local de desarrollo: http://127.0.0.1:8092/comparar/

## Estructura

- `src/components/`: Hero, Services, Business, Enterprise, Product, Portfolio, Team y Contact.
- `src/layouts/SiteLayout.astro`: documento, metadatos y scripts.
- `src/scripts/interactions.ts`: fichas por ancla y consulta preparada con el stack elegido.
- `src/styles/global.css`: estilos de marca y utilidades Tailwind. Se conserva el diseño y se evita un reset accidental.
- `public/assets/logos/`: PNG y fuentes de los logos.
- `scripts/verify-build.mjs`: valida las 53 fichas, IDs, anclas y assets de producción.
- `.github/workflows/pages.yml`: comprobación y publicación estática en GitHub Pages.

## Alcance

18 Quick, 30 Business y 5 Enterprise; las propuestas del catálogo no equivalen a productos implementados. Formulario con nombre, correo y proceso obligatorios; prepara un enlace `mailto:` y requiere una aplicación de correo configurada. No existe backend de formularios ni envío automático.

Astro genera HTML estático. TypeScript tipa las interacciones; Tailwind se compila con Vite y convive con CSS específico para conservar el diseño. La página de comparación tiene `noindex` y utiliza la web original pública en el build.

## Publicar

Los pushes a `main` ejecutan `npm ci`, `npm run verify` y el despliegue de `dist` mediante GitHub Pages. No hacen cambios en el repositorio del sitio original. No subir `.env`, dependencias ni `dist`; el workflow genera la salida.
