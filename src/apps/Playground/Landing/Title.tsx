import React from 'react';
import { Spacing, Text, View } from '../../../components';
import { spacing } from '../../../features';

type TitleProps = {
  readonly description: string;
  readonly title: string;
};

export const Title = ({ description, title }: TitleProps) => (
  <View padding={spacing(2)}>
    <Text
      title={title}
      type="h5"
    />
    <Spacing padding={spacing(0.5)} />
    <Text
      emphasis="medium"
      title={description}
      type="body2"
    />
  </View>
);
