import React, {
  ReactElement,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {RefreshControl, ScrollViewProps, ViewStyle} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {
  RecyclerListViewProps,
  RecyclerListViewState,
} from 'recyclerlistview/dist/reactnative/core/RecyclerListView';
import {ActivityIndicator} from '../ActivityIndicator';

export type RecyclerFlatListRef = RecyclerListView<
  RecyclerListViewProps,
  RecyclerListViewState
> | null;

type RecyclerFlatListProps<T> = {
  data: T[];
  onEndReached?: () => void;
  onRefetch?: () => void;
  onRowRender: (item: T, index: number) => ReactElement;
  loading?: boolean;
  refreshing?: boolean;
  itemWidth: number;
  itemHeight: number;
  style?: ViewStyle;
  horizontal?: boolean;
  scrollViewProps?: ScrollViewProps;
  onRef?: RefObject<
    RecyclerListView<RecyclerListViewProps, RecyclerListViewState> | null | any
  >;
};

export const RecyclerFlatList = <T extends unknown>({
  data,
  onEndReached,
  onRefetch,
  onRowRender,
  refreshing,
  loading,
  itemWidth,
  itemHeight,
  style = {flex: 1},
  onRef,
  horizontal,
  scrollViewProps = {
    showsVerticalScrollIndicator: false,
    refreshControl: (
      <RefreshControl onRefresh={onRefetch} refreshing={refreshing || false} />
    ),
  },
}: RecyclerFlatListProps<T>): ReactElement => {
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => r1.id !== r2.id),
  );

  const [layoutProvider] = useState(
    new LayoutProvider(
      (_) => 1,
      (_, dim) => {
        dim.width = itemWidth;
        dim.height = itemHeight;
      },
    ),
  );

  const onRenderFooter = useCallback(
    () => (loading ? <ActivityIndicator /> : null),
    [loading],
  );

  const onRowRenderer = useCallback(
    (_, item: T, index: number) => onRowRender(item, index),
    [onRowRender],
  );

  useEffect(
    () => setDataProvider((prevState) => prevState.cloneWithRows(data)),
    [data],
  );

  return (
    <RecyclerListView
      dataProvider={dataProvider}
      horizontal={horizontal}
      layoutProvider={layoutProvider}
      onEndReached={onEndReached}
      ref={onRef}
      renderFooter={onRenderFooter}
      rowRenderer={onRowRenderer}
      scrollViewProps={scrollViewProps}
      style={style}
    />
  );
};
