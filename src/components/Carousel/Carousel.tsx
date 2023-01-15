import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ViewToken } from 'react-native';
import { View } from '../../components';
import { spacing } from '../../features';
import { getWidth, useRootSelector } from '../../redux';
import { FlatList, FlatListRef, FlatListRenderItem } from '../FlatList';
import { Dots } from './Dots';
import { Item } from './Item';
import { CarouselSlide } from './types';

type Props = {
  dotSize?: number;
  duration?: number;
  slides: CarouselSlide[];
  viewabilityConfig?: Record<string, unknown>;
};

export const Carousel = memo(function Carousel({
  dotSize = spacing(4),
  slides,
  duration,
  viewabilityConfig = { itemVisiblePercentThreshold: 50 },
}: Props) {
  const loopingEnabled = useRef(false);
  const width = useRootSelector(getWidth);
  const flatList = useRef<FlatListRef<CarouselSlide>>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const loopTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const index = viewableItems[0]?.index ?? 0;
      setActiveIndex(index);
      activeIndexRef.current = index;
    },
    [],
  );

  const keyExtractor = useCallback(
    (item: CarouselSlide) => String(item.id),
    [],
  );
  const onDotPress = useCallback(
    (index: number) => () => {
      if (!flatList.current) return;
      flatList.current.scrollToIndex({ index });
    },
    [],
  );

  const scrollToIndex = useCallback(() => {
    if (!loopingEnabled.current) return;
    const index = (activeIndexRef.current + 1) % slides.length;
    flatList.current?.scrollToIndex({ index });
  }, [slides.length]);

  const loop = useCallback(() => {
    if (!duration) return;
    loopTimeout.current = setTimeout(() => {
      scrollToIndex();
      loop();
    }, duration);
  }, [duration, scrollToIndex]);

  const onTouchPauseLooping = useCallback(() => {
    if (!duration) return;
    if (touchTimeout.current) clearTimeout(touchTimeout.current);
    loopingEnabled.current = false;
    touchTimeout.current = setTimeout(() => {
      loopingEnabled.current = true;
    }, duration * 3);
  }, [duration]);

  useEffect(() => {
    if (duration && !loopingEnabled.current) {
      loop();
      loopingEnabled.current = true;
    }
    return () => {
      if (loopTimeout.current) clearTimeout(loopTimeout.current);
      if (touchTimeout.current) clearTimeout(touchTimeout.current);
    };
  }, [duration, loop]);

  const renderItem = useCallback<FlatListRenderItem<CarouselSlide>>(
    ({ item }) => (
      <Item
        item={item}
        width={width}
      />
    ),
    [width],
  );

  return (
    <View
      flex={1}
      onTouchStart={onTouchPauseLooping}
    >
      <FlatList
        data={slides}
        // disableAutoLayout
        // disableHorizontalListHeightMeasurement
        estimatedItemSize={500}
        horizontal
        keyExtractor={keyExtractor}
        onRef={flatList}
        onViewableItemsChanged={onViewableItemsChanged}
        pagingEnabled
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
