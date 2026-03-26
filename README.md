```sh
github@marcelrojas:~$prophetch
                  |   github@marcelrojas
        .         |   ------------------
      _/ \_       |   
     (  @  )      |   
      \___/       |   
       | |        |   
      /___\       |   
                  |   
                  |   # Reach me out using...
                  |   ❯ mail -s "Hello from..." contact@marcelrojas.net
                  |   ❯ xdg-open "https://marcelrojas.net"
```

[Alt](https://www.marcelrojas.net)
[Preview](https://www.marcelrojas.workers.dev)

## Project Structure

```text
marcelrojas/www
├── .github/                  # GitHub configuration (FUNDING)
├── public/                   # Static assets (Served directly from the `/` root)
│   ├── fonts/                # Local fonts (GeistMono, Inter, TrajanPro)
│   ├── media/                # Images and videos (Style guides, webp, avif)
│   ├── .assetsignore         # Asset exclusion rules
│   ├── _headers              # Security & caching headers for Cloudflare Pages
│   ├── favicon.svg           # PWA icons and Favicons
│   ├── manifest.webmanifest  # PWA manifest
│   ├── opensearch.xml        # Browser search configuration
│   ├── robots.txt            # SEO indexing rules
│   ├── script.js             # Native global scripts
│   └── sw.js                 # Service Worker (Caching & PWA)
├── src/                      # Astro application source code
│   ├── assets/               # Vite-processed assets (Optimized images, SVG icons)
│   ├── components/           # UI Components (Astro & Svelte)
│   │   ├── decorators/       # Purely visual components (Grain, Halftone, Clock)
│   │   └── structure/        # Structural components (Header, Footer, Head, NavBar)
│   ├── content/              # Content collections (Markdown / MDX)
│   │   ├── showcase/         # Portfolio and work entries
│   │   └── weblog/           # Blog articles
│   ├── data/                 # Pure JSON for static data
│   ├── layouts/              # Master page templates (Main Layout, BlogPost, Error)
│   ├── lib/                  # Isolated JS/TS utilities and functions
│   ├── pages/                # File-based routing (Static pages, RSS, 404)
│   ├── scripts/              # Client-side logic (JSON-LD, Standby, etc.)
│   ├── styles/               # CSS Design System
│   │   ├── global.css        # Resets and global utilities
│   │   └── variables.css     # Atomic design tokens (Design System)
│   └── types/                # TypeScript definitions and global interfaces
├── astro.config.mjs          # Main Astro framework configuration
├── package.json              # Project dependencies and npm/pnpm scripts
├── pnpm-lock.yaml            # Package version lockfile
├── svelte.config.js          # Svelte compiler integration
├── tsconfig.json             # Strict TypeScript configuration
└── wrangler.jsonc            # Deployment configuration for Cloudflare Workers/Assets
```

## Commands

All commands are run from the root of the project, from a terminal:

```text
| Command                        | Action                                           |
| :----------------------------- | :----------------------------------------------- |
| `npm install`                  | Installs dependencies                            |
| `npm run dev`                  | Starts local dev server at `localhost:4321`      |
| `npm run build`                | Build your production site to `./dist/`          |
| `npm run preview`              | Preview your build locally, before deploying     |
| `npm run astro ...`            | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help`      | Get help using the Astro CLI                     |
| `pnpm run build`               | Build command                                    |
| `npx wrangler deploy`          | Deploy command                                   |
| `npx wrangler versions upload` | Version command                                  |
```

## Credit

From me, [Marcel Rojas](https://github.com/marcelrojas/www).
