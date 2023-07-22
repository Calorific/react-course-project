import React from 'react'
import Users from './layouts/users'
import Navbar from './components/navbar'
import { Redirect, Route } from 'react-router-dom'
import Main from './layouts/main'
import Login from './layouts/login'


const App = () => {
  return (
    <>
      <div className="App">
        <Navbar />

        <Route path='/' exact component={Main} />
        <Route path='/login' exact component={Login} />
        <Route path='/users' component={Users} />
        <Redirect to='/' />
      </div>
    </>

  )
}

export default App
