import React from 'react'
import { Button } from './index'

function Card ({data}) {
  return (
    <div className="col-span-2 border-t-8 border-blue-500 hover:border-green-600 bg-gray-100 text-black rounded-md p-4 flex flex-col items-center">
      <div className="flex">
        <img src={data.poster_path} alt={data.title} className="h-60 w-40 rounded-md"/>
        <div className="flex flex-col w-full text-left ml-4">
          <h1 className="font-semibold text-center text-lg mb-4">{data.title}</h1>
          <p className="text-sm break-words mb-4">{data.overview}</p>
          <p className="text-sm text-left font-semibold mb-4">Popularity: {data.popularity}</p>
          <div className="flex w-full flex-wrap items-center">
            <p className="text-left font-semibold">Tags :</p>
            {
              data.tags.map((f,idx) => (
                <p key={idx} className="m-1 text-sm bg-white py-1 px-2 rounded-lg shadow-sm">{f}</p>
              ))
            }
          </div>
        </div>
      </div>
      <div className="flex w-10/12 justify-around mt-3">
        <Button name="Add To Favorites" color="blue"/>
        <Button name="Edit" color="green"/>
        <Button name="Delete" color="red"/>
      </div>
    </div>
  )
}

export default Card