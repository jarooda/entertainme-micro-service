const { MongoClient } = require('mongodb')
const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri, {useUnifiedTopology: true})
const database = "entertainme"

client.connect()

const db = client.db(database)
module.exports = db