import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
} from 'react-native';
import {Screen} from '../../components';
import {useAdminNavBack} from '../../hooks';
import {ListItem} from './ListItem';
import {Item} from './types';
import {
  getCurrentItem,
  getFirstItemOfDay,
  getItemLayout,
  getMoreItems,
  initialIndex,
  keyExtractor,
} from './utils';

// TODO: flatlist on web

export const Home = memo(function Home() {
  const {onLeftPress} = useAdminNavBack();
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

  const renderItem = useCallback<ListRenderItem<Item>>(
    ({item, index}) => (
      <ListItem
        currentItem={getCurrentItem(item)}
        item={item}
        showSection={getFirstItemOfDay(index, item, items)}
      />
    ),
    [items],
  );

  useEffect(() => {
    if (loading && items.length > 0) setTimeout(() => setLoading(false), 1000);
  }, [items.length, loading]);

  return (
    <Screen border onLeftPress={onLeftPress} title="Focus">
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
      {loading && <ActivityIndicator size="large" style={styles.loading} />}
    </Screen>
  );
});
