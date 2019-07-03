<p align="center">
  <img src="https://cdn.rawgit.com/siddharthkp/bundlesize/master/art/logo.png" height="200px">
  <br><br>
  <b>Plugin to use brotli compression with bundlesize on Node < 10.6.0</b>
  <br>
</p>

&nbsp;

#### Note:

If you are using Node version >= 10.16.0, you do not need this plugin.

&nbsp;

#### Install

```sh
npm install bundlesize-plugin-brotli --save-dev

# or

yarn add bundlesize-plugin-brotli --dev
```

&nbsp;

#### Setting up bundlesize

&nbsp;

See bundlesize usage here: https://github.com/siddharthkp/bundlesize

&nbsp;

#### Using brotli compression

&nbsp;

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

&nbsp;
