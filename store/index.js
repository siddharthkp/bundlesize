const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const { get, set } = require('./firebase')

server.use(bodyParser.json())

server.get('/status', (req, res) => {
  res.status(200).end('OK')
})

server.get('/values', (req, res) => {
  const { repo, token } = req.query
  if (!repo) res.status(400).end('repo missing')
  else if (!token) res.status(401).end('token missing')
  else {
    get(repo, token).then(response => {
      /* Firebase returns a list */
      const values = Object.values(response)[0]
      res.end(JSON.stringify(values))
    })
  }
})

server.post('/values', (req, res) => {
  const { repo, sha, values, token } = req.body
  if (!token) res.status(401).end('token missing')
  else {
    set(repo, sha, values, token)
    res.status(200).end()
  }
})

server.listen(3001)
