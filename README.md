# Mini Grid Aranceles (IMCO + El Universal)

Grid de 6 tarjetas en **900×400 px**, 3 tarjetas por renglón, con extracción automática de **og:image** (social card). Construido con **Next.js (App Router)** + **Tailwind**.

## Demo local
```bash
npm i
npm run dev
```

Abre http://localhost:3000

## Despliegue en Vercel
1. Crea un repositorio en GitHub y sube estos archivos.
2. Desde Vercel, **Import Project** → GitHub → selecciona el repo.
3. Framework: Next.js (auto), build command por defecto.
4. Deploy.

## Estructura
```
app/
  api/og-image/route.ts       # Endpoint que extrae og:image / twitter:image
  layout.tsx
  page.tsx                    # Muestra el grid centrado en la pantalla
components/
  MiniGridAranceles.tsx       # El componente con logos y extracción de imágenes
styles/
  globals.css                 # Tailwind base
tailwind.config.ts
postcss.config.js
package.json
next.config.mjs
tsconfig.json
```

## Editar enlaces / items
Abre `components/MiniGridAranceles.tsx` y edita `DEFAULT_ITEMS` o pásale un prop `items` a `<MiniGridAranceles />`.

## Notas
- Si una página no tiene `og:image`, se verá el placeholder + logos de fuente.
- El endpoint usa runtime Node.js para mayor compatibilidad en Vercel.
- Si necesitas versión para **WordPress (sin Next)**, te puedo generar un shortcode PHP con un pequeño proxy para `og:image`.
