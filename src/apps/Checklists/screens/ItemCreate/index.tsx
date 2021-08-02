import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import 'react-native-get-random-values';
import {v4} from 'uuid';
import {Button, Input, Screen} from '../../../../components';
import {useRootDispatch, useRootSelector} from '../../../../utils';
import {createChecklistItem} from '../../models';

const initialState = {name: '', description: ''};

export default memo(function ChecklistItemCreate() {
  const {navigate} = useNavigation<any>();
  const dispatch = useRootDispatch();
  const [form, setForm] = useState(initialState);
  const currentChecklist = useRootSelector(state => state.checklist.active);
  const isInvalidForm = form.name.trim().length === 0;

  const handleSubmit = useCallback(() => {
    if (isInvalidForm) return;

    const {name, description} = form;
    const now = Date.now();
    if (!currentChecklist)
      throw new Error('missing current checklist item when creating');

    dispatch(
      createChecklistItem({
        name,
        description,
        completed: false,
        active: true,
        createdAt: now,
        id: v4(),
        checklistId: currentChecklist,
        order: now,
        updatedAt: now,
        userId: '1',
      }),
    );
    navigate('checklistsList');
  }, [currentChecklist, dispatch, form, isInvalidForm, navigate]);

  const handleNameChange = useCallback(
    (name: string) => setForm(state => ({...state, name})),
    [],
  );
  const handleDescriptionChange = useCallback(
    (description: string) => setForm(state => ({...state, description})),
    [],
  );

  const navItem = useCallback(() => navigate('checklistsList'), [navigate]);

  return (
    <Screen onLeftPress={navItem} title="Create Item">
      <Input
        blurOnSubmit
        onChangeText={handleNameChange}
        title="name"
        value={form.name}
      />
      <Input
        onChangeText={handleDescriptionChange}
        title="description"
        value={form.description}
      />
      <Button onPress={handleSubmit} title="create" />
    </Screen>
  );
});
