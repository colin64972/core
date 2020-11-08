import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { editorReducer } from './editor/reducers'

const rootReducer = combineReducers({
  editor: editorReducer
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
