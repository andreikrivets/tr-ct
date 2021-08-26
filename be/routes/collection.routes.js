const { Router } = require('express')
const fs = require('fs');
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../utils/auth')

const { Collection } = require('../models/collection')
const { Item } = require('../models/item');
const { Tag } = require('../models/tags')
const { ItemTag } = require('../models/itemTags')



const router = Router()

router.post(
  '/',
  auth,
  async(req, res) => {
    const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    try {
      const { token, userId } = JSON.parse(req.headers["x-access-token"])
      const { values, additionalTags, imageUrl } = req.body
      const { title, description, category } = values
      const { text, line, boolean, date } = additionalTags
      const collection =  Collection.build({ 
        Name: title, 
        Description: description,
        OwnerId: userId,
        Type: category, 
        ImageId: imageUrl || '',
        createdAt: currentTimestamp,
        addText1: text ? text[0] || '' : '',
        addText2: text ? text[1] || '' : '',
        addText3: text ? text[2] || '' : '',
        addLine1: line ? line[0] || '' : '',
        addLine2: line ? line[1] || '' : '',
        addLine3: line ? line[2] || '' : '',
        addBool1: boolean ? boolean[0] || '' : '',
        addBool2: boolean ? boolean[1] || '' : '',
        addBool3: boolean ? boolean[2] || '' : '',
        addDate1: date ? date[0] || '' : '',
        addDate2: date ? date[1] || '' : '',
        addDate3: date ? date[2] || '' : '',
      })
      console.log(collection)
      await collection.save()
      res.status(200).json({ message: 'created'})
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
})

router.get('/:id', 
  [], 
  async (req, res) => {
    console.log('get')
  try {
    const { id } = req.params
    Item.belongsToMany(Tag,  { through: ItemTag })
    Tag.belongsToMany(Item,  { through: ItemTag })
    const collection = await Collection.findOne({ where: { id: id } });
    const items = await Item.findAll({ 
      where: { CollectionId: id },
      order: [
        ['id', 'DESC'],
      ],
      include: Tag
    });
    console.log(id)
    res.status(200).json({ collection, items })
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
})
module.exports = router