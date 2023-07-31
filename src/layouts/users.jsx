import React from 'react'
import { Route } from 'react-router-dom'
import UserPage from '../components/page/userPage/userPage'
import UsersListPage from '../components/page/usersListPage/usersListPage'
import UserEditPage from '../components/page/userEditPage'

const Users = () => {
  
  return (
    <>
      <Route path='/users' component={UsersListPage} exact />
      <Route path='/users/:id' component={UserPage} exact />
      <Route path='/users/:id/:edit' component={UserEditPage} exact />
    </>
  )
}

export default Users