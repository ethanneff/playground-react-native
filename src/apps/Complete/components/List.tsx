import React, { memo, type ReactNode } from 'react';
import { Card, View } from '../../../components';
import { completeConfig } from '../utils';
import { AddItem } from './AddItem';
import { ListHeader } from './ListHeader';
import { ListItems } from './ListItems';

type ListProps = {
  footer?: ReactNode;
  itemId: string;
  listWidth?: number;
  maxHeight: number;
  orientation?: 'horizontal' | 'vertical';
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
    <View style={{ flex: 1, maxHeight, padding }}>
      <Card
        containerStyle={{
          marginRight: margin === 'right' ? completeConfig.padding : 0,
          width: listWidth,
        }}
        elevation={4}
        nonFlex
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
