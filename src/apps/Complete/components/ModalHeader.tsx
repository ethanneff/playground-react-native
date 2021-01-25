import React, {memo} from 'react';
import {View} from 'react-native';
import {Icon, Text} from '../../../components';
import {config} from '../../../utils';

type Props = {
  title: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  size?: number;
};

export const ModalHeader = memo(function ModalHeader({
  title,
  onLeftPress,
  size = config.padding(8),
  onRightPress,
}: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: config.padding(4),
      }}>
      <Icon
        invisible={!onLeftPress}
        name="chevron-left"
        onPress={onLeftPress}
        padded
        size={size}
      />
      <Text center flex title={title} type="h4" />
      <Icon
        invisible={!onRightPress}
        name="close"
        onPress={onRightPress}
        padded
        size={size}
      />
    </View>
  );
});
