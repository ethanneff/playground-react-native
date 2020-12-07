import React, {memo, useCallback, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Button} from '../../../../components';
import {Card} from './Card';
import {ListHeader} from './ListHeader';
import {CardObject, ListObject} from './types';

type ListProps = {
  list: ListObject;
  listColor: string;
  cardColor: string;
  borderRadius: number;
  listWidth: number;
  padding: number;
  maxHeight: number;
};

export const List = memo(function List({
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
    ({item}) => {
      return (
        <Card
          backgroundColor={cardColor}
          borderRadius={borderRadius}
          card={item}
          key={item.id}
          padding={padding}
        />
      );
    },
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
