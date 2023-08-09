import React from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import UserInfo from '../../ui/userPage/userInfo'
import Comments from '../../ui/userPage/comments'
import { useSelector } from 'react-redux'
import { getUserById } from '../../../store/users'

const UserPage = () => {
  const { id } = useParams()
  const user = useSelector(getUserById(id))
  
  return (
    <>
      {Object.keys(user).length && <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserInfo {...user} />
          </div>
          <div className="col-md-8">
            <Comments />
          </div>
        </div>
      </div>}
    </>
  )
}

export default UserPage