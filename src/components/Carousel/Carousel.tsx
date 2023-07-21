import React, { useCallback, useEffect, useRef, useState } from 'react';
import { type ViewToken } from 'react-native';
import { View, type FlashListRef } from '../../components';
import { spacing } from '../../features';
import { CarouselDots } from './CarouselDots';
import { CarouselList } from './CarouselList';
import { type CarouselSlide } from './types';

type Props = {
  readonly dotSize?: number;
  readonly duration?: number;
  readonly slides: CarouselSlide[];
  readonly viewabilityConfig?: Record<string, unknown>;
};

export const Carousel = ({
  dotSize = spacing(4),
  duration,
  slides,
  viewabilityConfig,
}: Props) => {
  const viewabilityConfigRef = useRef(
    viewabilityConfig ? viewabilityConfig : { itemVisiblePercentThreshold: 50 },
  ).current;
  const loopingEnabled = useRef(false);
  const flatList = useRef<FlashListRef<CarouselSlide>>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const loopTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const index = viewableItems[0]?.index ?? 0;
      if (!viewableItems.length) return;
      setActiveIndex(index);
      activeIndexRef.current = index;
    },
    [],
  );

  const onDotPress = useCallback(
    (index: number) => () => {
      if (!flatList.current) return;
      setActiveIndex(index);
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

  return (
    <View
      flex={1}
      onTouchStart={onTouchPauseLooping}
    >
      <CarouselList
        onRef={flatList}
        onViewableItemsChanged={onViewableItemsChanged}
        slides={slides}
        viewabilityConfig={viewabilityConfigRef}
      />
      <CarouselDots
        activeIndex={activeIndex}
        dotSize={dotSize}
        length={slides.length}
        onDotPress={onDotPress}
      />
    </View>
  );
};
