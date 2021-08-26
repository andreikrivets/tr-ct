const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');
const { Router } = require('express')

const { Item } = require('../models/item')
const router = Router()

router.get(
  '/',
  [],
  async(req, res) => {
    try {
      const { q } = req.query 
      const result = await Item.findAll({
        where: Sequelize.literal(`MATCH (Name, addLine1, addLine2, addLine3, addText1, addText2, addText3) AGAINST ('${q}')`),
        replacements: {
          [q]: '222'
        }
      });
      res.status(200).json({ result: result })
      
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
})

module.exports = router