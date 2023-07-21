import React from 'react';
import { Text } from '../../../components';

type ItemDetailHeaderProps = {
  readonly title: string;
};

export const ItemDetailHeader = ({ title }: ItemDetailHeaderProps) => (
  <Text
    emphasis="high"
    title={title}
    type="overline"
  />
);
