const util = require('../utils')
const { game } = require('../model/model')
const Gamer = new game()

const addGamer = async (req, res, next) => {
  try {
    let ip = await req.ip
    let result = await Gamer.check(ip)
    if(!result){
      let data = await {
        id: util.uid(),
        ip,
        gamerTag: util.gamerTag(),
        score: 0
      }
      result = await Gamer.create(data)
      next()
    }
    next()
  } catch (e) {
    console.error(e)
    return res.status(500).render('500')
  }
}

module.exports = addGamer