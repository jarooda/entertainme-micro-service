import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { FETCH_MOVIES } from '../services'
import { Loading, Card, Button, Form } from '../components'


function Movies () {
  const { loading, error, data, refetch } = useQuery(FETCH_MOVIES)
  const [ showForm, setShowForm ] = useState(false)
  const [ isEdit, setIsEdit ] = useState(false)

  const toggleForm = (bool) => {
    setShowForm(bool)
  }

  const toggleEdit = (param) => {
    setIsEdit(param)
  }

  if (loading) {
    return <div className="flex h-96 justify-center items-end"><Loading/></div>
  }
  if (error) {
    return <div className="flex h-96 justify-center items-center text-white text-4xl">Oops there is an error...</div>
  }
  return (
    <div className="">
      {
      showForm
      ?
      <Form
        toggleForm={toggleForm}
        refetch={refetch}
        isEdit={isEdit}
        toggleEdit={toggleEdit}
        service="movies"
      /> : '' }
      <h1 className="text-white text-3xl text-center font-semibold">Movies</h1>
      <div className="text-white container mx-auto my-4">
        <div className="grid grid-cols-6 gap-6">
          {
            data.movies.map(e => (
              <Card
                data={e}
                key={e._id}
                refetch={refetch}
                toggleForm={toggleForm}
                toggleEdit={toggleEdit}
                service="movies"
              />
            ))
          }
        </div>
      </div>
      {
        showForm
        ?
        ''
        :
        <div className="text-white fixed right-5 top-20 transform hover:-translate-y-1">
          <Button name="Add Movies" icon="add" func={toggleForm} param={true} color="green" />
        </div>
      }
    </div>
  )
}

export default Movies