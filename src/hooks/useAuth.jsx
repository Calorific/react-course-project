import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import { setTokens } from '../services/localStorage.service'
const AuthContext = React.createContext()

const httpAuth = axios.create()

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    if (error) {
      toast.error(error.message)
      setError(null)
    }
  }, [error])

  const createUser = async data => {
    try {
      const { content } = await userService.create(data)
      setCurrentUser(content)
    } catch (e) {
      errorCatcher(e)
    }
  }



  const signUp = async ({ email, password, ...rest }) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`
    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true })
      setTokens(data)
      await createUser({ _id: data.localId, email, ...rest })
    } catch (e) {
      throw errorCatcher(e)
    }
  }

  const signIn = async ({ email, password }) => {
    const key = process.env.REACT_APP_FIREBASE_KEY
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`

    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true })
      setTokens(data)
    } catch (e) {
      throw errorCatcher(e)
    }
  }

  function errorCatcher(e) {
    const { code, message } = e.response.data.error
    setError(e.response.data)

    if (code === 400) {
      if (message === 'EMAIL_EXISTS') {
        return {
          email: 'Пользователь с таким email уже существует'
        }
      }

      if (message === 'INVALID_PASSWORD') {
        return {
          password: 'Неверный пароль'
        }
      }

      if (message === 'EMAIL_NOT_FOUND')
        return {
          email: 'Пользователя с таким email не существует'
        }

      return {}
    }
  }

  return (
      <AuthContext.Provider value={{ signUp, signIn, currentUser }}>
        {children}
      </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default AuthProvider