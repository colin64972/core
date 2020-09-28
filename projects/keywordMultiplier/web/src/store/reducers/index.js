import { combineReducers } from 'redux'
import { app } from './app'
import { keywordsEverywhere } from './keywordsEverywhere'

export const reducers = combineReducers({
  app,
  keywordsEverywhere
})
