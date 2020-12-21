import React, {memo, useCallback, useState} from 'react';
import {View} from 'react-native';
import {v4} from 'uuid';
import {Button, Icon, TextInput} from '../../../components';
import {useColor} from '../../../hooks';
import {Theme, useRootDispatch} from '../../../utils';
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
  const [showInput, setShowInput] = useState(false);
  const [itemTitle, setItemTitle] = useState('');
  const onItemTitleChange = useCallback((v: string) => setItemTitle(v), []);
  const onAddItemPress = useCallback(() => setShowInput((p) => !p), []);
  const onItemTitleClose = useCallback(() => {
    setShowInput(false);
    setItemTitle('');
  }, []);
  const onItemTitleSubmit = useCallback(() => {
    const formatted = itemTitle.trim();
    if (formatted.length === 0) {
      return;
    }
    onItemTitleClose();
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
  }, [dispatch, itemTitle, listId, onItemTitleClose]);

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
