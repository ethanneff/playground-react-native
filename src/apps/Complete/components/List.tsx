import React, { type ReactNode } from 'react';
import { Card, View } from '../../../components';
import { completeConfig } from '../utils';
import { AddItem } from './AddItem';
import { ListHeader } from './ListHeader';
import { ListItems } from './ListItems';

type ListProperties = {
  readonly footer?: ReactNode;
  readonly itemId: string;
  readonly listWidth?: number;
  readonly maxHeight: number;
  readonly orientation?: 'horizontal' | 'vertical';
  readonly parentItemId: string | null;
};

export const List = ({
  footer,
  itemId,
  listWidth,
  maxHeight,
  orientation = 'vertical',
  parentItemId,
}: ListProperties) => {
  const horizontal = orientation === 'horizontal';
  const padding = horizontal ? 0 : completeConfig.padding;
  const margin = horizontal ? 'right' : 'bottom';

  return (
    <View
      padding={padding}
      style={{ maxHeight }}
    >
      <Card
        containerStyle={{
          flex: 0,
          flexShrink: 1,
          marginRight: margin === 'right' ? completeConfig.padding : 0,
          width: listWidth,
        }}
        contentStyle={{ flex: 0, flexShrink: 1 }}
        elevation={4}
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
      {footer ?? null}
    </View>
  );
};
