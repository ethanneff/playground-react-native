import React, {memo, ReactElement} from 'react';
import {View} from 'react-native';
import {completeConfig} from '../utils';
import {AddItem} from './AddItem';
import {Card} from './Card';
import {ListHeader} from './ListHeader';
import {ListItems} from './ListItems';

type ListProps = {
  listWidth?: number;
  itemId: string;
  parentItemId: string | null;
  orientation?: 'vertical' | 'horizontal';
  footer?: ReactElement;
  maxHeight: number;
};

export const List = memo(function List({
  itemId,
  parentItemId,
  orientation = 'vertical',
  listWidth,
  maxHeight,
  footer,
}: ListProps) {
  const horizontal = orientation === 'horizontal';
  const padding = horizontal ? 0 : completeConfig.padding;
  const margin = horizontal ? 'right' : 'bottom';
  return (
    <View style={{padding, maxHeight}}>
      <Card margin={margin} width={listWidth}>
        <ListHeader itemId={itemId} parentItemId={parentItemId} />
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
