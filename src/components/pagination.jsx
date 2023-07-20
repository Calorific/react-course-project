import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize)
  if (pageCount === 1) return null
  const pages = _.range(1, pageCount + 1)

  return (
    <nav>
      <ul className="pagination">
        {pages.map(i => (
            <li className={'page-item' + (i === currentPage ? ' active' : '')} key={'page_' + i}>
              <button className="page-link" onClick={() => onPageChange(i)}>{i}</button>
            </li>
        ))}
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default Pagination