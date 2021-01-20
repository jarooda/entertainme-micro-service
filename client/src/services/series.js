import { gql } from '@apollo/client'

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


export const FETCH_ONE_SERIAL = gql`
  query fetchOneSerial( $_id: ID! ) {
    serial(_id: $_id){
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`

export const DELETE_SERIES = gql`
  mutation deleteSeries( $_id: ID! ) {
    removeSeries(input: { _id: $_id }) {
      message
    }
  }
`

export const ADD_SERIES = gql`
  mutation addSeries( $title: String!, $overview: String!, $poster_path: String!, $popularity: Float!, $tags: [String] ) {
    addSeries(input: { title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags }) {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`

export const EDIT_SERIES = gql`
  mutation editSeries( $_id: ID!, $title: String!, $overview: String!, $poster_path: String!, $popularity: Float!, $tags: [String] ) {
    editSeries(input: { _id: $_id, title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tags: $tags }) {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`