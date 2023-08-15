import { createSlice } from '@reduxjs/toolkit'
import qualityService from '../services/qualities.service'
import { isOutdated } from '../utils/isOutdated'


const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    qualitiesRequested: state => {
      state.isLoading = true
    },
    qualitiesReceived: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    qualitiesRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { reducer: qualitiesReducer, actions } = qualitiesSlice
const { qualitiesRequested, qualitiesReceived, qualitiesRequestFailed } = actions

export const loadQualitiesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities

  if (!isOutdated(lastFetch))
    return

  dispatch(qualitiesRequested())

  try {
    const { content } = await qualityService.fetchAll()
    dispatch(qualitiesReceived(content))
  } catch (e) {
    dispatch(qualitiesRequestFailed(e.message))
  }
}

export const getQualitiesByIds = qualitiesIds => state => {
  const qualitiesArray = []

  if (state.qualities.entities) {
    for (const id of qualitiesIds) {
      for (const quality of state.qualities.entities) {
        if (quality._id === id) {
          qualitiesArray.push(quality)
          break
        }
      }
    }
  }

  return qualitiesArray
}

export const getQualities = () => state => state.qualities.entities
export const getQualitiesLoadingStatus = () => state => state.qualities.isLoading


export default qualitiesReducer