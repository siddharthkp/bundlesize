const firebase = require('firebase')

if (process.env.dev) {
  require('dotenv').config()
}

const { apiKey, databaseURL } = process.env

firebase.initializeApp({ apiKey, databaseURL })

const database = firebase.database()

const authenticate = token => {
  const credential = firebase.auth.GithubAuthProvider.credential(token)
  return firebase
    .auth()
    .signInWithCredential(credential)
    .catch(error => console.log(error))
}

const logout = () => firebase.auth().signOut()

const set = (repo, sha, values, token) => {
  authenticate(token)
  const ref = `${token}/${repo}`
  values.sha = sha
  firebase.database().ref(ref).push(values)
  logout()
}

const get = (repo, token) => {
  authenticate(token)
  const ref = `${token}/${repo}`
  return firebase
    .database()
    .ref(ref)
    .limitToLast(1)
    .once('value')
    .then(snapshot => {
      return snapshot.val() || {}
    })
  logout()
}

module.exports = { set, get }
