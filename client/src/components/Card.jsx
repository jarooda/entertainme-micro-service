import React from 'react'
import { Button } from './index'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { DELETE_MOVIES, DELETE_SERIES } from '../services'

function Card ({ data, refetch, toggleForm, toggleEdit, service }) {
  const [deleteMovie] = useMutation(DELETE_MOVIES, {
    onCompleted: () => {
      refetch()
    }
  })
  const [deleteSeries] = useMutation(DELETE_SERIES, {
    onCompleted: () => {
      refetch()
    }
  })
  const history = useHistory()

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

  return (
    <div className="col-span-2 border-t-8 border-blue-500 hover:border-green-600 bg-gray-100 text-black rounded-md p-4 flex flex-col items-center">
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
      <div className="flex w-10/12 justify-around mt-3">
        <Button name="Add To Favorites" color="blue"/>
        <Button name="Edit" color="green" func={showEditForm}/>
        <Button name="Delete" color="red" func={removeData} param={{_id: data._id}}/>
      </div>
    </div>
  )
}

export default Card