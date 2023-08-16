import React from 'react'
import PropTypes from 'prop-types'
import Bookmark from './common/bookmark'
import QualitiesList from './ui/qualities/qualitiesList'
import Table from './common/table/table'

import { Link } from 'react-router-dom'
import Profession from './profession'

const UsersTable = ({ users, onSort, selectedSort, onMarking }) => {
  const columns = {
    name: { path: 'name', name: 'Имя', component: user => <Link to={`/users/${user._id}`}>{user.name}</Link> },
    qualities: { name: 'Качества', component: user => <QualitiesList qualities={user.qualities} /> },
    professions: { name: 'Профессия', component: user => <Profession id={user.profession} /> },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: user => <Bookmark userId={user._id} onMarking={() => onMarking(user._id)}/>
    }
  }

  return (
    <>
      <Table {...{ onSort, selectedSort, columns, data: users }}></Table>
    </>
  )
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onMarking: PropTypes.func.isRequired
}

export default UsersTable