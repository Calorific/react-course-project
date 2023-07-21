import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom'
import userApi from '../API/fake.api/user.api'
import QualitiesList from './qualitiesList'

const UserPage = () => {
  const { id } = useParams()
  const [user, setUser] = useState()
  useEffect(() => {
    userApi.getById(id).then(data => setUser(data))
  })

  const history = useHistory()
  const handlePushingToUsers = () => {
    history.push('/users')
  }
  return (
    <>
      {user ? (
        <>
          <h1>{user.name}</h1>
          <h2>Профессия: {user.profession.name}</h2>
          <QualitiesList qualities={user.qualities} />
          <p>Встреч: {user.completedMeetings}</p>
          <h3>Рейтинг: {user.rate}</h3>
          <button onClick={handlePushingToUsers}>Все пользователи</button>
        </>
      ) : <h1>Loading...</h1>}
    </>
  )
}

UserPage.propTypes = {

}

export default UserPage