import React, {memo} from 'react';
import {View} from 'react-native';
import {useColor} from '../../../hooks';
import {config} from '../configs';
import {AddItem} from './AddItem';
import {ListHeader} from './ListHeader';
import {ListItems} from './ListItems';

type ListProps = {
  listWidth?: number;
  listId: string;
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
}: ListProps) {
  const color = useColor();
  const padding = config.padding;
  const borderRadius = config.borderRadius;
  const horizontal = orientation === 'horizontal';
  return (
    <View>
      <View
        style={{
          borderRadius,
          width: listWidth,
          backgroundColor: color.background,
          padding: padding / 2,
          marginRight: horizontal ? padding : 0,
          marginBottom: horizontal ? 0 : padding,
        }}>
        <ListHeader listId={listId} />
        <ListItems listId={listId} maxHeight={listMaxHeight} />
        <AddItem listId={listId} placeholder={placeholder} title={title} />
      </View>
    </View>
  );
});
