import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import UserPage from './userPage'
import UsersList from './usersList'

const Users = () => {
  
  return (
    <>
      <Route path='/users' component={UsersList} exact />
      <Route path='/users/:id' component={UserPage} />
    </>
  )
}

Users.propTypes = {

}

export default Users