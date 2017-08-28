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
- `src/environment.js` Holds CI environment information (sha, branch, token, etc.)
- `src/api.js` Fetches (for comparison) and updates numbers for master from the API layer

API is hosted on zeit/now.

- `store/index.js` API router
- `store/github.js` Exchanges code for auth token
- `store/firebase.js` Fetches and updates values from firebase
       
#### Doubts?

Feel free to open an issue or reach out to me [on twitter](https://twitter.com/siddharthkp).

#### Credits

Once you have made some contribution. 

* Pat on your back!
* Give yourself some credit by adding your name as a contributor. 

Use the following command to add your self as a contributor to the repo.

`all-contributors add <username> <contribution>`

Where username is the user's GitHub username, and contribution is a ,-separated list of ways to contribute. eg; code,bug,infra...

Refer to the [documentation](https://www.npmjs.com/package/all-contributors-cli) for further details.