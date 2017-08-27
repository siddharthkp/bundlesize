const initial = require('./export.json') // eslint-disable-line import/no-unresolved
const fs = require('fs')

const tokens = Object.keys(initial)
tokens.map(token => {
  const users = Object.keys(initial[token])
  users.map(() => {
    const repos = Object.keys(initial[token][users])
    repos.map(repo => {
      const future = {
        '-Kp6JuK8QrSeYBh4g_0K': initial[token][users][repo]
      }
      initial[token][users][repo] = future
    })
  })
})

fs.writeFileSync('import.json', JSON.stringify(initial, null, 2))
