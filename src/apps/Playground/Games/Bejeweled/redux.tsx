import { type RootAction, type RootThunkAction } from 'root-types';
import { createAction, getType } from 'typesafe-actions';
import { type Board, type Cell, type Game, type Vector } from './types';

const initialState: Game = {
  board: [],
  level: 1,
  score: 0,
  selected: null,
  state: 'idle',
};

export const bejeweledActions = {
  updateBoard: createAction('bejeweled/updateCount')<Board>(),
  updateCell: createAction('bejeweled/updateCell')<Cell>(),
  updateGame: createAction('bejeweled/updateGame')<Game>(),
  updateScore: createAction('bejeweled/updateDelay')<number>(),
  updateSelected: createAction('bejeweled/updateSelected')<Vector | null>(),
};

export const getAbleToSwap =
  ({ x, y }: Vector): RootThunkAction<boolean> =>
  (_, getState) => {
    const { selected } = getState().games.bejeweled;
    if (!selected) return false;
    const distance = Math.abs(selected.x - x) + Math.abs(selected.y - y);

    return distance === 1;
  };

export const selectCell =
  ({ x, y }: Vector): RootThunkAction<void> =>
  (dispatch, getState) => {
    const { board, selected } = getState().games.bejeweled;
    const { updateCell, updateSelected } = bejeweledActions;
    const current = board[x][y];
    if (!selected) {
      dispatch(updateCell({ ...current, selected: true }));
      dispatch(updateSelected({ x, y }));
      return;
    }
    const distance = Math.abs(selected.x - x) + Math.abs(selected.y - y);
    const previous = board[selected.x][selected.y];
    switch (distance) {
      case 0: {
        dispatch(updateCell({ ...current, selected: false }));
        dispatch(updateSelected(null));
        break;
      }
      case 1: {
        dispatch(
          updateCell({ ...previous, gem: current.gem, selected: false }),
        );
        dispatch(
          updateCell({ ...current, gem: previous.gem, selected: false }),
        );
        dispatch(updateSelected(null));
        break;
      }
      default: {
        dispatch(updateCell({ ...previous, selected: false }));
        dispatch(updateCell({ ...current, selected: true }));
        dispatch(updateSelected({ x, y }));
      }
    }
  };

export const bejeweledReducer = (
  state: Game = initialState,
  action: RootAction,
): Game => {
  switch (action.type) {
    case getType(bejeweledActions.updateGame): {
      return action.payload;
    }
    case getType(bejeweledActions.updateSelected): {
      return { ...state, selected: action.payload };
    }
    case getType(bejeweledActions.updateBoard): {
      return { ...state, board: action.payload };
    }
    case getType(bejeweledActions.updateCell): {
      const { position } = action.payload;
      const board = state.board.map((row, x) =>
        row.map((cell, y) => {
          if (x === position.x && y === position.y) {
            return { ...cell, ...action.payload };
          }
          return cell;
        }),
      );
      return { ...state, board };
    }
    case getType(bejeweledActions.updateScore): {
      return { ...state, score: state.score + action.payload };
    }
    default: {
      return state;
    }
  }
};
