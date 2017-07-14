/* @flow */

import React from 'react'
import PropTypes from 'prop-types'

import Keypad from '../components/Keypad'
import classNames from 'classnames'

import { connect } from 'react-redux'
import { start, select, end, onCursorMoved } from '../reducer'

import '../keypad.scss'

const KeypadContainer = ({ status, isActive, keys, cursor, onCursorMoved, start, select, end }) => {
  var containerClassName = classNames(
    'keypad-container',
    status.className
  )
  return (
    <div className='text-center'>
      <div className={containerClassName}>
        <span className='keypad-status'>
          {status.text}
        </span>
        <Keypad
          isActive={isActive}
          keys={keys}
          cursor={cursor}
          onCursorMoved={onCursorMoved}
          onStart={start}
          onSelect={select}
          onEnd={end}
        />
      </div>
    </div>
  )
}

KeypadContainer.propTypes = {
  isActive: PropTypes.bool.isRequired,
  keys: PropTypes.object.isRequired,
  cursor: PropTypes.object,
  onCursorMoved: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
  end: PropTypes.func.isRequired,
  status: PropTypes.shape({
    className: PropTypes.string,
    text: PropTypes.string
  }).isRequired
}

const mapDispatchToProps = {
  onCursorMoved: (position) => onCursorMoved(position),
  start : (keyValue) => start(keyValue),
  select : (keyValue) => select(keyValue),
  end: () => end(),
}

const mapStateToProps = (state) => ({
  isActive: state.keypad.active,
  keys : state.keypad.keys,
  cursor: state.keypad.cursor,
  status: state.keypad.status
})

export default connect(mapStateToProps, mapDispatchToProps)(KeypadContainer)
