import React from 'react'
import Users from './layouts/users'
import Navbar from './components/ui/navbar'
import { Route } from 'react-router-dom'
import Main from './layouts/main'
import Login from './layouts/login'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './components/common/protectedRoute'
import Logout from './layouts/logout'
import AppLoader from './components/ui/hoc/appLoader'

const App = () => {
  return (
    <>
      <div className="App">
        <AppLoader>
          <Navbar />
          <Route path='/' exact component={Main} />
          <Route path='/login/:type?' exact component={Login} />
          <Route path='/logout' exact component={Logout} />
          <ProtectedRoute path='/users' component={Users} />
        </AppLoader>
        <ToastContainer />
      </div>
    </>

  )
}

export default App
