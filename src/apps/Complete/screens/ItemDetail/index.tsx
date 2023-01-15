import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useState } from 'react';
import { Keyboard } from 'react-native';
import { Button, Card, Modal, Text, View } from '../../../../components';
import { spacing, useColors } from '../../../../features';
import { useRootDispatch, useRootSelector } from '../../../../redux';
import { DeleteModal, ItemContext, ItemEdit } from '../../components';
import { removeItem, removeItemFromItem, updateItem } from '../../models';

export const ItemDetail = memo(function ItemDetail() {
  const dispatch = useRootDispatch();
  const { goBack } = useNavigation();
  const colors = useColors();
  const { itemId, parentItemId } = useRootSelector((s) => s.completeItem.nav);
  if (!itemId || !parentItemId)
    throw new Error('missing listId or itemId on item detail screen');
  const item = useRootSelector((s) => s.completeItem.items[itemId]);
  const [deleteModal, setDeleteModal] = useState(false);

  const onItemDelete = useCallback(() => {
    dispatch(removeItem(itemId));
    dispatch(removeItemFromItem({ itemId, parentItemId }));
    setDeleteModal(false);
    goBack();
  }, [dispatch, goBack, itemId, parentItemId]);

  const onItemSubmit = useCallback(
    (type: string) => (text: string) => {
      dispatch(updateItem({ ...item, [type]: text }));
      Keyboard.dismiss();
    },
    [dispatch, item],
  );

  const onDeletePress = useCallback(() => setDeleteModal(true), []);
  const onDeleteClose = useCallback(() => setDeleteModal(false), []);

  return (
    <>
      <Modal
        backgroundColor={colors.background.secondary}
        onBackgroundPress={goBack}
      >
        <View>
          <ItemEdit
            description={item.description}
            onSubmit={onItemSubmit}
            placeholder="Item"
            title={item.title}
            titleEditable={item.editable}
          />
          <Card margin="bottom">
            <Text title="Reminders" />
          </Card>
          <Card margin="bottom">
            <Text title="Tags" />
          </Card>
          <Card margin="bottom">
            <Text title="Comments" />
          </Card>
          <ItemContext
            createdAt={item.createdAt}
            type={item.type}
            updatedAt={item.updatedAt}
            userId={item.userId}
          />
          {item.editable ? (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Card flex>
                <Button
                  center
                  onPress={goBack}
                  title="close"
                />
              </Card>
              <View style={{ padding: spacing(2) }} />
              <Card flex>
                <Button
                  center
                  color="negative"
                  onPress={onDeletePress}
                  title="delete"
                />
              </Card>
            </View>
          ) : (
            <Card flex>
              <Button
                center
                onPress={goBack}
                title="close"
              />
            </Card>
          )}
        </View>
      </Modal>
      {deleteModal ? (
        <DeleteModal
          onCancel={onDeleteClose}
          onDelete={onItemDelete}
        />
      ) : null}
    </>
  );
});
