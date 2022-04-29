import React from 'react';
import { Spacing, Text } from '../../../components';

type TitleProps = { description: string; title: string };

export const Title = ({ title, description }: TitleProps) => {
  return (
    <Spacing padding={4}>
      <Text title={title} type="h5" />
      <Text emphasis="medium" title={description} type="caption" />
    </Spacing>
  );
};
