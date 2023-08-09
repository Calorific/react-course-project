import { createAction, createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments.service'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    commentsRequested: state => {
      state.isLoading = true
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    commentAdded: (state, action) => {
      state.entities.push(action.payload)
      state.isLoading = false
    },
    commentRemoved: (state, action) => {
      state.entities = state.entities.filter(c => c._id !== action.payload)
      state.isLoading = false
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { reducer: commentsReducer, actions } = commentsSlice
const { commentsRequested, commentsReceived, commentsRequestFailed, commentAdded, commentRemoved } = actions

const commentCreateRequested = createAction('comments/commentCreateRequested')
const commentRemoveRequested = createAction('comments/commentRemoveRequested')

export const loadCommentsList = id => async dispatch => {
  dispatch(commentsRequested())

  try {
    const { content } = await commentService.getComments(id)
    dispatch(commentsReceived(content))
  } catch (e) {
    dispatch(commentsRequestFailed(e.message))
  }
}

export const createComment = comment => async dispatch => {
  dispatch(commentCreateRequested())

  try {
    const { content } = await commentService.createComment(comment)
    dispatch(commentAdded(content))
  } catch (e) {
    dispatch(commentsRequestFailed(e.message))
  }
}

export const removeComment = id => async dispatch => {
  dispatch(commentRemoveRequested())

  try {
    const { content } = await commentService.removeComment(id)
    if (content === null)
      dispatch(commentRemoved(id))
  } catch (e) {
    dispatch(commentsRequestFailed(e.message))
  }
}

export const getComments = () => state => state.comments.entities
export const getCommentsLoadingStatus = () => state => state.comments.isLoading


export default commentsReducer