import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { initialState, appReducer } from './reducer'

export type State = ReturnType<typeof appReducer>

const middleware: any[] = []

if (process.env.NODE_ENV === 'development') {
  middleware.push(
    createLogger({
      collapsed: true
    })
  )
}

const appliedMiddleware = applyMiddleware(...middleware)

export function configureStore(preloadedState: State = initialState) {
  return createStore(appReducer, preloadedState, compose(appliedMiddleware))
}
