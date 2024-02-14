import React from 'react';
import { Text } from '../../../../components';
import { spacing } from '../../../../features';

type Properties = {
  readonly title: string;
};

export const Title = ({ title }: Properties) => (
  <Text
    center
    style={{ padding: spacing(8) }}
    title={title}
    type="h4"
  />
);
