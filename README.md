![](https://img.shields.io/badge/Build%20with%20%E2%9D%A4%EF%B8%8F-at%20Technologiesitftung%20Berlin-blue)

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

The frontend is currently deployed to [Vercel](https://vercel.com/). Pushing to the `main` branch will automatically trigger a new deploy (avoid to push directly to main and rather create pull requests).

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/dnsos"><img src="https://avatars.githubusercontent.com/u/15640196?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Dennis Ostendorf</b></sub></a><br /><a href="https://github.com/technologiestiftung/service-agentinnen/commits?author=dnsos" title="Code">💻</a> <a href="#design-dnsos" title="Design">🎨</a> <a href="#content-dnsos" title="Content">🖋</a> <a href="https://github.com/technologiestiftung/service-agentinnen/commits?author=dnsos" title="Documentation">📖</a></td>
    <td align="center"><a href="https://vogelino.com/"><img src="https://avatars.githubusercontent.com/u/2759340?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Lucas Vogel</b></sub></a><br /><a href="https://github.com/technologiestiftung/service-agentinnen/commits?author=vogelino" title="Code">💻</a> <a href="#design-vogelino" title="Design">🎨</a> <a href="https://github.com/technologiestiftung/service-agentinnen/commits?author=vogelino" title="Documentation">📖</a></td>
    <td align="center"><a href="http://www.awsm.de/"><img src="https://avatars.githubusercontent.com/u/434355?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Ingo Hinterding</b></sub></a><br /><a href="#content-Esshahn" title="Content">🖋</a> <a href="https://github.com/technologiestiftung/service-agentinnen/commits?author=Esshahn" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/julizet"><img src="https://avatars.githubusercontent.com/u/52455010?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Julia Zet</b></sub></a><br /><a href="#content-julizet" title="Content">🖋</a> <a href="https://github.com/technologiestiftung/service-agentinnen/commits?author=julizet" title="Documentation">📖</a></td>
    <td align="center"><a href="https://fabianmoronzirfas.me/"><img src="https://avatars.githubusercontent.com/u/315106?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Fabian Morón Zirfas</b></sub></a><br /><a href="https://github.com/technologiestiftung/service-agentinnen/commits?author=ff6347" title="Code">💻</a> <a href="https://github.com/technologiestiftung/service-agentinnen/commits?author=ff6347" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/lucasoeth"><img src="https://avatars.githubusercontent.com/u/43838158?v=4?s=64" width="64px;" alt=""/><br /><sub><b>lucasoeth</b></sub></a><br /><a href="https://github.com/technologiestiftung/service-agentinnen/commits?author=lucasoeth" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Content Licencing

Texts and content available as [CC BY](https://creativecommons.org/licenses/by/3.0/de/).

## Credits

<table>
  <tr>
    <td>
      <a src="https://citylab-berlin.org/de/start/">
        <br />
        <br />
        <img width="200" src="https://citylab-berlin.org/wp-content/uploads/2021/05/citylab-logo.svg" />
      </a>
    </td>
    <td>
      A project by <a src="https://www.technologiestiftung-berlin.de/">
        <br />
        <br />
        <img width="150" src="https://citylab-berlin.org/wp-content/uploads/2021/05/tsb.svg" />
      </a>
    </td>
    <td>
      Supported by <a src="https://www.berlin.de/rbmskzl/">
        <br />
        <br />
        <img width="80" src="https://citylab-berlin.org/wp-content/uploads/2021/12/B_RBmin_Skzl_Logo_DE_V_PT_RGB-300x200.png" />
      </a>
    </td>
  </tr>
</table>
