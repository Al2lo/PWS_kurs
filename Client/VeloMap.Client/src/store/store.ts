import { configureStore } from '@reduxjs/toolkit'
import routeReducer from './route/routeSlice'
import useReducer from './user/userSlice'

export const store = configureStore({
  reducer: {
    route: routeReducer, useReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispathc = typeof store.dispatch