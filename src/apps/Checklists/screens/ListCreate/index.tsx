import React, {memo, useCallback, useState} from 'react';
import {v4} from 'uuid';
import {Button, Screen, TextInput} from '../../../../components';
import {navigate} from '../../../../models';
import {useRootDispatch} from '../../../../utils';
import {useNav} from '../../../../hooks';
import {createList} from '../../models';
import 'react-native-get-random-values';

const initialState = {name: '', description: ''};

export default memo(function ChecklistCreate() {
  const nav = useNav();
  const dispatch = useRootDispatch();
  const [form, setForm] = useState(initialState);
  const isInvalidForm = form.name.trim().length === 0;

  const handleSubmit = () => {
    const {name, description} = form;
    if (isInvalidForm) {
      return;
    }
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
    dispatch(navigate('checklists'));
  };
  const handleNameChange = useCallback(
    (name: string) => setForm((state) => ({...state, name})),
    [],
  );
  const handleDescriptionChange = useCallback(
    (description: string) => setForm((state) => ({...state, description})),
    [],
  );

  const navBack = useCallback(nav('checklists'), [nav]);
  return (
    <Screen gutter onLeftPress={navBack} title="Create Checklist">
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
      <Button onPress={handleSubmit} title="create" />
    </Screen>
  );
});
