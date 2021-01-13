import React, {memo, useCallback, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {getWidth} from '../../models';
import {Config, useRootSelector} from '../../utils';
import {Text} from '../Text';
import {Dots} from './Dots';
import {Slide} from './types';

interface Props {
  dotSize?: number;
  slides: Slide[];
  viewabilityConfig?: Record<string, unknown>;
}

export const Carousel = memo(function Carousel({
  dotSize = Config.padding(4),
  slides,
  viewabilityConfig = {itemVisiblePercentThreshold: 50},
}: Props) {
  const width = useRootSelector(getWidth);
  const flatList = useRef<FlatList | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    setActiveIndex(viewableItems[0].index || 0);
  }, []);

  const keyExtractor = useCallback((item) => String(item.id), []);
  const onDotPress = useCallback(
    (index: number) => () => {
      if (!flatList.current) return;
      flatList.current.scrollToIndex({index});
    },
    [],
  );

  const renderItem = useCallback(
    ({item}) => {
      const styles = StyleSheet.create({
        item: {
          backgroundColor: item.color,
          justifyContent: 'center',
          width,
        },
      });

      return (
        <View style={styles.item}>
          <Text center title={item.text} />
        </View>
      );
    },
    [width],
  );

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={slides}
        horizontal
        keyExtractor={keyExtractor}
        onViewableItemsChanged={onViewableItemsChanged}
        pagingEnabled
        ref={flatList}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig}
      />
      <Dots
        activeIndex={activeIndex}
        dotSize={dotSize}
        onDotPress={onDotPress}
        slides={slides}
      />
    </View>
  );
});
