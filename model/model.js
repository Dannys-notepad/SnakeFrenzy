const mysql = require('mysql')

class mysqlDB {
  constructor(host, user, password, dbName){
    this.host = host
    this.user = user
    this.password = password
    this.dbName = dbName
    this.db = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.dbName

    })
  }
}

const Frenzy = new mysqlDB('localhost', 'root', '', 'SnakeFrenzy')


class gamer {
  constructor(data){
    this.data = data
    this.dbQuery = ''
  }

  addGamer(){
    this.dbQuery = `SELECT * FROM gamers WHERE gamers.ip = '${this.data.ip}'`
    Frenzy.db.connect((err) => {
      if(err){
        console.log(err)
      }
      Frenzy.db.query(this.dbQuery, (err, result) => {
        if(err){
          console.log(err)
        }else if(result.length > 0){
          console.log(result)
        }else{
          this.dbQuery = `INSERT INTO gamers (id, gamerTag, ip, score) VALUES ('${this.data.id}', '${this.data.gamerTag}', '${this.data.ip}', '${this.data.score}')`
          Frenzy.db.query(this.dbQuery, (err, result) => {
            if(err){
              console.log(err)
            }
          })
        }
      })
    })
  }

  addGamerScore(){
    this.dbQuery = `UPDATE gamers SET score = '${this.data.score}' WHERE ip = '${this.data.ip}'`
    if(this.data.score === 0 ){
      return false
    }
    Frenzy.db.connect((err) => {
      if(err){
        console.log(err)
      }
      Frenzy.db.query(this.dbQuery, (err, result) => {
        if(err){
          console.log(err)
        }
      })
    })
  }

  displayHighScore(req, res){
    this.dbQuery =`SELECT MAX(score) AS highest_score FROM gamers`
    Frenzy.db.connect((err) => {
      if(err){
        console.log(err)
      }
      Frenzy.db.query(this.dbQuery, (err, result) => {
        if(err){
          console.log(err)
        }else if(result[0].highest_score === null){
          res.render('index', {topScore: 0, ip: req.ip.slice(7, 16)})
        }else{
          res.render('index', {topScore: result[0].highest_score, ip: req.ip.slice(7, 16)})
        }
      })
    })
  }

  showLeaderBoard(res){
    this.dbQuery = `SELECT * FROM gamers ORDER BY score DESC`
    Frenzy.db.connect((err) => {
      if(err){
        console.log(err)
      }
      Frenzy.db.query(this.dbQuery, (err, result) => {
        if(err){
          console.log(err)
        }else if(result.length > 0){
          res.render('leaderboard', {gamers: result})
        }
      })
    })
  }
}



module.exports = {
  gamer
}
