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

#### like it?

:star: this repo

&nbsp;

#### license

MIT © [siddharthkp](https://github.com/siddharthkp)
