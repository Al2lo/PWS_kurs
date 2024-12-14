import { AppDispathc, RootState } from "./store";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const useAppDispathc: () => AppDispathc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector