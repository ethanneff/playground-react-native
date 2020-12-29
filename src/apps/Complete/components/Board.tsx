import React, {memo, useCallback} from 'react';
import {FlatList} from 'react-native';
import {BoardAdd, List} from '.';
import {useRootSelector} from '../../../utils';
import {config} from '../configs';

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
  const getItemId = useCallback((item) => item.id, []);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: listSize,
      offset: listSize * index,
      index,
    }),
    [listSize],
  );

  const renderAddList = useCallback(() => {
    return <BoardAdd listWidth={listWidth} />;
  }, [listWidth]);

  const renderList = useCallback(
    ({item}) => {
      return (
        <List
          buttonTitle="Add list"
          inputPlaceholder="List title..."
          key={item}
          listId={item}
          listMaxHeight={listMaxHeight}
          listWidth={listWidth}
          orientation="horizontal"
        />
      );
    },
    [listMaxHeight, listWidth],
  );

  return (
    <FlatList
      ListFooterComponent={renderAddList}
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
