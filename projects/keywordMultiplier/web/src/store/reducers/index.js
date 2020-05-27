import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { app } from './app'
import { keywordsEverywhere } from './keywordsEverywhere'

export const reducers = combineReducers({
  form: formReducer,
  app,
  keywordsEverywhere
})
