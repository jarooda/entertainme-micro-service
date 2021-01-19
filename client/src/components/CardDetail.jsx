import React from 'react'
import { Button } from './index'

function CardDetail ({ data, toggleEdit, toggleForm }) {

  const showEditForm = () => {
    toggleForm(true)
    toggleEdit(data)
  }

  return (
    <div className="w-full grid grid-cols-4 border-t-8 border-blue-500 hover:border-green-600 bg-gray-100 text-black rounded-md my-10">
      <div className="col-span-1">
        <img src={data.poster_path} alt={data.title} className="object-cover w-full"/>
      </div>
      <div className="col-span-3 flex flex-col text-left p-10 break-all w-full border">
          <h1
            className="font-semibold text-center text-4xl mb-4"
          >{data.title}</h1>
          <p className="text-lg break-words mb-4">{data.overview}</p>
          <p className="text-lg text-left font-semibold mb-4">Popularity: {data.popularity}</p>
          <div className="text-lg flex w-full flex-wrap items-center">
            <p className="text-left font-semibold">Tags :</p>
            {
              data.tags.map((f,idx) => (
                <p key={idx} className="m-1 bg-white py-1 px-2 rounded-lg shadow-sm capitalize">{f}</p>
              ))
            }
          </div>
          <div className="h-full flex justify-end items-end">
            <Button name="Add To Favorites" color="blue"/>
            <Button name="Edit" color="green" func={showEditForm}/>
          </div>
        </div>
    </div>
  )
}

export default CardDetail