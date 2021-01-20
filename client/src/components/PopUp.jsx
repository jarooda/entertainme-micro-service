import React from 'react'
import { MODAL } from '../services'
import { useQuery } from '@apollo/client'

function PopUp() {
  const { data } = useQuery(MODAL)

  if (!data.modalItem.show) {
    return <div></div>
  }
  return (
    <div className="fixed z-50">
      <div className="flex w-screen justify-center mt-24">
        <div className="w-3/12 text-center">
          <p className={`text-white px-5 py-5 bg-opacity-90 rounded-2xl font-semibold text-lg
          ${
            data.modalItem.type === 'error'
            ?
            'bg-red-600'
            :
            data.modalItem.type === 'success'
            ?
            'bg-green-600'
            :
            'bg-gray-600'
          }`}>{data.modalItem.dialog}</p>
        </div>
      </div>
    </div>
  )
}

export default PopUp