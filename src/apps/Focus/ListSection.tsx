import React, {memo} from 'react';
import {View} from 'react-native';
import {Text} from '../../components';
import {useColor} from '../../hooks';
import {Theme} from '../../utils';
import {Item} from './types';

interface Props {
  item: Item;
}

export const ListSection = memo(function ListSection({item}: Props) {
  const color = useColor();
  return (
    <View
      style={{
        alignItems: 'center',
        borderTopColor: color.secondary,
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Theme.padding.p02,
        padding: Theme.padding.p02,
      }}>
      <Text title={item.dayOfMonth} type="h4" />
      <Text title={` ${item.month}, ${item.dayOfWeek}`} type="overline" />
    </View>
  );
});
