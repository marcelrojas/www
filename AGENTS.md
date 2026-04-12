# Project Context

## General Development Instructions
- Always prioritize clean, highly readable, and modular code.
- Enforce strict accessibility (a11y) and usability in all UI components. Ensure proper ARIA attributes, semantic HTML, and full keyboard navigation.
- Use `pnpm` exclusively for all package management and script execution. Do not use `npm` or `yarn`.

## Architecture & Stack
- **Core Framework:** Astro.
- **Language:** TypeScript. Enforce strict type checking and avoid `any`.
- **Styling:** CSS.
- **Deployment Target:** Cloudflare Workers and Cloudflare Pages. Ensure all backend logic is optimized for edge runtimes.

## Component-Specific Style Guides
# The CLI allows you to use the @ syntax to import specific Markdown files 
# for different parts of your codebase, keeping the root file clean:
@./docs/accessibility-checklist.md
