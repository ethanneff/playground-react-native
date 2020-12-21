import React, {memo, useCallback, useState} from 'react';
import {View} from 'react-native';
import {Icon, TextInput, TouchableOpacity} from '../../../components';
import {useColor} from '../../../hooks';
import {ItemObject} from '../types';

type ItemProps = {
  item: ItemObject;
  padding: number;
  borderRadius: number;
  backgroundColor: string;
};

export const Item = memo(function Item({
  item,
  padding,
  borderRadius,
  backgroundColor,
}: ItemProps) {
  const color = useColor();
  const [title, setTitle] = useState(item.name);
  const [showControls, setShowControls] = useState(false);

  const onTextChange = useCallback((value) => {
    setTitle(value);
  }, []);

  const onItemTitleClose = useCallback(() => undefined, []);
  const onItemTitleSubmit = useCallback(() => undefined, []);

  const onFocus = useCallback(() => setShowControls(true), []);
  const onBlur = useCallback(() => setShowControls(false), []);

  return (
    <TouchableOpacity
      key={item.id}
      style={{
        flex: 1,
        borderRadius,
        marginBottom: padding,
        backgroundColor: backgroundColor,
        flexDirection: 'row',
      }}>
      <TextInput
        backgroundColor={backgroundColor}
        flex
        onBlur={onBlur}
        onChangeText={onTextChange}
        onFocus={onFocus}
        onSubmitEditing={onItemTitleSubmit}
        placeholder="Item name..."
        returnKeyType="done"
        value={title}
      />
      {showControls ? (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="close" onPress={onItemTitleClose} padded />
          <Icon
            color={color.primary}
            name="send"
            onPress={onItemTitleSubmit}
            padded
          />
        </View>
      ) : (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="dots-horizontal" onPress={onItemTitleClose} padded />
          <Icon name="chevron-right" onPress={onItemTitleSubmit} padded />
        </View>
      )}
    </TouchableOpacity>
  );
});
