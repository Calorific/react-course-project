import React from 'react'
import PropTypes from 'prop-types'
import QualitiesList from '../qualities'
import { useAuth } from '../../../hooks/useAuth'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import Profession from '../../profession'

const UserInfo = ({ name, profession, rate, qualities, completedMeetings, image, _id }) => {
  const { currentUser } = useAuth()
  const history = useHistory()

  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          {currentUser._id === _id ? <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
            <i className="bi bi-gear" onClick={() => history.push(history.location.pathname + '/edit')}></i>
          </button> : ''}
          <div className="d-flex flex-column align-items-center text-center position-relative">
            <img src={image} className="rounded-circle shadow-1-strong me-3" alt="avatar" width="65" height="65"/>
            <div className="mt-3">
              <h4>{name}</h4>
              <p className="text-secondary mb-1">
                <Profession id={profession} />
              </p>
              <div className="text-muted">
                <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                <i className="bi bi-caret-up text-secondary" role="button"></i>
                <span className="ms-2">{rate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body d-flex flex-column justify-content-center text-center">
          <h5 className="card-title">
            <span>Qualities</span>
          </h5>
          <p className="card-text">
            <QualitiesList qualities={qualities} />
          </p>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body d-flex flex-column justify-content-center text-center">
          <h5 className="card-title">
            <span>Completed meetings</span>
          </h5>

          <h1 className="display-1">{completedMeetings}</h1>
        </div>
      </div>
    </>
  )
}

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  qualities: PropTypes.array.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  handleClick: PropTypes.func,
  image: PropTypes.string,
  _id: PropTypes.string,
}

export default UserInfo