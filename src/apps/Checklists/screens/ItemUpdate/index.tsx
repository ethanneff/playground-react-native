import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useState } from 'react';
import { Button, Input, Screen } from '../../../../components';
import { useRootDispatch, useRootSelector } from '../../../../redux';
import {
  getCurrentChecklistItem,
  removeChecklistItem,
  updateChecklistItem,
} from '../../models';

export default memo(function ChecklistUpdate() {
  const { navigate } = useNavigation();
  const dispatch = useRootDispatch();
  const item = useRootSelector(getCurrentChecklistItem);
  const [form, setForm] = useState({
    description: item.description ?? '',
    name: item.name,
  });
  const isInvalidForm = form.name.trim().length === 0;

  const handleNameChange = useCallback((name: string) => {
    setForm((state) => ({ ...state, name }));
  }, []);
  const handleDescriptionChange = useCallback((description: string) => {
    setForm((state) => ({ ...state, description }));
  }, []);
  const handleSubmit = useCallback(() => {
    const { description, name } = form;
    const now = Date.now();
    if (isInvalidForm) return;

    dispatch(
      updateChecklistItem({
        ...item,
        description,
        name,
        updatedAt: now,
      }),
    );
    // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'never'.
    navigate('checklistsList');
  }, [dispatch, form, isInvalidForm, item, navigate]);
  const handleDelete = useCallback(() => {
    dispatch(removeChecklistItem(item.id));
    // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'never'.
    navigate('checklistsList');
  }, [dispatch, item.id, navigate]);

  const navItem = useCallback(() => {
    // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'never'.
    navigate('checklistsList');
  }, [navigate]);
  return (
    <Screen
      onLeftPress={navItem}
      title="Update Checklist Item"
    >
      <Input
        onChangeText={handleNameChange}
        title="name"
        value={form.name}
      />
      <Input
        onChangeText={handleDescriptionChange}
        title="description"
        value={form.description}
      />
      <Button
        onPress={handleSubmit}
        title="update"
      />
      <Button
        color="negative"
        onPress={handleDelete}
        title="delete"
      />
    </Screen>
  );
});
