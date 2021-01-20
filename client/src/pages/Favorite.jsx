import React from 'react'
import { GET_FAVORITES } from '../services'
import { useQuery } from '@apollo/client'
import { Card } from '../components'

function Favorite () {
  const { loading, error, data } = useQuery(GET_FAVORITES)

  if (loading) {
    return <div>loading</div>
  }
  if (error) {
    return <div>ERROR</div>
  }
  return (
    <div className="">
      <h1 className="text-white text-3xl text-center font-semibold">Movies</h1>
      <div className="text-white container mx-auto my-4">
        {
          data.moviesItem.length === 0
          ?
          <div className="text-center">
            <h1 className="font-semibold text-xl">SELECT SOME MOVIES FIRST...</h1>
          </div>
          :
          <div className="grid grid-cols-6 gap-6 px-4">
            {
              data.moviesItem.map(e => (
                <Card
                  data={e}
                  key={e._id}
                  inFavorite={true}
                  service="movies"
                />
              ))
            }
          </div>
        }
      </div>
      <h1 className="text-white text-3xl text-center font-semibold">Series</h1>
      <div className="text-white container mx-auto my-4">
      {
          data.seriesItem.length === 0
          ?
          <div className="text-center">
            <h1 className="font-semibold text-xl">SELECT SOME SERIES FIRST...</h1>
          </div>
          :
          <div className="grid grid-cols-6 gap-6 px-4">
            {
              data.seriesItem.map(e => (
                <Card
                  data={e}
                  key={e._id}
                  inFavorite={true}
                  service="movies"
                />
              ))
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Favorite