import React, {memo, useCallback, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {ItemObject, ListObject} from '../types';
import {AddItem} from './AddItem';
import {Item} from './Item';
import {ListHeader} from './ListHeader';

type ListProps = {
  list: ListObject;
  listColor: string;
  itemColor: string;
  borderRadius: number;
  listWidth?: number;
  padding: number;
  maxHeight?: number;
  orientation?: 'vertical' | 'horizontal';
  addButtonTitle: string;
  addButtonPlaceholder: string;
};

export const List = memo(function List({
  list,
  borderRadius,
  listWidth,
  listColor,
  itemColor,
  padding,
  maxHeight,
  orientation = 'vertical',
  addButtonTitle,
  addButtonPlaceholder,
}: ListProps) {
  const [cards, setCards] = useState<ItemObject[]>(list.items);
  const cardsRef = useRef<FlatList | null>(null);
  const cardsLength = useRef(cards.length);
  const horizontal = orientation === 'horizontal';

  const onKeyExtractor = useCallback((item) => item.id, []);

  const onCardSizeChange = useCallback(() => {
    if (cards.length > cardsLength.current) {
      cardsRef.current?.scrollToEnd();
      cardsLength.current = cards.length;
    }
  }, [cards.length]);

  const onAddCard = useCallback((name: string) => {
    const date = String(Date.now());
    setCards((p) => [...p, {id: date, name}]);
  }, []);

  const onRenderItem = useCallback(
    ({item}) => {
      return (
        <Item
          backgroundColor={itemColor}
          borderRadius={borderRadius}
          item={item}
          key={item.id}
          padding={padding}
        />
      );
    },
    [borderRadius, itemColor, padding],
  );

  return (
    <View>
      <View
        style={{
          borderRadius,
          width: listWidth,
          backgroundColor: listColor,
          padding: padding / 2,
          marginRight: horizontal ? padding : 0,
          marginBottom: horizontal ? 0 : padding,
        }}>
        <ListHeader name={list.name} padding={padding} />
        <FlatList
          data={cards}
          keyExtractor={onKeyExtractor}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={onCardSizeChange}
          ref={cardsRef}
          renderItem={onRenderItem}
          showsVerticalScrollIndicator={false}
          style={{maxHeight}}
        />
        <AddItem
          backgroundColor={listColor}
          borderRadius={borderRadius}
          buttonTitle={addButtonTitle}
          inputPlaceholder={addButtonPlaceholder}
          inputType="body2"
          onAdd={onAddCard}
        />
      </View>
    </View>
  );
});
