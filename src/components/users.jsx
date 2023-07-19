import React, {useState} from 'react'
import api from '../API'
import User from './user'
import SearchStatus from './searchStatus'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = id => {
    setUsers(users.filter(user => user._id !== id))
  }

  const handleMarking = id => {
    const user = users.find(u => u._id === id)
    user.bookmark = !user.bookmark

    setUsers([...users])
  }

  return (<>
    <h2>{<SearchStatus length={users.length} />}</h2>
    {users.length ?
    <table className="table">
      <thead>
      <tr>
        <th scope="col">Имя</th>
        <th scope="col">Качества</th>
        <th scope="col">Профессия</th>
        <th scope="col">Встретился, раз</th>
        <th scope="col">Оценка</th>
        <th scope="col">Избранное</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
        {users.map(user => <User user={user} onDelete={handleDelete} onMarking={handleMarking} key={user._id} />)}
      </tbody>
    </table> : ''}
  </>)
}

export default Users