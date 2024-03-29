import { createContext } from 'react';
import {
  type ColorChoice,
  type TrackPosition,
  type TrackPositionWithColor,
} from './types';

type DriftState = {
  color: ColorChoice;
  tracks: TrackPositionWithColor[];
};

export const driftInitialState: DriftState = {
  color: 'lightgrey',
  tracks: [],
};

type Action =
  | { payload: ColorChoice; type: 'addColor' }
  | { payload: TrackPosition; type: 'addTrack' };

export const driftReducer = (state: DriftState, action: Action): DriftState => {
  switch (action.type) {
    case 'addColor': {
      return { ...state, color: action.payload };
    }
    case 'addTrack': {
      const tracks = [...state.tracks];
      while (tracks.length > 10) tracks.pop();

      return {
        ...state,
        tracks: [{ ...action.payload, color: state.color }, ...tracks],
      };
    }
    default: {
      return state;
    }
  }
};

type Context = {
  dispatch: (action: Action) => void;
  state: DriftState;
};

export const DriftContext = createContext<Context>({
  dispatch: () => false,
  state: driftInitialState,
});
