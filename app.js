const express = require('express')
const app = express()
const PORT = 8080
const { gamer, addGamer } = require('./model/model')

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/', addGamer, (req, res) => {
  let data = {
    empty: null
  }
  const Frenzy = new gamer(data)
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
  //console.log(ip, score)
})

app.get('/leaderboard', addGamer, (req, res) => {
  const data = {
    empty: null
  }
  const Frenzy = new gamer(data)
  Frenzy.showLeaderBoard(res)
})

app.listen(PORT, () => console.log('Game server up and running'))
