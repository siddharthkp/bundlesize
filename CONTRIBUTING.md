Hi! Thanks for giving this a read!

Super exciting to see your contribution!

&nbsp;

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
- `src/token.js` Holds token information
- `src/api.js` Fetches (for comparison) and updates numbers for master from the API layer

API is hosted on zeit/now.

- `store/index.js` API router
- `store/github.js` Exchanges code for auth token
- `store/firebase.js` Fetches and updates values from firebase

#### [Click here to join the slack channel](https://join.slack.com/t/bundlesize/shared_invite/MjMyNTA0NjUwNzg5LTE1MDM4NjAxNjEtMjFjZThlZmIxMw)
       
#### Doubts?

Feel free to open an issue or reach out to me [on twitter](https://twitter.com/siddharthkp).


## Financial contributions

We also welcome financial contributions in full transparency on our [open collective](https://opencollective.com/bundlesize).
Anyone can file an expense. If the expense makes sense for the development of the community, it will be "merged" in the ledger of our open collective by the core contributors and the person who filed the expense will be reimbursed.


## Credits


### Contributors

Thank you to all the people who have already contributed to bundlesize!
<a href="graphs/contributors"><img src="https://opencollective.com/bundlesize/contributors.svg?width=890" /></a>


### Backers

Thank you to all our backers! [[Become a backer](https://opencollective.com/bundlesize#backer)]

<a href="https://opencollective.com/bundlesize#backers" target="_blank"><img src="https://opencollective.com/bundlesize/backers.svg?width=890"></a>


### Sponsors

Thank you to all our sponsors! (please ask your company to also support this open source project by [becoming a sponsor](https://opencollective.com/bundlesize#sponsor))

<a href="https://opencollective.com/bundlesize/sponsor/0/website" target="_blank"><img src="https://opencollective.com/bundlesize/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/bundlesize/sponsor/1/website" target="_blank"><img src="https://opencollective.com/bundlesize/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/bundlesize/sponsor/2/website" target="_blank"><img src="https://opencollective.com/bundlesize/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/bundlesize/sponsor/3/website" target="_blank"><img src="https://opencollective.com/bundlesize/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/bundlesize/sponsor/4/website" target="_blank"><img src="https://opencollective.com/bundlesize/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/bundlesize/sponsor/5/website" target="_blank"><img src="https://opencollective.com/bundlesize/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/bundlesize/sponsor/6/website" target="_blank"><img src="https://opencollective.com/bundlesize/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/bundlesize/sponsor/7/website" target="_blank"><img src="https://opencollective.com/bundlesize/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/bundlesize/sponsor/8/website" target="_blank"><img src="https://opencollective.com/bundlesize/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/bundlesize/sponsor/9/website" target="_blank"><img src="https://opencollective.com/bundlesize/sponsor/9/avatar.svg"></a>