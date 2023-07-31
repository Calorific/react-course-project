import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import userApi from '../../../API/fake.api/user.api'

const Comment = ({ comment, onDelete }) => {
  const [user, setUser] = useState({})
  useEffect(() => {
    userApi.getById(comment.userId).then(user => setUser(user))
  }, [])

  const getTime = createdAt => {
    const diff = Date.now() - createdAt
    if (diff <= 60 * 1000)
      return '1 минуту назад'
    if (diff <= 5 * 60 * 1000)
      return '5 минут назад'
    if (diff <= 10 * 60 * 1000)
      return '10 минут назад'
    if (diff <= 30 * 60 * 1000)
      return '30 минут назад'

    const date = new Date(createdAt)

    if (diff <= 24 * 60 * 60 * 1000)
      return `${date.getHours()}.${date.getMinutes()}`

    if (diff <= 365 * 24 * 60 * 60 * 1000)
      return date.toLocaleString('default', { month: 'long', day: 'numeric' })

    return date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
      <>
        <div className="bg-light card-body mb-3">
          <div className="row">
            <div className="col">
              {Object.keys(user).length ? <div className="d-flex flex-start">
                <img src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).substring(7)}.svg`}
                    className="rounded-circle shadow-1-strong me-3" alt="avatar" width="65" height="65"/>
                <div className="flex-grow-1 flex-shrink-1">
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-1">
                        {user.name} {' '}
                        <span className="small">{getTime(+comment.created_at)}</span>
                      </p>
                      <button
                        className="btn btn-sm text-primary d-flex align-items-center"
                        onClick={() => onDelete(comment._id)}
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                    </div>
                    <p className="small mb-0">{comment.content}</p>
                  </div>
                </div>
              </div> : <p>Loading...</p>}
            </div>
          </div>
        </div>
      </>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
}

export default Comment