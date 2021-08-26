const config = require('config')
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  if (req.headers["x-access-token"]) {
    const { token, userId } = JSON.parse(req.headers["x-access-token"])
    if (token && userId) {
      try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        if (userId === decoded.userId) {
          next()
        } else res.status(400).json({ message: "you are hacker"})
      } catch (e) {
        res.status(401).json({ message: "JWT expired"})
      }
    } else res.status(401).json({ message: "auth error"})
  } else { 
    res.status(401).json({ message: "unauthorised!"})
  }
}

module.exports = auth