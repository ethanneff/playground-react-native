import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Button, Screen, Text, TouchableOpacity} from '../../components';
import {useColor} from '../../hooks';
import {getSmallestDimension} from '../../models';
import {Theme, useRootSelector} from '../../utils';

// TODO: add landing page (actionables + record)
// TODO: add navigation to columsn
// TODO: rename items/cards columns/list
// TODO: add list pagination lock
// TODO: fix list height
// TODO: add textInput for each item
// TODO: add list add text input
// TODO: add card add text input
// TODO: scroll down on card add
// TODO: make color scheme similar to todoist

type Column = {
  name: string;
  id: string;
  items: Item[];
};

type Item = {
  id: string;
  name: string;
};

export const Focus = memo(function Focus() {
  const color = useColor();
  const width = useRootSelector(getSmallestDimension);
  const columnWidth = width * 0.66;
  const borderRadius = Theme.padding.p02;
  const columnFlatList = useRef<FlatList | null>(null);

  const [columns, setColumns] = useState<Column[]>([
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
  const columnsLength = useRef(columns.length);

  const getItemId = useCallback((item) => item.id, []);

  const addColumn = useCallback(() => {
    const date = String(Date.now());
    setColumns((p) => [...p, {id: date, name: date, items: []}]);
  }, []);

  useEffect(() => {
    if (columns.length === columnsLength.current) {
      return;
    }
    columnFlatList.current?.scrollToEnd();
    columnsLength.current = columns.length;
  }, [columns.length, columnsLength]);

  const addItem = useCallback(
    (columnIndex: string) => () => {
      const date = String(Date.now());
      setColumns((p) =>
        p.map((column) => {
          if (column.id !== columnIndex) {
            return column;
          }
          const newItem = {id: date, name: date};
          return {...column, items: [...column.items, newItem]};
        }),
      );
    },
    [],
  );

  const renderItem = useCallback(
    ({item}) => {
      return (
        <TouchableOpacity
          key={item.id}
          style={{
            borderRadius,
            padding: Theme.padding.p04,
            backgroundColor: color.surface,
            marginBottom: Theme.padding.p02,
          }}>
          <Text title={item.name} />
        </TouchableOpacity>
      );
    },
    [borderRadius, color.surface],
  );

  const renderColumn = useCallback(
    ({item}) => {
      return (
        <View
          key={item.id}
          style={{
            borderRadius,
            width: columnWidth,
            backgroundColor: color.background,
            padding: Theme.padding.p02,
            marginRight: Theme.padding.p04,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: Theme.padding.p04,
            }}>
            <Text emphasis="medium" title={item.name} type="h4" />
            <Button title="edit" />
          </View>
          <FlatList
            data={item.items}
            keyExtractor={getItemId}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
          <Button
            center
            color="primary"
            onPress={addItem(item.id)}
            title="add card"
          />
        </View>
      );
    },
    [
      addItem,
      borderRadius,
      color.background,
      columnWidth,
      getItemId,
      renderItem,
    ],
  );

  const renderAddColumn = useCallback(() => {
    return (
      <View
        style={{
          width: columnWidth,
          borderRadius,
          padding: Theme.padding.p02,
          backgroundColor: color.background,
        }}>
        <Button center color="primary" onPress={addColumn} title="add column" />
      </View>
    );
  }, [addColumn, borderRadius, color.background, columnWidth]);

  return (
    <Screen title="Focus">
      <FlatList
        ListFooterComponent={renderAddColumn}
        contentContainerStyle={{padding: Theme.padding.p04}}
        data={columns}
        horizontal
        keyExtractor={getItemId}
        pagingEnabled
        ref={columnFlatList}
        renderItem={renderColumn}
        showsHorizontalScrollIndicator={false}
        style={{backgroundColor: color.surface}}
      />
    </Screen>
  );
});
