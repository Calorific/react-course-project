import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLoggedIn, getUsersLoadingStatus, loadUsersList } from '../../../store/users'
import { loadQualitiesList } from '../../../store/qualities'
import { loadProfessionsList } from '../../../store/professions'

const UsersLoader = ({ children }) => {
  const dispatch = useDispatch()

  const isLoggedIn = useSelector(getIsLoggedIn())
  const usersStatusLoading = useSelector(getUsersLoadingStatus())

  useEffect(() => {
    dispatch(loadQualitiesList())
    dispatch(loadProfessionsList())
    if (isLoggedIn)
      dispatch(loadUsersList())
  }, [isLoggedIn])

  if (usersStatusLoading)
    return <h3>Loading...</h3>

  return children
}

UsersLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default UsersLoader