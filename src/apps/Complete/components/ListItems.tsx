import React, {memo, useCallback, useRef} from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {useRootSelector} from '../../../utils';
import {ListItem} from './ListItem';

type ListItemsProps = {
  parentItemId: string;
};

export const ListItems = memo(function ListItems({
  parentItemId,
}: ListItemsProps) {
  const list = useRootSelector(
    (s) => s.completeItem.items[parentItemId].children,
  );
  const cardsRef = useRef<FlatList | null>(null);
  const cardsLength = useRef(list.length);

  const onKeyExtractor = useCallback((item) => item, []);

  const onCardSizeChange = useCallback(() => {
    if (list.length > cardsLength.current) {
      cardsRef.current?.scrollToEnd();
      cardsLength.current = list.length;
    }
  }, [list.length]);

  const onRenderItem: ListRenderItem<string> = useCallback(
    ({item}) => {
      return <ListItem itemId={item} key={item} parentItemId={parentItemId} />;
    },
    [parentItemId],
  );

  return (
    <FlatList
      data={list}
      keyExtractor={onKeyExtractor}
      keyboardShouldPersistTaps="handled"
      onContentSizeChange={onCardSizeChange}
      ref={cardsRef}
      renderItem={onRenderItem}
      showsVerticalScrollIndicator={false}
    />
  );
});
