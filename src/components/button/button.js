import React from 'react'
import './button.css'
import PropTypes from 'prop-types'

export function Button(props) {
  const { text, onClick, disabled } = props

  return (
    <button
      onClick={() => {
        if (disabled) return
        onClick()
      }}
    >
      <div>{text}</div>
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  color: PropTypes.string,
}
