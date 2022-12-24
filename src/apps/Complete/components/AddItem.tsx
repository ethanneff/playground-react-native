import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import { v4 } from 'uuid';
import {
  Button,
  TextInput,
  TextInputIcon,
  TextInputRef,
  View,
} from '../../../components';
import { spacing, useColors } from '../../../features';
import { useRootDispatch, useRootSelector } from '../../../redux';
import { addItemToItem, createItem, Item } from '../models';
import { completeConfig } from '../utils';

type AddItemProps = {
  parentItemId: string;
  placeholder: string;
  title: string;
  width?: number;
};

export const AddItem = memo(function AddItem({
  parentItemId,
  placeholder,
  title,
  width,
}: AddItemProps) {
  const colors = useColors();
  const textInputRef = useRef<TextInputRef>(null);
  const text = useRef('');
  const [showInput, setShowInput] = useState(false);
  const dispatch = useRootDispatch();
  const userId = useRootSelector((s) => s.completeUser?.id);
  if (!userId) throw new Error('missing userId on add item');
  if (!parentItemId) throw new Error('missing parentItemId on add item');

  const handleTextChange = useCallback((value: string) => {
    text.current = value;
  }, []);

  const onSubmit = useCallback(() => {
    const value = text.current;
    if (!value) {
      Keyboard.dismiss();
      return;
    }
    const itemId = v4();
    const date = Date.now();
    const item: Item = {
      active: true,
      children: [],
      createdAt: date,
      description: '',
      editable: true,
      id: itemId,
      tags: [],
      title: value,
      type: 'note',
      updatedAt: date,
      userId,
    };
    dispatch(createItem(item));
    dispatch(addItemToItem({ itemId, parentItemId }));
  }, [dispatch, parentItemId, userId]);

  const onAddItemPress = useCallback(() => setShowInput((p) => !p), []);
  const onClose = useCallback(() => setShowInput(false), []);
  const onBlur = useCallback(() => setShowInput(false), []);

  const icons: TextInputIcon[] = [
    { focus: true, name: 'close', onPress: onClose, reset: true },
    {
      clear: true,
      color: 'accent',
      focus: true,
      name: 'send',
      onPress: onSubmit,
      required: true,
    },
  ];

  useEffect(() => {
    if (showInput) textInputRef.current?.focus();
  }, [showInput]);

  return (
    <View
      style={{
        backgroundColor: colors.background.primaryA,
        borderRadius: completeConfig.borderRadius,
        height: spacing(12),
        justifyContent: 'center',
        width,
      }}
    >
      {showInput ? (
        <TextInput
          autoCapitalize="sentences"
          autoComplete="off"
          autoCorrect
          blurOnSubmit={false}
          editable
          icons={icons}
          keyboardType="default"
          onBlur={onBlur}
          onChangeText={handleTextChange}
          onRef={textInputRef}
          onSubmitEditing={onSubmit}
          placeholder={placeholder}
          returnKeyType="done"
          submitClear
          textContentType="none"
          value=""
        />
      ) : (
        <Button
          center
          color="accent"
          onPress={onAddItemPress}
          title={title}
        />
      )}
    </View>
  );
});
