import React, {memo} from 'react';
import {View} from 'react-native';
import {ListAdd} from './ListAdd';
import {ListContainer} from './ListContainer';
import {ListHeader} from './ListHeader';
import {ListItems} from './ListItems';

type ListProps = {
  listWidth?: number;
  listId: string;
  listMaxHeight?: number;
  orientation?: 'vertical' | 'horizontal';
  buttonTitle: string;
  inputPlaceholder: string;
};

export const List = memo(function List({
  listId,
  orientation,
  listWidth,
  listMaxHeight,
  buttonTitle,
  inputPlaceholder,
}: ListProps) {
  return (
    <View key={listId}>
      <ListContainer key={listId} orientation={orientation} width={listWidth}>
        <ListHeader listId={listId} />
        <ListItems listId={listId} maxHeight={listMaxHeight} />
        <ListAdd
          buttonTitle={buttonTitle}
          inputPlaceholder={inputPlaceholder}
          listId={listId}
        />
      </ListContainer>
    </View>
  );
});
