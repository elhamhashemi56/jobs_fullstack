const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    
    let token=req.cookies.nutzerCookie
    let tokenlesbar=jwt.verify(token,process.env.JWT || 'geheimniss')
    if(tokenlesbar.email){
        next()
    }
  } catch (error) {
    return res.status(401).send('Konnte nicht einloggen!')
  }
}