import React from 'react'

function Loading () {

  return (
    <div className="text-center flex flex-col items-center">
      <h1 className="text-green-400 font-extrabold mb-20 text-3xl p-3 rounded-full">Please Wait...</h1>
      <div className="flex justify-center items-center">
        <div className="loader absolute">
        </div>
        <div className="loader-inside absolute">
        </div>
      </div>
    </div>
  )
}

export default Loading