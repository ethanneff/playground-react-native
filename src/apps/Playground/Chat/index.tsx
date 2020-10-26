import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Screen} from '../../../components';
import {Items} from './Items';
import {TextField} from './TextField';

export const Chat = memo(function PlaygroundChat() {
  const {goBack} = useNavigation();
  const navBack = useCallback(() => goBack(), [goBack]);

  return (
    <Screen gutter onLeftPress={navBack} title="Chat">
      <Items />
      <TextField />
    </Screen>
  );
});
