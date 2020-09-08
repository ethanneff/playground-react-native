import {Direction} from './useGesture';

export type Matrix = Array<Array<0 | 1 | 2>>;
type Cell = [number, number];
type BoardState = 'ok' | 'hit wall' | 'hit snake' | 'ate food' | 'won';

// TODO: need to store the snake instead of tail to know the next tail
export type BoardContext = {
  matrix: Matrix;
  head: Cell;
  tail: Cell;
  food: Cell;
  state: BoardState;
};

const getBlankMatrix = (size: number) => {
  const matrix: Matrix = [];
  for (let i = 0; i < size; i++) {
    matrix[i] = [];
    for (let j = 0; j < size; j++) {
      matrix[i][j] = 0;
    }
  }
  return matrix;
};

const getAvailable = (matrix: Matrix): Cell[] => {
  const available: Cell[] = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        available.push([i, j]);
      }
    }
  }
  return available;
};

const getRandomFood = (available: Cell[]) => {
  return Math.floor(Math.random() * available.length);
};

export const getBoard = (size: number): BoardContext => {
  const center = Math.floor(size / 2);
  const matrix = getBlankMatrix(size);
  const food = getFood(matrix);
  const head: Cell = [center, center];
  const tail: Cell = [center, center];
  matrix[center][center] = 1;
  matrix[food[0]][food[1]] = 2;

  return {matrix, head, tail, food, state: 'ok'};
};

const getNext = (
  direction: Direction,
  head: Cell,
  matrix: Matrix,
): Cell | null => {
  let x;
  let y;
  switch (direction) {
    case 'up':
      x = head[0] - 1;
      y = head[1];
      if (x < 0) {
        return null;
      }
      return [x, y];
    case 'down':
      x = head[0] + 1;
      y = head[1];
      if (x >= matrix.length) {
        return null;
      }
      return [x, y];
    case 'left':
      x = head[0];
      y = head[1] - 1;
      if (y < 0) {
        return null;
      }
      return [x, y];
    case 'right':
      x = head[0];
      y = head[1] + 1;
      if (y >= matrix[0].length) {
        return null;
      }
      return [x, y];
    default:
      return null;
  }
};

const getFood = (matrix: Matrix): Cell => {
  const available = getAvailable(matrix);
  const random = getRandomFood(available);
  const food: Cell = available[random];
  return food;
};

export const updateBoard = (
  board: BoardContext,
  direction: Direction,
): BoardContext => {
  const next = getNext(direction, board.head, board.matrix);
  if (!next) {
    board.state = 'hit wall';
    return board;
  }
  const nextValue = board.matrix[next[0]][next[1]];
  if (nextValue === 1) {
    board.state = 'hit snake';
  } else if (nextValue === 2) {
    const food = getFood(board.matrix);
    board.matrix[food[0]][food[1]] = 2;
    board.state = 'ate food';
  } else {
    board.state = 'ok';
  }
  board.matrix[next[0]][next[1]] = 1;
  board.head = next;

  return board;
};
