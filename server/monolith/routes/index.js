const route = require('express').Router()
const moviesRoute = require('./movies')
const seriesRoute = require('./series')

route.use('/movies', moviesRoute)
route.use('/series', seriesRoute)

module.exports = route