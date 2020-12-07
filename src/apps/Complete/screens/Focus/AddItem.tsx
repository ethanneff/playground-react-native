import React, {memo, useCallback, useState} from 'react';
import {View} from 'react-native';
import {Button, Icon, TextInput} from '../../../../components';
import {useColor} from '../../../../hooks';
import {FontType} from '../../../../utils';

type AddItemProps = {
  itemWidth?: number;
  borderRadius: number;
  padding: number;
  backgroundColor: string;
  inputPlaceholder: string;
  inputType: FontType;
  buttonTitle: string;
  onAdd: (value: string) => void;
};

export const AddItem = memo(function AddItem({
  itemWidth,
  borderRadius,
  inputPlaceholder,
  buttonTitle,
  padding,
  inputType,
  backgroundColor,
  onAdd,
}: AddItemProps) {
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
    onAdd(formatted);
  }, [itemTitle, onAdd, onItemTitleClose]);
  return (
    <View
      style={{
        width: itemWidth,
        borderRadius,
        padding: padding / 2,
        backgroundColor,
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
            type={inputType}
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
