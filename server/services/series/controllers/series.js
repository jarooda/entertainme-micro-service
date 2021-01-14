const { SeriesModel } = require('../models')

class SeriesController {
  static async findAll (req, res, next) {
    try {
      const series = await SeriesModel.find()
      res.status(200).json({series})
    } catch (error) {
      next(error)
    }
  }

  static async findOne (req, res, next) {
    try {
      const id = req.params.id
      const series = await SeriesModel.findOne(id)
      if (!series) {
        throw {
          status: 404,
          message: 'Error Not Found'
        }
      }
      res.status(200).json({series})
    } catch (error) {
      next(error)
    }
  }

  static async addOne (req, res, next) {
    try {
      let { title, overview, poster_path, popularity, tags } = req.body
      popularity = parseFloat(popularity)

      const series = await SeriesModel.addOne({title, overview, poster_path, popularity, tags})

      res.status(201).json({series: series.ops[0]})
    } catch (error) {
      next(error)
    }
  }

  static async removeOne (req, res, next) {
    try {
      const id = req.params.id
      const removed = await SeriesModel.removeOne(id)
      if (removed.lastErrorObject.n === 0) {
        throw {
          status: 404,
          message: 'Error Not Found'
        }
      }
      res.status(200).json({message: "Removed Successfully"})
    } catch (error) {
      next(error)
    }
  }

  static async updateOne (req, res, next) {
    try {
      const { id } = req.params
      let { title, overview, poster_path, popularity, tags } = req.body
      popularity = parseFloat(popularity)

      const series = await SeriesModel.updateOne(id, { title, overview, poster_path, popularity, tags })

      if (!series) {
        throw {
          status: 404,
          message: 'Error Not Found'
        }
      }
      res.status(200).json({series: series.value})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = SeriesController