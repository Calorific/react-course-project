import { createSlice } from '@reduxjs/toolkit'
import { isOutdated } from '../utils/isOutdated'
import professionService from '../services/profession.service'

const professionsSlice = createSlice({
  name: 'professions',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionsRequested: state => {
      state.isLoading = true
    },
    professionsReceived: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    professionsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { reducer: professionsReducer, actions } = professionsSlice
const { professionsRequested, professionsReceived, professionsRequestFailed } = actions

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities

  if (!isOutdated(lastFetch))
    return

  dispatch(professionsRequested())

  try {
    const { content } = await professionService.fetchAll()
    dispatch(professionsReceived(content))
  } catch (e) {
    dispatch(professionsRequestFailed(e.message))
  }
}

export const getProfessionById = professionId => state => {
  if (state.professions.entities)
    for (const profession of state.professions.entities)
      if (profession._id === professionId)
        return profession

  return {}
}

export const getProfessions = () => state => state.professions.entities
export const getProfessionsLoadingStatus = () => state => state.professions.isLoading


export default professionsReducer