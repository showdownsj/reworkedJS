import { createStore, applyMiddleware } from 'redux'
import openReadFile from '../reducers/openReadReducer'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const loggerMiddleware = createLogger();

export function configureStore(initialState) {
  const store = createStore(
    openReadFile,
    initialState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
  return store;
}