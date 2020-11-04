import React from 'react'
import PropTypes from 'prop-types'
import './entry.css'

import { useDispatch } from 'react-redux'
import { setEditEntry } from '../../store/entry/entry'

export function Entry(props) {
  const { id, userId, title, body } = props.data

  const dispatch = useDispatch()

  return (
    <div
      className={'entry-card'}
      onClick={() => {
        dispatch(setEditEntry(id))
      }}
    >
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
}
