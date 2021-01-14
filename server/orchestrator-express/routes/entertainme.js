const route = require('express').Router()
const { EntertainmeController } = require('../controllers')

route.get('/', EntertainmeController.findAll)

module.exports = route