<p align="center">
  <img src="https://raw.githubusercontent.com/siddharthkp/bundlesize/master/logo.png" height="200px"/>
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

Add the path and threshold in your `package.json`


```json
{
  "name": "your cool library",
  "version": "1.1.2",
  "bundlesize": {
    "path": "./dist.js",
    "threshold": "3 Kb"
  }
}
```

&nbsp;

#### build status

Works only with [Travis CI](https://travis-ci.org) for now.

- Enable `Build branch updates` on travis-ci
- [Authorize `bundlesize` for status access](https://github.com/login/oauth/authorize?scope=repo%3Astatus&client_id=6756cb03a8d6528aca5a), copy the token provided.
- Add this token as `github_token` as environment parameter in travis settings

(Ask me for help if you're stuck)


&nbsp;

#### like it?

:star: this repo

&nbsp;

#### todo

- work with other CI tools (circle, appveyor, etc.)
- automate setup (setting env_var)

&nbsp;

#### license

MIT © [siddharthkp](https://github.com/siddharthkp)
