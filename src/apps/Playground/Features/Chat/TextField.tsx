import React, { memo, useCallback } from 'react';
import { v4 } from 'uuid';
import { Icon, Input, TouchableOpacity, View } from '../../../../components';
import { spacing, useColors } from '../../../../features';
import { useRootDispatch, useRootSelector } from '../../../../redux';
import {
  createChatMessage,
  getChatSubmittable,
  typeChatMessage,
  type Message,
} from './Messages';

export const TextField = memo(function TextField() {
  const dispatch = useRootDispatch();

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
        focusOnMount
        hideError
        onChangeText={onMessageChange}
        onSubmitEditing={onSubmit}
        placeholder="Write something..."
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
