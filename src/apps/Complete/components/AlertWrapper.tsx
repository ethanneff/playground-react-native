import React, {memo, ReactElement} from 'react';
import {ScrollView, View} from 'react-native';
import {Alert} from '../../../components';
import {useAlertSize} from '../utils';

type AlertWrapperProps = {
  children: ReactElement | ReactElement[];
  onBackgroundPress: () => void;
  backgroundColor: string;
};

export const AlertWrapper = memo(function AlertWrapper({
  children,
  onBackgroundPress,
  backgroundColor,
}: AlertWrapperProps) {
  const alertSize = useAlertSize();
  return (
    <Alert
      backgroundColor={backgroundColor}
      onBackgroundPress={onBackgroundPress}>
      <View style={{...alertSize}}>
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      </View>
    </Alert>
  );
});
