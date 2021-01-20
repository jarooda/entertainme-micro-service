const db = require('../config/mongo')
const collection = process.env.COLLECTION_NAME || "series"
const Series = db.collection(collection)
const { ObjectID } = require('mongodb')

class SeriesModel {
  static find () {
    return Series.find().toArray()
  }

  static findOne (id) {
    return Series.findOne({_id: ObjectID(id)})
  }

  static addOne (objectInput) {
    return Series.insertOne(objectInput)
  }

  static removeOne (id) {
    return Series.findOneAndDelete({_id: ObjectID(id)})
  }

  static updateOne (id, objectInput) {
    return Series.findOneAndUpdate( {_id: ObjectID(id) }, {$set: objectInput}, {returnOriginal: false})
  }
}

module.exports = SeriesModel