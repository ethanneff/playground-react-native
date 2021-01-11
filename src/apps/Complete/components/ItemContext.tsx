import React, {memo} from 'react';
import {View} from 'react-native';
import {RelativeDate, Text} from '../../../components';
import {Theme} from '../../../utils';
import {Card} from './Card';
import {ItemDetailHeader} from './ItemDetailHeader';

type ItemContextProps = {
  userId: string;
  createdAt: number;
  updatedAt: number;
};

export const ItemContext = memo(function ItemContext({
  userId,
  createdAt,
  updatedAt,
}: ItemContextProps) {
  return (
    <View>
      <Card margin="bottom">
        <ItemDetailHeader title="Creator" />
        <Text style={{padding: Theme.padding.p02}} title={userId} />
        <ItemDetailHeader title="Created" />
        <RelativeDate date={createdAt} style={{padding: Theme.padding.p02}} />
        <ItemDetailHeader title="Updated" />
        <RelativeDate date={updatedAt} style={{padding: Theme.padding.p02}} />
      </Card>
    </View>
  );
});
