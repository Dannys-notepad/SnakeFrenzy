const mysql = require('mysql')
const { generateId, gamerTag } = require('../utils')

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

const addGamer = (req, res, next) => {
  let dbQuery = `SELECT * FROM gamers WHERE gamers.ip = '${req.ip.slice(7, 16)}'`
  Frenzy.db.connect((err) => {
    if(err){
      console.log(err)
    }
    Frenzy.db.query(dbQuery, (err, result) => {
      if(err){
        console.log(err)
      }else if(result.length > 0){
        next()
      } else if(result.length === 0){
        dbQuery = `INSERT INTO gamers (id, gamerTag, ip, score) VALUES ('${generateId()}', '${gamerTag()}', '${req.ip.slice(7, 16)}', '${0}')`
        Frenzy.db.query(dbQuery, (err, result) => {
          if(err){
            console.log(err)
          }else{
            next()
          }
        })
      }
    })
  })
}


class gamer {
  constructor(data){
    this.data = data
  }

  addGamerScore(){
    this.dbQuery = `SELECT * FROM gamers WHERE gamers.ip = '${this.data.ip}'`
    if(this.data.score === 0 ){
      return false
    }
    Frenzy.db.connect((err) => {
      if(err){
        console.log(err)
      }
      Frenzy.db.query(this.dbQuery, (err, result) => {
        //console.log(result)
        if(err){
          console.log(err)
        }else if(this.data.score > +result[0].score){
          this.dbQuery = `UPDATE gamers SET score = '${this.data.score}' WHERE ip = '${this.data.ip}'`
          Frenzy.db.query(this.dbQuery, (err, result) => {
            if(err){
              console.log(err)
            }
          })
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
        }else{
          res.send('<h1>No Scores to show</h1>')
        }
      })
    })
  }
}



module.exports = {
  gamer,
  addGamer
}
