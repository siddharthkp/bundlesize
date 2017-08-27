Hi! Thanks for giving this a read!

Super exciting to see your contribution!

&nbsp;
[![All Contributors](https://img.shields.io/badge/all_contributors-20-orange.svg?style=flat-square)](#contributors)

#### Can I implement feature X?

1. Before writing the code for your feature, please [create an issue here](https://github.com/siddharthkp/bundlesize/issues/new?labels=feature%20request).

2. Sometimes, the feature you have in mind might already exist! or might not fit well in the tool.

3. It breaks my heart to say no to a pull request. So, please let's talk about it first on an issue!

&nbsp;

#### How do I contribute code?

1. Fork this repo on github.

2. Clone it on your machine: `git clone https://github.com/YOUR_USERNAME/bundlesize.git`

3. Run `npm install` (bundlesize uses npm5 with a `package-lock.json`, please don't use yarn, sorry)

4. Run `npm test` to ensure the repository is setup correctly. You should see a dummy output:

```
PASS  ./index.js: 189B < maxSize 600B gzip 
```

5. Make your changes.

6. Make sure that the tests still pass: `npm test`

7. Submit a pull request to the original bundlesize repository through GitHub.

8. Choose a nice title and describe the changes you have made.

9. Do a little dance!

&nbsp;

#### Structure

- `index.js` This is the root file

- `src/config.js` Reads bundlesize settings from package.json
- `src/files.js` Fetches files and their size based on the config
- `src/reporter.js` Compares with threshold and prints output/message
- `src/build.js` Handles CI builds
- `src/environment.js` Holds CI environment information (sha, branch, token, etc.)
- `src/api.js` Fetches (for comparison) and updates numbers for master from the API layer

API is hosted on zeit/now.

- `store/index.js` API router
- `store/github.js` Exchanges code for auth token
- `store/firebase.js` Fetches and updates values from firebase
       
#### Doubts?

Feel free to open an issue or reach out to me [on twitter](https://twitter.com/siddharthkp).

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars0.githubusercontent.com/u/1863771?v=4" width="100px;"/><br /><sub>Siddharth Kshetrapal</sub>](https://github.com/siddharthkp)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=siddharthkp "Code") | [<img src="https://avatars0.githubusercontent.com/u/1051509?v=4" width="100px;"/><br /><sub>Sara Vieira</sub>](http://iamsaravieira.com)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=SaraVieira "Code") | [<img src="https://avatars0.githubusercontent.com/u/639255?v=4" width="100px;"/><br /><sub>Chris Montoro</sub>](https://github.com/montmanu)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=montmanu "Code") | [<img src="https://avatars2.githubusercontent.com/u/9800850?v=4" width="100px;"/><br /><sub>Mateusz Burzyński</sub>](https://github.com/Andarist)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=Andarist "Code") | [<img src="https://avatars2.githubusercontent.com/u/5382443?v=4" width="100px;"/><br /><sub>Federico Zivolo</sub>](https://fezvrasta.github.io)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=FezVrasta "Code") | [<img src="https://avatars1.githubusercontent.com/u/1401513?v=4" width="100px;"/><br /><sub>Masaaki Morishita</sub>](http://morishitter.github.io)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=morishitter "Code") | [<img src="https://avatars2.githubusercontent.com/u/11544418?v=4" width="100px;"/><br /><sub>Simon Legg</sub>](https://github.com/leggsimon)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=leggsimon "Code") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars3.githubusercontent.com/u/16456651?v=4" width="100px;"/><br /><sub>Sangboak Lee</sub>](https://github.com/echo304)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=echo304 "Code") | [<img src="https://avatars2.githubusercontent.com/u/4967600?v=4" width="100px;"/><br /><sub>James Baxley</sub>](https://meteor.io)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=jbaxleyiii "Code") | [<img src="https://avatars3.githubusercontent.com/u/1824298?v=4" width="100px;"/><br /><sub>Karan Thakkar</sub>](https://twitter.com/geekykaran)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=karanjthakkar "Code") | [<img src="https://avatars0.githubusercontent.com/u/1116738?v=4" width="100px;"/><br /><sub>Dany Shaanan</sub>](https://danyshaanan.com)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=danyshaanan "Code") | [<img src="https://avatars0.githubusercontent.com/u/3415488?v=4" width="100px;"/><br /><sub>Anup</sub>](https://twitter.com/_reznord)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=reznord "Code") | [<img src="https://avatars3.githubusercontent.com/u/5569608?v=4" width="100px;"/><br /><sub>Fidan Hakaj</sub>](https://www.linkedin.com/in/fidan-hakaj)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=fdnhkj "Code") | [<img src="https://avatars2.githubusercontent.com/u/365742?v=4" width="100px;"/><br /><sub>Andreas Hoffmann</sub>](https://twitter.com/devdreas)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=Furizaa "Code") |
| [<img src="https://avatars0.githubusercontent.com/u/9123458?v=4" width="100px;"/><br /><sub>Josh Hawkins</sub>](https://josh.hawkins.is)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=hawkins "Code") | [<img src="https://avatars2.githubusercontent.com/u/250617?v=4" width="100px;"/><br /><sub>Callum Locke</sub>](http://callumlocke.com/)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=callumlocke "Code") | [<img src="https://avatars1.githubusercontent.com/u/3485942?v=4" width="100px;"/><br /><sub>Sam Sedighian</sub>](https://github.com/Sedighian)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=Sedighian "Code") | [<img src="https://avatars3.githubusercontent.com/u/6177621?v=4" width="100px;"/><br /><sub>Divjot Singh</sub>](http://bogas04.github.io)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=bogas04 "Code") | [<img src="https://avatars2.githubusercontent.com/u/244704?v=4" width="100px;"/><br /><sub>Jeremy Gayed</sub>](http://www.jeremygayed.com)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=tizmagik "Code") | [<img src="https://avatars0.githubusercontent.com/u/2767425?v=4" width="100px;"/><br /><sub>sreenivas alapati</sub>](https://medium.com/@sreenivas)<br />[💻](https://github.com/siddharthkp/bundlesize/commits?author=cg-cnu "Code") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!