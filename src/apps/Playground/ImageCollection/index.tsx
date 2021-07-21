import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Dimensions, FlatList} from 'react-native';
import {Image, Screen} from '../../../components';
import {useColor} from '../../../hooks';

const numColumns = 3;
const handleInfiniteScrollThreshold = 0.3;
const batch = 50;
const columnWidth = Dimensions.get('window').width / numColumns;
const imageUrl = `https://source.unsplash.com/random`;
const data: number[] = Array(batch)
  .fill(0)
  .map((_, x) => Date.now() + x);

export const ImageCollection = memo(function ImageCollection() {
  const {goBack} = useNavigation();
  const keyExtractor = useCallback((d: number) => d.toString(), []);
  const handleFetchMore = useCallback(() => {
    for (let i = 0; i < batch; i++) data.push(Date.now() + i);
  }, []);
  const color = useColor();

  const renderImage = useCallback(
    ({item}) => (
      <Image
        height={columnWidth}
        uri={`${imageUrl}/${item}`}
        width={columnWidth}
      />
    ),
    [],
  );

  return (
    <Screen dropShadow onLeftPress={goBack} title="Images">
      <FlatList
        contentContainerStyle={{backgroundColor: color.background.secondary}}
        data={data}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
        numColumns={numColumns}
        onEndReached={handleFetchMore}
        onEndReachedThreshold={handleInfiniteScrollThreshold}
        renderItem={renderImage}
      />
    </Screen>
  );
});
