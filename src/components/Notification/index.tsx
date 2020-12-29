import {useNavigation} from '@react-navigation/native';
import React, {ReactElement, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from '../../components/Button';
import {Text} from '../../components/Text';
import {useColor} from '../../hooks';
import {Theme} from '../../utils';

const height = 100;

export const Notification = (): ReactElement => {
  const {goBack} = useNavigation();
  const color = useColor();

  const styles = StyleSheet.create({
    modal: {
      alignItems: 'center',
      backgroundColor: color.background,
      height,
      justifyContent: 'center',
      width: '100%',
    },
    overlay: {flex: 1, zIndex: 1},
    safeArea: {
      backgroundColor: color.background,
      height,
      position: 'absolute',
      width: '100%',
    },
    title: {fontSize: Theme.padding.p08},
  });
  const navBack = useCallback(() => goBack(), [goBack]);
  return (
    <>
      <SafeAreaView style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title} title="This is a notification!" />
          <Button onPress={navBack} title="Dismiss" />
        </View>
      </SafeAreaView>
      <View style={styles.safeArea} />
    </>
  );
};
