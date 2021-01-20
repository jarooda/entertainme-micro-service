import React from 'react'
import { Button } from './index'
import { useHistory } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_MOVIES, DELETE_SERIES, GET_FAVORITES } from '../services'
import { favoriteMovies, favoriteSeries, toggleModal } from '../cache'

function Card ({ data, refetch, toggleForm, toggleEdit, service, inFavorite }) {
  const [deleteMovie] = useMutation(DELETE_MOVIES, {
    onCompleted: () => {
      refetch()
      toggleModal({dialog: 'Deleted Successfully', type: 'success'})
    },
    onError: () => {
      toggleModal({dialog: 'Sorry, there is an error', type: 'error'})
    }
  })
  const [deleteSeries] = useMutation(DELETE_SERIES, {
    onCompleted: () => {
      refetch()
      toggleModal({dialog: 'Deleted Successfully', type: 'success'})
    },
    onError: () => {
      toggleModal({dialog: 'Sorry, there is an error', type: 'error'})
    }
  })
  const history = useHistory()
  const { data: fav } = useQuery(GET_FAVORITES)

  const removeData = ({_id}) => {
    if (service === 'movies') {
      deleteMovie({ variables: { _id }})
    } else if (service === 'series') {
      deleteSeries({ variables: { _id }})
    }
  }

  const showEditForm = () => {
    toggleForm(true)
    toggleEdit(data)
  }

  const toFavorite = () => {
    if (service === 'movies') {
      const prev = favoriteMovies()
      favoriteMovies([...prev, data])
    } else if (service === 'series') {
      const prev = favoriteSeries()
      favoriteSeries([...prev, data])
    }
    toggleModal({dialog: 'Success Add to Favorite', type: 'success'})
  }

  return (
    <div className="lg:col-span-2 md:col-span-3 col-span-6 border-t-8 border-blue-500 hover:border-green-600 bg-gray-100 text-black rounded-md p-4 flex flex-col items-center">
      <div className="flex w-full">
        <img src={data.poster_path} alt={data.title} className="h-60 w-40 rounded-md"/>
        <div className="flex flex-col text-left ml-4 break-all w-full">
          <h1
            className="font-semibold text-center text-lg mb-4 underline text-blue-600 hover:text-blue-900 cursor-pointer"
            onClick={service === 'movies' ? () => history.push(`/movies/${data._id}`) : () => history.push(`/series/${data._id}`)}
          >{data.title}</h1>
          <p className="text-sm break-words mb-4">{data.overview}</p>
          <p className="text-sm text-left font-semibold mb-4">Popularity: {data.popularity}</p>
          <div className="flex w-full flex-wrap items-center">
            <p className="text-left font-semibold">Tags :</p>
            {
              data.tags.map((f,idx) => (
                <p key={idx} className="m-1 text-sm bg-white py-1 px-2 rounded-lg shadow-sm capitalize">{f}</p>
              ))
            }
          </div>
        </div>
      </div>
      {
          inFavorite
          ?
          ''
          :
          <div className="flex w-10/12 justify-around mt-3">
            <Button name="Edit" color="green" func={showEditForm}/>
            {
              fav.moviesItem.some(e => e._id === data._id) || fav.seriesItem.some(e => e._id === data._id)
              ?
              ''
              :
              <Button name="Add To Favorites" color="blue" func={toFavorite}/>
            }
            <Button name="Delete" color="red" func={removeData} param={{_id: data._id}}/>
          </div>
        }
    </div>
  )
}

export default Card