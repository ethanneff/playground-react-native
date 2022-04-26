import React from 'react';
import { View } from 'react-native';
import { Text } from '../../../components';
import { padding } from '../../../features';

type TitleProps = { description: string; title: string };

export const Title = ({ title, description }: TitleProps) => {
  return (
    <>
      <Text title={title} type="h5" />
      <Text emphasis="medium" title={description} type="caption" />
      <View style={{ padding: padding(1) }} />
    </>
  );
};
