import React, { useCallback } from 'react';
import { FlatList, type FlatListRenderItem } from '../../../components';
import { useAppSelector } from '../../../redux';
import { completeConfig } from '../utils';
import { AddItem } from './AddItem';
import { List } from './List';

type BoardProperties = {
  readonly listMaxHeight: number;
  readonly listWidth: number;
  readonly projectItemId: string;
};

export const Board = ({
  listMaxHeight,
  listWidth,
  projectItemId,
}: BoardProperties) => {
  const listSize = listWidth + completeConfig.padding;
  const board = useAppSelector((s) => s.complete.item.items[projectItemId]);
  const getItemId = useCallback((item: string) => item, []);

  const renderAddList = useCallback(
    () => (
      <AddItem
        parentItemId={board.id}
        placeholder="List title..."
        title="Add list"
        width={listWidth}
      />
    ),
    [board.id, listWidth],
  );

  const renderItem = useCallback<FlatListRenderItem<string>>(
    ({ item }) => (
      <List
        itemId={item}
        listWidth={listWidth}
        maxHeight={listMaxHeight}
        orientation="horizontal"
        parentItemId={board.id}
      />
    ),
    [board.id, listMaxHeight, listWidth],
  );

  return board.type === 'list' ? (
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
      horizontal
      keyExtractor={getItemId}
      keyboardShouldPersistTaps="handled"
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      snapToAlignment="center"
      snapToInterval={listSize}
    />
  );
};
