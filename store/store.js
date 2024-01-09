'use client'

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { omniApi } from './api/api'

export const store = configureStore({
  reducer: {
    [omniApi.reducerPath]: omniApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([omniApi.middleware]),
})

setupListeners(store.dispatch)
