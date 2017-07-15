/* @flow */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { getPosition } from '../../../lib/DOMManager'

export default class Key extends Component {
  constructor (props) {
    super(props)
    this.start = this.start.bind(this)
    this.select = this.select.bind(this)
  }

  getPosition (value) {
    let node = document.getElementsByClassName(`${value}`)[0]
    return getPosition(node)
  }

  start (e) {
    let { onStart, value } = this.props
    let position = this.getPosition(value)
    onStart({ position, value })
    e.stopPropagation()
    e.preventDefault()
  }

  select (e) {
    alert('moved')
    let { isActive, onSelect, value } = this.props
    let position = this.getPosition(value)
    isActive && onSelect({ position, value })
    e.stopPropagation()
    e.preventDefault()
  }

  render () {
    let { isSelected, value } = this.props
    var keyClassName = classNames(
      'key',
      {
        'hovered': isSelected
      }
    )

    return (
      <li className={keyClassName}
        onMouseDown={this.start} onMouseEnter={this.select}
        onTouchStart={this.start} onTouchMove={this.select}>
        <div className={`${value}`} />
      </li>
    )
  }
}

Key.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool,
  onStart: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
}
