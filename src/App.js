import React, { useEffect, useState } from 'react'
import Users from './components/users'
import api from './API'


const App = () => {
  const [users, setUsers] = useState()

  useEffect(() => {
    api.users.fetchAll().then(data => setUsers(data))
  }, [])

  const handleDelete = id => {
    setUsers(users.filter(user => user._id !== id))
  }

  const handleMarking = id => {
    const allUsers = [...users]
    const user = allUsers.find(u => u._id === id)
    user.bookmark = !user.bookmark

    setUsers(allUsers)
  }

  return (
    <>
      <div className="App">
        {users && <Users users={users} onDelete={handleDelete} onMarking={handleMarking} />}
      </div>
    </>

  )
}

export default App
