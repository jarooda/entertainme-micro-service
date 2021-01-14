const route = require('express').Router()
const { SeriesController } = require('../controllers')

route.get('/', SeriesController.findAll)
route.post('/', SeriesController.addOne)
route.get('/:id', SeriesController.findOne)
route.delete('/:id', SeriesController.removeOne)
route.put('/:id', SeriesController.updateOne)

module.exports = route