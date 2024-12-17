import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { User } from '../../models/models'

// Define a type for the slice state
interface UserState {
    user: User | null
    isAuth: boolean
}

const initialState: UserState = {
  user: null,
  isAuth: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
        state.user = action.payload;
    },
    updateIsAuth:(state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    logout:(state) => {
      state.isAuth = false;
      state.user = null;
    }
  }
})

export const { updateUser, updateIsAuth, logout } = userSlice.actions

export const selectCount = (state: RootState) => state.useReducer

export default userSlice.reducer