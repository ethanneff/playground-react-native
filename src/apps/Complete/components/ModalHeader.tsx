import React from 'react';
import { Icon, Pressable, Text, View } from '../../../components';
import { spacing } from '../../../features';

type Props = {
  readonly onLeftPress?: () => void;
  readonly onRightPress?: () => void;
  readonly size?: number;
  readonly title: string;
};

export const ModalHeader = ({
  onLeftPress,
  onRightPress,
  size = spacing(8),
  title,
}: Props) => (
  <View
    style={{
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: spacing(4),
    }}
  >
    <Pressable onPress={onLeftPress}>
      <Icon
        invisible={!onLeftPress}
        name="chevron-left"
        size={size}
      />
    </Pressable>
    <Text
      center
      flex
      title={title}
      type="h4"
    />
    <Pressable onPress={onRightPress}>
      <Icon
        invisible={!onRightPress}
        name="close"
        size={size}
      />
    </Pressable>
  </View>
);
