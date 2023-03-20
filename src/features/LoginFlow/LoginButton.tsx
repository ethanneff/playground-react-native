import React, { memo } from 'react';
import {
  Icon,
  Text,
  TouchableOpacity,
  View,
  type IconName,
} from '../../components';
import { spacing } from '../Config';
import { useColors } from '../Theme';

type Props = {
  icon: IconName;
  onPress: () => void;
  title: string;
};

export const LoginButton = memo(function LoginButton({
  icon,
  onPress,
  title,
}: Props) {
  const colors = useColors();
  return (
    <TouchableOpacity
      containerStyle={{
        alignItems: 'center',
      }}
      onPress={onPress}
      style={{
        borderColor: colors.border.primaryA,
        borderRadius: spacing(10),
        borderWidth: 2,

        marginBottom: spacing(2),
      }}
    >
      <View
        alignItems="center"
        flexDirection="row"
        style={{
          paddingHorizontal: spacing(4),
          paddingVertical: spacing(2),
        }}
      >
        <Icon name={icon} />
        <Text
          style={{ paddingLeft: spacing(2) }}
          title={title}
          type="button"
        />
      </View>
    </TouchableOpacity>
  );
});
