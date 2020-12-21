import React, {memo, useCallback, useRef} from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {useRootSelector} from '../../../utils';
import {ListItem} from './ListItem';

type ListItemsProps = {
  listId: string;
  maxHeight?: number;
};

export const ListItems = memo(function ListItems({
  listId,
  maxHeight,
}: ListItemsProps) {
  const listItems = useRootSelector((s) => s.completeList.items[listId].items);
  const cardsRef = useRef<FlatList | null>(null);
  const cardsLength = useRef(listItems.length);

  const onKeyExtractor = useCallback((item) => item, []);

  const onCardSizeChange = useCallback(() => {
    if (listItems.length > cardsLength.current) {
      cardsRef.current?.scrollToEnd();
      cardsLength.current = listItems.length;
    }
  }, [listItems.length]);

  const onRenderItem: ListRenderItem<string> = useCallback(({item}) => {
    return <ListItem itemId={item} key={item} />;
  }, []);

  return (
    <FlatList
      data={listItems}
      keyExtractor={onKeyExtractor}
      keyboardShouldPersistTaps="handled"
      onContentSizeChange={onCardSizeChange}
      ref={cardsRef}
      renderItem={onRenderItem}
      showsVerticalScrollIndicator={false}
      style={{maxHeight}}
    />
  );
});
