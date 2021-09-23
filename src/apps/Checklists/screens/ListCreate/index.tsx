import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useState } from 'react';
import 'react-native-get-random-values';
import { v4 } from 'uuid';
import { Button, Input, Screen } from '../../../../components';
import { useRootDispatch } from '../../../../redux';
import { createList } from '../../models';

const initialState = { name: '', description: '' };

export default memo(function ChecklistCreate() {
  const { navigate } = useNavigation<any>();
  const dispatch = useRootDispatch();
  const [form, setForm] = useState(initialState);
  const isInvalidForm = form.name.trim().length === 0;

  const handleSubmit = useCallback(() => {
    const { name, description } = form;
    if (isInvalidForm) return;

    const now = Date.now();
    dispatch(
      createList({
        id: v4(),
        name,
        active: true,
        userId: '1',
        description,
        createdAt: now,
        updatedAt: now,
      }),
    );
    navigate('checklists');
  }, [dispatch, form, isInvalidForm, navigate]);
  const handleNameChange = useCallback(
    (name: string) => setForm(state => ({ ...state, name })),
    [],
  );
  const handleDescriptionChange = useCallback(
    (description: string) => setForm(state => ({ ...state, description })),
    [],
  );

  const navBack = useCallback(() => navigate('checklists'), [navigate]);
  return (
    <Screen onLeftPress={navBack} title="Create Checklist">
      <Input onChangeText={handleNameChange} title="name" value={form.name} />
      <Input
        onChangeText={handleDescriptionChange}
        title="description"
        value={form.description}
      />
      <Button onPress={handleSubmit} title="create" />
    </Screen>
  );
});
