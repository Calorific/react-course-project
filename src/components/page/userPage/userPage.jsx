import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom'
import userApi from '../../../API/fake.api/user.api'
import QualitiesList from '../../ui/qualities/qualitiesList'

const UserPage = () => {
  const { id } = useParams()
  const [user, setUser] = useState({})
  useEffect(() => {
    userApi.getById(id).then(data => setUser(data))
  }, [])

  const history = useHistory()
  const handlePushingToUsers = () => {
    history.push('/users/' + id + '/edit')
  }
  return (
    <>
      {user && Object.keys(user).length ? (
        <>
          <h1>{user.name}</h1>
          <h2>Профессия: {user.profession.name}</h2>
          <QualitiesList qualities={user.qualities} />
          <p>Встреч: {user.completedMeetings}</p>
          <h3>Рейтинг: {user.rate}</h3>
          <button onClick={handlePushingToUsers}>Изменить</button>
        </>
      ) : <h1>Loading...</h1>}
    </>
  )
}

export default UserPage