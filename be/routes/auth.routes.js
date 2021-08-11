const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

const router = Router()

router.post(
    '/auth/login',
    [],
    async(req, res) => {
      try {
        console.log(req.body)
        setTimeout(() => {
          res.status(201).json({ message: 'login done'})
        }, 2000);
      } catch (e) {
        res.status(500).json({ message: e.message })
      }
})


router.post(
  '/auth/register',
  [
    check('email', 'incorrect email').isEmail(),
    check('password', 'incorrect password')
        .isLength({ min: 1 })
  ],
  async(req, res) => {
    try {
      res.status(201).json({ message: 'created'})
  } catch(e) {
      res.status(500).json({ message: e.message })
  }
})

module.exports = router