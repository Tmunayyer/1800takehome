import React from 'react'
import PropTypes from 'prop-types'

import './modal.css'

export function Modal(props) {
  const { show, onClickOutside, children } = props
  if (!show) return null

  return (
    <div className={'modal-container'}>
      <div
        id={'outside'}
        className={'content-container'}
        onClick={(e) => {
          if (e.target.id !== 'outside') return
          onClickOutside()
        }}
      >
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClickOutside: PropTypes.func.isRequired,

  children: PropTypes.element.isRequired,
}
