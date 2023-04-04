import React from 'react';
import { Spacing, Text, View } from '../../../components';
import { spacing } from '../../../features';

type TitleProps = {
  description: string;
  title: string;
};

export const Title = ({ description, title }: TitleProps) => {
  return (
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
};
