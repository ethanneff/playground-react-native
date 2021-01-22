import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, ListRenderItem, View} from 'react-native';
import {useColor} from '../../hooks';
import {getWidth} from '../../models';
import {config, useRootSelector} from '../../utils';
import {Dots} from './Dots';
import {Item} from './Item';
import {Slide} from './types';

type Props = {
  dotSize?: number;
  slides: Slide[];
  duration?: number;
  viewabilityConfig?: Record<string, unknown>;
};

export const Carousel = memo(function Carousel({
  dotSize = config.padding(4),
  slides,
  duration,
  viewabilityConfig = {itemVisiblePercentThreshold: 50},
}: Props) {
  const color = useColor();
  const loopingEnabled = useRef(false);
  const width = useRootSelector(getWidth);
  const flatList = useRef<FlatList | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const loopTimeout = useRef<NodeJS.Timeout | null>(null);
  const touchTimeout = useRef<NodeJS.Timeout | null>(null);

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    const index = viewableItems[0].index || 0;
    setActiveIndex(index);
    activeIndexRef.current = index;
  }, []);

  const keyExtractor = useCallback((item) => String(item.id), []);
  const onDotPress = useCallback(
    (index: number) => () => {
      if (!flatList.current) return;
      flatList.current.scrollToIndex({index});
    },
    [],
  );

  const scrollToIndex = useCallback(() => {
    if (!loopingEnabled.current) return;
    const index = (activeIndexRef.current + 1) % slides.length;
    flatList.current?.scrollToIndex({index});
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

  const renderItem = useCallback<ListRenderItem<Slide>>(
    ({item}) => <Item item={item} width={width} />,
    [width],
  );

  return (
    <View onTouchStart={onTouchPauseLooping} style={{flex: 1}}>
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
