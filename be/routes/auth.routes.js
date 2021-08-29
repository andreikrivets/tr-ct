const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')

const { User } = require('../models/user')
const router = Router()

router.post(
    '/login',
    [
      check('email', 'incorrect email').normalizeEmail().isEmail(),
      check('password', 'incorrect password').isLength({ min: 3 })
    ],
    async(req, res) => {
      try {
        console.log(req.body)
        const { email, password } = req.body
        console.log('email:', email, 'password:', password)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array(), message: 'incorrect login data' })
        }
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
          return res.status(400).json({ message: 'user not found '})
        }
        const isMatch = await bcrypt.compare(password, user.password.toString())
        if (!isMatch) {
            return res.status(400).json({ message: 'incorrect password' })
        }
        const token = jwt.sign(
          { userId: user.id },
          config.get('jwtSecret'),
          { expiresIn: '1h' }
      )
      const loginDate = Date.now();
      res.json({ token, userId: user.id, loginDate })
      } catch (e) {
        res.status(500).json({ message: e.message })
      }
})

router.post(
  '/register',
  [
    check('email', 'incorrect email').isEmail(),
    check('password', 'incorrect password').isLength({ min: 3 })
  ],
  async(req, res) => {
    const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array(), message: 'incorrect register data'})
      }
      const { email, password, firstName, lastName } = req.body
      const candidate = await User.findOne({ where: { email: email } });
      if (candidate) {
          return res.status(401).json({ message: 'already registred'})
      }
      const hashedPassword = await bcrypt.hash(password, 2)
      const user =  User.build({ 
          email: email, 
          firstName: firstName,
          lastName: lastName,
          password: hashedPassword, 
          status: "1", 
          type: "user",
          createdAt: currentTimestamp,
      })
      await user.save()
      res.status(200).json({ message: 'created'})
  } catch(e) {
      res.status(500).json({ message: e.message })
  }
})

module.exports = router