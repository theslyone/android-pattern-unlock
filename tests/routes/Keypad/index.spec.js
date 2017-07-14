import KeypadRoute from 'routes/Keypad'

describe('(Route) Counter', () => {
  it('returns a route configuration object', () => {
    expect(typeof KeypadRoute({})).to.equal('object')
  })
})
