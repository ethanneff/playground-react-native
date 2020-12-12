import React, {RefObject, useCallback, useEffect, useState} from 'react';
import {ReactElement} from 'react';
import {RefreshControl, ScrollViewProps, ViewStyle} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {
  RecyclerListViewProps,
  RecyclerListViewState,
} from 'recyclerlistview/dist/reactnative/core/RecyclerListView';
import {ActivityIndicator} from '../ActivityIndicator';

export type RecyclerFlatListRef = RecyclerListView<
  RecyclerListViewProps,
  RecyclerListViewState
> | null;

type ItemT = {id: string; [key: string]: any};
type RowRender = {
  item: ItemT;
  type: string;
  index: number;
};

type RecyclerFlatListProps = {
  data: ItemT[];
  onEndReached?: () => void;
  onRefetch?: () => void;
  onRowRender: ({item, type, index}: RowRender) => ReactElement;
  loading?: boolean;
  refreshing?: boolean;
  itemWidth: number;
  itemHeight: number;
  style?: ViewStyle;
  scrollViewProps?: ScrollViewProps;
  onRef?: RefObject<
    RecyclerListView<RecyclerListViewProps, RecyclerListViewState> | null | any
  >;
};

export const RecyclerFlatList = ({
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
  scrollViewProps = {
    showsVerticalScrollIndicator: false,
    refreshControl: (
      <RefreshControl onRefresh={onRefetch} refreshing={refreshing || false} />
    ),
  },
}: RecyclerFlatListProps): ReactElement => {
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
    (type, item, index) => onRowRender({type, item, index}),
    [onRowRender],
  );

  useEffect(() => {
    setDataProvider((prevState) => prevState.cloneWithRows(data));
  }, [data]);

  return (
    <RecyclerListView
      dataProvider={dataProvider}
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
