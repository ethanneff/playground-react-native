import React, { useCallback, useEffect, useRef, useState } from 'react';
import { type ViewToken } from 'react-native';
import { Pressable, View, type FlashListReference } from '../../components';
import { spacing, useLayout } from '../../features';
import { CarouselDots } from './CarouselDots';
import { CarouselList } from './CarouselList';
import { type CarouselSlide } from './types';

type Properties = {
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
}: Properties) => {
  const viewabilityConfigReference = useRef(
    viewabilityConfig ?? { itemVisiblePercentThreshold: 50 },
  ).current;
  const loopingEnabled = useRef(false);
  const flatList = useRef<FlashListReference<CarouselSlide>>(null);
  const activeIndexReference = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const loopTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { layout, onLayout } = useLayout();

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const index = viewableItems[0]?.index ?? 0;
      if (viewableItems.length === 0) return;
      setActiveIndex(index);
      activeIndexReference.current = index;
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
    const index = (activeIndexReference.current + 1) % slides.length;
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
    <Pressable onPressIn={onTouchPauseLooping}>
      <View
        flex={1}
        onLayout={onLayout}
      >
        <CarouselList
          onRef={flatList}
          onViewableItemsChanged={onViewableItemsChanged}
          slides={slides}
          viewabilityConfig={viewabilityConfigReference}
          width={layout?.width ?? 0}
        />
        <CarouselDots
          activeIndex={activeIndex}
          dotSize={dotSize}
          length={slides.length}
          onDotPress={onDotPress}
        />
      </View>
    </Pressable>
  );
};
