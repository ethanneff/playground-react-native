import React, {memo, useCallback, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Button, Screen, Text, TouchableOpacity} from '../../components';
import {useColor} from '../../hooks';
import {getSmallestDimension} from '../../models';
import {Theme, useRootSelector} from '../../utils';

// TODO: add landing page (actionables + record)
// TODO: add navigation to columns
// TODO: add textInput for each item
// TODO: add list add text input
// TODO: add card add text input
// TODO: make color scheme similar to todoist
// TODO: figure out max height for list (not 500)
// TODO: break up card and list into separate files

type List = {
  name: string;
  id: string;
  items: Card[];
};

type Card = {
  id: string;
  name: string;
};

export const Focus = memo(function Focus() {
  const [lists, setLists] = useState<List[]>([
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
  const listWidth = width * 0.6;
  const padding = Theme.padding.p04;
  const listSize = listWidth + padding;
  const borderRadius = Theme.padding.p02;
  const listsRef = useRef<FlatList | null>(null);
  const cardsRef = useRef<{[key in string]: FlatList | null}>({});
  const listsCount = useRef(lists.length);

  const getItemId = useCallback((item) => item.id, []);

  const addColumn = useCallback(() => {
    const date = String(Date.now());
    setLists((p) => [...p, {id: date, name: date, items: []}]);
  }, []);

  const addCard = useCallback(
    (columnIndex: string) => () => {
      const date = String(Date.now());
      setLists((p) =>
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

  const renderCard = useCallback(
    ({item}) => {
      return (
        <TouchableOpacity
          key={item.id}
          style={{
            borderRadius,
            padding: padding,
            backgroundColor: color.surface,
            marginBottom: padding / 2,
          }}>
          <Text title={item.name} />
        </TouchableOpacity>
      );
    },
    [borderRadius, color.surface],
  );

  const onCardRef = useCallback(
    (listId: string) => (ref: FlatList | null) => {
      cardsRef.current[listId] = ref;
    },
    [],
  );

  const onCardSizeChange = useCallback(
    (listId: string) => () => {
      cardsRef.current[listId]?.scrollToEnd();
    },
    [],
  );

  const renderList = useCallback(
    ({item}) => {
      return (
        <View>
          <View
            key={item.id}
            style={{
              borderRadius,
              width: listWidth,
              backgroundColor: color.background,
              padding: padding / 2,
              marginRight: padding,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: padding,
              }}>
              <Text emphasis="medium" title={item.name} type="h4" />
              <Button title="edit" />
            </View>
            <FlatList
              data={item.items}
              keyExtractor={getItemId}
              onContentSizeChange={onCardSizeChange(item.id)}
              ref={onCardRef(item.id)}
              renderItem={renderCard}
              showsVerticalScrollIndicator={false}
              style={{maxHeight: 500}}
            />
            <Button
              center
              color="primary"
              onPress={addCard(item.id)}
              title="add card"
            />
          </View>
        </View>
      );
    },
    [
      borderRadius,
      listWidth,
      color.background,
      onCardRef,
      getItemId,
      renderCard,
      addCard,
    ],
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
  }, [addColumn, borderRadius, color.background, listWidth]);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: listSize,
      offset: listSize * index,
      index,
    }),
    [listSize],
  );

  const onListSizeChange = useCallback(() => {
    if (lists.length !== listsCount.current) {
      listsRef.current?.scrollToIndex({index: lists.length - 1});
      listsCount.current = lists.length;
    }
  }, [listsRef, lists, listsCount]);

  return (
    <Screen title="Focus">
      <FlatList
        ListFooterComponent={renderAddList}
        contentContainerStyle={{padding: padding}}
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
