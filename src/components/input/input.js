import React from 'react'
import './input.css'
import PropTypes from 'prop-types'

import { Icon } from '../index'

export function Input(props) {
  const { icon, placeholder, onChangeHandler } = props

  return (
    <div className={'input-container'}>
      {icon ? <Icon icon={icon} /> : null}
      <input
        className={'input'}
        type="text"
        placeholder={placeholder}
        onChange={onChangeHandler}
      ></input>
    </div>
  )
}

Input.propTypes = {
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
}
