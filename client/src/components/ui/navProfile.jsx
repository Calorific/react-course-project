import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'

const NavProfile = () => {
  const { currentUser } = useAuth()

  const [open, setOpen] = useState(false)
  
  const toggleMenu = () => {
    setOpen(prevState => !prevState)
  }
  
  return (
    <>
      <div className="dropdown" onClick={toggleMenu}>
        <div className="btn dropdown-toggle d-flex align-items-center">
          <div className="me-2">{currentUser.name}</div>
          <img src={currentUser.image}
               alt="avatar" className="image-responsive rounded-circle" height='40' />
        </div>
        <div className={'w-100 dropdown-menu' + (open ? ' show' : '')}>
          <Link to={`/users/${currentUser._id}`} className='dropdown-item'>Profile</Link>
          <Link to='/logout' className='dropdown-item'>Logout</Link>
        </div>
      </div>
    </>
  )
}

export default NavProfile