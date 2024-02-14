import React from 'react';
import { Text, View } from '../../../../components';
import { spacing } from '../../../../features';
import { type Item } from '../../types';

type Properties = {
  readonly item: Item;
};

export const ListSection = ({ item }: Properties) => (
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
