import React, {memo} from 'react';
import {View} from 'react-native';
import {Icon} from '../../../components';
import {config} from '../configs';
import {ListHeaderInput} from './ListHeaderInput';

type ListHeaderProps = {
  listId: string;
};

export const ListHeader2 = memo(function ListHeader({listId}: ListHeaderProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: config.padding,
      }}>
      <ListHeaderInput listId={listId} />
      <Icon name="dots-horizontal" padded />
    </View>
  );
});
