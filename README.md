<p align="center">
  <img src="https://raw.githubusercontent.com/siddharthkp/bundlesize/master/art/logo.png" height="200px"/>
  <br><br>
  <b>Keep your bundle size in check</b>
</p>


[![Build Status](https://travis-ci.org/siddharthkp/bundlesize.svg?branch=master)](https://travis-ci.org/siddharthkp/bundlesize)
[![NPM Version](https://img.shields.io/npm/v/bundlesize.svg)](https://npmjs.org/package/bundlesize)


### Minimal Setup
```
npm install bundlesize --save-dev
```


### Usage


Add it to your scripts in `package.json`

```json
"scripts": {
  "test": "bundlesize"
}
```


Or you can use `npx` with [NPM 5.2+](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).

```bash
npx bundlesize
```

### Configuration


#### 1) Add the `path` and gzip `maxSize` in your `package.json`

```json
{
  "name": "your cool library",
  "version": "1.1.2",
  "bundlesize": [
    {
      "path": "./dist.js",
      "maxSize": "3 kB"
    }
  ]
}
```

`bundlesize` also supports [glob patterns](https://github.com/isaacs/node-glob)

**Example:**

```json
"bundlesize": [
  {
    "path": "./dist/vendor-*.js",
    "maxSize": "3 kB"
  },
  {
    "path": "./dist/chunk-*.js",
    "maxSize": "3 kB"
  }
]

```

This makes it great for using with applications that are bundled with another tool. It will match multiple files if necessary and create a new row for each file.


#### 2) Build Status

![build status](https://raw.githubusercontent.com/siddharthkp/bundlesize/master/art/status.png)

Currently works for [Travis CI](https://travis-ci.org), [CircleCI](https://circleci.com/), [Wercker](http://www.wercker.com), and [Drone](http://readme.drone.io/).

- [Authorize `bundlesize` for status access](https://github.com/login/oauth/authorize?scope=repo%3Astatus&client_id=6756cb03a8d6528aca5a), copy the token provided.
- Add this token as `BUNDLESIZE_GITHUB_TOKEN` as environment parameter in your CIs project settings.

(Ask me for help if you're stuck)



### CLI

example usage:

```sh
bundlesize -f dist/*.js -s 20kB
```

For more granular configuration, we recommend configuring it in the `package.json` (documented above).


### Like it?

:star: this repo


### How to contribute?

- [CONTRIBUTING.md](CONTRIBUTING.md)


### Who uses bundlesize?

- [preact](https://github.com/developit/preact)
- [lighthouse](https://github.com/GoogleChrome/lighthouse)
- [styled-components](https://github.com/styled-components/styled-components)
- [emotion](https://github.com/tkh44/emotion)
- [glamorous](https://github.com/paypal/glamorous)
- [Popper.js](https://github.com/FezVrasta/popper.js)
- [react-apollo](https://github.com/apollographql/react-apollo)
- [hyperapp](https://github.com/hyperapp/hyperapp)
- [css-constructor](https://github.com/siddharthkp/css-constructor)
- [redux-saga](https://github.com/redux-saga/redux-saga)



### Todo

- work with other CI tools (circle, appveyor, etc.)
- automate setup (setting env_var)

### License

MIT © [siddharthkp](https://github.com/siddharthkp)
