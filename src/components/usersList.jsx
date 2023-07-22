import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import api from '../API'
import SearchStatus from './searchStatus'
import Pagination from './pagination'
import paginate from '../utils/paginate'
import GroupList from './groupList'
import UsersTable from './usersTable'

import _ from 'lodash'
import TextField from './textField'
const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [userSearch, setUserSearch] = useState('')
  const pageSize = 8

  const [users, setUsers] = useState()

  useEffect(() => {
    api.users.fetchAll().then(data => setUsers(data))
  }, [])


  useEffect(() => {
    api.professions.fetchAll().then(data => {
      setProfessions(data)
    })
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const clearFilter = () => {
    setSelectedProf(null)
  }

  const handleDelete = id => {
    setUsers(users.filter(user => user._id !== id))
  }

  const handleMarking = id => {
    const allUsers = [...users]
    const user = allUsers.find(u => u._id === id)
    user.bookmark = !user.bookmark

    setUsers(allUsers)
  }

  const handleSearch = e => {
    const search = e.target.value
    setUserSearch(search)
    clearFilter()
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleProfessionSelect = item => {
    setSelectedProf(item)
    setUserSearch('')
  }

  const handleSort = item => {
    setSortBy(item)
  }

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter(u => u.profession._id === selectedProf._id)
      : userSearch ? users.filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase().trim())) : users
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const userCrop = paginate(sortedUsers, currentPage, pageSize)

    return (
        <div className="d-flex">
          {professions && count ?
            <div className="d-flex flex-column flex-shrink-0 p-3">
              <GroupList
                  selectedItem={selectedProf}
                  items={professions}
                  onItemSelect={handleProfessionSelect}
              />
              <button className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить</button>
            </div> : ''}

          <div className="d-flex flex-column">
            <h2>{<SearchStatus length={count}/>}</h2>
            <TextField name='userSearch' value={userSearch} onChange={handleSearch} placeholder={'Search...'} />
            {count ?
              <UsersTable
                  users={userCrop}
                  onSort={handleSort}
                  onDelete={handleDelete}
                  onMarking={handleMarking}
                  selectedSort={sortBy}
              /> : ''
            }
            <div className="d-flex justify-content-center">
              <Pagination itemsCount={count} pageSize={pageSize} onPageChange={handlePageChange}
                          currentPage={currentPage}/>
            </div>
          </div>
        </div>
    )
  }
  return <h4>Loading...</h4>
}

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  rest: PropTypes.arrayOf(PropTypes.func)
}

export default UsersList