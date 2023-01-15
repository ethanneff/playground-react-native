import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useState } from 'react';
import 'react-native-get-random-values';
import { v4 } from 'uuid';
import { Button, Input, Screen } from '../../../../components';
import { useRootDispatch } from '../../../../redux';
import { type SuperAny } from '../../../../types/types';
import { createList } from '../../models';

const initialState = { description: '', name: '' };

export default memo(function ChecklistCreate() {
  const { navigate } = useNavigation<SuperAny>();
  const dispatch = useRootDispatch();
  const [form, setForm] = useState(initialState);
  const isInvalidForm = form.name.trim().length === 0;

  const handleSubmit = useCallback(() => {
    const { description, name } = form;
    if (isInvalidForm) return;

    const now = Date.now();
    dispatch(
      createList({
        active: true,
        createdAt: now,
        description,
        id: v4(),
        name,
        updatedAt: now,
        userId: '1',
      }),
    );
    navigate('checklists');
  }, [dispatch, form, isInvalidForm, navigate]);
  const handleNameChange = useCallback((name: string) => {
    setForm((state) => ({ ...state, name }));
  }, []);
  const handleDescriptionChange = useCallback((description: string) => {
    setForm((state) => ({ ...state, description }));
  }, []);

  const navBack = useCallback(() => navigate('checklists'), [navigate]);
  return (
    <Screen
      onLeftPress={navBack}
      title="Create Checklist"
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
        title="create"
      />
    </Screen>
  );
});
