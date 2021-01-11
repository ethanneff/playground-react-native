import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text, TouchableOpacity} from '../../components';
import {useColor} from '../../hooks';
import {Theme} from '../../utils';

interface Props {
  onPress?(): void;
}

export const ProfileLevel = ({onPress}: Props): JSX.Element => {
  const color = useColor();
  const image = require('../../assets/placeholder.png');
  const width = 0.2;
  const level = 22;
  const styles = StyleSheet.create({
    imageContainer: {
      alignSelf: 'center',
      borderColor: color.secondary,
      borderRadius: Theme.padding.p02,
      borderWidth: 1,
      height: Theme.padding.p18,
      justifyContent: 'center',
      resizeMode: 'contain',
      width: Theme.padding.p18,
    },
    levelContainer: {
      alignItems: 'center',
      backgroundColor: color.background,
      borderColor: color.secondary,
      borderRadius: Theme.padding.p20,
      borderWidth: 1,
      bottom: -Theme.padding.p02,
      elevation: 2,
      flex: 1,
      height: Theme.padding.p08,
      justifyContent: 'center',
      position: 'absolute',
      width: Theme.padding.p08,
      zIndex: 2,
    },
    progressBar: {
      backgroundColor: color.success,
      borderBottomLeftRadius: 0,
      borderRadius: Theme.padding.p20,
      borderTopLeftRadius: 0,
      height: '100%',
    },
    progressContainer: {
      backgroundColor: color.background,
      borderBottomLeftRadius: 0,
      borderColor: color.secondary,
      borderRadius: Theme.padding.p20,
      borderTopLeftRadius: 0,
      borderWidth: 1,
      height: Theme.padding.p04,
      marginLeft: 30,
      marginTop: -Theme.padding.p01,
      width: Theme.padding.p16,
    },
  });

  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      <Image source={image} style={styles.imageContainer} />
      <View style={{flex: 1}}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, {width}]} />
        </View>
        <View style={styles.levelContainer}>
          <Text title={String(level)} type="subtitle2" />
        </View>
      </View>
    </TouchableOpacity>
  );
};
