import { Dimensions, ScaledSize } from 'react-native';
import { RootAction, RootState } from 'root-types';
import { createAction, getType } from 'typesafe-actions';
import { logout } from '../Auth';

/* ACTIONS */
export const updateDimension = createAction(
  'dimension/UPDATE_DIMENSION',
)<DimensionState>();

export const dimensionActions = { updateDimension };

/* SELECTORS */
export const getLandscapeOrientation = (state: RootState): boolean =>
  state.dimension.window.height < state.dimension.window.width;
export const getSmallestDimension = (state: RootState): number =>
  state.dimension.window.height > state.dimension.window.width
    ? state.dimension.window.width
    : state.dimension.window.height;
export const getLargestDimension = (state: RootState): number =>
  state.dimension.window.height > state.dimension.window.width
    ? state.dimension.window.height
    : state.dimension.window.width;
export const getWidth = (state: RootState): number =>
  state.dimension.window.width;
export const getHeight = (state: RootState): number =>
  state.dimension.window.height;

/* INTERFACES */
export type DimensionState = {
  screen: ScaledSize;
  window: ScaledSize;
};

/* REDUCERS */
export const dimensionInitialState: DimensionState = {
  screen: Dimensions.get('screen'),
  window: Dimensions.get('window'),
};

export const dimensionReducer = (
  state: DimensionState = dimensionInitialState,
  action: RootAction,
): DimensionState => {
  switch (action.type) {
    case getType(updateDimension):
      return {
        ...state,
        screen: action.payload.screen,
        window: action.payload.window,
      };
    case getType(logout):
      return dimensionInitialState;
    default:
      return state;
  }
};
