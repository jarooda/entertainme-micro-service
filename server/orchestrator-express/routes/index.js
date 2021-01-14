const route = require('express').Router()
const moviesRoute = require('./movies')
const seriesRoute = require('./series')
const entertainmeRoute = require('./entertainme')

route.use('/movies', moviesRoute)
route.use('/series', seriesRoute)
route.use('/entertainme', entertainmeRoute)

module.exports = route