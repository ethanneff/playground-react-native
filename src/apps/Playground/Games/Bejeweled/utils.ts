import { type Board, type Cell, type Game, type Gem } from './types';

const getRandom = (max: number) => Math.floor(Math.random() * max);

const gems: Gem[] = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠'];

const getUniqueGemColor = ({
  board,
  row,
  x,
  y,
}: {
  board: Board;
  row: Cell[];
  x: number;
  y: number;
}): Gem => {
  const adjacentGems = new Set<Gem>();

  if (x > 1 && board[x - 1][y].gem === board[x - 2][y].gem) {
    adjacentGems.add(board[x - 1][y].gem);
  }

  if (y > 1 && row[y - 1].gem === row[y - 2].gem) {
    adjacentGems.add(row[y - 1].gem);
  }

  const validGems = gems.filter((gem) => !adjacentGems.has(gem));

  return validGems[getRandom(validGems.length)];
};

const getBoard = (count: number): Board => {
  const board: Board = [];
  for (let x = 0; x < count; x++) {
    const row: Cell[] = [];
    for (let y = 0; y < count; y++) {
      const gem = getUniqueGemColor({ board, row, x, y });
      const cell: Cell = {
        bonus: false,
        gem,
        hint: false,
        position: { x, y },
        selected: false,
      };
      row.push(cell);
    }
    board.push(row);
  }
  return board;
};

export const getGame = (count: number): Game => {
  const board = getBoard(count);
  return { board, level: 1, score: 0, selected: null, state: 'idle' };
};
