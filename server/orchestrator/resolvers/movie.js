const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();
const urlMovies = process.env.URL_MOVIES || 'http://localhost:4001/movies'

const resolverMovie = {
  Query: {
    movies: async () => {
      try {
        const cache = await redis.get('movies')

        if (cache) {
          return JSON.parse(cache)
        } else {
          const { data } = await axios.get(urlMovies)
          await redis.set('movies', JSON.stringify(data.movies))
          return data.movies
        }

      } catch (error) {
        throw error
      }
    },
    movie: async (_, args) => {
      try {
        const { data } = await axios.get(urlMovies + '/' + args._id)
        return data.movie
      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    addMovie: async (_, args) => {
      try {
        const { title, overview, poster_path, popularity, tags } = args.input
        const { data } = await axios.post(urlMovies, {
            title, overview, poster_path, popularity, tags
        })
        await redis.del('movies')
        return data.movie
      } catch (error) {
        throw error
      }
    },
    editMovie: async (_, args) => {
      try {
        const { _id, title, overview, poster_path, popularity, tags } = args.input
        const { data } = await axios.put(urlMovies + '/' + _id, {
            title, overview, poster_path, popularity, tags
        })
        await redis.del('movies')
        return data.movie
      } catch (error) {
        throw error
      }
    },
    removeMovie: async (_, args) => {
      try {
        const { _id } = args.input
        const { data } = await axios.delete(urlMovies + '/' + _id)
        await redis.del('movies')
        return data
      } catch (error) {
        throw error
      }
    }
  }
};

module.exports = resolverMovie