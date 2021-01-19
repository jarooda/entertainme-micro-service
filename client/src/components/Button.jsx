import React from 'react'

function Button ({ name, color, func, param }) {
  return (
    <button className={`px-3 py-2 rounded-lg hover:text-white ring-inset ring ring-gray-200 ${
      color === 'red' ? 'bg-red-500 hover:bg-red-900' :
      color === 'green' ? 'bg-green-500 hover:bg-green-900' :
      color === 'blue' ? 'bg-blue-500 hover:bg-blue-900' :
      'bg-gray-600'
    }`}>{name}</button>
  )
}

export default Button