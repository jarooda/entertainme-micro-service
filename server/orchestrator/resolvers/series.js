const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();
const urlSeries = process.env.URL_SERIES || 'http://localhost:4002/series'

const resolverSeries = {
  Query: {
    series: async () => {
      try {
        const cache = await redis.get('series')

        if (cache) {
          return JSON.parse(cache)
        } else {
          const { data } = await axios.get(urlSeries)
          await redis.set('series', JSON.stringify(data.series))
          return data.series
        }

      } catch (error) {
        throw error
      }
    },
    serial: async (_, args) => {
      try {
        const { data } = await axios.get(urlSeries + '/' + args._id)
        return data.series
      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    addSeries: async (_, args) => {
      try {
        const { title, overview, poster_path, popularity, tags } = args.input
        const { data } = await axios.post(urlSeries, {
            title, overview, poster_path, popularity, tags
        })
        await redis.del('series')
        return data.series
      } catch (error) {
        throw error
      }
    },
    editSeries: async (_, args) => {
      try {
        const { _id, title, overview, poster_path, popularity, tags } = args.input
        const { data } = await axios.put(urlSeries + '/' + _id, {
            title, overview, poster_path, popularity, tags
        })
        await redis.del('series')
        return data.series
      } catch (error) {
        throw error
      }
    },
    removeSeries: async (_, args) => {
      try {
        const { _id } = args.input
        const { data } = await axios.delete(urlSeries + '/' + _id)
        await redis.del('series')
        return data
      } catch (error) {
        throw error
      }
    }
  }
};

module.exports = resolverSeries