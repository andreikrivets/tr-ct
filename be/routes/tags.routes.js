const fs = require('fs');
const { Router } = require('express')

const { Tag } = require('../models/tags')
const { Item } = require('../models/item')
const { ItemTags } = require('../models/itemtags')

const router = Router()

router.get(
  '/',
  [],
  async(req, res) => {
    try {
      const tags = await Tag.findAll();
      setTimeout(() => res.status(200).json({ tags }), 2000)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
})

router.post(
  '/',
  [],
  async(req, res) => {
    try {
      console.log('try')
      console.log(req.body)
      await Tag.bulkCreate(req.body)
      res.status(200).json({ message: "tag created" })
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
)

module.exports = router