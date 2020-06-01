import React, {memo, useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import dayjs from 'dayjs';
import {Theme} from '../../../utils';
import {ListItem} from './ListItem';

export interface Item {
  action: string;
  dayOfMonth: string;
  dayOfWeek: string;
  hour: string;
  id: number;
  month: string;
  zone: string;
}

interface Props {
  items: Item[];
  onEndReached(): void;
  onEndReachedThreshold: number;
  onItemPress(item: Item): void;
}

const itemHeight = Theme.padding.p10;

const initialIndex =
  dayjs().startOf('day').add(2, 'day').diff(dayjs(), 'hour') - 4;

const getItemLayout = (_: Item[] | null | undefined, index: number) => ({
  length: itemHeight,
  offset: itemHeight * index,
  index,
});

const getCurrentItem = (item: Item): boolean => {
  const currentTime = new Date();
  const before = currentTime.setHours(currentTime.getHours() - 1);
  const after = currentTime.setHours(currentTime.getHours() + 1);
  const between = item.id > before && item.id < after;
  return between;
};

const getFirstItemOfDay = (index: number, item: Item, items: Item[]) =>
  index < 1 ? false : item.dayOfMonth !== items[index - 1].dayOfMonth;

const keyExtractor = (item: Item) => String(item.id);

export const List = memo(
  ({items, onItemPress, onEndReached, onEndReachedThreshold}: Props) => {
    const [loading, setLoading] = useState(true);
    const styles = StyleSheet.create({
      list: {
        opacity: loading ? 0 : 1,
      },
      loading: {
        position: 'absolute',
        height: '100%',
        width: '100%',
      },
    });

    const onLoad = useCallback(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, []);

    useEffect(onLoad, []);

    const renderItem = useCallback(
      ({item, index}) => (
        <ListItem
          currentItem={getCurrentItem(item)}
          item={item}
          showSection={getFirstItemOfDay(index, item, items)}
          onItemPress={onItemPress}
        />
      ),
      [items, onItemPress],
    );

    return (
      <>
        <FlatList
          style={styles.list}
          inverted
          initialNumToRender={0}
          initialScrollIndex={initialIndex}
          getItemLayout={getItemLayout}
          keyExtractor={keyExtractor}
          data={items}
          onEndReached={onEndReached}
          onEndReachedThreshold={onEndReachedThreshold}
          renderItem={renderItem}
        />
        {loading && <ActivityIndicator size="large" style={styles.loading} />}
      </>
    );
  },
);
