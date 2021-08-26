const fs = require('fs');
const { Router } = require('express')
const { Collection } = require('../models/collection');

const { User } = require('../models/user')

const router = Router()

router.get(
  '/:id',
  [],
  async(req, res) => {
    try {
      const { id } = req.params
      const user = await User.findOne({ where: { id: id } });
      const collections = await Collection.findAll({ where: { ownerId: id }})
      // console.log(collections)
      if (!user) res.status(404).json({ message: 'user not found' })
      else {
        const { firstName, lastName, email, type, createdAt } = user
        const info = {
          firstName,
          lastName,
          email,
          type,
          createdAt
        }
        res.status(200).json({ info, collections })
      }

    } catch (e) {
      console.log('error', e)
      res.status(500).json({ message: e.message })
    }
})


module.exports = router