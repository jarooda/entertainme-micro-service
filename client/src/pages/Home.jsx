import React from 'react'
import { useQuery } from '@apollo/client'
import { Slide } from '../components'
import { FETCH_HOME } from '../services'

function Home () {
  const { data, loading, error } = useQuery(FETCH_HOME)

  return (
    <div className="container mx-auto pt-10">
      <Slide title="MOVIES" description="The Best Movies In The Box Office" data={data?.movies} loading={loading} error={error} />
      <Slide title="SERIES" description="The Best TV Series" data={data?.series} loading={loading} error={error} />
    </div>
  )
}

export default Home