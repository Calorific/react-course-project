import React from 'react'
import PropTypes from 'prop-types'

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = item => {
    if (selectedSort.path === item)
      onSort({ ...selectedSort, order: selectedSort.order === 'asc' ? 'desc' : 'asc' })
    else onSort({ path: item, order: 'asc' })
  }

  return (
    <>
      <thead>
      <tr>
        {Object.keys(columns).map(col => (
            <th
              key={col} scope="col"
              onClick={columns[col].path ? () => handleSort(columns[col].path) : undefined}
              role={columns[col].path && 'button'}
            >
              {columns[col].name}
              {selectedSort.path === columns[col].path
                  && <i className={`bi bi-caret-${selectedSort.order === 'asc' ? 'up' : 'down'}-fill`}></i>}
            </th>
        ))}
      </tr>
      </thead>
    </>
  )
}

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
}

export default TableHeader