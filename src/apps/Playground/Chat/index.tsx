import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { KeyboardHandler, Screen } from '../../../components';
import { padding } from '../../../features';
import { useRootSelector } from '../../../redux';
import { Items } from './Items';
import { TextField } from './TextField';

export const Chat = memo(function PlaygroundChat() {
  const { goBack } = useNavigation();
  const [container, setContainer] = useState(0);
  const keyboardHeight = useRootSelector((s) => s.device.keyboardHeight);
  const keyboardPadding = keyboardHeight > 0 ? padding(8) : padding(0);
  const height = container - keyboardHeight + keyboardPadding;
  const onLayout = useCallback(
    (e: LayoutChangeEvent) => setContainer(e.nativeEvent.layout.height),
    [],
  );

  return (
    <Screen onLeftPress={goBack} title="Chat">
      <KeyboardHandler onLayout={onLayout}>
        <View style={{ height }}>
          <Items />
          <TextField />
        </View>
      </KeyboardHandler>
    </Screen>
  );
});
