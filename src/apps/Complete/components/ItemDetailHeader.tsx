import React, {memo} from 'react';
import {Text} from '../../../components';
import {Theme} from '../../../utils';

type ItemDetailHeaderProps = {
  title: string;
};

export const ItemDetailHeader = memo(function ItemDetailHeader({
  title,
}: ItemDetailHeaderProps) {
  return (
    <Text
      emphasis="medium"
      style={{padding: Theme.padding.p02}}
      title={title}
      type="overline"
    />
  );
});
