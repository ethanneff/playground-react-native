import {RootAction, RootState, RootThunkAction} from 'root-types';
import {createAction, getType} from 'typesafe-actions';
import {Board, determineBoardItem, generateBoard} from './utils';

export const updateDelay = createAction('gameOfLife/updateDelay')<number>();
export const toggleRun = createAction('gameOfLife/toggleRun')();
export const updateCount = createAction('gameOfLife/updateCount')<number>();
export const updateBoard = createAction('gameOfLife/updateBoard')<Board>();
export const resetBoard = createAction('gameOfLife/resetBoard')<number>();
export const loopBoard = (): RootThunkAction<void> => (dispatch, getState) => {
  const {board} = getState().gameOfLife;
  const newBoard = board.map((rows, i) =>
    rows.map((_, j) => determineBoardItem(board, i, j)),
  );
  dispatch(updateBoard(newBoard));
};
export const updateCell =
  (x: number, y: number): RootThunkAction<void> =>
  (dispatch, getState) => {
    const {board} = getState().gameOfLife;
    const copy = [...board];
    copy[x][y] = copy[x][y] === 1 ? 0 : 1;
    dispatch(updateBoard(copy));
  };

export const getCell =
  (x: number, y: number) =>
  (state: RootState): number => {
    const {board} = state.gameOfLife;
    if (!board) return 0;
    if (board.length <= x || board.length <= y) return 0;
    return board[x][y];
  };

export const gameOfLifeActions = {
  updateDelay,
  toggleRun,
  updateCount,
  updateBoard,
  resetBoard,
};

export type GameOfLifeState = {
  run: boolean;
  delay: number;
  count: number;
  board: Board;
};

export const gameOfLifeInitialState: GameOfLifeState = {
  run: false,
  delay: 16,
  count: 20,
  board: [],
};
export function gameOfLifeReducer(
  state: GameOfLifeState = gameOfLifeInitialState,
  action: RootAction,
): GameOfLifeState {
  switch (action.type) {
    case getType(updateDelay):
      return {
        ...state,
        delay: action.payload,
      };
    case getType(toggleRun):
      return {
        ...state,
        run: !state.run,
      };
    case getType(updateCount):
      return {
        ...state,
        count: action.payload,
        run: false,
        board: generateBoard(action.payload, 0.5),
      };
    case getType(resetBoard):
      return {
        ...state,
        run: false,
        board: generateBoard(state.count, action.payload),
      };
    case getType(updateBoard):
      return {
        ...state,
        board: action.payload,
      };
    default:
      return state;
  }
}
