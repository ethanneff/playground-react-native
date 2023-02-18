import React, { memo } from 'react';
import { Icon, Text, TouchableOpacity, View } from '../../../components';
import { spacing } from '../../../features';

type Props = {
  onLeftPress?: () => void;
  onRightPress?: () => void;
  size?: number;
  title: string;
};

export const ModalHeader = memo(function ModalHeader({
  onLeftPress,
  onRightPress,
  size = spacing(8),
  title,
}: Props) {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: spacing(4),
      }}
    >
      <TouchableOpacity onPress={onLeftPress}>
        <Icon
          invisible={!onLeftPress}
          name="chevron-left"
          size={size}
        />
      </TouchableOpacity>
      <Text
        center
        flex
        title={title}
        type="h4"
      />
      <TouchableOpacity onPress={onRightPress}>
        <Icon
          invisible={!onRightPress}
          name="close"
          size={size}
        />
      </TouchableOpacity>
    </View>
  );
});
