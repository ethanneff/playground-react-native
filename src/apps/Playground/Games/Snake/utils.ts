import { type Direction } from './useGesture';

export type Matrix = (0 | 1 | 2)[][];
type Cell = [number, number];
type BoardState = 'ate food' | 'hit snake' | 'hit wall' | 'ok' | 'won';

// TODO: need to store the snake instead of tail to know the next tail
export type BoardContext = {
  food: Cell;
  head: Cell;
  matrix: Matrix;
  state: BoardState;
  tail: Cell;
};

const getBlankMatrix = (size: number) => {
  const matrix: Matrix = [];
  for (let rowIndex = 0; rowIndex < size; rowIndex++) {
    matrix[rowIndex] = [];
    for (let colIndex = 0; colIndex < size; colIndex++)
      matrix[rowIndex][colIndex] = 0;
  }
  return matrix;
};

const getAvailable = (matrix: Matrix): Cell[] => {
  const available: Cell[] = [];
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++)
    for (let colIndex = 0; colIndex < matrix[rowIndex].length; colIndex++)
      if (matrix[rowIndex][colIndex] === 0)
        available.push([rowIndex, colIndex]);

  return available;
};

const getRandomFood = (available: Cell[]) =>
  Math.floor(Math.random() * available.length);

const getFood = (matrix: Matrix): Cell => {
  const available = getAvailable(matrix);
  const random = getRandomFood(available);
  const food: Cell = available[random];
  return food;
};

export const getBoard = (size: number): BoardContext => {
  const center = Math.floor(size / 2);
  const matrix = getBlankMatrix(size);
  const food = getFood(matrix);
  const head: Cell = [center, center];
  const tail: Cell = [center, center];
  matrix[center][center] = 1;
  matrix[food[0]][food[1]] = 2;

  return { food, head, matrix, state: 'ok', tail };
};

const getNext = (
  direction: Direction,
  head: Cell,
  matrix: Matrix,
): Cell | null => {
  let x = 0;
  let y = 0;
  switch (direction) {
    case 'up': {
      x = head[0] - 1;
      [, y] = head;
      if (x < 0) return null;
      return [x, y];
    }
    case 'down': {
      x = head[0] + 1;
      [, y] = head;
      if (x >= matrix.length) return null;
      return [x, y];
    }
    case 'left': {
      [x] = head;
      y = head[1] - 1;
      if (y < 0) return null;
      return [x, y];
    }
    case 'right': {
      [x] = head;
      y = head[1] + 1;
      if (y >= matrix[0].length) return null;
      return [x, y];
    }
    default: {
      return null;
    }
  }
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
