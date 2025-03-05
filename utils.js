
let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'

const uid = () => {
  let result = ''
  for(let i = 0; i < 15; i++){
    result += characters.charAt(Math.floor(Math.random() * characters.length)) 
  }
  return result
}

const gamerTag = () => {
  let tem = 'gamer__'
  for(let i = 0; i < 13; i++){
    tem += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return tem
}

module.exports = {
  uid,
  gamerTag
}
