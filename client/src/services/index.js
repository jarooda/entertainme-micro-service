import { gql } from '@apollo/client'

export const FETCH_HOME = gql`
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

export const FETCH_MOVIES = gql`
  query fetchMovies {
    movies{
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`

export const FETCH_SERIES = gql`
  query fetchSeries {
    series{
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`