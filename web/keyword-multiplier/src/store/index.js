import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import formActionSaga from 'redux-form-saga'
import { createLogger } from 'redux-logger'
import reducers from './reducers'
import sagas from './sagas'

export const setStore = preloadedState => {
  const combinedSagas = [sagas, formActionSaga]

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
