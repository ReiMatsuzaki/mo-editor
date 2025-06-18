# MO Editor

This project is a lightweight optimisation model editor built with React 18, Vite and TypeScript. It runs entirely in the browser and can be deployed to GitHub Pages.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

Push to `main` and GitHub Actions will build and publish the `dist` folder to GitHub Pages.

## TODO
- Switch to BrowserRouter + 404.html redirect for prettier URLs.
- Replace brute-force with WebWorker-offloaded branch-and-bound.
- Add backend (FastAPI + OR-Tools) for larger instances.
- Natural-language → model AST converter feeding the same UI.
