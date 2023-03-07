import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { Screen, View } from '../../../../components';
import { useLayout } from '../../../../features';
import { useRootSelector } from '../../../../redux';
import { Items } from './Items';
import { TextField } from './TextField';

export const Chat = memo(function PlaygroundChat() {
  const { goBack } = useNavigation();
  const { insets, layout, onLayout } = useLayout();
  const keyboardHeight = useRootSelector((s) => s.device.keyboard?.height) ?? 0;
  const bottomInset = keyboardHeight > 0 ? insets.bottom : 0;
  const height = (layout?.height ?? 0) - keyboardHeight + bottomInset;

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Chat"
    >
      <View
        flex={1}
        onLayout={onLayout}
      >
        <View height={height}>
          <Items />
          <TextField />
        </View>
      </View>
    </Screen>
  );
});
