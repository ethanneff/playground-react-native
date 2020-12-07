import React, {memo, useCallback, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Button, Screen} from '../../../../components';
import {useColor} from '../../../../hooks';
import {getSmallestDimension} from '../../../../models';
import {Theme, useRootSelector} from '../../../../utils';
import {List} from './List';
import {ListObject} from './types';

// TODO: add landing page (actionables + record)
// TODO: add navigation to columns
// TODO: move into separate files
// TODO: create data layer

// TODO: add list add text input
// TODO: add card add text input

// TODO: figure out max height for list (not 500)
// TODO: figure out centering of list

export const Focus = memo(function Focus() {
  const [lists, setLists] = useState<ListObject[]>([
    {
      id: '1',
      name: 'Backlog',
      items: [
        {
          id: '11',
          name: 'clean desk',
        },
        {
          id: '22',
          name: 'clean room',
        },
        {
          id: '33',
          name: 'brush teeth',
        },
      ],
    },
    {
      id: '2',
      name: 'Todo',
      items: [],
    },
    {
      id: '3',
      name: 'In Progress',
      items: [],
    },
    {
      id: '4',
      name: 'Done',
      items: [],
    },
  ]);
  const color = useColor();
  const width = useRootSelector(getSmallestDimension);
  const listWidth = width * 0.66;
  const padding = Theme.padding.p04;
  const listSize = listWidth + padding;
  const borderRadius = Theme.padding.p02;
  const listsRef = useRef<FlatList | null>(null);
  const listsCount = useRef(lists.length);

  const getItemId = useCallback((item) => item.id, []);

  const addColumn = useCallback(() => {
    const date = String(Date.now());
    setLists((p) => [...p, {id: date, name: date, items: []}]);
  }, []);

  const renderList = useCallback(
    ({item}) => {
      return (
        <List
          borderRadius={borderRadius}
          cardColor={color.surface}
          key={item.id}
          list={item}
          listColor={color.background}
          listWidth={listWidth}
          maxHeight={500}
          padding={padding}
        />
      );
    },
    [borderRadius, color.surface, color.background, listWidth, padding],
  );

  const renderAddList = useCallback(() => {
    return (
      <View
        style={{
          width: listWidth,
          borderRadius,
          padding: padding / 2,
          backgroundColor: color.background,
        }}>
        <Button center color="primary" onPress={addColumn} title="add list" />
      </View>
    );
  }, [addColumn, borderRadius, color.background, listWidth, padding]);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: listSize,
      offset: listSize * index,
      index,
    }),
    [listSize],
  );

  const onListSizeChange = useCallback(() => {
    if (lists.length > listsCount.current) {
      listsRef.current?.scrollToIndex({
        index: lists.length - 1,
        viewPosition: 0.5,
      });
      listsCount.current = lists.length;
    }
  }, [listsRef, lists, listsCount]);

  return (
    <Screen title="Focus">
      <FlatList
        ListFooterComponent={renderAddList}
        contentContainerStyle={{padding}}
        data={lists}
        decelerationRate="fast"
        getItemLayout={getItemLayout}
        horizontal
        keyExtractor={getItemId}
        onContentSizeChange={onListSizeChange}
        ref={listsRef}
        renderItem={renderList}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        snapToInterval={listSize}
        style={{backgroundColor: color.surface}}
      />
    </Screen>
  );
});
