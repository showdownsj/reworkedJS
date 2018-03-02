
import { createStore, applyMiddleware } from 'redux'
import openReadReducer from '../reducers/openReadReducer'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const loggerMiddleware = createLogger();

export function configureStore(initialState) {
  const store = createStore(
    openReadReducer,
    initialState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
  return store;
}