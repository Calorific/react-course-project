import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import SearchStatus from '../../searchStatus'
import Pagination from '../../common/pagination'
import paginate from '../../../utils/paginate'
import GroupList from '../../common/groupList'
import UsersTable from '../../usersTable'

import TextField from '../../common/form/textField'
import { useSelector } from 'react-redux'
import { getProfessions, getProfessionsLoadingStatus } from '../../../store/professions'
import { getCurrentUserId, getUsersList } from '../../../store/users'

const UsersListPage = () => {
  const users = useSelector(getUsersList())
  const currentUserId = useSelector(getCurrentUserId())

  const professions = useSelector(getProfessions())
  const professionsLoading = useSelector(getProfessionsLoadingStatus())


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
  }

  const handleSearch = data => {
    setUserSearch(data.value)
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
      return filteredUsers.filter(u => u._id !== currentUserId)
    }

    const filteredUsers = filterUsers(users)
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const userCrop = paginate(sortedUsers, currentPage, pageSize)
    return (
        <div className="d-flex">
          {professions && !professionsLoading ?
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