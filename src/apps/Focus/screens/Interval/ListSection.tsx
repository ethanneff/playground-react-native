import React, { memo } from 'react';
import { Text, View } from '../../../../components';
import { spacing } from '../../../../features';
import { type Item } from '../../types';

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
        padding: spacing(2),
      }}
    >
      <Text
        title={item.dayOfMonth}
        type="h4"
      />
      <Text
        title={` ${item.month}, ${item.dayOfWeek}`}
        type="overline"
      />
    </View>
  );
});
