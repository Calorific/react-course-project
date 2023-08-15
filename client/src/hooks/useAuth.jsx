import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import localStorageService, { setTokens } from '../services/localStorage.service'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

const AuthContext = React.createContext()

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
})

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const history = useHistory()

  const [currentUser, setCurrentUser] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser()
      setCurrentUser(content)
    } catch (e) {
      errorCatcher(e)
    }
  }

  useEffect(() => {
    if (localStorageService.getAccessToken())
      getUserData().finally(() => setIsLoading(false))
    else setIsLoading(false)
  }, [])

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
    } finally {
      setIsLoading(false)
    }
  }

  const updateUser = async data => {
    try {
      const { content } = await userService.update(data)
      setCurrentUser(content)
    } catch (e) {
      errorCatcher(e)
    }
  }

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const signUp = async ({ email, password, ...rest }) => {
    try {
      const { data } = await httpAuth.post('accounts:signUp', { email, password, returnSecureToken: true })
      setTokens(data)
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).substring(7)}.svg`,
        ...rest
      })
    } catch (e) {
      throw errorCatcher(e)
    }
  }

  const signIn = async ({ email, password }) => {
    try {
      const { data } = await httpAuth.post('accounts:signInWithPassword', { email, password, returnSecureToken: true })
      setTokens(data)
      await getUserData()
    } catch (e) {
      throw errorCatcher(e)
    }
  }

  const logout = () => {
    localStorageService.removeAuthData()
    setCurrentUser(null)
    history.push('/')
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
      <AuthContext.Provider value={{ signUp, signIn, currentUser, logout, updateUser }}>
        {!isLoading ? children : 'Loading...'}
      </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default AuthProvider