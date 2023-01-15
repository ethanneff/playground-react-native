import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { type ListRenderItem } from 'react-native';
import { useSelector } from 'react-redux';
import { FlatList, Image, Screen } from '../../../../components';
import { useColors } from '../../../../features';
import { getLandscapeOrientation, getWidth } from '../../../../redux';

const batch = 20;
const imageUrl = 'https://source.unsplash.com/random';

const addNewBatch = (data: number[]): number[] => {
  const newData = new Array(batch).fill(0).map((_, i) => Date.now() + i);
  return [...data, ...newData];
};

export const ImageCollection = memo(function ImageCollection() {
  const { goBack } = useNavigation();
  const width = useSelector(getWidth);
  const landscape = useSelector(getLandscapeOrientation);
  const numColumns = landscape ? 10 : 3;
  const columnWidth = width / numColumns;
  const keyExtractor = useCallback((d: number) => String(d), []);
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

  const renderImage = useCallback<ListRenderItem<number>>(
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
      <FlatList
        contentContainerStyle={{ backgroundColor: colors.background.secondary }}
        data={data}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
        numColumns={numColumns}
        onEndReached={handleFetchMore}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        renderItem={renderImage}
      />
    </Screen>
  );
});
