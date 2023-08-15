import React, { useEffect } from 'react'
import Users from './layouts/users'
import Navbar from './components/ui/navbar'
import { Route } from 'react-router-dom'
import Main from './layouts/main'
import Login from './layouts/login'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/protecredRoute'
import Logout from './layouts/logout'
import { useDispatch } from 'react-redux'
import { loadQualitiesList } from './store/qualities'
import { loadProfessionsList } from './store/professions'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadQualitiesList())
    dispatch(loadProfessionsList())
  }, [])

  return (
    <>
      <div className="App">
        <AuthProvider>
          <Navbar />
          <Route path='/' exact component={Main} />
          <Route path='/login/:type?' exact component={Login} />
          <Route path='/logout' exact component={Logout} />
          <ProtectedRoute path='/users' component={Users} />
          <ToastContainer />
        </AuthProvider>
      </div>
    </>

  )
}

export default App
