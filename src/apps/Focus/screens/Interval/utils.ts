import { add, differenceInHours, format, startOfDay, sub } from 'date-fns';
import { type Item } from '../../types';

const today = new Date();
export const initialIndex =
  differenceInHours(add(startOfDay(today), { days: 2 }), new Date()) - 4;

export const getCurrentItem = (item: Item): boolean => {
  const currentTime = new Date();
  const before = currentTime.setHours(currentTime.getHours() - 1);
  const after = currentTime.setHours(currentTime.getHours() + 1);
  return item.id > before && item.id < after;
};

export const getFirstItemOfDay = (
  index: number,
  item: Item,
  items: Item[],
): boolean =>
  index >= items.length - 1
    ? false
    : item.dayOfMonth !== items[index + 1].dayOfMonth;

export const getLastItemOfDay = (
  index: number,
  item: Item,
  items: Item[],
): boolean =>
  index < 1 ? true : item.dayOfMonth !== items[index - 1].dayOfMonth;

export const keyExtractor = (item: Item): string => String(item.id);

export const getMoreItems = (items: Item[]): Item[] => {
  const group = [...items];
  for (let index = 0; index < 100; index++) {
    const lastItem =
      group.length === 0
        ? add(startOfDay(new Date()), { days: 2 })
        : (group.at(-1)?.id ?? 0);
    const next = sub(lastItem, { hours: 1 });
    const id = next.valueOf();
    group.push({
      dayOfMonth: format(next, 'd'),
      dayOfWeek: format(next, 'ddd'),
      hour: format(next, 'h'),
      id,
      month: format(next, 'MMM'),
      title: String(Math.random()) + String(Math.random()),
      zone: format(next, 'a'),
    });
  }
  return group;
};
