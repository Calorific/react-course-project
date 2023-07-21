import React from 'react'
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

export default Users