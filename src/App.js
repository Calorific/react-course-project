import React from 'react'
import Users from './components/users'
import Navbar from './components/navbar'
import { Route } from 'react-router-dom'
import Main from './components/main'
import Login from './components/login'


const App = () => {
  return (
    <>
      <div className="App">
        <Navbar />

        <Route path='/' exact component={Main}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/users' component={Users}/>
      </div>
    </>

  )
}

export default App
