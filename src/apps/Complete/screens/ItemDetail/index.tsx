import React, { useCallback, useState } from 'react';
import { Keyboard } from 'react-native';
import {
  Button,
  Card,
  Modal,
  RelativeDate,
  Spacing,
  Text,
  View,
} from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { spacing, useColors } from '../../../../features';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import { DeleteModal, ItemDetailHeader, ItemEdit } from '../../components';
import { removeItem, removeItemFromItem, updateItem } from '../../models';

export const ItemDetail = () => {
  const dispatch = useAppDispatch();
  const { goBack } = useNavigation();
  const colors = useColors();
  const { itemId, parentItemId } = useAppSelector((s) => s.complete.item.nav);
  if (!itemId || !parentItemId)
    throw new Error('missing listId or itemId on item detail screen');
  const item = useAppSelector((s) => s.complete.item.items[itemId]);
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

  const onDeletePress = useCallback(() => {
    setDeleteModal(true);
  }, []);
  const onDeleteClose = useCallback(() => {
    setDeleteModal(false);
  }, []);

  return (
    <>
      <Modal
        backgroundColor={colors.background.secondary}
        onBackgroundPress={goBack}
        showOverlay
      >
        <View style={{ gap: spacing(4) }}>
          <ItemEdit
            description={item.description}
            onSubmit={onItemSubmit}
            placeholder="Item"
            title={item.title}
            titleEditable={item.editable}
          />
          <Card>
            <View padding={spacing(2)}>
              <ItemDetailHeader title="Reminders" />
              <Text
                style={{ padding: spacing(2) }}
                title={item.tags.join(', ')}
              />
              <Spacing padding={spacing(2)} />
              <ItemDetailHeader title="Tags" />
              <Text
                style={{ padding: spacing(2) }}
                title={item.tags.join(', ')}
              />
              <Spacing padding={spacing(2)} />
              <ItemDetailHeader title="Comments" />
              <Text
                style={{ padding: spacing(2) }}
                title={item.tags.join(', ')}
              />
            </View>
          </Card>
          <Card>
            <View padding={spacing(2)}>
              <ItemDetailHeader title="Type" />
              <Text
                style={{ padding: spacing(2) }}
                title={item.type}
              />
              <Spacing padding={spacing(2)} />
              <ItemDetailHeader title="Creator" />
              <Text
                style={{ padding: spacing(2) }}
                title={item.userId}
              />
              <Spacing padding={spacing(2)} />
              <ItemDetailHeader title="Created" />
              <RelativeDate
                date={item.createdAt}
                style={{ padding: spacing(2) }}
              />
              <Spacing padding={spacing(2)} />
              <ItemDetailHeader title="Updated" />
              <RelativeDate
                date={item.updatedAt}
                style={{ padding: spacing(2) }}
              />
            </View>
          </Card>
          {item.editable ? (
            <View
              flex={1}
              flexDirection="row"
              gap={spacing(4)}
              justifyContent="space-between"
            >
              <Button
                dropShadow
                emphasis="high"
                onPress={goBack}
                title="close"
              />
              <Button
                color="negative"
                dropShadow
                emphasis="high"
                onPress={onDeletePress}
                title="delete"
              />
              <Button
                color="accent"
                dropShadow
                emphasis="high"
                onPress={goBack}
                title="save"
              />
            </View>
          ) : (
            <Card>
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
};
