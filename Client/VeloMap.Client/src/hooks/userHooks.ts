import { User } from "../models/models";
import { useAppSelector } from "../store/hooks";

import { createSelector } from 'reselect';
import { RootState } from "../store/store";

const selectUserState = (state: RootState) => state.useReducer;

export const selectUser = createSelector(
    [selectUserState],
    (userState) => userState.user
);

export const selectIsAuth = createSelector(
    [selectUserState],
    (userState) => userState.isAuth
);

export const useUser = (): User | null => {
    return useAppSelector(selectUser);
};

export const useIsAuth = (): boolean | null => {
    return useAppSelector(selectIsAuth);
};