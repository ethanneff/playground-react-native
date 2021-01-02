import React, {memo, useCallback} from 'react';
import {v4} from 'uuid';
import {useRootDispatch} from '../../../utils';
import {createItem, Item, updateListAddItem} from '../models';
import {AddButton} from './AddButton';

type AddItemProps = {
  listId: string;
  placeholder: string;
  title: string;
};

export const AddItem = memo(function AddItem({
  placeholder,
  title,
  listId,
}: AddItemProps) {
  const dispatch = useRootDispatch();
  const onSubmit = useCallback(
    (value: string) => {
      const itemId = v4();
      const date = Date.now();
      const item: Item = {
        id: itemId,
        active: true,
        title: value,
        createdAt: date,
        updatedAt: date,
      };
      dispatch(createItem(item));
      dispatch(updateListAddItem({listId, itemId}));
    },
    [dispatch, listId],
  );

  return (
    <AddButton onSubmit={onSubmit} placeholder={placeholder} title={title} />
  );
});
