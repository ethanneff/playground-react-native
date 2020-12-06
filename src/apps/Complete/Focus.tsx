import React, {memo, useCallback, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {
  Button,
  Icon,
  Screen,
  Text,
  TextInput,
  TouchableOpacity,
} from '../../components';
import {useColor} from '../../hooks';
import {getSmallestDimension} from '../../models';
import {Theme, useRootSelector} from '../../utils';

// TODO: add landing page (actionables + record)
// TODO: add navigation to columns
// TODO: move into separate files
// TODO: create data layer

// TODO: add list add text input
// TODO: add card add text input

// TODO: figure out max height for list (not 500)
// TODO: figure out centering of list

type CardObject = {
  id: string;
  name: string;
};

type ListObject = {
  name: string;
  id: string;
  items: CardObject[];
};

type CardProps = {
  card: CardObject;
  padding: number;
  borderRadius: number;
  backgroundColor: string;
};

const Card = memo(function Card({
  card,
  padding,
  borderRadius,
  backgroundColor,
}: CardProps) {
  return (
    <TouchableOpacity
      key={card.id}
      style={{
        borderRadius,
        padding: padding,
        backgroundColor,
        marginBottom: padding / 2,
      }}>
      <Text title={card.name} />
    </TouchableOpacity>
  );
});

type ListHeaderProps = {
  name: string;
  padding: number;
};

const ListHeader = memo(function ListHeader({name, padding}: ListHeaderProps) {
  const [input, setInput] = useState(name);

  const onChangeText = useCallback((value: string) => {
    setInput(value);
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: padding,
      }}>
      <TextInput
        emphasis="high"
        onChangeText={onChangeText}
        placeholder="list name..."
        type="h4"
        value={input}
      />
      <TouchableOpacity>
        <Icon name="dots-vertical" />
      </TouchableOpacity>
    </View>
  );
});

type ListProps = {
  list: ListObject;
  listColor: string;
  cardColor: string;
  borderRadius: number;
  listWidth: number;
  padding: number;
  maxHeight: number;
};

const List = memo(function List({
  list,
  borderRadius,
  listWidth,
  listColor,
  cardColor,
  padding,
  maxHeight,
}: ListProps) {
  const [cards, setCards] = useState<CardObject[]>(list.items);
  const cardsRef = useRef<FlatList | null>(null);
  const cardsLength = useRef(cards.length);

  const onKeyExtractor = useCallback((item) => item.id, []);

  const onCardSizeChange = useCallback(() => {
    if (cards.length > cardsLength.current) {
      cardsRef.current?.scrollToEnd();
      cardsLength.current = cards.length;
    }
  }, [cards.length]);

  const addCard = useCallback(() => {
    const date = String(Date.now());
    setCards((p) => [...p, {id: date, name: date}]);
  }, []);

  const onRenderItem = useCallback(
    ({item}) => (
      <Card
        backgroundColor={cardColor}
        borderRadius={borderRadius}
        card={item}
        key={item.id}
        padding={padding}
      />
    ),
    [borderRadius, cardColor, padding],
  );

  return (
    <View>
      <View
        style={{
          borderRadius,
          width: listWidth,
          backgroundColor: listColor,
          padding: padding / 2,
          marginRight: padding,
        }}>
        <ListHeader name={list.name} padding={padding} />
        <FlatList
          data={cards}
          keyExtractor={onKeyExtractor}
          onContentSizeChange={onCardSizeChange}
          ref={cardsRef}
          renderItem={onRenderItem}
          showsVerticalScrollIndicator={false}
          style={{maxHeight}}
        />
        <Button center color="primary" onPress={addCard} title="add card" />
      </View>
    </View>
  );
});

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
