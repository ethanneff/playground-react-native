import React, { memo } from 'react';
import { View } from 'react-native';
import { Text } from '../../../../components';
import { padding } from '../../../../features';
import { Item } from '../../types';

type Props = {
  item: Item;
};

export const ListSection = memo(function ListSection({ item }: Props) {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: padding(2),
      }}
    >
      <Text title={item.dayOfMonth} type="h4" />
      <Text title={` ${item.month}, ${item.dayOfWeek}`} type="overline" />
    </View>
  );
});
