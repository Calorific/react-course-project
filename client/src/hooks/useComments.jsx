import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { useAuth } from './useAuth'
import { nanoid } from 'nanoid'
import commentService from '../services/comments.service'

const CommentsContext = React.createContext(undefined)

export const useComments = () => useContext(CommentsContext)

export const CommentsProvider = ({ children }) => {
  const { currentUser } = useAuth()
  const { id } = useParams()

  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getComments().then(() => {})
  }, [id])
  
  useEffect(() => {
    if (error) {
      toast.error(error.message)
      setError(null)
    }
  }, [error])

  const getComments = async () => {
    try {
      const { content } = await commentService.getComments(id)
      setComments(content)
    } catch (e) {
      errorCatcher(e)
    } finally {
      setLoading(false)
    }
  }

  const createComment = async data => {
    const comment = {
      ...data,
      pageId: id,
      created_at: Date.now(),
      userId: currentUser._id,
      _id: nanoid()
    }

    try {
      const { content } = await commentService.createComment(comment)
      setComments(prevState => [...prevState, content])
      return content
    } catch (e) {
      errorCatcher(e)
    }
  }

  const removeComment = async id => {
    try {
      const { content } = await commentService.removeComment(id)
      if (content === null)
        setComments(prevState => prevState.filter(c => c._id !== id))
    } catch (e) {
      errorCatcher(e)
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }

  return (
      <CommentsContext.Provider value={{ loading, comments, createComment, removeComment }}>
        {children}
      </CommentsContext.Provider>
  )
}

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}