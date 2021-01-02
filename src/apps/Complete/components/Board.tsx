import React, {memo, useCallback} from 'react';
import {FlatList} from 'react-native';
import {useRootSelector} from '../../../utils';
import {config} from '../configs';
import {AddList} from './AddList';
import {List} from './List';

type BoardProps = {
  boardId: string;
  listMaxHeight: number;
  listWidth: number;
};

export const Board = memo(function Board({
  boardId,
  listMaxHeight,
  listWidth,
}: BoardProps) {
  const listSize = listWidth + config.padding;
  const board = useRootSelector((s) => s.completeBoard.items[boardId]);
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
      <AddList
        boardId={boardId}
        placeholder="List title..."
        title="Add list"
        width={listWidth}
      />
    );
  }, [boardId, listWidth]);

  const renderList = useCallback(
    ({item}) => {
      return (
        <List
          key={item}
          listId={item}
          listMaxHeight={listMaxHeight}
          listWidth={listWidth}
          orientation="horizontal"
          placeholder="List title..."
          title="Add list"
        />
      );
    },
    [listMaxHeight, listWidth],
  );

  return (
    <FlatList
      ListFooterComponent={renderAddList}
      contentContainerStyle={{padding: config.padding}}
      data={board.lists}
      decelerationRate="fast"
      getItemLayout={getItemLayout}
      horizontal
      keyExtractor={getItemId}
      keyboardShouldPersistTaps="handled"
      renderItem={renderList}
      showsHorizontalScrollIndicator={false}
      snapToAlignment="center"
      snapToInterval={listSize}
    />
  );
});
