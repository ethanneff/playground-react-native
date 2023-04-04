import React, { memo } from 'react';
import { Icon, Pressable, Text, View, type IconName } from '../../components';
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
    <Pressable
      containerStyle={{
        borderColor: colors.border.primaryA,
        borderRadius: spacing(10),
        borderWidth: 2,
        marginBottom: spacing(2),
      }}
      contentStyle={{
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      <View
        alignItems="center"
        flexDirection="row"
        style={{
          gap: spacing(4),
          padding: spacing(4),
        }}
      >
        <Icon name={icon} />
        <Text
          style={{ paddingLeft: spacing(2) }}
          title={title}
          type="button"
        />
      </View>
    </Pressable>
  );
});
