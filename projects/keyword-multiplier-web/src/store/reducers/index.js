import { combineReducers } from 'redux'

import { app } from './app'
import { kE } from './keywordsEverywhere'

export const reducers = combineReducers({
  app,
  kE
})
