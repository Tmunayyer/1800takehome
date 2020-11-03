import React from 'react'
import SearchIcon from './search_icon.svg'
import './icon.css'
import PropTypes from 'prop-types'

const icons = {
  search: <img src={SearchIcon} alt={'Search'} />,
}

export function Icon(props) {
  const { icon } = props

  const toDisplay = icons[icon]

  return <div className={'icon'}>{toDisplay}</div>
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
}
