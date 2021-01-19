import { gql } from '@apollo/client'
import { FETCH_MOVIES, DELETE_MOVIES, ADD_MOVIE, EDIT_MOVIE, FETCH_ONE_MOVIE } from './movies'
import { FETCH_SERIES, DELETE_SERIES, ADD_SERIES, EDIT_SERIES, FETCH_ONE_SERIAL } from './series'

const FETCH_HOME = gql`
  query fetchAll {
    movies{
      _id
      title
      poster_path
    }
    series{
      _id
      title
      poster_path
    }
  }
`

export { FETCH_MOVIES, DELETE_MOVIES, ADD_MOVIE, FETCH_HOME, FETCH_ONE_MOVIE, EDIT_MOVIE, FETCH_SERIES, DELETE_SERIES, ADD_SERIES, EDIT_SERIES, FETCH_ONE_SERIAL }
