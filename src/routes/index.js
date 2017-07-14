// We only need to import the modules necessary for initial render
//import CoreLayout from '../layouts/PageLayout/PageLayout'
import Home from './Home'
import Keypad from './Keypad'

export const createRoutes = (store) => ({
  path        : '/',
  //component   : CoreLayout,
  indexRoute  : Keypad,
  childRoutes : [
    Home
  ]
})

export default createRoutes
