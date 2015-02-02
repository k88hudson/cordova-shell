## What does this app cover (so far)?

### Mobile Web App with React
* Views/Components with React + es6
* Routing via react-router (hash-based, but will also work with push-state)
* Configurable page transitions via custom `Animation` mixin and `Link` component
* Styles and component style bundling with less
* Fira sans and icons via Ionicons

### Mobile/Android 4.2 optimizations
* Custom `Click` component based on fastclick to normalize/speed up touch events
* CSS transitions optimized for hardware acceleration and performance
* Interaction states, form element css with (1) technically optimized transitions and (2) design choices that give the illusion of better responsiveness
* no raster images; svg images only (<10kb for all images total)

### Device integration
* npm scripts for grabbing/building dependencies, building on device, and development workflow
* Cordova bootstraping
* Example of device integration with camera
# mock cordova.js for web-app testing
* TODO: icon build step for android/ios/firefox os

### Development optimizations
* gulp task for compiling assets
* fast file watching with ~100ms re-builds
* dev server with optimized livereload + fallback for push-state routing
* source maps for css/js
* jscs, jshint

### Production optimizations
* webpack production-optimized build task
* icon font subsetting to dramatically reduce file size
* TODO: css minification

### Tests
* browserify/webpack size comparison
* TODO: example unit tests
* TODO: smoke tests with phantomjs

### TODO:
* travis deployment configuration
* app configuration
* docs

## Web dev setup

```
npm install
gulp dev
```

## Cordova setup

Make sure you have `cordova` and `adb` installed, and a phone or an emulator hooked up and available through `adb`.

```
npm install
npm start
```

# Why Webpack?

I've seen a number of other React-based projects using Webpack lately, so I decided to give it a try. These are my findings:

* I was able to get external sourcemaps, production optimization (uglify etc.) and gulp integration working pretty much immediately with es6 and jsx 'loaders' (the webpack version of transforms). These are all things I have spent considerable time figuring out how to do properly with browserify.
* When comparing the output of my browserify + uglify strategy against the production optimizations built with webpack, the browserify output is about 30kb larger. You can test this yourself by running `npm test`. There are probably further optimizations I can do with uglify, but this is where I'm at so far:
```
BROWSERIFY      256.625kb
WEBPACK         227.051kb
```
* A big downside of webpack is that loaders cannot be specified for dependencies; the app developer has to manage all loader configuration. This could end up being a problem for some dependencies we need to use

# Fonts

* `.woff` is sufficient for modern builds of Firefox/Chrome/Safari, as well as webview on Android 4.4, but **not** on Android 4.2 (see [caniuse](http://caniuse.com/#search=woff)).
* for Android 4.2 we need to use `.ttf`.

# Icons

The icons in this app are a subset generated from [Ionicons](http://ionicons.com). This is done via a fork (see https://github.com/k88hudson/ionicons), and installed via npm.

To add or remove icons simply make a pull request against [k88hudson/ionicons](see https://github.com/k88hudson/ionicons) to move icons from the `src` directory to the `src_subset` directory and re-run build. Only icons in the `src_subset` directory get included in the build.

As a result, the total file sizes are as follows (unminified):
```
ionicons.css        5.7kb
ionicons.ttf        7.1kb (for Android 4.2)
ionicons.woff       4.5kb (for Chrome/Firefox)
```
v.s. ionicons unsubsetted (unminified)
```
ionicons.css        57.2kb
ionicons.ttf        188.5kb (for Android 4.2)
ionicons.woff       67.9kb (for Chrome/Firefox)
```
v.s. fontawesome unsubsetted (unminified)
```
fontawesome.css     28.747 kb
fontawesome.ttf     122.092 kb
fontawesome.woff    71.508 kb
```

Note that `ionicons.css` is not actually used on its own, but rather bundled and minified in `style.less`.


# Structure

#### Primary content (`src/`, `www/`)
```bash
- src/
    - components/
    # This is where you add react components and any less associated with them
    # You should create a folder per component
    # Use uppercase (e.g. Click) for files that export a single component,
    #  and lowercase for files that export an object of many components
        - {ComponentName}/
            - {ComponentName}.js
            - {ComponentName}.less
        - ...
    - less/
    # This is for less files that aren't directly associated with a component or view
        - variables.less
        - ...
    - lib/
    # This is for js files that aren't directly associated with a component or view
        - router.js
        - ...
    - mixins/
    # React mixins
        - Animations.js
        - ...
    - views/
    # This is for view components (i.e. routes) and associated styles
    # You should create a folder per view. Use uppercase
        - {ViewName}/
            - {ViewName}.js
            - {ViewName}.less
        - ...
    - index.js
    - index.less
- www/
# This is for static files and compiled bundles
    - compiled/
    # Don't touch this folder - it is where compiled less/css goes
    - img/
    # Image assets
        ...
    - cordova.js
    # This is a mock or shim for any device apis provided by cordova.js
    # It is only included on web apps (cordova overwrites it)
    - index.html
    # This is the base html page.
```

#### Supporting content ( `_docs/`, 'tasks/', `test/`)

```bash
- _docs
# This is where docs will go.
# More work needs to be done here.
# Should be linked from README.md and be formatted for gitbook
- tasks/
# These are build tasks and utilities.
- test/
# Unit tests to be run with mocha
# More work needs to be done here.
```

#### Built/gitignored content (`node_modules/`, `platforms/`, `plugins/`)

```bash
- node_modules/
# Node/js dependencies via npm
- platforms/
# This contains assets for cordova
- plugins/
# This contains assets for cordova
```
