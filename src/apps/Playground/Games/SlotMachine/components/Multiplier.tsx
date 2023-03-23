import React, { memo } from 'react';
import { Icon, Text, TouchableOpacity, View } from '../../../../../components';

type Props = {
  disabled: boolean;
  multiplier: number;
  onPress: () => void;
};

export const Multiplier = memo(function Multiplier({
  disabled,
  multiplier,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
    >
      <View
        alignItems="center"
        flexDirection="row"
        justifyContent="center"
      >
        <Icon
          color="accent"
          name="lightning-bolt"
          style={{ transform: [{ rotateY: '180deg' }] }}
        />
        <Text
          bold
          emphasis="high"
          title={`BET X${multiplier}`}
        />
        <Icon
          color="accent"
          name="lightning-bolt"
        />
      </View>
    </TouchableOpacity>
  );
});
