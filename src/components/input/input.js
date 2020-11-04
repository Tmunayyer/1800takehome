import React from 'react'
import './input.css'
import PropTypes from 'prop-types'

import { Icon } from '../index'

export function Input(props) {
  const { icon, label, placeholder, onChangeHandler, value } = props

  return (
    <div className={'input-container'}>
      <div className={'content-container'}>
        {icon ? <Icon icon={icon} /> : null}
        {label ? <div className={'input-label'}>{label}</div> : null}
        <input
          className={'input'}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onChangeHandler}
        ></input>
      </div>
    </div>
  )
}

Input.propTypes = {
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
}

export function TextArea(props) {
  const { icon, label, placeholder, onChangeHandler, value } = props

  return (
    <div className={'input-container'}>
      <div className={'input-content-container'}>
        {icon ? <Icon icon={icon} /> : null}
        {label ? <div className={'textarea-label'}>{label}</div> : null}
        <textarea
          resizable={false}
          className={'input'}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onChangeHandler}
        ></textarea>
      </div>
    </div>
  )
}

TextArea.propTypes = {
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
}
