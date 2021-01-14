const route = require('express').Router()
const { MovieController } = require('../controllers')

route.get('/', MovieController.findAll)
route.post('/', MovieController.addOne)
route.get('/:id', MovieController.findOne)
route.delete('/:id', MovieController.removeOne)
route.put('/:id', MovieController.updateOne)

module.exports = route