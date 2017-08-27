<p align="center">
  <img src="https://raw.githubusercontent.com/siddharthkp/bundlesize/master/art/logo.png" height="200px"/>
  <br><br>
  <b>Keep your bundle size in check</b>
  <br>
</p>

&nbsp;
[![All Contributors](https://img.shields.io/badge/all_contributors-20-orange.svg?style=flat-square)](#contributors)
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

Or you can use `npx` with [NPM 5.2+](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).

```bash
npx bundlesize
```

#### configuration

&nbsp;

#### 1) Add the path and gzip maxSize in your `package.json`


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

```
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

![build status](https://raw.githubusercontent.com/siddharthkp/bundlesize/master/art/status.png)

Currently works for [Travis CI](https://travis-ci.org), [CircleCI](https://circleci.com/), [Wercker](http://www.wercker.com), and [Drone](http://readme.drone.io/).

- [Authorize `bundlesize` for status access](https://github.com/login/oauth/authorize?scope=repo%3Astatus&client_id=6756cb03a8d6528aca5a), copy the token provided.
- Add this token as `BUNDLESIZE_GITHUB_TOKEN` as environment parameter in your CIs project settings.

(Ask me for help if you're stuck)


&nbsp;

#### CLI

example usage:

```sh
bundlesize -f dist/*.js -s 20kB
```

For more granular configuration, we recommend configuring it in the `package.json` (documented above).

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
- [hyperapp](https://github.com/hyperapp/hyperapp)
- [css-constructor](https://github.com/siddharthkp/css-constructor)
- [redux-saga](https://github.com/redux-saga/redux-saga)


&nbsp;

#### todo

- work with other CI tools (circle, appveyor, etc.)
- automate setup (setting env_var)

&nbsp;

#### license

MIT © [siddharthkp](https://github.com/siddharthkp)

#### sponsor

[![Sponsor](https://app.codesponsor.io/embed/LhLT2c31ydJzdLUuSR9f8mCA/siddharthkp/bundlesize.svg)](https://app.codesponsor.io/link/LhLT2c31ydJzdLUuSR9f8mCA/siddharthkp/bundlesize)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars0.githubusercontent.com/u/1863771?v=4" width="100px;"/><br /><sub>Siddharth Kshetrapal</sub>](https://github.com/siddharthkp)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=siddharthkp "Code") | [<img src="https://avatars0.githubusercontent.com/u/1051509?v=4" width="100px;"/><br /><sub>Sara Vieira</sub>](http://iamsaravieira.com)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=SaraVieira "Code") | [<img src="https://avatars0.githubusercontent.com/u/639255?v=4" width="100px;"/><br /><sub>Chris Montoro</sub>](https://github.com/montmanu)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=montmanu "Code") | [<img src="https://avatars2.githubusercontent.com/u/9800850?v=4" width="100px;"/><br /><sub>Mateusz Burzyński</sub>](https://github.com/Andarist)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=Andarist "Code") | [<img src="https://avatars2.githubusercontent.com/u/5382443?v=4" width="100px;"/><br /><sub>Federico Zivolo</sub>](https://fezvrasta.github.io)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=FezVrasta "Code") | [<img src="https://avatars1.githubusercontent.com/u/1401513?v=4" width="100px;"/><br /><sub>Masaaki Morishita</sub>](http://morishitter.github.io)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=morishitter "Code") | [<img src="https://avatars2.githubusercontent.com/u/11544418?v=4" width="100px;"/><br /><sub>Simon Legg</sub>](https://github.com/leggsimon)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=leggsimon "Code") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars3.githubusercontent.com/u/16456651?v=4" width="100px;"/><br /><sub>Sangboak Lee</sub>](https://github.com/echo304)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=echo304 "Code") | [<img src="https://avatars2.githubusercontent.com/u/4967600?v=4" width="100px;"/><br /><sub>James Baxley</sub>](https://meteor.io)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=jbaxleyiii "Code") | [<img src="https://avatars3.githubusercontent.com/u/1824298?v=4" width="100px;"/><br /><sub>Karan Thakkar</sub>](https://twitter.com/geekykaran)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=karanjthakkar "Code") | [<img src="https://avatars0.githubusercontent.com/u/1116738?v=4" width="100px;"/><br /><sub>Dany Shaanan</sub>](https://danyshaanan.com)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=danyshaanan "Code") | [<img src="https://avatars0.githubusercontent.com/u/3415488?v=4" width="100px;"/><br /><sub>Anup</sub>](https://twitter.com/_reznord)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=reznord "Code") | [<img src="https://avatars3.githubusercontent.com/u/5569608?v=4" width="100px;"/><br /><sub>Fidan Hakaj</sub>](https://www.linkedin.com/in/fidan-hakaj)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=fdnhkj "Code") | [<img src="https://avatars2.githubusercontent.com/u/365742?v=4" width="100px;"/><br /><sub>Andreas Hoffmann</sub>](https://twitter.com/devdreas)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=Furizaa "Code") |
| [<img src="https://avatars0.githubusercontent.com/u/9123458?v=4" width="100px;"/><br /><sub>Josh Hawkins</sub>](https://josh.hawkins.is)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=hawkins "Code") | [<img src="https://avatars2.githubusercontent.com/u/250617?v=4" width="100px;"/><br /><sub>Callum Locke</sub>](http://callumlocke.com/)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=callumlocke "Code") | [<img src="https://avatars1.githubusercontent.com/u/3485942?v=4" width="100px;"/><br /><sub>Sam Sedighian</sub>](https://github.com/Sedighian)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=Sedighian "Code") | [<img src="https://avatars3.githubusercontent.com/u/6177621?v=4" width="100px;"/><br /><sub>Divjot Singh</sub>](http://bogas04.github.io)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=bogas04 "Code") | [<img src="https://avatars2.githubusercontent.com/u/244704?v=4" width="100px;"/><br /><sub>Jeremy Gayed</sub>](http://www.jeremygayed.com)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=tizmagik "Code") | [<img src="https://avatars0.githubusercontent.com/u/2767425?v=4" width="100px;"/><br /><sub>sreenivas alapati</sub>](https://medium.com/@sreenivas)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=cg-cnu "Code") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!