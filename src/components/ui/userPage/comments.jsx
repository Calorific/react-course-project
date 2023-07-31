import React, { useEffect, useState } from 'react'
import CommentForm from './commentForm'
import commentsApi from '../../../API/fake.api/comments.api'
import Comment from './comment'
import { useParams } from 'react-router-dom/cjs/react-router-dom'

const Comments = () => {
  const { id } = useParams()
  const [comments, setComments] = useState([])
  const [showComments, setShowComments] = useState(true)
  useEffect(() => {
    commentsApi.fetchCommentsForUser(id).then(comments => {
      setComments(comments.sort((a, b) => b.created_at - a.created_at))
      setShowComments(!!comments.length)
    })
  }, [])
  const handleDelete = id => {
    setComments(prevState => {
      const filtered = prevState.filter(c => c._id !== id)
      setShowComments(!!filtered.length)
      return filtered
    })
    commentsApi.remove(id).then(() => {})
  }

  const handleAdd = comment => {
    if (!comments.length)
      setShowComments(true)
    setComments([comment, ...comments])
  }

  return (
    <>
      <CommentForm id={id} onAdd={handleAdd} />
      {showComments ? <div className="card mb-3">
        <div className="card-body">
          <h2>Comments</h2>
          <hr/>
          {comments.length
            ? comments.map(c => <Comment comment={c} key={c._id} onDelete={handleDelete}/>)
            : <p>Loading...</p>}
        </div>
      </div> : <h4>Комментарии отсутствуют</h4>}
    </>
  )
}

export default Comments