const db = require('../config/mongo')
const Movies = db.collection("movies")
const { ObjectID } = require('mongodb')

class MovieModel {
  static find () {
    return Movies.find().toArray()
  }

  static findOne (id) {
    return Movies.findOne({_id: ObjectID(id)})
  }

  static addOne (objectInput) {
    return Movies.insertOne(objectInput)
  }

  static removeOne (id) {
    return Movies.findOneAndDelete({_id: ObjectID(id)})
  }

  static updateOne (id, objectInput) {
    return Movies.findOneAndUpdate( {_id: ObjectID(id) }, {$set: objectInput}, {returnOriginal: false})
  }
}

module.exports = MovieModel