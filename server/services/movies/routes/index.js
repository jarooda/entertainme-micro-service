const route = require('express').Router()
const moviesRoute = require('./movies')

route.use('/movies', moviesRoute)

module.exports = route