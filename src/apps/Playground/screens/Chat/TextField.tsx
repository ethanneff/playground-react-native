import React, {memo, useCallback} from 'react';
import {Keyboard, View} from 'react-native';
import {v4} from 'uuid';
import {Icon, TextInput} from '../../../../components';
import {Theme, useRootDispatch, useRootSelector} from '../../../../utils';
import {Message, createChatMessage, typeChatMessage} from './Messages';
import 'react-native-get-random-values';

export const TextField = memo(function TextField() {
  const dispatch = useRootDispatch();
  const textField = useRootSelector((state) => state.chatMessage.textField);
  const onMessageChange = useCallback(
    (message: string) => dispatch(typeChatMessage(message)),
    [dispatch],
  );

  const onSubmit = useCallback(() => {
    if (textField.trim().length === 0) {
      return;
    }
    const date = Date.now();
    const message: Message = {
      active: true,
      createdAt: date,
      userId: 'User bob',
      id: v4(),
      message: textField.trim(),
      updatedAt: date,
      conversationId: '1',
    };
    Keyboard.dismiss();
    dispatch(createChatMessage(message));
  }, [dispatch, textField]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <TextInput
        flex
        onChangeText={onMessageChange}
        onSubmitEditing={onSubmit}
        removeError
        value={textField}
      />
      <Icon
        name="send"
        onPress={onSubmit}
        size={20}
        style={{
          paddingLeft: Theme.padding.p02,
          justifyContent: 'center',
        }}
      />
    </View>
  );
});
