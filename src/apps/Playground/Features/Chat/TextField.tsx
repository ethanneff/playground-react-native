import React, { memo, useCallback, useEffect, useRef } from 'react';
import { v4 } from 'uuid';
import {
  Icon,
  Input,
  type TextInputRef,
  TouchableOpacity,
  View,
} from '../../../../components';
import { spacing, useColors } from '../../../../features';
import { useRootDispatch, useRootSelector } from '../../../../redux';
import {
  createChatMessage,
  getChatSubmittable,
  type Message,
  typeChatMessage,
} from './Messages';

export const TextField = memo(function TextField() {
  const dispatch = useRootDispatch();
  const textFieldRef = useRef<TextInputRef>(null);
  const textField = useRootSelector((state) => state.chatMessage.textField);
  const submittable = useRootSelector(getChatSubmittable);
  const onMessageChange = useCallback(
    (message: string) => dispatch(typeChatMessage(message)),
    [dispatch],
  );
  const colors = useColors();

  const onSubmit = useCallback(() => {
    if (textField.trim().length === 0) return;
    const date = Date.now();
    const message: Message = {
      active: true,
      conversationId: '1',
      createdAt: date,
      id: v4(),
      message: textField.trim(),
      updatedAt: date,
      userId: 'User bob',
    };
    dispatch(createChatMessage(message));
  }, [dispatch, textField]);

  useEffect(() => {
    textFieldRef.current?.focus();
  }, []);

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: colors.background.primaryA,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: spacing(4),
      }}
    >
      <Input
        flex
        onChangeText={onMessageChange}
        onRef={textFieldRef}
        onSubmitEditing={onSubmit}
        placeholder="Write something..."
        removeError
        value={textField}
      />
      <TouchableOpacity
        disabled={!submittable}
        onPress={onSubmit}
      >
        <Icon
          color={submittable ? 'accent' : 'primaryA'}
          disabled={!submittable}
          name="send"
          style={{
            justifyContent: 'center',
            paddingLeft: spacing(2),
          }}
        />
      </TouchableOpacity>
    </View>
  );
});
