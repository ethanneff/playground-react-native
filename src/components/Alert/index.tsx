import React, {ReactNode, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from '../../components';
import {useColor} from '../../hooks';
import {Theme} from '../../utils';

export const Alert = (): ReactNode => {
  const {goBack} = useNavigation();
  const color = useColor();

  const styles = StyleSheet.create({
    modal: {
      backgroundColor: color.background,
      borderRadius: Theme.padding.p05,
      padding: Theme.padding.p05,
    },
    overlay: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    title: {fontSize: 30},
  });

  const navBack = useCallback(() => goBack(), [goBack]);

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title} title="This is a alert!" />
        <Button onPress={navBack} title="Dismiss" />
      </View>
    </View>
  );
};
