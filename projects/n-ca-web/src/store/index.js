import 'regenerator-runtime/runtime'

import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import { reducers } from './reducers'
import { sagas } from './sagas'

export const setStore = preloadedState => {
  const combinedSagas = [sagas]

  const sagaMiddleware = createSagaMiddleware()

  let middlewares = [sagaMiddleware]

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(
      createLogger({
        collapsed: true
      })
    )
  }

  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]

  const composedEnhancers = compose(...enhancers)

  const store = createStore(reducers, preloadedState, composedEnhancers)

  combinedSagas.forEach(saga => sagaMiddleware.run(saga))

  return store
}
