import React, { useCallback, type RefObject } from 'react';
import { type ViewToken } from 'react-native';
import {
  FlashList,
  type FlashListRenderItem,
  type FlashListType,
} from '../FlashList';
import { CarouselItem } from './CarouselItem';
import { type CarouselSlide } from './types';

type ListProps = {
  readonly onRef?: RefObject<FlashListType<CarouselSlide>>;
  readonly onViewableItemsChanged: (props: {
    viewableItems: ViewToken[];
  }) => void;
  readonly slides: CarouselSlide[];
  readonly viewabilityConfig?: Record<string, unknown>;
  readonly width: number;
};

export const CarouselList = ({
  onRef,
  onViewableItemsChanged,
  slides,
  viewabilityConfig,
  width,
}: ListProps) => {
  const renderItem = useCallback<FlashListRenderItem<CarouselSlide>>(
    ({ item }) => (
      <CarouselItem
        item={item}
        width={width}
      />
    ),
    [width],
  );

  const keyExtractor = useCallback(
    (item: CarouselSlide) => String(item.id),
    [],
  );

  return (
    <FlashList
      data={slides}
      estimatedItemSize={width}
      horizontal
      keyExtractor={keyExtractor}
      onRef={onRef}
      onViewableItemsChanged={onViewableItemsChanged}
      pagingEnabled
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      viewabilityConfig={viewabilityConfig}
    />
  );
};
