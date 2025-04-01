require('dotenv').config()

const path = require('path')
const express = require('express')
const app = express()
const PORT = 8000
const { renderGame, submitScore, renderLeaderBoard } = require('./controller/controller')
const addGamer = require('./middleware/addGamer')

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(addGamer)

app.get('/', renderGame)
app.post('/', submitScore)
app.get('/leaderboard', renderLeaderBoard)

app.listen(PORT, () => console.log('Game server up and running'))