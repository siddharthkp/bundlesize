<p align="center">
  <img src="https://cdn.rawgit.com/siddharthkp/bundlesize/master/art/logo.png" height="200px">
  <br><br>
  <b>Keep your bundle size in check</b>
  <br>
</p>

&nbsp;

[![Build Status](https://travis-ci.org/siddharthkp/bundlesize.svg?branch=master)](https://travis-ci.org/siddharthkp/bundlesize)
[![Backers on Open Collective](https://opencollective.com/bundlesize/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/bundlesize/sponsors/badge.svg)](#sponsors) [![Greenkeeper badge](https://badges.greenkeeper.io/siddharthkp/bundlesize.svg)](https://greenkeeper.io/)
[![NPM Version](https://img.shields.io/npm/v/bundlesize.svg)](https://npmjs.org/package/bundlesize)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![Join us on Slack](https://bundlesize.now.sh/badge.svg)](https://bundlesize.now.sh/)

[![NPM Downloads](https://img.shields.io/npm/dm/bundlesize.svg?style=flat)](https://www.npmjs.com/package/bundlesize)
&nbsp;


#### minimal setup

```sh
npm install bundlesize --save-dev
```

&nbsp;

#### usage

Add it to your scripts in `package.json`

```json
"scripts": {
  "test": "bundlesize"
}
```

&nbsp;

Or you can use `npx` with [NPM 5.2+](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).

```sh
npx bundlesize
```

#### configuration

&nbsp;

#### 1) Add the path and maxSize in your `package.json`.
By default the gzipped size is tested. You can use the `compression` option to change this. (`gzip`, `brotli`, or `none`).

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

Example:

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

&nbsp;

#### 2) build status

![build status](https://cdn.rawgit.com/siddharthkp/bundlesize/master/art/status.png)

Currently works for [Travis CI](https://travis-ci.org), [CircleCI](https://circleci.com/), [Wercker](http://www.wercker.com), and [Drone](http://readme.drone.io/).

- [Authorize `bundlesize` for status access](https://github.com/login/oauth/authorize?scope=repo%3Astatus&client_id=6756cb03a8d6528aca5a), copy the token provided.
- Add this token as `BUNDLESIZE_GITHUB_TOKEN` as environment parameter in your CIs project settings.

(Ask me for help if you're stuck)


&nbsp;

#### CLI

example usage:

```sh
bundlesize -f "dist/*.js" -s 20kB
```

For more granular configuration, we recommend configuring it in the `package.json` (documented above).

&nbsp;

#### like it?

:star: this repo

&nbsp;

#### how to contribute?

- [CONTRIBUTING.md](CONTRIBUTING.md)

&nbsp;

#### Featured on [Totally tooling tips](https://www.youtube.com/watch?v=Da6VxdGU2Ig) and [Chrome Dev Summit](https://www.youtube.com/watch?v=_srJ7eHS3IM)!!

<a href="https://www.youtube.com/watch?v=Da6VxdGU2Ig">
  <img height="200px" src="https://i.ytimg.com/vi/Da6VxdGU2Ig/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAAfWzQIMvjH0TIzkAhi-114DIHPQ"/>
</a>
<a href="https://www.youtube.com/watch?v=_srJ7eHS3IM">
  <img height="200px" src="https://cdn.rawgit.com/siddharthkp/bundlesize/master/art/chromedevsummit.png"/>
</a>

&nbsp;

#### who uses bundlesize?

- [bootstrap](https://github.com/twbs/bootstrap)
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
- [micromodal](https://github.com/ghosh/micromodal)
- [unistore](https://github.com/developit/unistore)

&nbsp;

#### TODO

- Work with other CI tools ([AppVeyor](https://www.appveyor.com/), etc.)
- Automate setup (setting env_var)

&nbsp;

#### similar projects

- [BuildSize](https://buildsize.org/) - GitHub App, no manual configuration required
- [travis-weigh-in](https://github.com/danvk/travis-weigh-in) - Uses Python rather than Node.js
- [size-limit](https://github.com/ai/size-limit) - Uses webpack, builds your files for you.

## Contributors

This project exists thanks to all the people who contribute. [[Contribute]](CONTRIBUTING.md).
<a href="graphs/contributors"><img src="https://opencollective.com/bundlesize/contributors.svg?width=890" /></a>

#### license

MIT © [siddharthkp](https://github.com/siddharthkp)
