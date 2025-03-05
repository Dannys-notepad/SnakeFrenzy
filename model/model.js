const mysql = require('mysql2/promise')

const Frenzy = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

class game{
  async create(data){
    const [result] = await Frenzy.execute('INSERT INTO gamers (id, gamerTag, ip, score) VALUES (?, ?, ?, ?)', [data.id, data.gamerTag, data.ip, data.score])
    return result.insertId
  }
  
  async check(data){
    const [result] = await Frenzy.execute('SELECT * FROM gamers WHERE gamers.ip = ?', [data])
    return result[0]
  }
  
  async addScore(data){
    const [result] = await Frenzy.execute('UPDATE gamers SET score = ? WHERE ip = ?', [data.score, data.ip])
    return result
  }
  
  async topScore(){
    const [result] = await Frenzy.execute('SELECT MAX(score) AS highest_score FROM gamers')
    return result[0]
  }
  
  async allScores(){
    const [result] = await Frenzy.execute('SELECT * FROM gamers ORDER BY score DESC')
    return result
  }
}

module.exports = {
  game
}

