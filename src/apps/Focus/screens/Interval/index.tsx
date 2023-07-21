import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  FlashList,
  Loader,
  Screen,
  View,
  type FlashListRenderItem,
} from '../../../../components';
import { spacing, useLayout } from '../../../../features';
import { type Item } from '../../types';
import { ListItem } from './ListItem';
import {
  getCurrentItem,
  getFirstItemOfDay,
  getLastItemOfDay,
  getMoreItems,
  initialIndex,
  keyExtractor,
} from './utils';

export const Interval = () => {
  const { tabBarEdges } = useLayout();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Item[]>(() => getMoreItems([]));

  const addMoreItems = useCallback(() => {
    const moreItems = getMoreItems(items);
    setItems(moreItems);
  }, [items]);

  const styles = StyleSheet.create({
    list: {
      opacity: loading ? 0 : 1,
    },
    loading: {
      height: '100%',
      position: 'absolute',
      width: '100%',
    },
  });

  const renderItem = useCallback<FlashListRenderItem<Item>>(
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
    if (loading && items.length > 0)
      setTimeout(() => {
        setLoading(false);
      }, 1000);
  }, [items.length, loading]);

  return (
    <Screen
      dropShadow
      edges={tabBarEdges}
      title="Tracker"
    >
      <View
        backgroundColor="secondary"
        flex={1}
      >
        <View
          flex={1}
          style={styles.list}
        >
          <FlashList
            contentContainerStyle={{ paddingVertical: spacing(4) }}
            data={items}
            estimatedItemSize={55}
            initialScrollIndex={initialIndex}
            inverted
            keyExtractor={keyExtractor}
            onEndReached={addMoreItems}
            onEndReachedThreshold={0.5}
            renderItem={renderItem}
          />
        </View>
        {loading ? (
          <Loader
            size="large"
            style={styles.loading}
          />
        ) : null}
      </View>
    </Screen>
  );
};
