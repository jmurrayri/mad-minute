# AngularProjectTemplateNG2

This is a basic UI-only template that provides a quick start-up for an opinionated Angular 2 project.

It assumes you are running a REST service at any known location, but lets the UI developer run completely alone with his/her own Webpack dev server.

See the reference project [here](https://github.com/AngularClass/angular2-webpack-starter).

## Tooling / Tech Stack

1. [NPM](https://www.npmjs.com/)
1. [Webpack](https://webpack.github.io/)
1. [JSON-Server](https://www.npmjs.com/package/json-server)
1. [Wallaby.js](http://wallabyjs.com/)
1. [Protractor](https://angular.github.io/protractor/)
1. [TypeScript](http://www.typescriptlang.org/)
1. [Angular 2](https://angular.io)
1. [ES6](http://es6-features.org/)

## Setup

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

### Testing

The project currently uses [Wallaby.js](http://wallabyjs.com/)

The site includes setup instructions for various IDE's, including [WebStorm](http://wallabyjs.com/docs/intro/get-started-jetbrains.html)
and [VS Code](http://wallabyjs.com/docs/intro/get-started-vscode.html).

For Example, to start Wallaby.js in VS Code, simply use
```
Ctrl/Cmd + Shift + R
```

## Production

```bash
npm run prod
```

This will do all your production work, like minification, cache busting, etc.

> Note: We are retaining source maps, as they only incur a cost when the inspector is open.

## TODO

1. Add a Wallaby.js alternative for unit testing (it costs $$)
1. [Prod improvement for cache busting](https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.sxr9tyjjt)

# Breakdown

* [File Structure](#file-structure)
* [Tooling](#tooling)
* [Tech Stack](#tech-stack)

## File Structure

```
root/
 ├── apiMockData/
 │   └── db.json
 ├── e2e/
 │   └── (feature folders of scenarios)/
 ├── www/
 │   ├── (feature)/
 │   │   ├── *.html
 │   │   ├── *.scss
 │   │   ├── *.ts
 │   │   └── *.tests.ts
 │   └── (root app files)
 └── (all tooling configuration)
```

> `apiMockData` allows us to develop the frontend independent of the backend  
> `apiMockData/db.json` "database" for our mock API service  
> `e2e` end-to-end testing scenarios  
> `www` our web application  
> `www/(root app files)` all of the root files needed to bootstrap the app, including the index.html, config.ts, bootstrap.ts and vendor.ts  
> `www/(feature)` all of the pieces related to a feature, including the template, style, tests, models, services, etc.  
> `(tooling)` all of the tooling configuration files used to build and test the app

## Tooling

> `WHY U NO BOWER?!!` The latest versions of NPM now enforce manual resolution of peer dependency version conflicts.
> `Where's my big gulp?!` Between NPM and Webpack, this project currently has no need for gulp / grunt. See below...

### NPM

NPM manages both our tooling and our application dependencies.

It also provides a host of commands for building, running and testing our application.

### Webpack

Webpack bundles the application based on the app's entry points (bootstrap.ts and vendor.ts).

Based on the each file's dependencies, it pulls in only what is required, including a components template html and styles (which are inlined), along with any other code dependencies.

It also handles all of the production work, including minifcation and cache busting.

### JSON-Server

JSON-Server allows us to mock our API and develop the frontend independently of any backend work.

### Wallaby.js

Wallaby.js handles unit testing, running Jasmine under the hood and integrates with Webpack. What makes this IDE plugin special, is that it provides integrated visual feedback about which tests are passing/failing as well as code test coverage... all in real-time! So you see the tests passing or failing as you are writing code!! It almost makes testing fun. Seriously! Just try it and stop laughing...

> The only drawback is, it costs $$... so we may need to fallback on the underlying testing frameworks directly. :(

### Protractor

Protractor provides end-to-end testing for Angular applications.

## Tech Stack

### Angular 2

Angular 2 is seriously the bee's knees. Check out https://angular.io/ - including the tutorial and cheatsheet.

### ES6

The latest and greatest for JS. Check out http://es6-features.org/ to see all the new features they added.

### TypeScript

All the goodness of ES6 plus types! Also, Angular 2 was written in TS, so there's almost no reason NOT to use it.

> With both TS and ES6, .NET guys are gonna love JS development!
