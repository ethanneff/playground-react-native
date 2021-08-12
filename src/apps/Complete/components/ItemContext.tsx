import React, {memo} from 'react';
import {View} from 'react-native';
import {RelativeDate, Text} from '../../../components';
import {padding} from '../../../features';
import {Card} from './Card';
import {ItemDetailHeader} from './ItemDetailHeader';

type ItemContextProps = {
  userId: string;
  createdAt: number;
  updatedAt: number;
  type: string;
};

export const ItemContext = memo(function ItemContext({
  type,
  userId,
  createdAt,
  updatedAt,
}: ItemContextProps) {
  return (
    <View>
      <Card margin="bottom">
        <ItemDetailHeader title="Type" />
        <Text style={{padding: padding(2)}} title={type} />
        <ItemDetailHeader title="Creator" />
        <Text style={{padding: padding(2)}} title={userId} />
        <ItemDetailHeader title="Created" />
        <RelativeDate date={createdAt} style={{padding: padding(2)}} />
        <ItemDetailHeader title="Updated" />
        <RelativeDate date={updatedAt} style={{padding: padding(2)}} />
      </Card>
    </View>
  );
});
