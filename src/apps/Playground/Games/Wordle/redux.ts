import { type RootAction } from 'root-types';
import { createAction, getType } from 'typesafe-actions';
import { type State } from './types';
import { getBoard, getWordOfDay } from './utils';

const getInitialState = (): State => ({
  board: getBoard(5, 6),
  keyboard: {
    keys: {
      A: { type: 'idle', value: 'A' },
      B: { type: 'idle', value: 'B' },
      BACKSPACE: { type: 'idle', value: 'BACKSPACE' },
      C: { type: 'idle', value: 'C' },
      D: { type: 'idle', value: 'D' },
      E: { type: 'idle', value: 'E' },
      ENTER: { type: 'idle', value: 'ENTER' },
      F: { type: 'idle', value: 'F' },
      G: { type: 'idle', value: 'G' },
      H: { type: 'idle', value: 'H' },
      I: { type: 'idle', value: 'I' },
      J: { type: 'idle', value: 'J' },
      K: { type: 'idle', value: 'K' },
      L: { type: 'idle', value: 'L' },
      M: { type: 'idle', value: 'M' },
      N: { type: 'idle', value: 'N' },
      O: { type: 'idle', value: 'O' },
      P: { type: 'idle', value: 'P' },
      Q: { type: 'idle', value: 'Q' },
      R: { type: 'idle', value: 'R' },
      S: { type: 'idle', value: 'S' },
      T: { type: 'idle', value: 'T' },
      U: { type: 'idle', value: 'U' },
      V: { type: 'idle', value: 'V' },
      W: { type: 'idle', value: 'W' },
      X: { type: 'idle', value: 'X' },
      Y: { type: 'idle', value: 'Y' },
      Z: { type: 'idle', value: 'Z' },
    },
    order: [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
    ],
  },
  settings: {
    darkTheme: false,
    hardMode: false,
    highContrastMode: false,
  },
  state: 'idle',
  toasts: [],
  word: {
    attempts: 6,
    current: getWordOfDay(),
    length: 5,
  },
});

export const wordleActions = {
  popToast: createAction('wordle/popToast')(),
  pressBackspace: createAction('wordle/pressBackspace')(),
  pressEnter: createAction('wordle/pressEnter')(),
  pressKey: createAction('wordle/pressKey')<string>(),
  pushToast: createAction('wordle/pushToast')<string>(),
  startGame: createAction('wordle/startGame')(),
};

export const wordleReducer = (
  state: State = getInitialState(),
  action: RootAction,
): State => {
  switch (action.type) {
    case getType(wordleActions.popToast): {
      return { ...state, toasts: state.toasts.slice(1) };
    }
    case getType(wordleActions.pushToast): {
      return { ...state, toasts: [...state.toasts, action.payload] };
    }
    case getType(wordleActions.startGame): {
      return getInitialState();
    }
    case getType(wordleActions.pressEnter): {
      const dy = Math.min(
        state.board.active.y + 1,
        state.board.cells.length - 1,
      );
      return { ...state, board: { ...state.board, active: { x: 0, y: dy } } };
    }

    case getType(wordleActions.pressBackspace): {
      const { x, y } = state.board.active;
      const ax = Math.max(x - 1, 0);
      return {
        ...state,
        board: {
          active: { x: ax, y },
          cells: state.board.cells.map((row, dy) =>
            row.map((cell, dx) =>
              dx === ax && dy === y ? { ...cell, value: '' } : cell,
            ),
          ),
        },
      };
    }
    case getType(wordleActions.pressKey): {
      const { x, y } = state.board.active;
      const ax = Math.min(x + 1, state.word.length);
      const value = action.payload;
      if (ax > state.word.length) return state;
      return {
        ...state,
        board: {
          active: { x: ax, y },
          cells: state.board.cells.map((row, dy) =>
            row.map((cell, dx) =>
              dx === x && dy === y ? { ...cell, value } : cell,
            ),
          ),
        },
      };
    }
    default: {
      return state;
    }
  }
};
