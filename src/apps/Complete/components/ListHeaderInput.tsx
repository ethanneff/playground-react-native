import React, {memo, useCallback, useState} from 'react';
import {TextInput} from '../../../components';
import {useRootDispatch, useRootSelector} from '../../../utils';
import {updateListTitle} from '../models';

type ListHeaderInputProps = {
  listId: string;
};

export const ListHeaderInput = memo(function ListHeaderInput({
  listId,
}: ListHeaderInputProps) {
  const dispatch = useRootDispatch();
  const listTitle = useRootSelector((s) => s.completeList.items[listId].title);
  const [title, setTitle] = useState(listTitle);
  const onChangeText = useCallback((value: string) => {
    setTitle(value);
  }, []);

  const onSave = useCallback(() => {
    dispatch(updateListTitle({listId, title}));
  }, [dispatch, listId, title]);

  return (
    <TextInput
      emphasis="high"
      flex
      onBlur={onSave}
      onChangeText={onChangeText}
      placeholder="list name..."
      returnKeyType="done"
      type="h4"
      value={title}
    />
  );
});
