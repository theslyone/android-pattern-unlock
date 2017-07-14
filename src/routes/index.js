// We only need to import the modules necessary for initial render
import Home from './Home'
import Keypad from './Keypad'

export const createRoutes = (store) => ({
  path        : '/',
  indexRoute  : Keypad(store),
  childRoutes : [
    Home
  ]
})

export default createRoutes
