import React, {memo} from 'react';
import {AddItem} from './AddItem';
import {Card} from './Card';
import {ListHeader} from './ListHeader';
import {ListItems} from './ListItems';

type ListProps = {
  listWidth?: number;
  itemId: string;
  parentItemId: string | null;
  orientation?: 'vertical' | 'horizontal';
  title: string;
  placeholder: string;
};

export const List = memo(function List({
  itemId,
  parentItemId,
  orientation,
  listWidth,
  title,
  placeholder,
}: ListProps) {
  const margin = orientation === 'horizontal' ? 'right' : 'bottom';
  return (
    <Card margin={margin} width={listWidth}>
      <ListHeader itemId={itemId} parentItemId={parentItemId} />
      <ListItems parentItemId={itemId} />
      <AddItem parentItemId={itemId} placeholder={placeholder} title={title} />
    </Card>
  );
});
