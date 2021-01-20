const db = require('../config/mongo')
const collection = process.env.COLLECTION_NAME || "movies"
const Movies = db.collection(collection)
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