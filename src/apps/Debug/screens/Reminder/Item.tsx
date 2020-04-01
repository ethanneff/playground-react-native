import React, {memo} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Text, Icon, TouchableOpacity} from '../../../../components';
import {Theme} from '../../../../utils';
import {useColor} from '../../../../hooks';

interface Props {
  title: string;
  description?: string;
  icon?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  marginBottom?: boolean;
  active?: boolean;
  hidden?: boolean;
}
export const Item = memo(function ReminderItem({
  title,
  description = '',
  onPress,
  icon,
  style,
  hidden,
  active,
  marginBottom,
}: Props) {
  const color = useColor();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',

      paddingHorizontal: Theme.padding.p02,
    },
    button: {
      borderRadius: Theme.padding.p01,
      flexDirection: 'row',
      height: Theme.padding.p13,
      justifyContent: 'space-between',
      borderColor: color.secondary,
      borderWidth: 1,
      marginBottom: marginBottom ? Theme.padding.p02 : 0,
    },
    title: {
      color: active ? color.primary : color.text,
    },
    subtitle: {
      paddingTop: Theme.padding.p01,
      paddingLeft: 1,
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    icon: {
      justifyContent: 'center',
    },
  });

  return hidden ? null : (
    <TouchableOpacity
      key={title}
      style={[styles.button, style]}
      onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text type="body1" title={title} style={styles.title} />
          {description.length > 0 && (
            <Text type="caption" title={description} style={styles.subtitle} />
          )}
        </View>
        {icon && (
          <Icon name={icon} size={Theme.padding.p05} style={styles.icon} />
        )}
      </View>
    </TouchableOpacity>
  );
});
