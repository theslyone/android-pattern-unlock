import { Record, Map } from 'immutable'
import { push } from 'react-router-redux'
// ------------------------------------
// Constants
// ------------------------------------
export const CURSOR_POSITION = 'CURSOR_POSITION'
export const SELECT = 'SELECT'
export const CLEAR = 'CLEAR'
export const SET_ACTIVE = 'SET_ACTIVE'
export const START = 'START'
export const FINISH = 'FINISH'
export const GRANT_ACCESS = 'GRANT_ACCESS'
// ------------------------------------
// Actions
// ------------------------------------
export function onCursorMoved (position) {
  return {
    type    : CURSOR_POSITION,
    payload : position
  }
}

export function setActive (value) {
  return {
    type: SET_ACTIVE,
    payload: value
  }
}

export function start (value = 1) {
  return {
    type    : START,
    payload : value
  }
}

export function select (value = 1) {
  return {
    type    : SELECT,
    payload : value
  }
}

export function finish () {
  return {
    type: FINISH
  }
}

export function clear () {
  return {
    type: CLEAR
  }
}

export function grantAccess (value) {
  return {
    type: GRANT_ACCESS,
    payload: value
  }
}

export function end (value) {
  return (dispatch, getState) => {
    dispatch(finish())
    let keys = getState().keypad.keys
    let secret = getState().keypad.secret
    let secretKey = keys.keySeq().toArray().join('')
    let accessGranted = secretKey === secret
    if (accessGranted) {
      dispatch(grantAccess(true))
    } else {
      dispatch(grantAccess(false))
    }
    setTimeout(() => {
      dispatch(clear())
      if (accessGranted) {
        dispatch(push('/home'))
      }
    }, 1000)
  }
}

export const actions = {
  onCursorMoved, start, select, end, clear
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_ACTIVE]: (state, action) => state.set('active', action.payload),
  [CURSOR_POSITION]: (state, action) => state.set('cursor', action.payload),
  [SELECT]    : (state, action) => state.setIn(['keys', action.payload.value], action.payload),
  [START]: (state, action) => state.set('active', true).setIn(['keys', action.payload.value], action.payload),
  [FINISH]: (state, action) => state.set('active', false),
  [GRANT_ACCESS]: (state, action) => state.set('isCorrect', action.payload),
  [CLEAR]  : (state, action) => initialState
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Record({
  active: false,
  cursor: {},
  keys: Map(),
  secret: '123',
  isCorrect: null
})()

export default function keypadReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
