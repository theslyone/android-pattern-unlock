import KeypadContainer from './containers/KeypadContainer'
import { setMode } from './reducer'

export default (store) => {
  return {
    onEnter: (nextState, replace, next) => {
      if (nextState.location.query && nextState.location.query.mode) {
        store.dispatch(setMode(nextState.location.query.mode))
      }
      next()
    },
    component : KeypadContainer
  }
}
