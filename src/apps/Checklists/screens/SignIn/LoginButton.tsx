import React from 'react';
import {
  Icon,
  Pressable,
  Text,
  View,
  type IconName,
} from '../../../../components';
import { spacing } from '../../../../features';

type Props = {
  icon: IconName;
  onPress: () => void;
  title: string;
};

export const LoginButton = ({ icon, onPress, title }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <View
        alignItems="center"
        flexDirection="row"
        gap={spacing(2)}
        justifyContent="center"
        padding={spacing(2)}
      >
        <Icon name={icon} />
        <Text
          title={title}
          type="button"
        />
      </View>
    </Pressable>
  );
};
