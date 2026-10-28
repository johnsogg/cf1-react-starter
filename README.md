# React Starter

A minimal React + TypeScript + Vite project for experimenting. Styling is plain CSS (`src/index.css`, `src/App.css`).

## Getting started

```sh
git clone <this repo's url>
cd cf1-react-starter
npm install
npm run dev     # starts the dev server and opens your browser
```

Edit `src/App.tsx`, save, and the page updates instantly.

## Scripts

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Dev server with hot reload, opens browser |
| `npm run build`   | Type-check and build for production       |
| `npm run preview` | Serve the production build locally        |
| `npm run lint`    | Run ESLint                                |

## VS Code

Open the folder in VS Code and accept the prompt to install the recommended **ESLint** extension. `.vscode/settings.json` turns on format-on-save and ESLint auto-fix, and points VS Code at the project's TypeScript.

## Notes

TypeScript is pinned to 6.0.x because `typescript-eslint` doesn't yet support TypeScript 7.
