import { ApolloClient, InMemoryCache } from '@apollo/client'
import { favoriteMovies, favoriteSeries, modal } from '../cache'

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          moviesItem: {
            read() {
              return favoriteMovies()
            }
          },
          seriesItem: {
            read() {
              return favoriteSeries()
            }
          },
          modalItem : {
            read() {
              return modal()
            }
          }
        }
      }
    }
  })
})

export default client