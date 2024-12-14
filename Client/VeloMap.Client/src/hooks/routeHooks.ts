import { Route } from "../models/models";
import { useAppSelector } from "../store/hooks";

import { createSelector } from 'reselect';
import { RootState } from "../store/store";

const selectRouteState = (state: RootState) => state.route;

export const selectRoute = createSelector(
    [selectRouteState],
    (routeState) => routeState.route // Берем нужную часть
);

// Обновленный хук useRoute
export const useRoute = (): Route | null => {
    return useAppSelector(selectRoute);
};

export const useRouteLike = (): boolean => {
    const route = useAppSelector((state) => state.route)

    return route.isLike;
}