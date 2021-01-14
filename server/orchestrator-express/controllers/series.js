const axios = require('axios')
const url = 'http://localhost:4002/series'
const Redis = require("ioredis");
const redis = new Redis(); // uses defaults unless given configuration object

class SeriesController {
  static async findAll (req, res, next) {
    try {
      const seriesCache = await redis.get('series')
      if (seriesCache) {
        res.status(200).json({series: JSON.parse(seriesCache)})
      } else {
        const { data } = await axios.get(`${url}`)
        await redis.set('series', JSON.stringify(data.series))
        res.status(200).json({series: data.series})
      }

    } catch (error) {
      next(error)
    }
  }

  static async findOne (req, res, next) {
    const { id } = req.params
    try {
      const { data } = await axios.get(`${url}/${id}`)
      
      res.status(200).json({series: data.series})
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
      await redis.del('series')
      res.status(201).json({series: data.series})
    } catch (error) {
      next(error)
    }
  }

  static async removeOne (req, res, next) {
    const { id } = req.params
    try {
      const { data } = await axios.delete(`${url}/${id}`)
      await redis.del('series')
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
      await redis.del('series')
      res.status(200).json({series: data.series})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = SeriesController