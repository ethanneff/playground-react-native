import React, {memo, useCallback, useState} from 'react';
import {Button, Dialog, Screen, TextInput} from '../../../../components';
import {getCurrentChecklist, removeList, updateList} from '../../models';
import {useNav} from '../../../../hooks';
import {useRootDispatch, useRootSelector} from '../../../../utils';
import {navigate} from '../../../../models';

export default memo(function ChecklistUpdate() {
  const nav = useNav();
  const dispatch = useRootDispatch();
  const checklist = useRootSelector(getCurrentChecklist);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [form, setForm] = useState({
    name: checklist.name,
    description: checklist.description || '',
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
      updateList({
        ...checklist,
        name,
        description,
        updatedAt: now,
      }),
    );
    dispatch(navigate('checklists'));
  };

  const handleDelete = useCallback(() => {
    setShowDeleteDialog(false);
    dispatch(removeList(checklist.id));
    dispatch(navigate('checklists'));
  }, [dispatch, checklist.id]);

  const handleDeletePress = useCallback(() => setShowDeleteDialog(true), []);
  const handleDeleteCancel = useCallback(() => setShowDeleteDialog(false), []);

  return (
    <>
      <Screen
        gutter
        onLeftPress={nav.to('checklists')}
        title="Update Checklist">
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
        <Button color="danger" onPress={handleDeletePress} title="delete" />
      </Screen>
      {showDeleteDialog && (
        <Dialog
          onBackgroundPress={handleDeleteCancel}
          onCancelButtonPress={handleDeleteCancel}
          onConfirmButtonPress={handleDelete}
          title="are you sure?"
        />
      )}
    </>
  );
});
