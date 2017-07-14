import {
  SET_MODE, SET_SECRET, CURSOR_POSITION, SELECT, CLEAR, SET_ACTIVE, START, FINISH, GRANT_ACCESS,
  onCursorMoved, start, select, finish, end, clear, setMode, setSecret, grantAccess,
  default as keypadReducer
} from 'routes/Keypad/reducer'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('(Redux Module) Keypad', () => {
  it('Should export action constants.', () => {
    expect(SET_MODE).to.equal('SET_MODE')
    expect(SET_SECRET).to.equal('SET_SECRET')
    expect(CURSOR_POSITION).to.equal('CURSOR_POSITION')
    expect(SELECT).to.equal('SELECT')
    expect(CLEAR).to.equal('CLEAR')
    expect(SET_ACTIVE).to.equal('SET_ACTIVE')
    expect(START).to.equal('START')
    expect(FINISH).to.equal('FINISH')
    expect(GRANT_ACCESS).to.equal('GRANT_ACCESS')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(keypadReducer).to.be.a('function')
    })

    it('Should initialize with an inactive state', () => {
      let state = keypadReducer(undefined, {})
      expect(state.mode).to.equal('default')
      expect(state.active).to.equal(false)
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = keypadReducer(undefined, {})
      expect(state.mode).to.equal('default')
      state = keypadReducer(state, { type: '@@@@@@@' })
      expect(state.mode).to.equal('default')

      state = keypadReducer(state, start(1))
      expect(state.active).to.equal(true)
    })
  })

  describe('(Action Creator)', () => {
    it('Should be exported as functions.', () => {
      expect(start).to.be.a('function')
      expect(finish).to.be.a('function')
      expect(select).to.be.a('function')
      expect(end).to.be.a('function')
      expect(start).to.be.a('function')
      expect(clear).to.be.a('function')
      expect(grantAccess).to.be.a('function')
      expect(setSecret).to.be.a('function')
      expect(setMode).to.be.a('function')
      expect(onCursorMoved).to.be.a('function')
    })

    it('Should return an action with correct type.', () => {
      expect(start()).to.have.property('type', START)
      expect(finish()).to.have.property('type', FINISH)
      expect(select()).to.have.property('type', SELECT)
      expect(clear()).to.have.property('type', CLEAR)
      expect(grantAccess()).to.have.property('type', GRANT_ACCESS)
      expect(setSecret()).to.have.property('type', SET_SECRET)
      expect(setMode()).to.have.property('type', SET_MODE)
      expect(onCursorMoved()).to.have.property('type', CURSOR_POSITION)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      expect(start(2)).to.have.property('payload', 2)
      expect(select(3)).to.have.property('payload', 3)
      expect(grantAccess(true)).to.have.property('payload', true)
      expect(setSecret(12345)).to.have.property('payload', 12345)
      expect(setMode(false)).to.have.property('payload', false)
      let payload = { x: 1, y: 2 }
      expect(onCursorMoved(payload)).to.have.deep.property('payload', payload)
    })
  })

  describe('(Action Creator) end', () => {
    it('Should return a function (is a thunk).', () => {
      expect(end()).to.be.a('function')
    })
  })

  describe('(Action Handler)  Keypad reducer', () => {
    it('Should dispatch with exact action to store.', () => {
      const expectedActions = [
        { type: SET_SECRET },
        { type: START },
        { type: SELECT },
        { type: FINISH },
        { type: GRANT_ACCESS, payload: true },
        { type: SET_MODE, payload: 'default' }
      ]

      let _globalState = {
        keypad : keypadReducer(undefined, {})
      }
      const store = mockStore(_globalState)
      store.dispatch(setSecret(52))

      store.dispatch(start(5))
      store.dispatch(select(2))
      return store.dispatch(end())
        .then(() => {
          expect(store.getActions().length).to.equal(expectedActions.length)
          expect(store.getActions()[0].type).to.equal(expectedActions[0].type)
          expect(store.getActions()[1].type).to.equal(expectedActions[1].type)
          expect(store.getActions()[2].type).to.deep.equal(expectedActions[2].type)
          expect(store.getActions()[4].type).to.equal(expectedActions[4].type)
        })
    })
  })
})
