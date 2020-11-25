import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { appReducer } from './app/reducers'
import { converterReducer } from './converter/reducers'

const rootReducer = combineReducers({
  converter: converterReducer,
  app: appReducer
})

export type State = ReturnType<typeof rootReducer | null>

const middleware: any[] = []

if (process.env.NODE_ENV === 'development') {
  middleware.push(
    createLogger({
      collapsed: true
    })
  )
}

export const setReduxStore = (preloadedState: State = null) =>
  createStore(
    rootReducer,
    preloadedState ? preloadedState : {},
    compose(applyMiddleware(...middleware))
  )
