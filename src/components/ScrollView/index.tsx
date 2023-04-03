import React, { type Ref } from 'react';
import { type ScrollViewProps } from 'react-native';
import { GestureScrollView } from '../../conversions';

export type ScrollViewRef = GestureScrollView | null;

type Props = ScrollViewProps & {
  onRef?: Ref<GestureScrollView>;
};

export const ScrollView = ({ onRef, ...rest }: Props) => {
  return (
    <GestureScrollView
      {...rest} // eslint-disable-line react/jsx-props-no-spreading
      ref={onRef}
    />
  );
};
