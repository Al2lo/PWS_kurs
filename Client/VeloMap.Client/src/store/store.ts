import { configureStore } from '@reduxjs/toolkit'
import routeReducer from './route/routeSlice'

export const store = configureStore({
  reducer: {
    route: routeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispathc = typeof store.dispatch