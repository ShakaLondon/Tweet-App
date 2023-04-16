import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import ThunkMiddleware from 'redux-thunk'
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'

import appReducer from '../users/app-slice'


function configureAppStore(preloadedState: {[key: string]: string}) {
  const persistConfig = {
    key: 'root',
    storage: storageSession,
  }
  const combinedReducer = combineReducers({ 
    appState: appReducer 
  })

  const persistedReducer = persistReducer(persistConfig, combinedReducer)

  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(ThunkMiddleware),
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
  })

  return store
}

export const store = configureAppStore({})
export const persistor = persistStore(store)

