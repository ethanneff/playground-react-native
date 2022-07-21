import React, { memo } from 'react';
import { Text } from '../../../components';
import { spacing } from '../../../features';

type ItemDetailHeaderProps = {
  title: string;
};

export const ItemDetailHeader = memo(function ItemDetailHeader({
  title,
}: ItemDetailHeaderProps) {
  return (
    <Text
      emphasis="medium"
      style={{ padding: spacing(2) }}
      title={title}
      type="overline"
    />
  );
});
