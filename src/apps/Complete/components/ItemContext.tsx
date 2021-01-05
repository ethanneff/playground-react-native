import React, {memo} from 'react';
import {View} from 'react-native';
import {RelativeDate, Text} from '../../../components';
import {Card} from './Card';

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
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text emphasis="medium" title="Creator: " />
          <Text title={userId} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text emphasis="medium" title="Created: " />
          <RelativeDate date={createdAt} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text emphasis="medium" title="Updated: " />
          <RelativeDate date={updatedAt} />
        </View>
      </Card>
    </View>
  );
});
