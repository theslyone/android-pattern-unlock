import { Record, OrderedMap } from 'immutable'
import { push } from 'react-router-redux'
// ------------------------------------
// Constants
// ------------------------------------
export const SET_MODE = 'SET_MODE'
export const SET_SECRET = 'SET_SECRET'
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

export function setMode (value) {
  return {
    type: SET_MODE,
    payload: value
  }
}

export function setSecret (value) {
  return {
    type: SET_SECRET,
    payload: value
  }
}

export function start (value) {
  return {
    type    : START,
    payload : value
  }
}

export function select (value) {
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
    return new Promise(function (resolve, reject) {
      let mode = getState().keypad.mode
      let keys = getState().keypad.keys
      let secretKey = keys.keySeq().toArray().join('')
      if (mode === 'changePassword') {
        dispatch(setSecret(secretKey))
        setTimeout(() => {
          dispatch(setMode())
          dispatch(push('/'))
        }, 1500)
      } else {
        let secret = getState().keypad.secret
        let accessGranted = secretKey === secret
        if (accessGranted) {
          dispatch(grantAccess(true))
        } else {
          dispatch(grantAccess(false))
        }
        setTimeout(() => {
          dispatch(setMode())
          if (accessGranted) {
            dispatch(push('/home'))
          }
          resolve()
        }, 1000)
      }
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_MODE]: (state, action) => initialState.set('secret', state.secret).set('mode', action.payload || 'default'),
  [CURSOR_POSITION]: (state, action) => state.set('cursor', action.payload),

  [START]: (state, action) => state.set('active', true).setIn(['keys', action.payload.value], action.payload),
  [SELECT]: (state, action) => state.setIn(['keys', action.payload.value], action.payload),
  [FINISH]: (state, action) => state.set('active', false),

  [SET_SECRET]: (state, action) => state.set('secret', action.payload)
    .setIn(['status', 'className'], 'info')
    .setIn(['status', 'text'], 'Password changed successful'),

  [GRANT_ACCESS]: (state, action) => {
    return state.set('isCorrect', action.payload)
      .setIn(['status', 'className'], action.payload ? 'success' : 'error')
      .setIn(['status', 'text'], action.payload ? 'Pattern matched successfully' : 'Opps! pattern is not correct')
  },
  [CLEAR]  : (state, action) => initialState
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Record({
  mode: 'default',
  active: false,
  cursor: {},
  keys: OrderedMap(),
  secret: '7415963',
  status: (Record({
    className: 'default',
    text: 'Draw a pattern to unlock'
  }))(),
  statusText: 'Draw a pattern to unlock',
  isCorrect: null
})()

export default function keypadReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
