import React from 'react'
import PropTypes from 'prop-types'
import Bookmark from './bookmark'
import QualitiesList from './qualitiesList'
import Table from './table'
import { Link } from 'react-router-dom'

const UsersTable = ({ users, onSort, selectedSort, onMarking, onDelete }) => {
  const columns = {
    name: { path: 'name', name: 'Имя', component: user => <Link to={`/users/${user._id}`}>{user.name}</Link> },
    qualities: { name: 'Качества', component: user => <QualitiesList qualities={user.qualities} /> },
    professions: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: user => <Bookmark isFavourite={user.bookmark} onMarking={() => onMarking(user._id)}/>
    },
    delete: {
      component: user => (
        <button className="btn btn-danger" onClick={() => onDelete(user._id)}>
          Удалить
        </button>
      )
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
  onMarking: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default UsersTable