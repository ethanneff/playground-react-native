import React, { memo } from 'react';
import { RelativeDate, Text, View } from '../../../components';
import { spacing } from '../../../features';
import { Card } from './Card';
import { ItemDetailHeader } from './ItemDetailHeader';

type ItemContextProps = {
  createdAt: number;
  type: string;
  updatedAt: number;
  userId: string;
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
        <Text
          style={{ padding: spacing(2) }}
          title={type}
        />
        <ItemDetailHeader title="Creator" />
        <Text
          style={{ padding: spacing(2) }}
          title={userId}
        />
        <ItemDetailHeader title="Created" />
        <RelativeDate
          date={createdAt}
          style={{ padding: spacing(2) }}
        />
        <ItemDetailHeader title="Updated" />
        <RelativeDate
          date={updatedAt}
          style={{ padding: spacing(2) }}
        />
      </Card>
    </View>
  );
});
