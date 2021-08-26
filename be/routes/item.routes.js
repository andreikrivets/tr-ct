const fs = require('fs');
const { Router } = require('express')
const auth = require('../utils/auth')
const { Item } = require('../models/item')
const { Tag } = require('../models/tags')
const { Collection } = require('../models/collection')
const { ItemTag } = require('../models/itemTags')

const router = Router()

router.post(
  '/',
  auth,
  async(req, res) => {
    const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    try {
      console.log(req.body)
      const { title, description, category, 
        addText1, addText2, addText3, 
        addLine1, addLine2, addLine3,  
        addBool1, addBool2, addBool3,
        addDate1, addDate2, addDate3,
        itemTags, id,
      } = req.body

      // Item.belongsToMany(Tag,  { through: ItemTag })
      // Tag.belongsToMany(Item,  { through: ItemTag })

      const date1 = addDate1 ? new Date(addDate1).toISOString().slice(0, 10) : null
      const date2 = addDate2 ? new Date(addDate2).toISOString().slice(0, 10) : null
      const date3 = addDate3 ? new Date(addDate3).toISOString().slice(0, 10) : null

      const item =  Item.build({ 
      Name: title, 
      CollectionId: id,
      createdAt: currentTimestamp,
      addText1: addText1 || '',
      addText2: addText2 || '',
      addText3: addText3 || '',
      addLine1: addLine1 || '',
      addLine2: addLine2 || '',
      addLine3: addLine3 || '',
      addBool1: addBool1 || 0,
      addBool2: addBool2 || 0,
      addBool3: addBool3 || 0,
      addDate1: date1,
      addDate2: date2,
      addDate3: date3,
      })
      const createdItem = await item.save()
      const modifiedBulk = itemTags.map(tag => ({ TagTagId: tag.TagId, ItemId: createdItem.id }))
      await ItemTag.bulkCreate(modifiedBulk)

      res.status(200).json({ message: "yes!" })
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
})

router.get(
  '/:id',
  [],
  async(req, res) => {
    try {
      const { id } = req.params
      Item.belongsToMany(Tag,  { through: ItemTag })
      Tag.belongsToMany(Item,  { through: ItemTag })
      const item = await Item.findOne({ 
        where: { id: id },
        include: {
          model: Tag,
        }
      })
      // const { dataValues } = item
      res.status(200).json({ items: item })
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
)

router.delete(
  '/:id',
  [],
  async(req, res) => {
    try {
      const { id } = req.params
      console.log(id)
      await Item.destroy({ where: { id: id } })
      res.status(200).json({ message: "deleted" })
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
)

module.exports = router