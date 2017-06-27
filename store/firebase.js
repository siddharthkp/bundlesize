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

const set = (repo, values, token) => {
  authenticate(token)
  const ref = `${token}/${repo}`
  firebase.database().ref(ref).set(values)
  logout()
}

const get = (repo, token) => {
  authenticate(token)
  const ref = `${token}/${repo}`
  return firebase.database().ref(ref).once('value').then(snapshot => {
    return snapshot.val() || {}
  })
  logout()
}

module.exports = { set, get }
