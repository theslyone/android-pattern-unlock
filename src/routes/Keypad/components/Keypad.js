/* @flow */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Key from './Key'
import LineTo, { Line } from 'react-lineto'

export default class Keypad extends Component {
  constructor (props) {
    super(props)

    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
  }

  componentWillMount () {
    let rows = []
    let i = 0
    let len = 9
    while (++i <= len) rows.push(i)
    this.setState({ rows })
  }

  onMouseDown (e) {
    if (e.button && e.button !== 0) return
    e.stopPropagation()
    e.preventDefault()
  }

  onMouseUp (e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.onEnd()
  }

  onMouseMove (e) {
    let position = {
      x: e.pageX,
      y: e.pageY
    }
    this.props.onCursorMoved(position)
    e.stopPropagation()
    e.preventDefault()
  }

  render () {
    let { keys, cursor, isActive, onStart, onSelect } = this.props
    return (
      <ul className='keypad'>
        <div onMouseDown={this.onMouseDown} onTouchStart={this.onMouseDown}
          onMouseMove={this.onMouseMove} onTouchMove={this.onMouseMove}
          onMouseUp={this.onMouseUp} onTouchEnd={this.onMouseUp}>
          {this.state.rows.map((i) => {
            return <Key key={i} value={i}
              isActive={isActive}
              onStart={onStart}
              onSelect={onSelect}
              isSelected={keys.get(i) != null} />
          })}
          {/* Draw lines between selected nodes */}
          {keys.keySeq().toArray().map((node, idx) => {
            let selectedKeys = keys.keySeq().toArray()
            let nextNode = selectedKeys[idx + 1]
            if (nextNode) {
              return (
                <LineTo key={idx}
                  from={`${node}`} to={`${nextNode}`}
                  className='key-line' border='2px solid #FFF' />
              )
            } else {
              node = keys.get(node)
              if (isActive && cursor.x) {
                return <Line key={idx}
                  x0={node.position.x} y0={node.position.y}
                  x1={cursor.x} y1={cursor.y}
                  className='key-line' border='2px solid #FFF' />
              } return <span key={idx} />
            }
          })}
        </div>
      </ul>
    )
  }
}

Keypad.propTypes = {
  isActive: PropTypes.bool.isRequired,
  keys: PropTypes.object.isRequired,
  cursor: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
  onCursorMoved: PropTypes.func.isRequired
}
