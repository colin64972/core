import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import app from './app'

const reducers = combineReducers({
  form: formReducer,
  app
})

export default reducers
