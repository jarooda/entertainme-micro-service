import React from 'react'

function Button ({ name, color, func, param, icon, type = "button" }) {

  return (
    <button
      type={type}
      className={`px-3 py-2 rounded-lg mx-1 hover:text-white ring-inset ring ring-gray-200 flex items-center ${
      color === 'red' ? 'bg-red-500 hover:bg-red-600' :
      color === 'green' ? 'bg-green-500 hover:bg-green-600' :
      color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
      color === 'yellow' ? 'bg-yellow-500 hover:bg-yellow-600' :
      'bg-gray-300 hover:bg-gray-600'
      }`}
      onClick={func ? () => func(param) : () => ''}
    >
        {name}{icon ? <span className="material-icons ml-1">{icon}</span> : ''}
    </button>
  )

}

export default Button