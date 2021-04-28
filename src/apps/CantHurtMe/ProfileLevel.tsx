import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text, TouchableOpacity} from '../../components';
import {useColor} from '../../hooks';
import {config} from '../../utils';

interface Props {
  onPress?: () => void;
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
      borderRadius: config.padding(2),
      borderWidth: 1,
      height: config.padding(18),
      justifyContent: 'center',
      resizeMode: 'contain',
      width: config.padding(18),
    },
    levelContainer: {
      alignItems: 'center',
      backgroundColor: color.background,
      borderColor: color.secondary,
      borderRadius: config.padding(20),
      borderWidth: 1,
      bottom: -config.padding(2),
      elevation: 2,
      flex: 1,
      height: config.padding(8),
      justifyContent: 'center',
      position: 'absolute',
      width: config.padding(8),
      zIndex: 2,
    },
    progressBar: {
      backgroundColor: color.success,
      borderBottomLeftRadius: 0,
      borderRadius: config.padding(20),
      borderTopLeftRadius: 0,
      height: '100%',
    },
    progressContainer: {
      backgroundColor: color.background,
      borderBottomLeftRadius: 0,
      borderColor: color.secondary,
      borderRadius: config.padding(20),
      borderTopLeftRadius: 0,
      borderWidth: 1,
      height: config.padding(4),
      marginLeft: 30,
      marginTop: -config.padding(1),
      width: config.padding(16),
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
