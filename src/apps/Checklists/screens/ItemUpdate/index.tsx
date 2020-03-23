import React, { memo, useState } from 'react';
import { Button, Screen, TextInput } from '../../../../components';
import {
  updateChecklistItem,
  removeChecklistItem,
  getCurrentChecklistItem,
} from '../../models';
import { useNav } from '../../../../hooks';
import { useRootSelector, useRootDispatch } from '../../../../utils';
import { navigate } from '../../../../models';

export default memo(function ChecklistUpdate() {
  const nav = useNav();
  const dispatch = useRootDispatch();
  const item = useRootSelector(getCurrentChecklistItem);
  const [form, setForm] = useState({
    name: item.name,
    description: item.description || '',
  });
  const isInvalidForm = form.name.trim().length === 0;

  const handleNameChange = (name: string) =>
    setForm((state) => ({ ...state, name }));
  const handleDescriptionChange = (description: string) =>
    setForm((state) => ({ ...state, description }));
  const handleSubmit = () => {
    const { name, description } = form;
    const now = Date.now();
    if (isInvalidForm) {
      return;
    }
    dispatch(
      updateChecklistItem({
        ...item,
        name,
        description,
        updatedAt: now,
      })
    );
    dispatch(navigate('checklistsList'));
  };
  const handleDelete = () => {
    dispatch(removeChecklistItem(item.id));
    dispatch(navigate('checklistsList'));
  };

  return (
    <Screen
      onLeftPress={nav.to('checklistsList')}
      title={'Update Checklist Item'}
      gutter
    >
      <TextInput
        title="name"
        value={form.name}
        onChangeText={handleNameChange}
      />
      <TextInput
        title="description"
        value={form.description}
        onChangeText={handleDescriptionChange}
      />
      <Button title="update" onPress={handleSubmit} />
      <Button title="delete" onPress={handleDelete} color="danger" />
    </Screen>
  );
});
