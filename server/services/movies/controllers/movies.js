const { MovieModel } = require('../models')

class MovieController {
  static async findAll (req, res, next) {
    try {
      const movies = await MovieModel.find()
      res.status(200).json({movies})
    } catch (error) {
      next(error)
    }
  }

  static async findOne (req, res, next) {
    try {
      const id = req.params.id
      const movie = await MovieModel.findOne(id)
      if (!movie) {
        throw {
          status: 404,
          message: 'Error Not Found'
        }
      }
      res.status(200).json({movie})
    } catch (error) {
      next(error)
    }
  }

  static async addOne (req, res, next) {
    try {
      let { title, overview, poster_path, popularity, tags } = req.body
      popularity = parseFloat(popularity)

      const movie = await MovieModel.addOne({title, overview, poster_path, popularity, tags})

      res.status(201).json({movie: movie.ops[0]})
    } catch (error) {
      next(error)
    }
  }

  static async removeOne (req, res, next) {
    try {
      const id = req.params.id
      const removed = await MovieModel.removeOne(id)
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

      const movie = await MovieModel.updateOne(id, { title, overview, poster_path, popularity, tags })

      if (!movie) {
        throw {
          status: 404,
          message: 'Error Not Found'
        }
      }
      res.status(200).json({movie: movie.value})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = MovieController