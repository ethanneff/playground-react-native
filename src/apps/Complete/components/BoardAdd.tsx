import React, {memo, useCallback, useState} from 'react';
import {View} from 'react-native';
import {Button, Icon, TextInput} from '../../../components';
import {useColor} from '../../../hooks';
import {Theme} from '../../../utils';
import {config} from '../configs';

type BoardAddProps = {
  listWidth: number;
};

// TODO: make similar to ListAdd
// TODO: save to redux

export const BoardAdd = memo(function AddItem({listWidth}: BoardAddProps) {
  const color = useColor();
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
    // onAdd(formatted);
  }, [itemTitle, onItemTitleClose]);
  return (
    <View
      style={{
        width: listWidth,
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
            placeholder="List title..."
            returnKeyType="done"
            type="h4"
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
          title="Add list"
        />
      )}
    </View>
  );
});
