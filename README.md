# Berlin IoT Hub (Frontend)

This repository contains the frontend of the Berlin IoT Hub of Technologiestiftung Berlin. It is built using [Create React App](https://github.com/facebook/create-react-app) (CRA), TypeScript, [visx](https://airbnb.io/visx/), and [a wrapper for Mapbox GL](https://visgl.github.io/react-map-gl/).

The API for retrieving data can found in a [different repository](https://github.com/technologiestiftung/berlin-datahub-api).

## Getting started

Clone this repository, then on the root level create a file named `.env` and fill in the required values (see `.env.example` for a reference).

Currently we are not calling the actual API in dev mode, so the `.env.development` file (that comes with the repository) redirects API calls to our mock service worker.

Run `npm install` to install all required dependencies and then `npm start` to start developing locally. All available script can be found further down.

## Structure

The folder structure follows CRA's recommendations.

### Views and components

`src/App.tsx` contains the routes/views that are currently available. The views themselves are simply React components that can be found in `src/components`. All other components can be found there as well.

### Requests

Requests to the API are defined in `src/lib/requests.ts` and called in currently three places:

- `src/state/store.ts` (for fetching all projects to be displayed on the homepage)
- `src/components/Project.tsx` (for fetching records of all devices associated with the project)
- `src/components/ProjectPreview.tsx` (for fetching the records of one project device, to be displayed in the project preview)

The requests are constructed following this pattern:

```
{API_URL}/api/{API_VERSION}/route/to/endpoint
```

The API version can be defined in `src/lib/requests.ts`.

### Styling

This project uses [Theme UI](https://theme-ui.com/home) for styling. Main style definitions can be found in `src/style/theme.ts`. The theme can be referenced in every component. For visual consistency, definitions from the theme should be used whenever possible. Information about using the theme can be found in Theme UI's docs.

## Workflow

New features, fixes, etc. should always be developed on a separate branch:

1. In your local repository, checkout the `main` branch.
2. Run `git checkout -b <name-of-your-branch>` to create a new branch (ideally following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) and with a reference ID).
3. Make your changes
4. Push your changes to the remote: `git push -U origin HEAD`
5. Open a pull request.

## Deployment

The frontend is currently deployed to [netlify](https://www.netlify.com/). Pushing to the `main` branch will automatically trigger a new deploy (this should be avoided, if possible).

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) (CRA), the following section originates from CRA's docs, but still applies to this repository.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
