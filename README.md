<p align="center">
  <img src="https://raw.githubusercontent.com/siddharthkp/bundlesize/master/art/logo.png" height="200px"/>
  <br><br>
  <b>Keep your bundle size in check</b>
  <br>
</p>

&nbsp;

[![Build Status](https://travis-ci.org/siddharthkp/bundlesize.svg?branch=master)](https://travis-ci.org/siddharthkp/bundlesize)
[![NPM Version](https://img.shields.io/npm/v/bundlesize.svg)](https://npmjs.org/package/bundlesize)

&nbsp;

#### minimal setup
```
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

#### configuration

&nbsp;

#### 1) Add the path and gzip threshold in your `package.json`


```json
{
  "name": "your cool library",
  "version": "1.1.2",
  "bundlesize": [
    {
      "path": "./dist.js",
      "threshold": "3 Kb"
    }
  ]
}
```

`bundlesize` also supports [glob patterns](https://github.com/isaacs/node-glob)

Example:

```
"path": "./dist/vendor-*.js",
"threshold": "3 Kb"
```

This makes it great for using with applications that are bundled with another tool.

Alternate example:

```
"path": "./dist/chunk-*.js",
"threshold": "3 Kb"
```

This will match multiple files if necessary and create a new row for each file.

&nbsp;

#### 2) build status

![build status](https://raw.githubusercontent.com/siddharthkp/bundlesize/master/art/status.png)

Currently works for [Travis CI](https://travis-ci.org), [CircleCI](https://circleci.com/) and [Wercker](https://www.wercker.com/)

- [Authorize `bundlesize` for status access](https://github.com/login/oauth/authorize?scope=repo%3Astatus&client_id=6756cb03a8d6528aca5a), copy the token provided.
- Add this token as `github_token` as environment parameter in your CIs project settings.
- On travis-ci: Enable `Build branch updates` and `Build pull request updates`. ([screenshot](https://raw.githubusercontent.com/siddharthkp/bundlesize/master/art/travis.png))
- On CircleCi: Enable `GitHub Status updates` in your advanced project settings (this should be enabled by default).

(Ask me for help if you're stuck)


&nbsp;

#### like it?

:star: this repo

&nbsp;

#### how to contribute?

- [CONTRIBUTING.md](CONTRIBUTING.md)

&nbsp;

#### who uses bundlesize?

- [preact](https://github.com/developit/preact)
- [lighthouse](https://github.com/GoogleChrome/lighthouse)
- [styled-components](https://github.com/styled-components/styled-components)
- [emotion](https://github.com/tkh44/emotion)
- [glamorous](https://github.com/paypal/glamorous)
- [Popper.js](https://github.com/FezVrasta/popper.js)
- [react-apollo](https://github.com/apollographql/react-apollo)
- [hyperall](https://github.com/hyperapp/hyperapp)
- [css-constructor](https://github.com/siddharthkp/css-constructor)


&nbsp;

#### todo

- work with other CI tools (appveyor, etc.)
- automate setup (setting env_var)

&nbsp;

#### license

MIT © [siddharthkp](https://github.com/siddharthkp)
