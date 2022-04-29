import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../../../../components';
import { useLayout } from '../../../../features';
import { useRootSelector } from '../../../../redux';
import { Items } from './Items';
import { TextField } from './TextField';

export const Chat = memo(function PlaygroundChat() {
  const { goBack } = useNavigation();
  const { layout, onLayout } = useLayout();
  const { bottom } = useSafeAreaInsets();
  const keyboardHeight = useRootSelector((s) => s.device.keyboardHeight);
  const bottomInset = keyboardHeight > 0 ? bottom : 0;
  const height = (layout?.height || 0) - keyboardHeight + bottomInset;

  return (
    <Screen onLeftPress={goBack} title="Chat">
      <View onLayout={onLayout} style={{ flex: 1 }}>
        <View style={{ height }}>
          <Items />
          <TextField />
        </View>
      </View>
    </Screen>
  );
});
