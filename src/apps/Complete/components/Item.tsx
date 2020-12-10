import React, {memo} from 'react';
import {Text, TouchableOpacity} from '../../../components';
import {ItemObject} from '../types';

type ItemProps = {
  item: ItemObject;
  padding: number;
  borderRadius: number;
  backgroundColor: string;
};

export const Item = memo(function Item({
  item,
  padding,
  borderRadius,
  backgroundColor,
}: ItemProps) {
  return (
    <TouchableOpacity
      key={item.id}
      style={{
        borderRadius,
        padding: padding,
        backgroundColor,
        marginBottom: padding / 2,
      }}>
      <Text title={item.name} />
    </TouchableOpacity>
  );
});
