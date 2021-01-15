import React, {memo, useCallback} from 'react';
import {Keyboard} from 'react-native';
import {v4} from 'uuid';
import {useRootDispatch, useRootSelector} from '../../../utils';
import {addItemToItem, createItem, Item} from '../models';
import {AddButton} from './AddButton';

type AddItemProps = {
  parentItemId: string | null;
  placeholder: string;
  title: string;
  width?: number;
};

export const AddItem = memo(function AddItem({
  placeholder,
  title,
  parentItemId,
  width,
}: AddItemProps) {
  const dispatch = useRootDispatch();
  const userId = useRootSelector((s) => s.completeUser?.id);
  if (!userId) throw new Error('missing userId on add item');
  if (!parentItemId) throw new Error('missing parentItemId on add item');
  const onSubmit = useCallback(
    (value: string) => {
      if (!value) return Keyboard.dismiss();
      const itemId = v4();
      const date = Date.now();
      const item: Item = {
        id: itemId,
        userId,
        active: true,
        title: value,
        createdAt: date,
        updatedAt: date,
        children: [],
        tags: [],
        description: '',
        editable: true,
        type: 'note',
      };
      dispatch(createItem(item));
      dispatch(addItemToItem({parentItemId, itemId}));
    },
    [dispatch, parentItemId, userId],
  );

  return (
    <AddButton
      onSubmit={onSubmit}
      placeholder={placeholder}
      title={title}
      width={width}
    />
  );
});
