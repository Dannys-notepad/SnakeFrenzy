const { game } = require('../model/model')
const Gamer = new game()

const renderGame = async (req, res) => {
  try {
    let ip = await req.ip
    let result = await Gamer.topScore()
    let result2 = await Gamer.check(ip)
    //console.log(result.highest_score)
    //console.log(result2.score)
    res.render('index', {topScore: result.highest_score ?? '0', yourScore: result2.score})
  } catch (e) {
    console.error(e)
    return res.status(500).render('500')
  }
}

const submitScore = async (req, res) => {
  try {
    let ip = await req.ip
    let { score } = await req.body
    //console.log(score)
    if(+score === 0){
      return false
    }
    
    let result = await Gamer.check(ip)
    //let result2 = await Gamer.topScore()
    if(+score > +result.score) {
      let data = {
        ip,
        score
      }
      result = await Gamer.addScore(data)
      //result = await Gamer.topScore()
    }
    res.redirect('/')
    
  } catch (e) {
    console.error(e)
    return res.status(500).render('500')
  }
}

const renderLeaderBoard = async (req, res) => {
  try {
    const ip = await req.ip;
let gamers = await Gamer.allScores();
if (gamers) {
  gamers.forEach((d) => {
    if (ip === d.ip) {
      d.gamerTag = 'You';
    }
  });
}
//console.log(gamers)
    res.render('leaderboard', {gamers})
  } catch (e) {
    console.error(e)
    return res.status(500).render('500')
  }
}

module.exports = {
  renderGame,
  submitScore,
  renderLeaderBoard
}