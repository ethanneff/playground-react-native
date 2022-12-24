import React, { memo, useCallback, useEffect, useState } from 'react';
import { ListRenderItem, StyleSheet } from 'react-native';
import { FlatList, Loader, Screen } from '../../../../components';
import { spacing, useColors, useLayout } from '../../../../features';
import { Item } from '../../types';
import { ListItem } from './ListItem';
import {
  getCurrentItem,
  getFirstItemOfDay,
  getItemLayout,
  getLastItemOfDay,
  getMoreItems,
  initialIndex,
  keyExtractor,
} from './utils';

export const Interval = memo(function Interval() {
  const colors = useColors();
  const { tabBarEdges } = useLayout();

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Item[]>(() => getMoreItems([]));

  const addMoreItems = useCallback(() => {
    const moreItems = getMoreItems(items);
    setItems(moreItems);
  }, [items]);

  const styles = StyleSheet.create({
    list: {
      backgroundColor: colors.background.secondary,
      opacity: loading ? 0 : 1,
      paddingVertical: spacing(4),
    },
    loading: {
      height: '100%',
      position: 'absolute',
      width: '100%',
    },
  });

  const renderItem = useCallback<ListRenderItem<Item>>(
    ({ index, item }) => (
      <ListItem
        currentItem={getCurrentItem(item)}
        item={item}
        showFooter={getLastItemOfDay(index, item, items)}
        showHeader={getFirstItemOfDay(index, item, items)}
      />
    ),
    [items],
  );

  useEffect(() => {
    if (loading && items.length > 0) setTimeout(() => setLoading(false), 1000);
  }, [items.length, loading]);

  return (
    <Screen
      dropShadow
      edges={tabBarEdges}
      title="Tracker"
    >
      <FlatList
        data={items}
        getItemLayout={getItemLayout}
        initialNumToRender={0}
        initialScrollIndex={initialIndex}
        inverted
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
        onEndReached={addMoreItems}
        onEndReachedThreshold={0.5}
        renderItem={renderItem}
        style={styles.list}
      />
      {loading ? (
        <Loader
          size="large"
          style={styles.loading}
        />
      ) : null}
    </Screen>
  );
});
