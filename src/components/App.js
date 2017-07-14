import React, { Component } from 'react'
import { browserHistory, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import PageLayout from '../layouts/PageLayout'
import Time from './Time'

class App extends Component {
  shouldComponentUpdate () {
    return false
  }

  render () {
    const history = syncHistoryWithStore(browserHistory, this.props.store)
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          <PageLayout>
            <div className='row'>
              <div className='col-12 col-md-6 col-sm-12'>
                <Time />
              </div>
              <div className='main-page col-12 col-md-6 col-sm-12'>
                <Router history={history} children={this.props.routes} />
              </div>
            </div>
          </PageLayout>
        </div>
      </Provider>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired
}

export default App
