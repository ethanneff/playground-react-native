export type BoardObject = Array<Array<0 | 1 | 2>>;

export const generateRandom = (size: number) =>
  Math.floor(Math.random() * size);

export const addFood = (
  board: BoardObject,
  used: {[key: string]: boolean} = {},
): boolean => {
  const x = generateRandom(board.length);
  const y = generateRandom(board.length);

  const combo = `${x}${y}`;
  if (Object.keys(used).length === board.length) {
    return false;
  }
  if (combo in used || board[x][y] !== 0) {
    used[combo] = true;
    addFood(board, used);
    return false;
  }
  board[y][x] = 2;
  return true;
};

export const addStarting = (board: BoardObject) => {
  const center = Math.floor(board.length / 2);
  board[center][center] = 1;
};

export const generateBoard = (size: number) => {
  const board: BoardObject = [];
  for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
      board[i][j] = 0;
    }
  }

  addStarting(board);
  addFood(board);
  return board;
};

export const nextSnakePosition = () => undefined;
export const collision = (next: any) => next && false;
export const endGame = () => undefined;
export const eat = () => undefined;
