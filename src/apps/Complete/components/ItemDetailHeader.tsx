import React from 'react';
import { Text } from '../../../components';

type ItemDetailHeaderProperties = {
  readonly title: string;
};

export const ItemDetailHeader = ({ title }: ItemDetailHeaderProperties) => (
  <Text
    emphasis="high"
    title={title}
    type="overline"
  />
);
