/* @flow */
import './time.scss'

import React, { Component } from 'react'
import Clock from 'react-clock'
import moment from 'moment'

export default class Time extends Component {
  render () {
    return (
      <div style={{ margin: '50px auto' }}>
        <Clock />
        <h2>{moment().format('dddd')}</h2>
        <h2>{moment().format('MMMM Do YYYY')}</h2>
      </div>
    )
  }
}
