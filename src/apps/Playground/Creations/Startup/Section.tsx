import React, { ReactNode } from 'react';
import { Card, Spacing, Text } from '../../../../components';

type Props = {
  children: ReactNode;
  title: string;
};

export const Section = ({ children, title }: Props): JSX.Element => {
  return (
    <Card>
      <Text
        emphasis="low"
        title={title}
        type="h4"
      />
      <Spacing padding={2} />
      {children}
    </Card>
  );
};
