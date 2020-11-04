import React from 'react'
import PropTypes from 'prop-types'

import './popup.css'

import { Modal } from '../modal/modal'

export function PopupHeader(props) {
  const { text } = props
  return <div className={'popup-header'}>{text}</div>
}

PopupHeader.propTypes = {
  text: PropTypes.string.isRequired,
}

export function PopupBody(props) {
  const { children } = props
  return <div className={'popup-body'}>{children}</div>
}

PopupBody.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export function PopupActions(props) {
  const { children } = props
  return <div className={'popup-actions'}>{children}</div>
}

PopupActions.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export function Popup(props) {
  const { show, onClickOutside, onClickInside, children } = props
  return (
    <Modal show={show} onClickOutside={onClickOutside}>
      <div
        id={'inside'}
        className={'popup'}
        onClick={(e) => {
          if (e.target.id !== 'inside') return
          if (onClickInside === undefined) return
          onClickInside()
        }}
      >
        {children}
      </div>
    </Modal>
  )
}

Popup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClickOutside: PropTypes.func.isRequired,
  onClickInside: PropTypes.func,

  children: PropTypes.arrayOf(PropTypes.element.isRequired),
}
