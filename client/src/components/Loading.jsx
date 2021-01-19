import React from 'react'
import loadingGif from '../assets/img/Ripple-200px.gif'

function Loading () {
  return (
    <div>
      <img src={loadingGif} alt="Loading..."/>
    </div>
  )
}

export default Loading