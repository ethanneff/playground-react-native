import React, { useCallback, useRef } from 'react';
import { Button, Modal, TextInput, View } from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import {
  deleteChatMessage,
  getActiveChatMessage,
  setActiveChatMessage,
  updateChatMessage,
} from './Messages';

export const EditItem = () => {
  const dispatch = useAppDispatch();
  const activeMessage = useAppSelector(getActiveChatMessage);
  const messageRef = useRef(activeMessage?.message ?? '');

  const handleModalClose = useCallback(() => {
    dispatch(setActiveChatMessage(null));
  }, [dispatch]);

  const handleUpdate = useCallback(() => {
    if (!activeMessage || !messageRef.current.trim().length) return;
    dispatch(
      updateChatMessage({
        ...activeMessage,
        message: messageRef.current.trim(),
      }),
    );
    handleModalClose();
  }, [activeMessage, dispatch, handleModalClose]);

  const handleDelete = useCallback(() => {
    if (!activeMessage) return;
    dispatch(deleteChatMessage(activeMessage?.id));
    handleModalClose();
  }, [activeMessage, dispatch, handleModalClose]);

  const handleTextChange = useCallback((value: string) => {
    messageRef.current = value;
  }, []);

  if (!activeMessage) return null;
  return (
    <Modal
      onBackgroundPress={handleModalClose}
      showOverlay
    >
      <TextInput
        autoCapitalize="sentences"
        autoComplete="off"
        autoCorrect
        blurOnSubmit
        editable
        focusOnLoad
        keyboardType="default"
        onChangeText={handleTextChange}
        onSubmitEditing={handleUpdate}
        placeholder="message"
        returnKeyType="done"
        textContentType="none"
        value={activeMessage.message}
      />
      <View
        flexDirection="row"
        justifyContent="center"
      >
        <Button
          color="accent"
          onPress={handleUpdate}
          title="save"
        />
        <Button
          onPress={handleModalClose}
          title="close"
        />
        <Button
          color="negative"
          onPress={handleDelete}
          title="delete"
        />
      </View>
    </Modal>
  );
};
