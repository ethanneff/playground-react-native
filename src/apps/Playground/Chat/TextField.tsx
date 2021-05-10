import React, {memo, useCallback, useEffect, useRef} from 'react';
import {Keyboard, TextInput, View} from 'react-native';
import {v4} from 'uuid';
import {Icon, Input} from '../../../components';
import {useColor} from '../../../hooks';
import {config, useRootDispatch, useRootSelector} from '../../../utils';
import {createChatMessage, Message, typeChatMessage} from './Messages';

export const TextField = memo(function TextField() {
  const dispatch = useRootDispatch();
  const textFieldRef = useRef<TextInput | null>(null);
  const textField = useRootSelector(state => state.chatMessage.textField);
  const onMessageChange = useCallback(
    (message: string) => dispatch(typeChatMessage(message)),
    [dispatch],
  );
  const color = useColor();

  const onSubmit = useCallback(() => {
    if (textField.trim().length === 0) return;

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

  useEffect(() => {
    textFieldRef.current?.focus();
  }, []);

  return (
    <View
      style={{
        padding: config.padding(4),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.background,
      }}>
      <Input
        flex
        onChangeText={onMessageChange}
        onRef={textFieldRef}
        onSubmitEditing={onSubmit}
        placeholder="Write something..."
        removeError
        value={textField}
      />
      <Icon
        name="send"
        onPress={onSubmit}
        size={20}
        style={{
          paddingLeft: config.padding(2),
          justifyContent: 'center',
        }}
      />
    </View>
  );
});
