import React from 'react'
import UserEditForm from '../../ui/userEditForm'
import { useParams } from 'react-router-dom/cjs/react-router-dom'

const UserEditPage = () => {
  const { id } = useParams()

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <UserEditForm id={id} />
        </div>
      </div>
    </div>
  )
}

export default UserEditPage