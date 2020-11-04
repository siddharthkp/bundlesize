<p align="center">
  <img src="https://cdn.rawgit.com/siddharthkp/bundlesize/master/art/logo.png" height="200px">
  <br><br>
  <b>Keep your bundle size in check</b>
  <br>
</p>

&nbsp;

[![Build Status](https://travis-ci.org/siddharthkp/bundlesize.svg?branch=master)](https://travis-ci.org/siddharthkp/bundlesize)
[![NPM Version](https://img.shields.io/npm/v/bundlesize.svg)](https://npmjs.org/package/bundlesize)
[![NPM Downloads](https://img.shields.io/npm/dm/bundlesize.svg?style=flat)](https://www.npmjs.com/package/bundlesize)
&nbsp;

#### Setup

```sh
npm install bundlesize --save-dev

# or

yarn add bundlesize --dev
```

&nbsp;

#### Usage

&nbsp;

Add it to your scripts in `package.json`

```json
"scripts": {
  "test": "bundlesize"
}
```

Or you can use it with `npx` from [NPM 5.2+](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).

```sh
npx bundlesize
```

&nbsp;

#### Configuration

&nbsp;

`bundlesize` accepts an array of files to check.

```json
[
  {
    "path": "./build/vendor.js",
    "maxSize": "30 kB"
  },
  {
    "path": "./build/chunk-*.js",
    "maxSize": "10 kB"
  }
]
```

&nbsp;

You can keep this array either in

1. `package.json`

   ```json
   {
     "name": "your cool library",
     "version": "1.1.2",
     "bundlesize": [
       {
         "path": "./build/vendor.js",
         "maxSize": "3 kB"
       }
     ]
   }
   ```

   or in a separate file

2. `bundlesize.config.json`

   Format:

   ```json
   {
     "files": [
       {
         "path": "./dist.js",
         "maxSize": "3 kB"
       }
     ]
   }
   ```

   You can give a different file by using the `--config` flag:

   ```
   bundlesize --config configs/bundlesize.json
   ```

&nbsp;

#### Customisation

&nbsp;

1. Fuzzy matching

   If the names of your build files are not predictable, you can use the [glob pattern](https://github.com/isaacs/node-glob) to specify files.

   This is common if you append a hash to the name or use a tool like create-react-app/nextjs.

   ```json
   {
     "files": [
       {
         "path": "build/**/main-*.js",
         "maxSize": "5 kB"
       },
       {
         "path": "build/**/*.chunk.js",
         "maxSize": "50 kB"
       }
     ]
   }
   ```

   It will match multiple files if necessary and create a new row for each file.

   &nbsp;

2. Compression options

   By default, bundlesize `gzips` your build files before comparing.

   If you are using `brotli` instead of gzip, you can specify that with each file:

   ```json
   {
     "files": [
       {
         "path": "./build/vendor.js",
         "maxSize": "5 kB",
         "compression": "brotli"
       }
     ]
   }
   ```

   If you do not use any compression before sending your files to the client, you can switch compression off:

   ```json
   {
     "files": [
       {
         "path": "./build/vendor.js",
         "maxSize": "5 kB",
         "compression": "none"
       }
     ]
   }
   ```

&nbsp;

#### Build status for GitHub

&nbsp;

If your repository is hosted on GitHub, you can set bundlesize up to create a "check" on every pull request.

![build status](https://cdn.rawgit.com/siddharthkp/bundlesize/master/art/status.png)

Currently works with [Travis CI](https://travis-ci.org), [CircleCI](https://circleci.com/), [Wercker](http://www.wercker.com), and [Drone](http://readme.drone.io/).

- [Authorize `bundlesize` for status access](https://github.com/login/oauth/authorize?scope=repo%3Astatus&client_id=6756cb03a8d6528aca5a), copy the token provided.
- Add this token as `BUNDLESIZE_GITHUB_TOKEN` as environment parameter in your CIs project settings.

#### Using a different CI?

You will need to supply an additional 5 environment variables.

- `CI_REPO_OWNER` given the repo `https://github.com/myusername/myrepo` would be `myusername`
- `CI_REPO_NAME` given the repo `https://github.com/myusername/myrepo` would be `myrepo`
- `CI_COMMIT_MESSAGE` the commit message
- `CI_COMMIT_SHA` the SHA of the CI commit, in [Jenkins](https://jenkins.io/) you would use `${env.GIT_COMMIT}`
- `CI=true` usually set automatically in CI environments 

(Ask me for help if you're stuck)

&nbsp;

#### Usage with CLI

&nbsp;

bundlesize can also be used without creating a configuration file. We do not recommend this approach and it might be deprecated in a future version.

```sh
bundlesize -f "dist/*.js" -s 20kB
```

For more granular configuration, we recommend configuring it in the `package.json` (documented above).

&nbsp;

#### Like it?

:star: this repo

&nbsp;

#### How to contribute?

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
- [ngxs](https://github.com/ngxs/store)

&nbsp;

#### TODO

- Work with other CI tools
  - [AppVeyor](https://www.appveyor.com/) ([#234](https://github.com/siddharthkp/bundlesize/issues/234))
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
