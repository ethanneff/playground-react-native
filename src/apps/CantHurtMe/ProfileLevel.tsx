import React from 'react';
import { Image, StyleSheet, type ImageSourcePropType } from 'react-native';
import { Text, Pressable, View } from '../../components';
import { spacing, useColors } from '../../features';

type Properties = {
  readonly onPress?: () => void;
};

export const ProfileLevel = ({ onPress }: Properties) => {
  const colors = useColors();
  const image = require('../../assets/placeholder.png') as ImageSourcePropType;
  const width = 0.2;
  const level = 22;
  const styles = StyleSheet.create({
    imageContainer: {
      alignSelf: 'center',
      borderColor: colors.border.primaryA,
      borderRadius: spacing(2),
      borderWidth: 1,
      height: spacing(18),
      justifyContent: 'center',
      resizeMode: 'contain',
      width: spacing(18),
    },
    levelContainer: {
      alignItems: 'center',
      backgroundColor: colors.background.primaryA,
      borderColor: colors.border.primaryA,
      borderRadius: spacing(20),
      borderWidth: 1,
      bottom: -spacing(2),
      elevation: 2,
      flex: 1,
      height: spacing(8),
      justifyContent: 'center',
      position: 'absolute',
      width: spacing(8),
      zIndex: 2,
    },
    progressBar: {
      backgroundColor: colors.background.positive,
      borderBottomLeftRadius: 0,
      borderRadius: spacing(20),
      borderTopLeftRadius: 0,
      height: '100%',
    },
    progressContainer: {
      backgroundColor: colors.background.primaryA,
      borderBottomLeftRadius: 0,
      borderColor: colors.border.primaryA,
      borderRadius: spacing(20),
      borderTopLeftRadius: 0,
      borderWidth: 1,
      height: spacing(4),
      marginLeft: 30,
      marginTop: -spacing(1),
      width: spacing(16),
    },
  });

  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
    >
      <Image
        source={image}
        style={styles.imageContainer}
      />
      <View flex={1}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width }]} />
        </View>
        <View style={styles.levelContainer}>
          <Text
            title={String(level)}
            type="subtitle2"
          />
        </View>
      </View>
    </Pressable>
  );
};
