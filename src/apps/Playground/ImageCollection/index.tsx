import React, {memo, useCallback} from 'react';
import {Dimensions, FlatList} from 'react-native';
import {Screen} from '../../../components';
import {useNav} from '../../../hooks';
import {AsyncImage} from './AsyncImage';

const numColumns = 3;
const handleInfiniteScrollThreshold = 0.3;
const columnWidth = Dimensions.get('window').width / numColumns;
const imageUrl = `http://lorempixel.com/${columnWidth}/${columnWidth}`;
const data: number[] = [
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
];
export default memo(function ImageCollection() {
  const nav = useNav();
  const keyExtractor = (d: number) => d.toString();
  const handleFetchMore = () => {
    data.push(Math.random());
    data.push(Math.random());
    data.push(Math.random());
    data.push(Math.random());
    data.push(Math.random());
  };
  const renderImage = useCallback(
    () => (
      <AsyncImage height={columnWidth} uri={imageUrl} width={columnWidth} />
    ),
    [],
  );

  return (
    <Screen onLeftPress={nav('playground')} title="Image Collection">
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        onEndReached={handleFetchMore}
        onEndReachedThreshold={handleInfiniteScrollThreshold}
        renderItem={renderImage}
      />
    </Screen>
  );
});
