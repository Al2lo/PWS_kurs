import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Route } from '../../models/models'

// Define a type for the slice state
interface RouteState {
    route: Route | null
    isLike: boolean
}

const initialState: RouteState = {
  route: null,
  isLike: false
}

export const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    updateRoute: (state, action: PayloadAction<Route | null>) => {
        state.route = action.payload;
    },
    deleteCurrentRoute: (state) => {
      state.route = null;
    },
    updateIsLike:(state, action: PayloadAction<boolean>) => {
      state.isLike = action.payload;
    }
  }
})

export const { updateRoute, updateIsLike, deleteCurrentRoute } = routeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.route

export default routeSlice.reducer