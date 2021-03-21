import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {Button, Input, Screen} from '../../../../components';
import {useRootDispatch, useRootSelector} from '../../../../utils';
import {
  getCurrentChecklistItem,
  removeChecklistItem,
  updateChecklistItem,
} from '../../models';

export default memo(function ChecklistUpdate() {
  const {navigate} = useNavigation();
  const dispatch = useRootDispatch();
  const item = useRootSelector(getCurrentChecklistItem);
  const [form, setForm] = useState({
    name: item.name,
    description: item.description || '',
  });
  const isInvalidForm = form.name.trim().length === 0;

  const handleNameChange = useCallback(
    (name: string) => setForm(state => ({...state, name})),
    [],
  );
  const handleDescriptionChange = useCallback(
    (description: string) => setForm(state => ({...state, description})),
    [],
  );
  const handleSubmit = useCallback(() => {
    const {name, description} = form;
    const now = Date.now();
    if (isInvalidForm) return;

    dispatch(
      updateChecklistItem({
        ...item,
        name,
        description,
        updatedAt: now,
      }),
    );
    navigate('checklistsList');
  }, [dispatch, form, isInvalidForm, item, navigate]);
  const handleDelete = useCallback(() => {
    dispatch(removeChecklistItem(item.id));
    navigate('checklistsList');
  }, [dispatch, item.id, navigate]);

  const navItem = useCallback(() => navigate('checklistsList'), [navigate]);
  return (
    <Screen gutter onLeftPress={navItem} title="Update Checklist Item">
      <Input onChangeText={handleNameChange} title="name" value={form.name} />
      <Input
        onChangeText={handleDescriptionChange}
        title="description"
        value={form.description}
      />
      <Button onPress={handleSubmit} title="update" />
      <Button color="danger" onPress={handleDelete} title="delete" />
    </Screen>
  );
});
