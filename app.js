const express = require('express')
const app = express()
const PORT = 8080
const { generateId, gamerTag } = require('./utils')
const { gamer } = require('./model/model')

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  let data = {
    id: generateId(),
    gamerTag: gamerTag(),
    ip: req.ip.slice(7, 16),
    score: 0
  }
  const Frenzy = new gamer(data)
  Frenzy.addGamer()
  Frenzy.displayHighScore(req, res)
})

app.post('/submitScore', (req, res) => {
  let { ip, score } = req.body
  let data = {
    ip,
    score: +score
  }
  const Frenzy = new gamer(data)
  Frenzy.addGamerScore()
})

app.get('/leaderboard', (req, res) => {
  const data = {
    empty: null
  }
  const Frenzy = new gamer(data)
  Frenzy.showLeaderBoard(res)
})

app.listen(PORT, () => console.log('Game server up and running'))
