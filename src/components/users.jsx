import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import api from '../API'
import User from './user'
import SearchStatus from './searchStatus'
import Pagination from './pagination'
import paginate from '../utils/paginate'
import GroupList from './groupList'

const Users = ({ users, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()

  const pageSize = 2

  useEffect(() => {
    api.professions.fetchAll().then(data => {
      setProfessions(data)
    })
  }, [])
  
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleProfessionSelect = item => {
    setSelectedProf(item)
  }

  const filteredUsers = selectedProf ? users.filter(u => u.profession._id === selectedProf._id) : users
  const count = filteredUsers.length
  const userCrop = paginate(filteredUsers, currentPage, pageSize)
  const clearFilter = () => {
    setSelectedProf(null)
  }

  return (
    <div className="d-flex">
      {professions &&
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить</button>
        </div>
      }

      <div className="d-flex flex-column">
        <h2>{<SearchStatus length={count} />}</h2>
        {count ?
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
          {userCrop.map(user => <User user={user} {...rest} key={user._id} />)}
          </tbody>
        </table> : ''}
        <div className="d-flex justify-content-center">
          <Pagination itemsCount={count} pageSize={pageSize} onPageChange={handlePageChange} currentPage={currentPage} />
        </div>
      </div>

    </div>
  )
}

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  rest: PropTypes.arrayOf(PropTypes.func)
}

export default Users