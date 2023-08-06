import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import SearchStatus from '../../searchStatus'
import Pagination from '../../common/pagination'
import paginate from '../../../utils/paginate'
import GroupList from '../../common/groupList'
import UsersTable from '../../usersTable'

import _ from 'lodash'
import TextField from '../../common/form/textField'
import { useUsers } from '../../../hooks/useUsers'
import { useProfessions } from '../../../hooks/useProfessions'
import { useAuth } from '../../../hooks/useAuth'

const UsersListPage = () => {
  const { users } = useUsers()
  const { currentUser } = useAuth()
  const { professions, isLoading: professionsLoading } = useProfessions()

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [userSearch, setUserSearch] = useState('')
  const pageSize = 8

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const clearFilter = () => {
    setSelectedProf(null)
  }

  const handleMarking = id => {
    const allUsers = [...users]
    const user = allUsers.find(u => u._id === id)
    user.bookmark = !user.bookmark
    console.log(allUsers)
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
    function filterUsers(data) {
      const filteredUsers = selectedProf
        ? data.filter(u => u.profession === selectedProf._id)
        : userSearch ? data.filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase().trim())) : data
      return filteredUsers.filter(u => u._id !== currentUser._id)
    }

    const filteredUsers = filterUsers(users)
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const userCrop = paginate(sortedUsers, currentPage, pageSize)
    return (
        <div className="d-flex">
          {professions && count && !professionsLoading ?
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

UsersListPage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  rest: PropTypes.arrayOf(PropTypes.func)
}

export default UsersListPage