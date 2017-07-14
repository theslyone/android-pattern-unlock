/* @flow */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Keypad from '../components/Keypad'
import classNames from 'classnames'

import { connect } from 'react-redux'
import { setActive, start, select, end, onCursorMoved } from '../reducer'

import '../keypad.scss'

class KeypadContainer extends Component {
  render () {
    let { isCorrect } = this.props
    var containerClassName = classNames(
      'keypad-container',
      {
        'success': isCorrect === true,
        'error': isCorrect === false
      }
    )
    return (
      <div className='text-center'>
        <div className={containerClassName}>
          <span className='keypad-status'>
            {isCorrect === null ? 'Draw a pattern to unlock' :
            isCorrect === true ? 'Success' : 'Opps! pattern is not correct'}
          </span>
          <Keypad
            isActive={this.props.isActive}
            keys={this.props.keys}
            cursor={this.props.cursor}
            setActive={this.props.setActive}
            onCursorMoved={this.props.onCursorMoved}
            onStart={this.props.start}
            onSelect={this.props.select}
            onEnd={this.props.end}
          />
        </div>
      </div>
    )
  }
}

KeypadContainer.propTypes = {
  isActive: PropTypes.bool.isRequired,
  keys: PropTypes.object.isRequired,
  cursor: PropTypes.object,
  setActive: PropTypes.func.isRequired,
  onCursorMoved: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
  end: PropTypes.func.isRequired,
  isCorrect: PropTypes.bool
}

const mapDispatchToProps = {
  setActive: (value) => setActive(value),
  onCursorMoved: (position) => onCursorMoved(position),
  start : (keyValue) => start(keyValue),
  select : (keyValue) => select(keyValue),
  end: () => end(),
}

const mapStateToProps = (state) => ({
  isActive: state.keypad.active,
  keys : state.keypad.keys,
  cursor: state.keypad.cursor,
  isCorrect: state.keypad.isCorrect
})

export default connect(mapStateToProps, mapDispatchToProps)(KeypadContainer)
