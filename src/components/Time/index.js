/* @flow */
import './time.scss'

import React, { Component } from 'react'
import Clock from 'react-clock'

export default class Time extends Component {
  render () {
    return (
      <div style={{}}>
        <Clock />
        <h2>Thursday</h2>
        <h2>July 13th, 2017</h2>
      </div>
    )
  }
}
