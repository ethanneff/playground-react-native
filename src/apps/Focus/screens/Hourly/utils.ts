import dayjs from 'dayjs';
import {infiniteScrollRegeneration, itemHeight} from '../../configs';
import {Item} from '../../types';

export const initialIndex =
  dayjs().startOf('day').add(2, 'day').diff(dayjs(), 'hour') - 4;

export const getItemLayout = (
  _: Item[] | null | undefined,
  index: number,
): {length: number; offset: number; index: number} => ({
  length: itemHeight,
  offset: itemHeight * index,
  index,
});

export const getCurrentItem = (item: Item): boolean => {
  const currentTime = new Date();
  const before = currentTime.setHours(currentTime.getHours() - 1);
  const after = currentTime.setHours(currentTime.getHours() + 1);
  const between = item.id > before && item.id < after;
  return between;
};

export const getFirstItemOfDay = (
  index: number,
  item: Item,
  items: Item[],
): boolean =>
  index < 1 ? false : item.dayOfMonth !== items[index - 1].dayOfMonth;

export const keyExtractor = (item: Item): string => String(item.id);

export const getMoreItems = (items: Item[]): Item[] => {
  const group = [...items];
  for (let i = 0; i < infiniteScrollRegeneration; i++) {
    const lastItem =
      group.length === 0
        ? dayjs().startOf('day').add(2, 'day').valueOf()
        : group[group.length - 1].id;
    const next = dayjs(lastItem).subtract(1, 'hour');
    const id = next.valueOf();
    group.push({
      title: String(Math.random()) + String(Math.random()),
      dayOfMonth: next.format('D'),
      dayOfWeek: next.format('ddd'),
      hour: next.format('h'),
      id,
      month: next.format('MMM'),
      zone: next.format('a'),
    });
  }
  return group;
};
