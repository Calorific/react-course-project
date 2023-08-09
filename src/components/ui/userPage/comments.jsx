import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import CommentForm from '../../common/comments/commentForm'
import Comment from '../../common/comments/comment'
import { useComments } from '../../../hooks/useComments'
import _ from 'lodash'

const Comments = () => {
  const { id } = useParams()
  const { comments, removeComment } = useComments()

  const handleDelete = id => {
    removeComment(id)
  }

  const sortedComments = _.orderBy(comments, 'created_at', 'desc')

  return (
    <>
      <CommentForm id={id} />
      {comments.length ? <div className="card mb-3">
        <div className="card-body">
          <h2>Comments</h2>
          <hr/>
          {sortedComments.map(c => <Comment comment={c} key={c._id} onDelete={handleDelete} />)}
        </div>
      </div> : null}
    </>
  )
}

export default Comments