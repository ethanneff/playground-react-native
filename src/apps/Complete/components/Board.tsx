import React, {memo, useCallback} from 'react';
import {FlatList} from 'react-native';
import {useRootSelector} from '../../../utils';
import {completeConfig} from '../utils';
import {AddItem} from './AddItem';
import {List} from './List';

type BoardProps = {
  projectItemId: string;
  listMaxHeight: number;
  listWidth: number;
};

export const Board = memo(function Board({
  projectItemId,
  listMaxHeight,
  listWidth,
}: BoardProps) {
  const listSize = listWidth + completeConfig.padding;
  const board = useRootSelector((s) => s.completeItem.items[projectItemId]);
  const getItemId = useCallback((item) => item, []);
  const getItemLayout = useCallback(
    (_, index) => ({
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

  const renderList = useCallback(
    ({item}) => {
      return (
        <List
          itemId={item}
          key={item}
          listMaxHeight={listMaxHeight}
          listWidth={listWidth}
          orientation="horizontal"
          parentItemId={board.id}
          placeholder="Item title..."
          title="Add item"
        />
      );
    },
    [board.id, listMaxHeight, listWidth],
  );

  return (
    <FlatList
      ListFooterComponent={renderAddList}
      contentContainerStyle={{padding: completeConfig.padding}}
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
      style={{height: '100%'}}
    />
  );
});
