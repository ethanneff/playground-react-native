import React, { RefAttributes } from 'react';
import { FlatListProps } from 'react-native';
import { GestureFlatList } from '../../conversions';

export type FlatListRef = GestureFlatList | null;

export const FlatList = <ItemT,>(
  props: FlatListProps<ItemT> & RefAttributes<GestureFlatList>,
) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <GestureFlatList {...props} />;
};
