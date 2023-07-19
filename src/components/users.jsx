import React, {useState} from 'react'
import api from '../API'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = id => {
    setUsers(users.filter(user => user._id !== id))
  }

  const renderPhrase = n => {
    if (!n)
      return <span className='badge bg-danger'>Никто с тобой не тусанет</span>

    let form
    if (!(n % 100 > 4 && n % 100 < 21) && n % 10 > 1 && n % 10 < 5)
      form = 'человека'
    else
      form = 'человек'

    return <span className='badge bg-primary'>{`${n} ${form} тусанет с тобой сегодня`}</span>
  }

  const getQualityBadge = q => <span className={"badge m-1  bg-" + q.color} key={q._id}>{q.name}</span>

  const getUserRow = user => (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>
        {user.qualities.map(getQualityBadge)}
      </td>
      <td>
        {user.profession.name}
      </td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}/5</td>
      <td><button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Удалить</button></td>
    </tr>
  )

  return (<>
    <h2>{renderPhrase(users.length)}</h2>
    {users.length ?
    <table className="table">
      <thead>
      <tr>
        <th scope="col">Имя</th>
        <th scope="col">Качества</th>
        <th scope="col">Профессия</th>
        <th scope="col">Встретился, раз</th>
        <th scope="col">Оценка</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
        {users.map(getUserRow)}
      </tbody>
    </table> : ''}
  </>)
}

export default Users