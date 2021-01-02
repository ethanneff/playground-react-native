import React, {memo} from 'react';
import {View} from 'react-native';
import {Icon} from '../../../components';
import {ListHeaderInput} from './ListHeaderInput';

type ListHeaderProps = {
  listId: string;
};

export const ListHeader = memo(function ListHeader({listId}: ListHeaderProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <ListHeaderInput listId={listId} />
      <Icon name="dots-horizontal" padded />
    </View>
  );
});
