import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '..';
import { spacing, useColors } from '../../features';
import { Content } from '../Content';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { type CarouselSlide } from './types';

type Properties = {
  readonly item: CarouselSlide;
  readonly width: number;
};

export const CarouselItem = ({ item, width }: Properties) => {
  const colors = useColors();
  const styles = StyleSheet.create({
    item: {
      alignItems: 'center',
      backgroundColor: item.backgroundColor ?? colors.background.primaryA,
      height: '100%',
      justifyContent: 'center',
      padding: spacing(4),
      width,
    },
  });

  return (
    <View style={styles.item}>
      <View justifyContent="center">
        {item.icon ? (
          <Icon
            name={item.icon}
            size={spacing(25)}
          />
        ) : null}
      </View>
      <View>
        {item.title ? (
          <Text
            center
            style={{ paddingVertical: spacing(8) }}
            title={item.title}
            type="h4"
          />
        ) : null}
        {item.sections ? (
          <Content
            center
            sections={item.sections}
          />
        ) : null}
      </View>
    </View>
  );
};
