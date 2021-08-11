const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

const router = Router()

router.get(
    '/auth/login',
    [],
    async(req, res) => {
      console.log('get api/auth/login')
      try {} catch (e) {}
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