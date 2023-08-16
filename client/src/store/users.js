import { createAction, createSlice } from '@reduxjs/toolkit'
import userService from '../services/user.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import history from '../utils/history'
import generateAuthError from '../utils/generateAuthError'

const initialState = {
  entities: null,
  isLoading: false,
  error: null,
  auth: null,
  isLoggedIn: false,
  dataLoaded: false
}

if (localStorageService.getAccessToken()) {
  initialState.auth = { userId: localStorageService.getUserId() }
  initialState.isLoggedIn = true
  initialState.isLoading = true
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: state => {
      state.isLoading = true
    },
    usersReceived: (state, action) => {
      state.entities = action.payload
      state.dataLoaded = true
      state.isLoading = false
    },
    userUpdated: (state, action) => {
      const idx = state.entities.findIndex(u => u._id === action.payload._id)
      state.entities[idx] = action.payload
    },
    userUpdateFailed: (state, action) => {
      state.error = action.payload
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload
      state.isLoggedIn = true
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities))
        state.entities = []
      state.entities.push(action.payload)
    },
    userLoggedOut: state => {
      state.entities = null
      state.isLoggedIn = false
      state.auth = null
      state.dataLoaded = false
    },
    authRequested: state => {
      state.error = null
    }
  }
})

const { reducer: usersReducer, actions } = usersSlice
const { authRequested, usersRequested, usersReceived, usersRequestFailed, authRequestSuccess, authRequestFailed, userCreated, userLoggedOut, userUpdated, userUpdateFailed } = actions

const userUpdateRequested = createAction('users/userUpdateRequested')

export const login = ({ payload, redirect }) => async dispatch => {
  dispatch(authRequested())
  const { email, password } = payload

  try {
    const data = await authService.login({ email, password })
    localStorageService.setTokens(data)
    dispatch(authRequestSuccess({ userId: data.userId }))
    history.push(redirect)
  } catch (e) {
    const error = generateAuthError(e)
    dispatch(authRequestFailed(error || e.message))
  }
}

export const signUp = payload => async dispatch => {
  dispatch(authRequested())
  try {
    const data = await authService.register(payload)
    localStorageService.setTokens(data)
    dispatch(authRequestSuccess({ userId: data.userId }))
    history.push('/users')
  } catch (e) {
    dispatch(authRequestFailed(e.message))
  }
}

export const loadUsersList = () => async dispatch => {
  dispatch(usersRequested())

  try {
    const { content } = await userService.fetchAll()
    dispatch(usersReceived(content))
  } catch (e) {
    dispatch(usersRequestFailed(e.message))
  }
}

export const updateUser = data => async dispatch => {
  dispatch(userUpdateRequested())

  try {
    const { content } = await userService.update(data)
    dispatch(userUpdated(content))
    history.push(`/users/${content._id}`)
  } catch (e) {
    dispatch(userUpdateFailed(e.message))
  }
}

export const logout = () => async dispatch => {
  localStorageService.removeAuthData()
  dispatch(userLoggedOut())
  history.push('/')
}

export const getCurrentUserData = () => state => {
  if (!state.users.entities)
    return null
  return state.users.entities.find(u => u._id === state.users.auth.userId)
}
export const getUsersList = () => state => state.users.entities
export const getUserById = id => state => {
  if (state.users.entities)
    return state.users.entities.find(u => u._id === id)
}
export const getIsLoggedIn = () => state => state.users.isLoggedIn
export const getDataStatus = () => state => state.users.dataLoaded
export const getCurrentUserId = () => state => state.users.auth.userId
export const getUsersLoadingStatus = () => state => state.users.isLoading
export const getAuthError = () => state => state.users.error

export default usersReducer