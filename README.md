Make sure you have `cordova` and `adb` installed, and a phone or an emulator hooked up and available through `adb`.

To test this:
```
npm install
npm start
```

# Fonts

*`.woff` is sufficient for modern builds of Firefox/Chrome/Safari, as well as webview on Android 4.4, but **not** on Android 4.2 (see [caniuse](http://caniuse.com/#search=woff)).
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
