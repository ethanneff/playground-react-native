import React, { memo, ReactNode } from 'react';
import { View } from '../../../components';
import { completeConfig } from '../utils';
import { AddItem } from './AddItem';
import { Card } from './Card';
import { ListHeader } from './ListHeader';
import { ListItems } from './ListItems';

type ListProps = {
  footer?: ReactNode;
  itemId: string;
  listWidth?: number;
  maxHeight: number;
  orientation?: 'vertical' | 'horizontal';
  parentItemId: string | null;
};

export const List = memo(function List({
  footer,
  itemId,
  listWidth,
  maxHeight,
  orientation = 'vertical',
  parentItemId,
}: ListProps) {
  const horizontal = orientation === 'horizontal';
  const padding = horizontal ? 0 : completeConfig.padding;
  const margin = horizontal ? 'right' : 'bottom';
  return (
    <View style={{ maxHeight, padding }}>
      <Card
        margin={margin}
        width={listWidth}
      >
        <ListHeader
          itemId={itemId}
          parentItemId={parentItemId}
        />
        <ListItems parentItemId={itemId} />
        <AddItem
          parentItemId={itemId}
          placeholder="Item title..."
          title="Add item"
        />
      </Card>
      {footer ? footer : null}
    </View>
  );
});
