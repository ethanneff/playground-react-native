import React, {memo} from 'react';
import {View} from 'react-native';
import {AddItem} from './AddItem';
import {Card} from './Card';
import {ListHeader} from './ListHeader';
import {ListItems} from './ListItems';

type ListProps = {
  listWidth?: number;
  listId: string;
  boardId: string;
  listMaxHeight: number;
  orientation?: 'vertical' | 'horizontal';
  title: string;
  placeholder: string;
};

export const List = memo(function List({
  listId,
  orientation,
  listWidth,
  listMaxHeight,
  title,
  placeholder,
  boardId,
}: ListProps) {
  const margin = orientation === 'horizontal' ? 'right' : 'bottom';
  return (
    <View>
      <Card margin={margin} width={listWidth}>
        <ListHeader boardId={boardId} listId={listId} />
        <ListItems listId={listId} maxHeight={listMaxHeight} />
        <AddItem listId={listId} placeholder={placeholder} title={title} />
      </Card>
    </View>
  );
});
