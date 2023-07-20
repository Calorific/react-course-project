import React, { useState } from 'react'
import PropTypes from 'prop-types'

import User from './user'
import SearchStatus from './searchStatus'
import Pagination from './pagination'
import paginate from '../utils/paginate'

const Users = ({ users, ...rest }) => {
  const count = users.length
  const pageSize = 4

  const [currentPage, setCurrentPage] = useState(1)
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  
  const userCrop = paginate(users, currentPage, pageSize)

  return (<>
    <h2>{<SearchStatus length={users.length} />}</h2>
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

    <Pagination itemsCount={count} pageSize={pageSize} onPageChange={handlePageChange} currentPage={currentPage}/>
  </>)
}

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  rest: PropTypes.arrayOf(PropTypes.func)
}

export default Users