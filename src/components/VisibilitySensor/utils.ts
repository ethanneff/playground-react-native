import { type LayoutRectangle } from 'react-native';
import { type Position } from './types';

export const getDirection = (
  view: LayoutRectangle,
  container: LayoutRectangle,
): Position => {
  const viewCenter = {
    x: view.x + view.width / 2,
    y: view.y + view.height / 2,
  };
  const containerCenter = {
    x: container.x + container.width / 2,
    y: container.y + container.height / 2,
  };
  const xDistance = containerCenter.x - viewCenter.x;
  const yDistance = containerCenter.y - viewCenter.y;
  const absXDistance = Math.abs(xDistance);
  const absYDistance = Math.abs(yDistance);

  if (xDistance > 0 && absXDistance > absYDistance) return 'left';
  if (xDistance < 0 && absXDistance > absYDistance) return 'right';
  if (yDistance > 0 && absXDistance < absYDistance) return 'top';
  return 'bottom';
};

export const getVisible = (
  view: LayoutRectangle,
  container: LayoutRectangle,
) => {
  const larger =
    view.y < container.y &&
    view.x < container.x &&
    view.y + view.height > container.y + container.height &&
    view.x + view.width > container.x + container.width;
  const top = view.y >= container.y && view.y <= container.y + container.height;
  const bottom =
    view.y + view.height >= container.y &&
    view.y + view.height <= container.y + container.height;
  const right =
    view.x >= container.x && view.x <= container.x + container.width;
  const left =
    view.x + view.width >= container.x &&
    view.x + view.width <= container.x + container.width;

  if (larger) return true;
  if (top && left) return true;
  if (top && right) return true;
  if (bottom && left) return true;
  return bottom && right;
};
