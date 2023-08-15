import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import { useAuth } from './useAuth'

const UserContext = React.createContext()

export const useUsers = () => {
  return useContext(UserContext)
}

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getUsers().then()
  }, [])

  useEffect(() => {
    if (loading) return

    const newUsers = [...users]
    const idx = newUsers.findIndex(u => u._id === currentUser._id)
    newUsers[idx] = currentUser
    setUsers(newUsers)
  }, [currentUser])
  
  useEffect(() => {
    if (error) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  async function getUsers() {
    try {
      const { content } = await userService.get()
      setUsers(content)
      setLoading(false)
    } catch (e) {
      errorCatcher(e)
    }
  }

  function getUserById(userId) {
    return users.find(u => u._id === userId)
  }

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }

  return (
      <UserContext.Provider value={{ users, getUserById }}>
        {!loading ? children : 'Loading...'}
      </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default UserProvider