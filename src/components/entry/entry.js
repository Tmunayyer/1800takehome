import React from 'react'
import PropTypes from 'prop-types'
import './entry.css'

export function Entry(props) {
  const { userId, title, body } = props.data

  return (
    <div className={'entry-card'}>
      <div className={'card-content'}>
        <div className={'user'}>{userId}</div>
        <div className={'title'}>{title}</div>
        <div className={'body'}>{body}</div>
      </div>
    </div>
  )
}

Entry.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
  }),
  index: PropTypes.number.isRequired,
}
