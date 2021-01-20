import { gql } from '@apollo/client'

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

export const FETCH_ONE_MOVIE = gql`
  query fetchOneMovie( $_id: ID! ) {
    movie(_id: $_id){
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`

export const DELETE_MOVIES = gql`
  mutation deleteMovie( $_id: ID! ) {
    removeMovie(input: { _id: $_id }) {
      message
    }
  }
`

export const ADD_MOVIE = gql`
  mutation addMovie( $title: String!, $overview: String!, $poster_path: String!, $popularity: Float!, $tags: [String] ) {
    addMovie(input: { title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags }) {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`

export const EDIT_MOVIE = gql`
  mutation editMovie( $_id: ID!, $title: String!, $overview: String!, $poster_path: String!, $popularity: Float!, $tags: [String] ) {
    editMovie(input: { _id: $_id, title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags }) {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`