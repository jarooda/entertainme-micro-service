const axios = require('axios')
const url = 'http://localhost:4001/movies'
const Redis = require("ioredis");
const redis = new Redis(); // uses defaults unless given configuration object

class MovieController {
  static async findAll (req, res, next) {
    try {
      const movieCache = await redis.get('movies')
      if (movieCache) {
        res.status(200).json({movies: JSON.parse(movieCache)})
      } else {
        const { data } = await axios.get(`${url}`)
        await redis.set('movies', JSON.stringify(data.movies))
        res.status(200).json({movies: data.movies})
      }
    } catch (error) {
      next(error)
    }
  }

  static async findOne (req, res, next) {
    const { id } = req.params
    try {
      const { data } = await axios.get(`${url}/${id}`)
      
      res.status(200).json({movie: data.movie})
    } catch (error) {
      next(error)
    }
  }

  static async addOne (req, res, next) {
    let { title, overview, poster_path, popularity, tags } = req.body

    try {
      const { data } = await axios.post(`${url}`, {
        title, overview, poster_path, poster_path, tags, popularity
      })
      await redis.del('movies')
      res.status(201).json({movie: data.movie})
    } catch (error) {
      next(error)
    }
  }

  static async removeOne (req, res, next) {
    const { id } = req.params
    try {
      const { data } = await axios.delete(`${url}/${id}`)
      await redis.del('movies')
      res.status(200).json({message: data.message})
    } catch (error) {
      next(error)
    }
  }

  static async updateOne (req, res, next) {
    const { id } = req.params
    const { title, overview, poster_path, popularity, tags } = req.body

    try {
      const { data } = await axios.put(`${url}/${id}`, {
        title, overview, poster_path, poster_path, tags, popularity
      })
      await redis.del('movies')
      res.status(200).json({movie: data.movie})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = MovieController