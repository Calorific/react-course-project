import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import CommentForm from '../../common/comments/commentForm'
import Comment from '../../common/comments/comment'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { getComments, getCommentsLoadingStatus, loadCommentsList, removeComment } from '../../../store/comments'

const Comments = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(loadCommentsList(id))
  }, [id])

  const isLoading = useSelector(getCommentsLoadingStatus())
  const comments = useSelector(getComments())


  const handleDelete = id => {
    dispatch(removeComment(id))
  }

  const sortedComments = _.orderBy(comments, 'created_at', 'desc')

  return (
    <>
      <CommentForm id={id} />
      {!isLoading ? <div className="card mb-3">
        <div className="card-body">
          <h2>Comments</h2>
          <hr/>
          {sortedComments.map(c => <Comment comment={c} key={c._id} onDelete={handleDelete} />)}
        </div>
      </div> : 'Loading...'}
    </>
  )
}

export default Comments