require('newrelic')
const express = require('express')

const server = express()
const bodyParser = require('body-parser')
const querystring = require('querystring')
const bytes = require('bytes')
const { get, set } = require('./firebase')
const github = require('./github')

server.use(bodyParser.json())
server.set('view engine', 'pug')
server.use(express.static('static'))

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
  const { repo, values, sha, token } = req.body
  if (!token) res.status(401).end('token missing')
  else {
    set(repo, values, sha, token)
    res.status(200).end()
  }
})

server.get('/auth', (req, res) => {
  const { code } = req.query
  if (!code) {
    res.status(400).end('code missing')
  } else {
    github
      .token(code)
      .then(response => {
        const token = querystring.parse(response).access_token
        res.render('auth', { token })
      })
      .catch(() => res.status(500).end('Oops'))
  }
})

server.get('/build', (req, res) => {
  let { info } = req.query
  info = JSON.parse(info)
  info.sha = info.sha.slice(0, 8)
  info.files.map(f => {
    f.prettySize = parseFloat(bytes(f.size))
    f.prettyMaxSize = parseFloat(bytes(f.maxSize))
    f.unit = bytes(f.size).replace(f.prettySize, '')

    if (f.master) {
      f.diff = f.size - f.master
      if (f.diff < 0) f.diff = bytes(f.diff)
      else f.diff = `+${bytes(f.diff)}`
    }

    /* Logic to draw bars */
    f.length = Math.max(f.size, f.maxSize)
    if (f.size < f.length) {
      f.fillLength = f.size
      f.baseColor = '#EEE'
    } else {
      f.fillLength = f.maxSize
      f.baseColor = '#FA5E7C'
    }
  })
  res.render('build', info)
})

server.get('/', (req, res) => {
  res.redirect('/status')
})

server.listen(3001)
