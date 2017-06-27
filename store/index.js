const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const querystring = require('querystring')
const { get, set } = require('./firebase')
const github = require('./github')

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
      res.end(JSON.stringify(response))
    })
  }
})

server.post('/values', (req, res) => {
  const { repo, values, token } = req.body
  if (!token) res.status(401).end('token missing')
  else {
    set(repo, values, token)
    res.status(200).end()
  }
})

server.get('/auth', (req, res) => {
  const { code } = req.query
  if (!code) res.status(400).end('code missing')
  else
    github
      .token(code)
      .then(response => res.end(querystring.parse(response).access_token))
      .catch(() => res.status(500).end('Oops'))
})

server.listen(3001)
