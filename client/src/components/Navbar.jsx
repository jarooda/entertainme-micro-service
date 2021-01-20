import React from 'react'
import { NavLink, Link } from 'react-router-dom'

function Navbar () {
  return (
    <nav className="flex justify-between align-middle px-5 py-3 bg-black text-white mb-2">
      <div>
        <Link to="/" className="px-3 py-2 text-3xl font-semibold font-serif">EntertainMe</Link>
      </div>
      <div className="flex align-middle">
        <NavLink to="/movies" className="px-3 py-2">Movies</NavLink>
        <NavLink to="/series" className="px-3 py-2">Series</NavLink>
        <NavLink to="/favorites" className="px-3 py-2">Favorites</NavLink>
      </div>
    </nav>
  )
}

export default Navbar