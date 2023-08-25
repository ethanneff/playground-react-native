import React from 'react';
import { Dimensions } from 'react-native';
import { Screen, View } from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { useLayout } from '../../../../features';
import { useAppSelector } from '../../../../redux';
import { EditItem } from './EditItem';
import { Items } from './Items';
import { TextField } from './TextField';

export const Chat = () => {
  const { goBack } = useNavigation();
  const { insets, layout, onLayout } = useLayout();
  const keyboardHeight = useAppSelector((s) => s.device.keyboardHeight);
  const bottomInset = keyboardHeight > 0 ? insets.bottom : 0;
  const height =
    (layout?.height ?? Dimensions.get('window').height) -
    keyboardHeight +
    bottomInset;

  return (
    <>
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
      <EditItem />
    </>
  );
};
