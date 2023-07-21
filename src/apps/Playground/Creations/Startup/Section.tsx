import React, { type ReactNode } from 'react';
import { Card, Spacing, Text } from '../../../../components';
import { spacing } from '../../../../features';

type Props = {
  readonly children: ReactNode;
  readonly title: string;
};

export const Section = ({ children, title }: Props) => (
  <Card>
    <Text
      emphasis="low"
      title={title}
      type="h4"
    />
    <Spacing padding={spacing(2)} />
    {children}
  </Card>
);
