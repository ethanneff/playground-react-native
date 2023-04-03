import React, { memo, useCallback, type RefObject } from 'react';
import { type ViewToken } from 'react-native';
import { getWidth, useRootSelector } from '../../redux';
import {
  FlashList,
  type FlashListType,
  type FlashListRenderItem,
} from '../FlashList';
import { CarouselItem } from './CarouselItem';
import { type CarouselSlide } from './types';

type ListProps = {
  onRef?: RefObject<FlashListType<CarouselSlide>>;
  onViewableItemsChanged: (props: { viewableItems: ViewToken[] }) => void;
  slides: CarouselSlide[];
  viewabilityConfig?: Record<string, unknown>;
};

export const CarouselList = memo(function CarouselListMemo({
  onRef,
  onViewableItemsChanged,
  slides,
  viewabilityConfig,
}: ListProps) {
  const width = useRootSelector(getWidth);

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
});
