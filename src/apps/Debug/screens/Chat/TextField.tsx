import React, { memo, useCallback } from "react";
import { View, Keyboard } from "react-native";
import { Button, TextInput } from "../../../../components";
import { useRootDispatch, useRootSelector } from "../../../../utils";
import uuid from "uuid";
import { Message, typeChatMessage, createChatMessage } from "./Messages";

export const TextField = memo(function ChatTextField() {
  const dispatch = useRootDispatch();
  const textField = useRootSelector(state => state.chatMessage.textField);
  const onMessageChange = useCallback(
    (message: string) => dispatch(typeChatMessage(message)),
    [dispatch]
  );

  const onSubmit = useCallback(() => {
    if (textField.trim().length === 0) {
      return;
    }
    const date = Date.now();
    const message: Message = {
      active: true,
      createdAt: date,
      userId: "User bob",
      id: uuid.v4(),
      message: textField,
      updatedAt: date,
      conversationId: "1"
    };
    Keyboard.dismiss();
    dispatch(createChatMessage(message));
  }, [dispatch, textField]);

  return (
    <View style={{ flexDirection: "row" }}>
      <TextInput value={textField} onChangeText={onMessageChange} flex />
      <Button icon={"send"} onPress={onSubmit} />
    </View>
  );
});
