import { createAction, createSlice } from '@reduxjs/toolkit'
import userService from '../services/user.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import { randomInt } from '../utils/randomInt'
import history from '../utils/history'

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
    }
  }
})

const { reducer: usersReducer, actions } = usersSlice
const { usersRequested, usersReceived, usersRequestFailed, authRequestSuccess, authRequestFailed, userCreated, userLoggedOut, userUpdated, userUpdateFailed } = actions

const authRequested = createAction('users/authRequested')
const userCreateRequested = createAction('users/userCreateRequested')
const userUpdateRequested = createAction('users/userUpdateRequested')
const createUserFailed = createAction('users/createUserFailed')

export const login = ({ payload, redirect }) => async dispatch => {
  dispatch(authRequested())
  const { email, password } = payload

  try {
    const data = await authService.login({ email, password })
    dispatch(authRequestSuccess({ userId: data.localId }))
    localStorageService.setTokens(data)
    history.push(redirect)
  } catch (e) {
    dispatch(authRequestFailed(e.message))
  }
}

const createUser = payload => async dispatch => {
  dispatch(userCreateRequested())
  
  try {
    const { content } = await userService.create(payload)
    dispatch(userCreated(content))
    history.push('/users')
  } catch (e) {
    console.log(e.message)
    dispatch(createUserFailed())
  }
}


export const signUp = ({ email, password, ...rest }) => async dispatch => {
  dispatch(authRequested())
  try {
    const data = await authService.register({ email, password })
    localStorageService.setTokens(data)
    dispatch(authRequestSuccess({ userId: data.localId }))
    dispatch(createUser({
      _id: data.localId,
      email,
      rate: randomInt(1, 5),
      completedMeetings: randomInt(0, 200),
      image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).substring(7)}.svg`,
      ...rest
    }))
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

export default usersReducer