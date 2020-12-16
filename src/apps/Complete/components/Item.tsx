import React, {memo, useCallback, useState} from 'react';
import {View} from 'react-native';
import {TextInput, TouchableOpacity} from '../../../components';
import {ItemObject} from '../types';

type ItemProps = {
  item: ItemObject;
  padding: number;
  borderRadius: number;
  itemWidth: number;
  itemHeight: number;
  backgroundColor: string;
};

export const Item = memo(function Item({
  item,
  padding,
  borderRadius,
  itemWidth,
  itemHeight,
  backgroundColor,
}: ItemProps) {
  const [title, setTitle] = useState(item.name);

  const onTextChange = useCallback((value) => {
    setTitle(value);
  }, []);

  return (
    <View
      style={{
        width: itemWidth,
        height: itemHeight,
      }}>
      <TouchableOpacity
        key={item.id}
        style={{
          flex: 1,
          borderRadius,
          marginBottom: padding,
          justifyContent: 'center',
          alignContent: 'center',
          paddingHorizontal: padding / 2,
          backgroundColor,
        }}>
        <TextInput
          backgroundColor={backgroundColor}
          onChangeText={onTextChange}
          placeholder="Card name..."
          value={title}
        />
      </TouchableOpacity>
    </View>
  );
});
