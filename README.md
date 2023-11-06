# Sports Day Frontend

## Getting Started

### Setup

```bash
npm install
```

### Start dev server

```bash
npm run dev
```

### Deploy

First build the project

```bash
npm build
```

This creates our build in dist folder. This folder can be pushed to any webhosting platform.

## Folder Structure

- **assets** - static assets eg:- images,videos,pdf
- **components** - Stand alone react components
- **pages** - Component corresponding each route
  - **api.js** - hooks for APIs used by the page
- **context** - for housing React.Context eg: AuthContext
- **hooks\*** - Global utility hooks
- **utils.js** - Global utility tools
