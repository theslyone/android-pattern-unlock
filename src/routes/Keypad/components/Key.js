/* @flow */

import React, { Component } from 'react'
import ReactGesture from 'react-gesture'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { getPosition } from '../../../lib/DOMManager'

export default class Key extends Component {
  constructor (props) {
    super(props)
    this.start = this.start.bind(this)
    this.select = this.select.bind(this)
    this.end = this.end.bind(this)
  }

  getPosition (value) {
    let node = document.getElementsByClassName(`${value}`)[0]
    return getPosition(node)
  }

  start () {
    let { onStart, value } = this.props
    let position = this.getPosition(value)
    onStart({ position, value })
  }

  select () {
    let { isActive, onSelect, value } = this.props
    let position = this.getPosition(value)
    isActive && onSelect({ position, value })
  }

  end () {
    let { onEnd } = this.props
    onEnd()
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
      <ReactGesture onTap={() => {
        console.log('onTap 2')
      }} onTouchStart={() => {
        this.start()
      }} onTouchEnter={(e) => {
        this.select()
      }} onTouchLeave={(e) => {
        //console.log(`onTouchLeave ${value}`)
      }} onTouchEnd={() => {
        this.end()
      }} onMouseDown={() => {
        this.start()
      }} onMouseEnter={(e) => {
        this.select()
      }} onMouseLeave={(e) => {
        //console.log(`onMouseLeave ${value}`)
      }} onMouseUp={() => {
        this.end()
      }}>
        <li className={keyClassName}>
          <div ref={(node) => { this.key = node }}
            className={`${value}`} />
        </li>
      </ReactGesture>
    )
  }
}

Key.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool,
  onStart: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
}
