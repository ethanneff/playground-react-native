import {
  type RootAction,
  type RootState,
  type RootThunkAction,
} from 'root-types';
import { createAction, getType } from 'typesafe-actions';
import { determineBoardItem, generateBoard, type Board } from './utils';

export const updateDelay = createAction('gameOfLife/updateDelay')<number>();
export const toggleRun = createAction('gameOfLife/toggleRun')();
export const updateCount = createAction('gameOfLife/updateCount')<number>();
const updateBoard = createAction('gameOfLife/updateBoard')<Board>();
export const resetBoard = createAction('gameOfLife/resetBoard')<number>();
export const loopBoard = (): RootThunkAction<void> => (dispatch, getState) => {
  const { board } = getState().games.life;
  // TODO: save change list.. only iterate through items that changed instead of whole board https://stackoverflow.com/a/40564
  const newBoard = board.map((rows, rowIndex) =>
    rows.map((_, colIndex) => determineBoardItem(board, rowIndex, colIndex)),
  );
  dispatch(updateBoard(newBoard));
};

export const updateCell =
  (x: number, y: number): RootThunkAction<void> =>
  (dispatch, getState) => {
    const { board } = getState().games.life;
    const flip = board[x][y] === 1 ? 0 : 1;
    const copy = board.map((rows, rowIndex) =>
      rows.map((_, colIndex) =>
        rowIndex === x && y === colIndex ? flip : board[rowIndex][colIndex],
      ),
    );
    dispatch(updateBoard(copy));
  };

export const getCell =
  (x: number, y: number) =>
  (state: RootState): number => {
    const { board } = state.games.life;
    if (board.length <= x || board.length <= y) return 0;
    return board[x][y];
  };

export const gameOfLifeActions = {
  resetBoard,
  toggleRun,
  updateBoard,
  updateCount,
  updateDelay,
};

type GameOfLifeState = {
  board: Board;
  count: number;
  delay: number;
  run: boolean;
};

const gameOfLifeInitialState: GameOfLifeState = {
  board: [],
  count: 20,
  delay: 16,
  run: false,
};
export const gameOfLifeReducer = (
  state: GameOfLifeState = gameOfLifeInitialState,
  action: RootAction,
): GameOfLifeState => {
  switch (action.type) {
    case getType(updateDelay): {
      return {
        ...state,
        delay: action.payload,
      };
    }
    case getType(toggleRun): {
      return {
        ...state,
        run: !state.run,
      };
    }
    case getType(updateCount): {
      return {
        ...state,
        board: generateBoard(action.payload, 0.5),
        count: action.payload,
        run: false,
      };
    }
    case getType(resetBoard): {
      return {
        ...state,
        board: generateBoard(state.count, action.payload),
        run: false,
      };
    }
    case getType(updateBoard): {
      return {
        ...state,
        board: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
