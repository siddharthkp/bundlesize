<p align="center">
  <img src="https://raw.githubusercontent.com/siddharthkp/libsize/master/logo.png" height="200px"/>
  <br><br>
  <b>Keep your library size in check</b>
  <br>
</p>

&nbsp;

[![Build Status](https://travis-ci.org/siddharthkp/libsize.svg?branch=master)](https://travis-ci.org/siddharthkp/libsize)

&nbsp;

#### minimal setup
```
npm install libsize --save
```

&nbsp;

#### usage


Add it to your scripts in `package.json`

```json
"scripts": {
  "test": "libsize"
}
```

&nbsp;

#### configuration

Add the path and threshold in your `package.json`


```json
{
  "name": "your cool library",
  "version": "1.1.2",
  "libsize": {
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
