import React, { memo } from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import {
  Icon,
  type IconName,
  Text,
  TouchableOpacity,
  View,
} from '../../../../../components';
import { spacing, useColors } from '../../../../../features';

type Props = {
  active?: boolean;
  description?: string;
  hidden?: boolean;
  icon?: IconName;
  marginBottom?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  title: string;
};
export const Item = memo(function ReminderItem({
  active,
  description = '',
  hidden,
  icon,
  marginBottom,
  onPress,
  style,
  title,
}: Props) {
  const colors = useColors();
  const styles = StyleSheet.create({
    button: {
      borderColor: colors.border.primaryA,
      borderRadius: spacing(1),
      borderWidth: 1,
      flexDirection: 'row',
      height: spacing(13),
      justifyContent: 'space-between',
      marginBottom: marginBottom ? spacing(2) : 0,
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: spacing(2),
    },
    icon: {
      justifyContent: 'center',
    },
    subtitle: {
      paddingLeft: 1,
      paddingTop: spacing(1),
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      color: active ? colors.text.accent : colors.text.primaryA,
    },
  });

  return hidden ? null : (
    <TouchableOpacity
      key={title}
      onPress={onPress}
      style={[styles.button, style]}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text
            style={styles.title}
            title={title}
            type="body1"
          />
          {description.length > 0 && (
            <Text
              style={styles.subtitle}
              title={description}
              type="caption"
            />
          )}
        </View>
        {icon ? (
          <Icon
            name={icon}
            size={spacing(5)}
            style={styles.icon}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
});
