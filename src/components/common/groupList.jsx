import React from 'react'
import PropTypes from 'prop-types'

const GroupList = ({ items, valueProperty, contentProperty, onItemSelect, selectedItem }) => {
  const allItems = Array.isArray(items) ? items : Object.keys(items).map(key => items[key])
  return (
    <>
      <ul className="list-group">
        {allItems.map(item => (
            <li
              className={'list-group-item' + (item === selectedItem ? ' active' : '')}
              key={item[valueProperty]}
              onClick={() => onItemSelect(item)}
              role="button"
            >{item[contentProperty]}</li>
        ))}
      </ul>
    </>
  )
}

GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
}

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.object
}

export default GroupList