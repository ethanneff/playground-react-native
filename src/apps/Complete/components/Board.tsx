import React, { memo, useCallback } from 'react';
import { ListRenderItem, View } from 'react-native';
import { FlatList } from '../../../components';
import { useRootSelector } from '../../../redux';
import { completeConfig } from '../utils';
import { AddItem } from './AddItem';
import { List } from './List';

type BoardProps = {
  listMaxHeight: number;
  listWidth: number;
  projectItemId: string;
};

export const Board = memo(function Board({
  projectItemId,
  listMaxHeight,
  listWidth,
}: BoardProps) {
  const listSize = listWidth + completeConfig.padding;
  const board = useRootSelector((s) => s.completeItem.items[projectItemId]);
  const getItemId = useCallback((item: string) => item, []);
  const getItemLayout = useCallback(
    (_: string[] | null | undefined, index: number) => ({
      length: listSize,
      offset: listSize * index,
      index,
    }),
    [listSize],
  );

  const renderAddList = useCallback(() => {
    return (
      <AddItem
        parentItemId={board.id}
        placeholder="List title..."
        title="Add list"
        width={listWidth}
      />
    );
  }, [board.id, listWidth]);

  const renderList = useCallback<ListRenderItem<string>>(
    ({ item }) => {
      return (
        <List
          itemId={item}
          key={item}
          listWidth={listWidth}
          maxHeight={listMaxHeight}
          orientation="horizontal"
          parentItemId={board.id}
        />
      );
    },
    [board.id, listMaxHeight, listWidth],
  );

  return (
    <View>
      {board.type === 'list' ? (
        <List
          itemId={board.id}
          maxHeight={listMaxHeight}
          parentItemId={board.id}
        />
      ) : (
        <FlatList
          ListFooterComponent={renderAddList}
          contentContainerStyle={{ padding: completeConfig.padding }}
          data={board.children}
          decelerationRate="fast"
          getItemLayout={getItemLayout}
          horizontal
          keyExtractor={getItemId}
          keyboardShouldPersistTaps="handled"
          renderItem={renderList}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          snapToInterval={listSize}
          style={{ height: '100%' }}
        />
      )}
    </View>
  );
});
