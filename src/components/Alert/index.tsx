import React, {memo, ReactElement} from 'react';
import {StyleSheet, View} from 'react-native';
import {useColor} from '../../hooks';
import {Theme} from '../../utils';
import {TouchableOpacity} from '../TouchableOpacity';

type AlertProps = {
  children: ReactElement | ReactElement[];
  onBackgroundPress?: () => void;
  backgroundColor?: string;
};

export const Alert = memo(function Alert({
  children,
  onBackgroundPress,
  backgroundColor,
}: AlertProps): ReactElement {
  const color = useColor();
  const styles = StyleSheet.create({
    modal: {
      backgroundColor: backgroundColor || color.background,
      borderRadius: Theme.padding.p04,
      elevation: 2,
      padding: Theme.padding.p04,
      zIndex: 2,
    },
    overlay: {
      elevation: 1,
      height: '100%',
      position: 'absolute',
      width: '100%',
      zIndex: 1,
    },
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
      }}>
      <View style={styles.modal}>{children}</View>
      <TouchableOpacity
        disabled={!onBackgroundPress}
        onPress={onBackgroundPress}
        style={styles.overlay}
      />
    </View>
  );
});
