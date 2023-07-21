import React from 'react';
import { Icon, Pressable, Text, View } from '../../../../../components';

type Props = {
  readonly disabled: boolean;
  readonly multiplier: number;
  readonly onPress: () => void;
};

export const Multiplier = ({ disabled, multiplier, onPress }: Props) => (
  <Pressable
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
  </Pressable>
);
