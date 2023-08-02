import React from 'react'
import Users from './layouts/users'
import Navbar from './components/ui/navbar'
import { Redirect, Route } from 'react-router-dom'
import Main from './layouts/main'
import Login from './layouts/login'
import { ToastContainer } from 'react-toastify'
import { ProfessionProvider } from './hooks/useProfessions'
import QualityProvider from './hooks/useQualities'

const App = () => {
  return (
    <>
      <div className="App">
        <Navbar />
        <ProfessionProvider>
          <QualityProvider>
            <Route path='/' exact component={Main} />
            <Route path='/login/:type?' exact component={Login} />
            <Route path='/users' component={Users} />
            <Redirect to='/' />
          </QualityProvider>
        </ProfessionProvider>
        <ToastContainer />
      </div>
    </>

  )
}

export default App
