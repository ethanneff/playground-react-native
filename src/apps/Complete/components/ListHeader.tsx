import React, {memo, useCallback, useState} from 'react';
import {View} from 'react-native';
import {Icon, TextInput} from '../../../components';

type ListHeaderProps = {
  name: string;
  padding: number;
};

export const ListHeader = memo(function ListHeader({
  name,
  padding,
}: ListHeaderProps) {
  const [input, setInput] = useState(name);

  const onChangeText = useCallback((value: string) => {
    setInput(value);
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: padding,
      }}>
      <TextInput
        emphasis="high"
        flex
        onChangeText={onChangeText}
        placeholder="list name..."
        type="h4"
        value={input}
      />
      <Icon name="dots-vertical" padded />
    </View>
  );
});
