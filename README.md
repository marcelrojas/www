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

[Preview](https://www.marcelrojas.workers.dev)

## Project Structure

```text
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   ├── data/
│   ├── layouts/
│   ├── libs/
│   ├── pages/
│   ├── scripts/
│   ├── styles/
│   └── types/
├── astro.config.mjs
├── README.md // what you are seeing
├── package.json
├── tsconfig.json
├── vercel.json // from previous host
└── wrangler.jsonc // current host
```

## Commands

All commands are run from the root of the project, from a terminal:

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

## Credit

From me, [Marcel Rojas](https://github.com/marcelrojas/www/).
