# Mad-Minute

My first angular 2 app and a simple math game for my daughter.

```bash
npm run setup
```

This will install all of the global and local tooling for the project.

## Development

```bash
npm start
```

The server will run on port 5000.

Code / style / view changes are automatically bundled and the page refreshed.

### NPM

NPM manages both our tooling and our application dependencies.

It also provides a host of commands for building, running and testing our application.

### Webpack

Webpack bundles the application based on the app's entry points (bootstrap.ts and vendor.ts).

Based on the each file's dependencies, it pulls in only what is required, including a components template html and styles (which are inlined), along with any other code dependencies.

It also handles all of the production work, including minifcation and cache busting.
