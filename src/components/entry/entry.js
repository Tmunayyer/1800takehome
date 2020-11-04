import React from 'react'
import PropTypes from 'prop-types'
import './entry.css'

export function Entry(props) {
  const { userId, title, body } = props.data
  const { onClick } = props

  return (
    <div className={'entry-card'} onClick={onClick}>
      <div className={'card-content'}>
        <div className={'user'}>{userId}</div>
        <div className={'title'}>{title}</div>
        <div className={'body'}>{body}</div>
      </div>
    </div>
  )
}

Entry.propTypes = {
  // entry from the server
  data: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
  }),

  // index in the array
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func,
}
