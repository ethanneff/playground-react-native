import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { padding, useColors } from '../../features';
import { Content } from '../Content';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { CarouselSlide } from './types';

type Props = {
  item: CarouselSlide;
  width: number;
};

export const Item = memo(function Item({ item, width }: Props) {
  const colors = useColors();
  const styles = StyleSheet.create({
    item: {
      alignItems: 'center',
      backgroundColor: item.backgroundColor || colors.background.primaryA,
      justifyContent: 'center',
      padding: padding(4),
      width,
    },
  });

  return (
    <View style={styles.item}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {item.icon && <Icon name={item.icon} size={padding(40)} />}
      </View>
      <View style={{ flex: 1 }}>
        {item.title && (
          <Text
            center
            style={{ paddingVertical: padding(8) }}
            title={item.title}
            type="h4"
          />
        )}
        {item.sections && <Content center sections={item.sections} />}
      </View>
    </View>
  );
});
