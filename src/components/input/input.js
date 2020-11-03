import React from 'react'
import './input.css'
import PropTypes from 'prop-types'

import { Icon } from '../index'

export function Input(props) {
  const { icon, placeholder } = props

  return (
    <div className={'input-container'}>
      {icon ? <Icon icon={icon} /> : null}
      <input className={'input'} type="text" placeholder={placeholder}></input>
    </div>
  )
}

Input.propTypes = {
  placeholder: PropTypes.string,
  icon: PropTypes.string,
}
