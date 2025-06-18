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

## Usage Example

The builder UI lets you describe optimisation models by entering sets,
parameters, variables and constraints. As a small example you can model a
knapsack instance as follows:

1. **Sets** – add a set called `Items` with members `1-3`.
2. **Parameters** – add `weights[Items]` with values `4,6,8`, `values[Items]`
   with values `10,20,30` and a scalar `total_weight = 30`.
3. **Variables** – add `x[Items]` and choose `Binary` as its type.
4. **Objective** – choose *Maximize* and use the expression builder to create `sum_{i in Items} values[i] * x[i]`.

The **Preview** panel will show the resulting model in LaTeX form.

## Deploy

Push to `main` and GitHub Actions will build and publish the `dist` folder to GitHub Pages.
Pull requests are also built and published under `pr-<number>` for preview.

## TODO
- Switch to BrowserRouter + 404.html redirect for prettier URLs.
- Replace brute-force with WebWorker-offloaded branch-and-bound.
- Add backend (FastAPI + OR-Tools) for larger instances.
- Natural-language → model AST converter feeding the same UI.
