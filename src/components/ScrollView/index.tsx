import React, { Ref } from 'react';
import { ScrollViewProps } from 'react-native';
import { GestureScrollView } from '../../conversions';

export type ScrollViewRef = GestureScrollView | null;

type Props = ScrollViewProps & {
  onRef?: Ref<GestureScrollView>;
};

export const ScrollView = ({ onRef, ...rest }: Props) => {
  return (
    <GestureScrollView
      keyboardShouldPersistTaps="handled"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={onRef}
    />
  );
};
