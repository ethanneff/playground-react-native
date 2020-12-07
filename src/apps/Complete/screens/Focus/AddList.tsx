import React, {memo, useCallback, useState} from 'react';
import {View} from 'react-native';
import {Button, Icon, TextInput} from '../../../../components';
import {useColor} from '../../../../hooks';

type AddListProps = {
  listWidth: number;
  borderRadius: number;
  padding: number;
  backgroundColor: string;
  onAddList: (value: string) => void;
};

export const AddList = memo(function AddList({
  listWidth,
  borderRadius,
  padding,
  backgroundColor,
  onAddList,
}: AddListProps) {
  const color = useColor();
  const [showInput, setShowInput] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const onListTitleChange = useCallback((v: string) => setListTitle(v), []);
  const onAddListPress = useCallback(() => setShowInput((p) => !p), []);
  const onListTitleClose = useCallback(() => {
    setShowInput(false);
    setListTitle('');
  }, []);
  const onListTitleSubmit = useCallback(() => {
    const formatted = listTitle.trim();
    if (formatted.length === 0) {
      return;
    }
    onListTitleClose();
    onAddList(formatted);
  }, [listTitle, onAddList, onListTitleClose]);
  return (
    <View
      style={{
        width: listWidth,
        borderRadius,
        padding: padding / 2,
        backgroundColor,
      }}>
      {showInput ? (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            flex
            emphasis="high"
            focusOnLoad
            onChangeText={onListTitleChange}
            onSubmitEditing={onListTitleSubmit}
            placeholder="list title..."
            returnKeyType="done"
            type="h4"
            value={listTitle}
          />
          <Icon name="close" onPress={onListTitleClose} padded />
          <Icon
            color={color.primary}
            name="send"
            onPress={onListTitleSubmit}
            padded
          />
        </View>
      ) : (
        <Button
          center
          color="primary"
          onPress={onAddListPress}
          title="add list"
        />
      )}
    </View>
  );
});
