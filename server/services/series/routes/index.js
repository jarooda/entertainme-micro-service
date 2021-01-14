const route = require('express').Router()
const seriesRoute = require('./series')

route.use('/series', seriesRoute)

module.exports = route