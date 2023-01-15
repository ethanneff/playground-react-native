import React, {
  type ReactElement,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  RefreshControl,
  type ScrollViewProps,
  type ViewStyle,
} from 'react-native';
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
} from 'recyclerlistview';
import {
  type RecyclerListViewProps,
  type RecyclerListViewState,
} from 'recyclerlistview/dist/reactnative/core/RecyclerListView';
import { Loader } from '../Loader';

export type RecyclerFlatListRef = RecyclerListView<
  RecyclerListViewProps,
  RecyclerListViewState
> | null;

type RecyclerFlatListProps<T> = {
  data: T[];
  isHorizontal?: boolean;
  itemHeight: number;
  itemWidth: number;
  loading?: boolean;
  onEndReached?: () => void;
  onRef?: RefObject<
    RecyclerListView<RecyclerListViewProps, RecyclerListViewState>
  >;
  onRefetch?: () => void;
  onRowRender: (item: T, index: number) => ReactElement;
  refreshing?: boolean;
  scrollViewProps?: ScrollViewProps;
  style?: ViewStyle;
};

export const RecyclerFlatList = <T,>({
  data,
  onEndReached,
  onRefetch,
  onRowRender,
  refreshing,
  loading,
  itemWidth,
  itemHeight,
  style = { flex: 1 },
  onRef,
  isHorizontal,
  scrollViewProps = {
    refreshControl: (
      <RefreshControl
        onRefresh={onRefetch}
        refreshing={refreshing ?? false}
      />
    ),
    showsVerticalScrollIndicator: false,
  },
}: RecyclerFlatListProps<T>) => {
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => r1.id !== r2.id),
  );

  const layoutProvider = useRef(
    new LayoutProvider(
      () => 1,
      (__, dim) => {
        dim.width = itemWidth;
        dim.height = itemHeight;
      },
    ),
  ).current;

  const onRenderFooter = useCallback(
    () => (loading ? <Loader /> : null),
    [loading],
  );

  const onRowRenderer = useCallback(
    (_: number | string, item: T, index: number) => onRowRender(item, index),
    [onRowRender],
  );

  useEffect(() => {
    setDataProvider((prevState) => prevState.cloneWithRows(data));
  }, [data]);

  return (
    <RecyclerListView
      dataProvider={dataProvider}
      isHorizontal={isHorizontal}
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
