# Stadtpuls (Frontend)

This repository contains the frontend of the platform *Stadtpuls* of Technologiestiftung Berlin. It is built using [Next.js](https://nextjs.org/), TypeScript, [visx](https://airbnb.io/visx/), and [a wrapper for Mapbox GL](https://visgl.github.io/react-map-gl/).

The API for authenticating and posting from external sources (e.g. The Things Network) can found in a [different repository](https://github.com/technologiestiftung/stadtpuls-api).

## Getting started

Clone this repository, then on the root level create a file named `.env` or `.env.development.local` and fill in the required values (see `.env.example` for a reference).

The actual API is mocked in dev mode using a [Mock Service Worker (msw)](https://mswjs.io/).

Run `npm install` to install all required dependencies and then `npm run dev` to start developing locally. All available script can be found further down.

### Quality management

We use husky and lint-staged to run some quality management script before each commits. These scripts are:
- Lint all js files
- Type-check changed typescript files
- Run tests concerned by changed files

To enable type checking of only staged files, a script has been added `scripts/tsc-lint.sh`. To allow this script to run, you might need to give it the relevant permissions. Run `chmod +x scripts/tsc-lint.sh`. The script is needed because there is otherwise no way to run `tsc` only on staged files. Typescript only allows for either a list of files or a `tsconfig.json`. 

## Structure

The folder structure follows Next.js's recommendations.

### Views and components

Page routing is achieved with Next.js's [file-system routing](https://nextjs.org/docs/routing/introduction). The views themselves are simply React components that can be found in `src/components`. All other components can be found there as well.

### Storybook

We use [Storybook](https://storybook.js.org/) to create and test our React components in isolation.
We also use the [storyshots addon](https://storybook.js.org/docs/react/workflows/snapshot-testing#gatsby-focus-wrapper) to create test snapshots.

### Testing

We use [jest](https://jestjs.io/) to unit test our code. We also use a [testing-library](https://testing-library.com/) to test our react components, user events, and other things.

To run the tests enter:
```sh
npm t
```

Or in watch mode:
```sh
nom run test:watch
```

### Requests

Requests to the Supabase API and [our custom API](https://github.com/technologiestiftung/stadtpuls-api) are defined in various request utility functions located in `src/lib/requests/` and `src/lib/hooks/`.

### Styling

For styling we use [TailwindCSS](https://tailwindcss.com/). Configuration can be found in `tailwind.config.js`.

## Workflow

New features, fixes, etc. should always be developed on a separate branch:

1. In your local repository, checkout the `main` branch.
2. Run `git checkout -b <name-of-your-branch>` to create a new branch (ideally following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) and with a reference ID).
3. Make your changes
4. Push your changes to the remote: `git push -U origin HEAD`
5. Open a pull request.

You can commit using the `npm run cm` command to ensure your commits follow our conventions.

## Deployment

The frontend is currently deployed to [Vercel](https://vercel.com/). Pushing to the `main` branch will automatically trigger a new deploy (this should be avoided, if possible).
