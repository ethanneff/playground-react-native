import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Lottie from 'lottie-react-native';
import React, { memo } from 'react';
import { Screen, View } from '../../../../components';
import { getSmallestDimension, useRootSelector } from '../../../../redux';
import { AuthStackRoutes } from '../../types';

export const Download = memo(function Download() {
  const { goBack } =
    useNavigation<StackNavigationProp<AuthStackRoutes, 'download'>>();
  const width = useRootSelector(getSmallestDimension);
  const imageSize = width * 0.65;

  return (
    <Screen onLeftPress={goBack}>
      <View
        center
        flex
      >
        <Lottie
          autoPlay
          loop
          source={require('./loader.json')}
          speed={0.75}
          style={{
            width: imageSize,
            height: imageSize,
            alignSelf: 'center',
          }}
        />
      </View>
    </Screen>
  );
});
