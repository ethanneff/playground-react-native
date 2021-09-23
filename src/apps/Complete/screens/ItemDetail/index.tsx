import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { Button, Modal, Text } from '../../../../components';
import { padding, useColor } from '../../../../features';
import { useRootDispatch, useRootSelector } from '../../../../redux';
import { Card, DeleteModal, ItemContext, ItemEdit } from '../../components';
import { removeItem, removeItemFromItem, updateItem } from '../../models';

export const ItemDetail = memo(function ItemDetail() {
  const dispatch = useRootDispatch();
  const { goBack } = useNavigation();
  const color = useColor();

  const { itemId, parentItemId } = useRootSelector(s => s.completeItem.nav);
  const item = useRootSelector(s => s.completeItem.items[itemId || '']);
  const [deleteModal, setDeleteModal] = useState(false);

  const onItemDelete = useCallback(() => {
    if (!itemId || !parentItemId)
      throw new Error('missing listId or itemId on item detail screen');
    dispatch(removeItem(itemId));
    dispatch(removeItemFromItem({ parentItemId, itemId }));
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

  return !item ? null : (
    <>
      <Modal
        backgroundColor={color.background.secondary}
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
          {!item.editable ? (
            <Card flex>
              <Button center onPress={goBack} title="close" />
            </Card>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
              }}
            >
              <Card flex>
                <Button center onPress={goBack} title="close" />
              </Card>
              <View style={{ padding: padding(2) }} />
              <Card flex>
                <Button
                  center
                  color="negative"
                  onPress={onDeletePress}
                  title="delete"
                />
              </Card>
            </View>
          )}
        </View>
      </Modal>
      {!deleteModal ? null : (
        <DeleteModal onCancel={onDeleteClose} onDelete={onItemDelete} />
      )}
    </>
  );
});
