import React, {memo, useCallback, useRef, useState} from 'react';
import {ScrollViewProps, View} from 'react-native';
import {RecyclerFlatList, RecyclerFlatListRef} from '../../../components';
import {ItemObject, ListObject} from '../types';
import {AddItem} from './AddItem';
import {Item} from './Item';
import {ListHeader} from './ListHeader';

type ListProps = {
  list: ListObject;
  listColor: string;
  cardColor: string;
  borderRadius: number;
  listWidth: number;
  padding: number;
  listHeight: number;
  itemHeight: number;
  itemWidth: number;
  orientation?: 'vertical' | 'horizontal';
  addButtonTitle: string;
  addButtonPlaceholder: string;
};

export const List = memo(function List({
  list,
  borderRadius,
  listWidth,
  listColor,
  cardColor,
  padding,
  listHeight,
  itemHeight,
  itemWidth,
  orientation = 'vertical',
  addButtonTitle,
  addButtonPlaceholder,
}: ListProps) {
  const [cards, setCards] = useState<ItemObject[]>(list.items);
  const cardsRef = useRef<RecyclerFlatListRef>(null);
  const cardsLength = useRef(cards.length);
  const horizontal = orientation === 'horizontal';
  const scrollViewProps: ScrollViewProps = {
    showsVerticalScrollIndicator: false,
    showsHorizontalScrollIndicator: false,
    onContentSizeChange: useCallback(() => {
      if (cards.length > cardsLength.current) {
        cardsRef.current?.scrollToEnd();
        cardsLength.current = cards.length;
      }
    }, [cards.length]),
  };

  const onAddCard = useCallback((name: string) => {
    const date = String(Date.now());
    setCards((p) => [...p, {id: date, name}]);
  }, []);

  const onRenderItem = useCallback(
    (item) => {
      return (
        <Item
          backgroundColor={cardColor}
          borderRadius={borderRadius}
          item={item}
          key={item.id}
          padding={padding}
        />
      );
    },
    [borderRadius, cardColor, padding],
  );

  return (
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
      <RecyclerFlatList
        data={cards}
        itemHeight={itemHeight}
        itemWidth={itemWidth}
        onRef={cardsRef}
        onRowRender={onRenderItem}
        scrollViewProps={scrollViewProps}
        style={{height: listHeight}}
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
  );
});
