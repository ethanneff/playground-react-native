import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { v4 } from 'uuid';
import {
  Button,
  TextInput,
  TextInputIcon,
  TextInputRef,
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
  width,
  parentItemId,
  placeholder,
  title,
}: AddItemProps) {
  const colors = useColors();
  const textInputRef = useRef<TextInputRef>(null);
  const [showInput, setShowInput] = useState(false);
  const dispatch = useRootDispatch();
  const userId = useRootSelector((s) => s.completeUser?.id);
  if (!userId) throw new Error('missing userId on add item');
  if (!parentItemId) throw new Error('missing parentItemId on add item');

  const onSubmit = useCallback(
    (value: string) => {
      if (!value) {
        Keyboard.dismiss();
        return;
      }
      const itemId = v4();
      const date = Date.now();
      const item: Item = {
        id: itemId,
        userId,
        active: true,
        title: value,
        createdAt: date,
        updatedAt: date,
        children: [],
        tags: [],
        description: '',
        editable: true,
        type: 'note',
      };
      dispatch(createItem(item));
      dispatch(addItemToItem({ parentItemId, itemId }));
    },
    [dispatch, parentItemId, userId],
  );

  const onAddItemPress = useCallback(() => setShowInput((p) => !p), []);
  const onClose = useCallback(() => setShowInput(false), []);
  const onBlur = useCallback(() => setShowInput(false), []);

  const icons: TextInputIcon[] = [
    { name: 'close', onPress: onClose, focus: true, reset: true },
    {
      name: 'send',
      onPress: onSubmit,
      color: 'accent',
      focus: true,
      required: true,
      clear: true,
    },
  ];

  useEffect(() => {
    if (showInput) textInputRef.current?.focus();
  }, [showInput]);

  return (
    <View
      style={{
        width,
        height: spacing(12),
        borderRadius: completeConfig.borderRadius,
        backgroundColor: colors.background.primaryA,
        justifyContent: 'center',
      }}
    >
      {showInput ? (
        <TextInput
          blurOnSubmit={false}
          icons={icons}
          onBlur={onBlur}
          onRef={textInputRef}
          onSubmitEditing={onSubmit}
          placeholder={placeholder}
          returnKeyType="done"
          submitClear
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
