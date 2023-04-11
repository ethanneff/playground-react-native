import { type RootAction } from 'root-types';
import { type DeepReadonly } from 'ts-essentials';

type HistoryState = DeepReadonly<
  {
    time: string;
    type: string;
  }[]
>;
const initialState: HistoryState = [];

export const historyReducer = (
  state: HistoryState = initialState,
  action: RootAction,
): HistoryState => {
  const time = new Date().toISOString();
  const item = { time, type: action.type };
  return [...state, item];
};
