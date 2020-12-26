import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {Keyboard, TextInput as OriginalTextInput, View} from 'react-native';
import {v4} from 'uuid';
import {Button, Icon, TextInput} from '../../../components';
import {useColor} from '../../../hooks';
import {Theme, useRootDispatch, useRootSelector} from '../../../utils';
import {config} from '../configs';
import {createItem, Item, updateListAddItem} from '../models';

type ListAddProps = {
  listId: string;
  itemWidth?: number;
  inputPlaceholder: string;
  buttonTitle: string;
};

export const ListAdd = memo(function ListAdd({
  itemWidth,
  inputPlaceholder,
  buttonTitle,
  listId,
}: ListAddProps) {
  const color = useColor();
  const dispatch = useRootDispatch();
  const textInputRef = useRef<OriginalTextInput | null>(null);
  const [showInput, setShowInput] = useState(false);
  const [itemTitle, setItemTitle] = useState('');
  const onItemTitleChange = useCallback((v: string) => setItemTitle(v), []);
  const onAddItemPress = useCallback(() => setShowInput((p) => !p), []);
  const keyboardVisible = useRootSelector((s) => s.device.keyboardVisible);

  const onItemTitleClose = useCallback(() => {
    Keyboard.dismiss();
    const keyboardDelay = 50;
    setTimeout(() => {
      setShowInput(false);
      setItemTitle('');
    }, keyboardDelay);
  }, []);
  const onItemTitleSubmit = useCallback(() => {
    const formatted = itemTitle.trim();
    if (formatted.length === 0) {
      return;
    }
    setItemTitle('');
    const itemId = v4();
    const date = Date.now();
    const item: Item = {
      id: itemId,
      active: true,
      title: formatted,
      createdAt: date,
      updatedAt: date,
    };
    dispatch(createItem(item));
    dispatch(updateListAddItem({listId, itemId}));
    textInputRef.current?.focus();
  }, [dispatch, itemTitle, listId]);

  useEffect(() => {
    if (!keyboardVisible) {
      onItemTitleClose();
    }
  }, [keyboardVisible, onItemTitleClose]);

  return (
    <View
      style={{
        width: itemWidth,
        height: Theme.padding.p12,
        borderRadius: config.borderRadius,
        backgroundColor: color.background,
        justifyContent: 'center',
      }}>
      {showInput ? (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            emphasis="high"
            flex
            focusOnLoad
            onChangeText={onItemTitleChange}
            onRef={textInputRef}
            onSubmitEditing={onItemTitleSubmit}
            placeholder={inputPlaceholder}
            returnKeyType="done"
            value={itemTitle}
          />
          <Icon name="close" onPress={onItemTitleClose} padded />
          <Icon
            color={color.primary}
            name="send"
            onPress={onItemTitleSubmit}
            padded
          />
        </View>
      ) : (
        <Button
          center
          color="primary"
          onPress={onAddItemPress}
          title={buttonTitle}
        />
      )}
    </View>
  );
});
