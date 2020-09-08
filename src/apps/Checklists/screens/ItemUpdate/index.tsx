import React, {memo, useCallback, useState} from 'react';
import {Button, Screen, TextInput} from '../../../../components';
import {
  getCurrentChecklistItem,
  removeChecklistItem,
  updateChecklistItem,
} from '../../models';
import {useNav} from '../../../../hooks';
import {useRootDispatch, useRootSelector} from '../../../../utils';

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
    setForm((state) => ({...state, name}));
  const handleDescriptionChange = (description: string) =>
    setForm((state) => ({...state, description}));
  const handleSubmit = () => {
    const {name, description} = form;
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
      }),
    );
    nav('checklistsList');
  };
  const handleDelete = () => {
    dispatch(removeChecklistItem(item.id));
    nav('checklistsList');
  };

  const navItem = useCallback(nav('checklistsList'), [nav]);
  return (
    <Screen gutter onLeftPress={navItem} title="Update Checklist Item">
      <TextInput
        onChangeText={handleNameChange}
        title="name"
        value={form.name}
      />
      <TextInput
        onChangeText={handleDescriptionChange}
        title="description"
        value={form.description}
      />
      <Button onPress={handleSubmit} title="update" />
      <Button color="danger" onPress={handleDelete} title="delete" />
    </Screen>
  );
});
