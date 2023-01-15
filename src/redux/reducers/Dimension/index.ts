import { Dimensions, type ScaledSize } from 'react-native';
import { type RootAction, type RootState } from 'root-types';
import { createAction, getType } from 'typesafe-actions';
import { logout } from '../Auth';

/* INTERFACES */
type DimensionState = {
  screen: ScaledSize;
  window: ScaledSize;
};

/* ACTIONS */
export const updateDimension =
  createAction('dimension/update')<DimensionState>();

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
