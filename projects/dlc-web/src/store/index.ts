import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { editorReducer } from './editor/reducers'

const rootReducer = combineReducers({
  editor: editorReducer
})

export type RootState = ReturnType<typeof rootReducer>

const middleware = []

if (process.env.NODE_ENV === 'development') {
  middleware.push(
    createLogger({
      collapsed: true
    })
  )
}

export const setReduxStore = (preloadedState: RootState = null) =>
  createStore(
    rootReducer,
    preloadedState ? preloadedState : {},
    compose(applyMiddleware(...middleware))
  )
