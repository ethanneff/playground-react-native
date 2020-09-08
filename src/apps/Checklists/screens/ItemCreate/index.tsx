import React, {memo, useCallback, useState} from 'react';
import {v4} from 'uuid';
import {Button, Screen, TextInput} from '../../../../components';
import {navigate} from '../../../../models';
import {createChecklistItem} from '../../models';
import {useRootDispatch, useRootSelector} from '../../../../utils';
import {useNav} from '../../../../hooks';
import 'react-native-get-random-values';

const initialState = {name: '', description: ''};

export default memo(function ChecklistItemCreate() {
  const nav = useNav();
  const dispatch = useRootDispatch();
  const [form, setForm] = useState(initialState);
  const currentChecklist = useRootSelector((state) => state.checklists.active);
  const isInvalidForm = form.name.trim().length === 0;

  const handleSubmit = () => {
    if (isInvalidForm) {
      return;
    }
    const {name, description} = form;
    const now = Date.now();
    if (!currentChecklist) {
      throw new Error('missing current checklist item when creating');
    }
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
    dispatch(navigate('checklistsList')); // TODO: batch
  };
  const handleNameChange = useCallback(
    (name: string) => setForm((state) => ({...state, name})),
    [],
  );
  const handleDescriptionChange = useCallback(
    (description: string) => setForm((state) => ({...state, description})),
    [],
  );

  const navItem = useCallback(nav('checklistsList'), [nav]);

  return (
    <Screen gutter onLeftPress={navItem} title="Create Item">
      <TextInput
        blurOnSubmit
        onChangeText={handleNameChange}
        title="name"
        value={form.name}
      />
      <TextInput
        onChangeText={handleDescriptionChange}
        title="description"
        value={form.description}
      />
      <Button onPress={handleSubmit} title="create" />
    </Screen>
  );
});
