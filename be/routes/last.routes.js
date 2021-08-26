const fs = require('fs');
const { Router } = require('express')
const { Item } = require('../models/item')
const { User } = require('../models/user')
const { Collection } = require('../models/collection')

const router = Router()

router.get(
  '/item',
  [],
  async(req, res) => {
    Item.belongsTo(Collection);
    Collection.hasMany(Item);
    Collection.belongsTo(User, { foreignKey: 'OwnerId' });
    User.hasMany(Collection, { foreignKey: 'id' });
    try {

      const items = await Item.findAll({
        limit: 10,
        order: [ [ 'createdAt', 'DESC' ]],
        include: { 
          model: Collection,
          include: [User]
        }
      })

      res.status(200).json({ items })
    } catch (e) {
      console.log()
      res.status(500).json({ message: e.message })
    }
  }
)

module.exports = router