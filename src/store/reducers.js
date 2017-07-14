import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import keypadReducer from '../routes/Keypad/reducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    keypad: keypadReducer,
    routing: routerReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
