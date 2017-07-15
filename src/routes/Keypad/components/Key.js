/* @flow */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { getPosition } from '../../../lib/DOMManager'

import PointerEvents from 'spur-events'
var addListener = PointerEvents.addListener
var removeListener = PointerEvents.removeListener

export default class Key extends Component {
  constructor (props) {
    super(props)
    this.start = this.start.bind(this)
    this.select = this.select.bind(this)
  }

  componentDidMount () {
    let node = document.getElementsByClassName(`key_${this.props.value}`)[0]
    addListener(node, 'pointerenter', this.select, { context: this })
  }

  componentWillUnmount () {
    let node = document.getElementsByClassName(`key_${this.props.value}`)[0]
    removeListener(node, 'pointerenter', this.select)
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
      `key_${value}`,
      {
        'hovered': isSelected
      }
    )

    return (
      <li ref={(ref) => { this.ref = ref }} className={keyClassName}
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
