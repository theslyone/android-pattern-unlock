/* @flow */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactCursorPosition from 'react-cursor-position'
import Key from './Key'
import LineTo, { Line } from 'react-lineto'
import { getPosition } from '../../../lib/DOMManager'

import '../keypad.scss'

export default class Keypad extends Component {
  constructor (props) {
    super(props)
    this.selectKey = this.selectKey.bind(this)
    this.onCursorMoved = this.onCursorMoved.bind(this)
  }

  componentWillMount () {
    let rows = []
    let i = 0
    let len = 9
    while (++i <= len) rows.push(i)
    this.setState({ rows })
  }

  onCursorMoved ({ isPositionOutside, position }) {
    let keypad = document.getElementsByClassName('keypad')[0]
    const defaultAnchor = { x: 0, y: 0 }
    const offset = { x: window.pageXOffset, y: window.pageYOffset }
    let { x0, y0 } = getPosition(keypad, { defaultAnchor, offset })

    let keypadPosition = document.getElementsByClassName('keypad')[0].getBoundingClientRect()
    x0 = keypadPosition.left + keypadPosition.width * defaultAnchor.x + offset.x
    y0 = keypadPosition.top + keypadPosition.height * defaultAnchor.y + offset.y

    position = {
      x: position.x + x0,
      y: position.y + y0
    }
    if (isPositionOutside) {
      this.props.onCursorMoved(position)
    }
  }

  selectKey (value) {
    this.props.onSelect(value)
  }

  render () {
    let { keys, cursor, isActive, setActive, onStart, onSelect, onEnd } = this.props
    return (
      <ul className='keypad'>
        <ReactCursorPosition onPositionChanged={this.onCursorMoved}>
          <div>
            {this.state.rows.map((i) => {
              return <Key key={i} value={i}
                isActive={isActive}
                setActive={setActive}
                onStart={onStart}
                onSelect={onSelect}
                onEnd={onEnd}
                isSelected={keys.get(i) != null} />
            })}

            {/*Draw lines between selected nodes*/}
            {keys.keySeq().toArray().map((node, idx) => {
              let selectedKeys = keys.keySeq().toArray()
              let nextNode = selectedKeys[idx + 1]
              if (nextNode) {
                return (
                  <LineTo key={idx}
                    from={`node_${node}`} to={`node_${nextNode}`}
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
        </ReactCursorPosition>
      </ul>
    )
  }
}

Keypad.propTypes = {
  isActive: PropTypes.bool.isRequired,
  keys: PropTypes.object.isRequired,
  cursor: PropTypes.object,
  setActive: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
  onCursorMoved: PropTypes.func.isRequired
}
