import React, { useCallback } from 'react';
import { v4 } from 'uuid';
import { Button, Text, View } from '../../../../components';
import {
  spacing,
  useColors,
  type FontEmphasis,
  type MonoMultiColor,
} from '../../../../features';

type ButtonGroupProps = {
  readonly emphasis: FontEmphasis;
};

export const ButtonGroup = ({ emphasis }: ButtonGroupProps) => {
  const colors = useColors();
  const keys = Object.keys(colors.text) as (keyof MonoMultiColor)[];
  const handlePress = useCallback(() => null, []);
  return (
    <View flex={1}>
      <Text
        center
        style={{ paddingBottom: spacing(5) }}
        title={emphasis}
        type="h5"
      />
      {keys.map((c) => (
        <Button
          buttonStyle={{ margin: 4 }}
          center
          color={c}
          disabled={c === 'disabled'}
          emphasis={emphasis}
          key={v4()}
          onPress={handlePress}
          title={c}
        />
      ))}
      {keys.map((c) => (
        <Button
          buttonStyle={{ margin: 4 }}
          center
          color={c}
          disabled={c === 'disabled'}
          dropShadow
          emphasis={emphasis}
          key={v4()}
          onPress={handlePress}
          title={c}
        />
      ))}
    </View>
  );
};
