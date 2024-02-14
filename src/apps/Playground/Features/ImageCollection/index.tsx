import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlashList,
  Image,
  Screen,
  type FlashListRenderItem,
} from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { useColors } from '../../../../features';
import {
  getLandscapeOrientation,
  getWidth,
  useAppSelector,
} from '../../../../redux';

const batch = 20;
const imageUrl = 'https://source.unsplash.com/random';

const addNewBatch = (data: number[]): number[] => {
  const newData = Array.from({ length: batch })
    .fill(0)
    .map((_, index) => Date.now() + index);
  return [...data, ...newData];
};

export const ImageCollection = () => {
  const { goBack } = useNavigation();
  const width = useAppSelector(getWidth);
  const landscape = useAppSelector(getLandscapeOrientation);
  const numberColumns = landscape ? 10 : 3;
  const columnWidth = width / numberColumns;
  const keyExtractor = useCallback(String, []);
  const [data, setData] = useState<number[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const loaded = useRef(false);
  const colors = useColors();

  const initialLoad = useCallback(() => {
    setTimeout(() => {
      setData(addNewBatch([]));
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setData([]);
    initialLoad();
  }, [initialLoad]);

  const handleFetchMore = useCallback(() => {
    setData((p) => addNewBatch(p));
  }, []);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    initialLoad();
  }, [initialLoad]);

  const renderImage = useCallback<FlashListRenderItem<number>>(
    ({ item }) => (
      <Image
        height={columnWidth}
        uri={`${imageUrl}/${item}`}
        width={columnWidth}
      />
    ),
    [columnWidth],
  );

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Images"
    >
      <FlashList
        contentContainerStyle={{ backgroundColor: colors.background.secondary }}
        data={data}
        estimatedItemSize={width / numberColumns}
        keyExtractor={keyExtractor}
        numColumns={numberColumns}
        onEndReached={handleFetchMore}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        renderItem={renderImage}
      />
    </Screen>
  );
};
