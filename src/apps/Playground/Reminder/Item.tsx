import React, {memo} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Icon, Text, TouchableOpacity} from '../../../components';
import {useColor} from '../../../hooks';
import {config} from '../../../utils';

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
    button: {
      borderColor: color.secondary,
      borderRadius: config.padding(1),
      borderWidth: 1,
      flexDirection: 'row',
      height: config.padding(13),
      justifyContent: 'space-between',
      marginBottom: marginBottom ? config.padding(2) : 0,
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: config.padding(2),
    },
    icon: {
      justifyContent: 'center',
    },
    subtitle: {
      paddingLeft: 1,
      paddingTop: config.padding(1),
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      color: active ? color.primary : color.text,
    },
  });

  return hidden ? null : (
    <TouchableOpacity
      key={title}
      onPress={onPress}
      style={[styles.button, style]}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title} title={title} type="body1" />
          {description.length > 0 && (
            <Text style={styles.subtitle} title={description} type="caption" />
          )}
        </View>
        {icon && (
          <Icon name={icon} size={config.padding(5)} style={styles.icon} />
        )}
      </View>
    </TouchableOpacity>
  );
});
