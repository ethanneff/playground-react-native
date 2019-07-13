import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { RootState } from "../../containers";
import { Dispatch } from "redux";

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useRootDispatch: () => Dispatch = useDispatch;
