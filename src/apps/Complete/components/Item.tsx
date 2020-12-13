import React, {memo, useCallback, useState} from 'react';
import {TextInput, TouchableOpacity} from '../../../components';
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
  const [title, setTitle] = useState(item.name);

  const onTextChange = useCallback((value) => {
    setTitle(value);
  }, []);

  return (
    <TouchableOpacity
      key={item.id}
      style={{
        borderRadius,
        padding: padding / 2,
        backgroundColor,
      }}>
      <TextInput
        backgroundColor={backgroundColor}
        onChangeText={onTextChange}
        placeholder="Card name..."
        value={title}
      />
    </TouchableOpacity>
  );
});
