import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import web3 from './web3'
import ui from './ui'

export default combineReducers({
  web3,
  ui,
  form: formReducer,
})
