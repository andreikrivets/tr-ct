const fs = require('fs');
const { Router } = require('express')

const { Tag } = require('../models/tags')
const { Item } = require('../models/item')
const { ItemTag } = require('../models/itemTags')

const router = Router()

router.get(
  '/',
  [],
  async(req, res) => {
    const { q } = req.query
    if (!q) {
      try {
        const tags = await Tag.findAll();
        res.status(200).json({ tags });
      } catch (e) {
        res.status(500).json({ message: e.message })
      }
    } else {
      try {
        Item.belongsToMany(Tag,  { through: ItemTag })
        Tag.belongsToMany(Item,  { through: ItemTag })
        const items = await Tag.findAll({ 
          where: { TagId: q },
          include: {
            model: Item,
          }
         });
        res.status(200).json({ items });
      } catch (e) {
        res.status(500).json({ message: e.message })
      }
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