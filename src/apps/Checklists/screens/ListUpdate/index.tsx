import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {View} from 'react-native';
import {Button, Input, Modal, Screen, Text} from '../../../../components';
import {useRootDispatch, useRootSelector} from '../../../../utils';
import {getCurrentChecklist, removeList, updateList} from '../../models';

export default memo(function ChecklistUpdate() {
  const {navigate} = useNavigation();
  const dispatch = useRootDispatch();
  const checklist = useRootSelector(getCurrentChecklist);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [form, setForm] = useState({
    name: checklist.name,
    description: checklist.description || '',
  });
  const isInvalidForm = form.name.trim().length === 0;

  const handleNameChange = useCallback(
    (name: string) => setForm((state) => ({...state, name})),
    [],
  );
  const handleDescriptionChange = useCallback(
    (description: string) => setForm((state) => ({...state, description})),
    [],
  );
  const handleSubmit = useCallback(() => {
    const {name, description} = form;
    const now = Date.now();
    if (isInvalidForm) return;

    dispatch(
      updateList({
        ...checklist,
        name,
        description,
        updatedAt: now,
      }),
    );
    navigate('checklists');
  }, [checklist, dispatch, form, isInvalidForm, navigate]);

  const handleDelete = useCallback(() => {
    setShowDeleteModal(false);
    dispatch(removeList(checklist.id));
    navigate('checklists');
  }, [dispatch, checklist.id, navigate]);

  const handleDeletePress = useCallback(() => setShowDeleteModal(true), []);
  const handleDeleteCancel = useCallback(() => setShowDeleteModal(false), []);
  const navBack = useCallback(() => navigate('checklists'), [navigate]);

  return (
    <>
      <Screen gutter onLeftPress={navBack} title="Update Checklist">
        <Input onChangeText={handleNameChange} title="name" value={form.name} />
        <Input
          onChangeText={handleDescriptionChange}
          title="description"
          value={form.description}
        />
        <Button onPress={handleSubmit} title="update" />
        <Button color="danger" onPress={handleDeletePress} title="delete" />
      </Screen>
      {showDeleteModal && (
        <Modal onBackgroundPress={handleDeleteCancel}>
          <View>
            <Text title="are you sure" />
            <Button onPress={handleDeleteCancel} title="cancel" />
            <Button onPress={handleDelete} title="confirm" />
          </View>
        </Modal>
      )}
    </>
  );
});
