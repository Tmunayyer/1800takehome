import React from 'react'
import './screen.css'
import PropTypes from 'prop-types'

export function Screen(props) {
  const { style, children } = props

  return (
    <div className={'screen'} style={style}>
      {children}
    </div>
  )
}

Screen.propTypes = {
  // style object to override styling
  style: PropTypes.object,

  // contents of the screen
  children: PropTypes.element.isRequired,
}
