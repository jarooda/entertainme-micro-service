const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis(); // uses defaults unless given configuration object

class EntertainmeController {
  static async findAll (req, res, next) {
    try {
      const movieCache = await redis.get('movies')
      const seriesCache = await redis.get('series')
      const movies = axios.get('http://localhost:4001/movies')
      const series = axios.get('http://localhost:4002/series')

      if (movieCache && seriesCache) {

        res.status(200).json({
          movies: JSON.parse(movieCache),
          series: JSON.parse(seriesCache)
        })

      } else {
        if (movieCache) {
          // ! only movies cache
          const entertainme = await Promise.all([
            series
          ])
          
          await Promise.all([
            redis.set('series', JSON.stringify(entertainme[0].data.series))
          ])
          
          res.status(200).json({
            movies: JSON.parse(movieCache),
            series: entertainme[1].data.series
          })
          
        } else if (seriesCache) {
          // ! only series cache
          const entertainme = await Promise.all([
            movies
          ])
          
          await Promise.all([
            redis.set('movies', JSON.stringify(entertainme[0].data.movies))
          ])
          
          res.status(200).json({
            movies: entertainme[0].data.movies,
            series: JSON.parse(seriesCache)
          })

        } else {
          // ! no movie & series cache
          const entertainme = await Promise.all([
            movies,
            series
          ])
          
          await Promise.all([
            redis.set('movies', JSON.stringify(entertainme[0].data.movies)),
            redis.set('series', JSON.stringify(entertainme[1].data.series))
          ])

          res.status(200).json({
            movies: entertainme[0].data.movies,
            series: entertainme[1].data.series
          })
        }
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = EntertainmeController