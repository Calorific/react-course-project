import React from 'react'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom'
import { useUsers } from '../../../hooks/useUsers'
import UserInfo from '../../ui/userPage/userInfo'
import Comments from '../../ui/userPage/comments'
import { CommentsProvider } from '../../../hooks/useComments'

const UserPage = () => {
  const { id } = useParams()
  const { getUserById } = useUsers()
  const user = getUserById(id)
  
  return (
    <>
      {Object.keys(user).length && <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserInfo {...user} />
          </div>
          <div className="col-md-8">
            <CommentsProvider>
              <Comments />
            </CommentsProvider>
          </div>
        </div>
      </div>}
    </>
  )
}

export default UserPage