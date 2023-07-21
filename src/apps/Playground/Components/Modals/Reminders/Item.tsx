import React from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import {
  Icon,
  Pressable,
  Text,
  View,
  type IconName,
} from '../../../../../components';
import { spacing, useColors } from '../../../../../features';

type Props = {
  readonly active?: boolean;
  readonly description?: string;
  readonly hidden?: boolean;
  readonly icon?: IconName;
  readonly marginBottom?: boolean;
  readonly onPress: () => void;
  readonly style?: StyleProp<ViewStyle>;
  readonly title: string;
};
export const Item = ({
  active,
  description = '',
  hidden,
  icon,
  marginBottom,
  onPress,
  style,
  title,
}: Props) => {
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
    <Pressable
      containerStyle={[styles.button, style]}
      onPress={onPress}
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
    </Pressable>
  );
};
