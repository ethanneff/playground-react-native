import React, {memo, useState} from 'react';
import {Button, Screen, TextInput} from '../../../../components';
import {navigate} from '../../../../models';
import {createChecklistItem} from '../../models';
import {Errors, useRootDispatch, useRootSelector} from '../../../../utils';
import {useNav} from '../../../../hooks';
import 'react-native-get-random-values';
import {v4} from 'uuid';

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
      throw new Error(Errors.MissingCurrentChecklistCreatingItem);
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
  const handleNameChange = (name: string) =>
    setForm((state) => ({...state, name}));
  const handleDescriptionChange = (description: string) =>
    setForm((state) => ({...state, description}));

  return (
    <Screen onLeftPress={nav.to('checklistsList')} title="Create Item" gutter>
      <TextInput
        title="name"
        value={form.name}
        onChangeText={handleNameChange}
        blurOnSubmit
      />
      <TextInput
        title="description"
        value={form.description}
        onChangeText={handleDescriptionChange}
      />
      <Button title="create" onPress={handleSubmit} />
    </Screen>
  );
});
