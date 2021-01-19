import React from 'react'
import { useQuery } from '@apollo/client'
import { FETCH_SERIES } from '../services'
import { Loading, Card } from '../components'


function Series () {
  const { loading, error, data } = useQuery(FETCH_SERIES)

  if (loading) {
    return <div className="flex h-96 justify-center items-end"><Loading/></div>
  }
  if (error) {
    return <div className="flex h-96 justify-center items-center text-white text-4xl">Oops there is an error...</div>
  }
  return (
    <div className="">
      <h1 className="text-white text-3xl text-center font-semibold">Series</h1>
      <div className="text-white container mx-auto my-4">
        <div className="grid grid-cols-6 gap-6">
          {
            data.series.map(e => (
              <Card data={e} key={e._id} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Series