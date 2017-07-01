<p align="center">
  <img src="https://raw.githubusercontent.com/siddharthkp/bundlesize/master/art/logo.png" height="200px"/>
  <br><br>
  <b>Keep your bundle size in check</b>
  <br>
</p>

&nbsp;

[![Build Status](https://travis-ci.org/siddharthkp/bundlesize.svg?branch=master)](https://travis-ci.org/siddharthkp/bundlesize)

&nbsp;

#### minimal setup
```
npm install bundlesize --save
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

1) Add the path and threshold in your `package.json`


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

&nbsp;

2) build status

![build status](https://raw.githubusercontent.com/siddharthkp/bundlesize/master/art/status.png)

Currently works for [Travis CI](https://travis-ci.org) and [CircleCI](https://circleci.com/).

- [Authorize `bundlesize` for status access](https://github.com/login/oauth/authorize?scope=repo%3Astatus&client_id=6756cb03a8d6528aca5a), copy the token provided.
- Add this token as `github_token` as environment parameter in your CIs project settings.
- On travis-ci: Enable `Build branch updates` and `Build pull request updates`. ([screenshot](https://raw.githubusercontent.com/siddharthkp/bundlesize/master/art/travis.png))
- On CircleCi: Enable `GitHub Status updates` in your advanced project settings (this should be enabled by default).

(Ask me for help if you're stuck)


&nbsp;

#### like it?

:star: this repo

&nbsp;

#### who uses bundlesize?

- [styled-components](https://github.com/styled-components/styled-components)
- [emotion](https://github.com/tkh44/emotion)
- [glamorous](https://github.com/paypal/glamorous)
- [css-constructor](https://github.com/siddharthkp/css-constructor)
- [Popper.js](https://github.com/FezVrasta/popper.js)

&nbsp;

#### todo

- work with other CI tools (circle, appveyor, etc.)
- automate setup (setting env_var)

&nbsp;

#### license

MIT © [siddharthkp](https://github.com/siddharthkp)
