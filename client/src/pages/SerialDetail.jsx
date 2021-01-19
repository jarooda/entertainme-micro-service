import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { FETCH_ONE_SERIAL } from '../services'
import { Loading, CardDetail, Form } from '../components'

function SerialDetail () {
  const { id } = useParams()
  const { data, error, loading, refetch } = useQuery(FETCH_ONE_SERIAL, {
    variables: {
      _id: id
    }
  })
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
    <div>
      {
        showForm
        ?
        <div className="-mt-8">
          <Form
            toggleForm={toggleForm}
            refetch={refetch}
            isEdit={isEdit}
            toggleEdit={toggleEdit}
            service="series"
          />
        </div> : ''
      }
      <div className={`container mx-auto w-8/12 ${isEdit ? 'pt-6' : ''}`}>
        <CardDetail
          data={data.serial} 
          toggleForm={toggleForm}
          toggleEdit={toggleEdit}
          />
      </div>
    </div>
  )
}

export default SerialDetail