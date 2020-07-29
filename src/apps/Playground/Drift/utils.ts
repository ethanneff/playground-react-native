type Position = {
  change: {dx: number; dy: number};
  canvas: {x: number; y: number; width: number; height: number};
  current: {x: number; y: number};
  size: number;
};

type Vector = {
  x: number;
  y: number;
};

export const getPosition = (position: Position): Vector => {
  const dx = position.current.x - position.change.dx;
  const dy = position.current.y + position.change.dy;
  const y =
    dy < 0
      ? 0
      : dy + position.size > position.canvas.height
      ? position.canvas.height - position.size
      : dy;
  const x =
    dx < 0
      ? 0
      : dx + position.size > position.canvas.width
      ? position.canvas.width - position.size
      : dx;
  return {x, y};
};
