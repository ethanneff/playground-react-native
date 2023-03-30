import React, { memo } from 'react';
import { Text } from '../../../components';

type ItemDetailHeaderProps = {
  title: string;
};

export const ItemDetailHeader = memo(function ItemDetailHeader({
  title,
}: ItemDetailHeaderProps) {
  return (
    <Text
      emphasis="high"
      title={title}
      type="overline"
    />
  );
});
