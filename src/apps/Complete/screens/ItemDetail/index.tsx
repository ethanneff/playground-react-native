import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {Button, Modal, Text, TextInput} from '../../../../components';
import {useColor} from '../../../../hooks';
import {Theme, useRootDispatch, useRootSelector} from '../../../../utils';
import {Card} from '../../components';
import {removeItem, updateItem, updateListRemoveItem} from '../../models';

// TODO: update does not go to previous screen
// TODO: delete does not go to previous screen
// TODO: delete needs confirmation alert

export const ItemDetail = memo(function ItemDetail() {
  const dispatch = useRootDispatch();
  const {goBack} = useNavigation();
  const color = useColor();
  const navBack = useCallback(() => goBack(), [goBack]);
  const itemId = useRootSelector((s) => s.completeItem.active);
  const listId = useRootSelector((s) => s.completeList.active);
  const item = useRootSelector((s) => s.completeItem.items[itemId || '']);

  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description || '');

  const onTitleChange = useCallback((v) => setTitle(v), []);
  const onDescriptionChange = useCallback((v) => setDescription(v), []);

  const onItemSave = useCallback(() => {
    dispatch(updateItem({...item, title, description}));
    Keyboard.dismiss();
  }, [description, dispatch, item, title]);

  const onItemDelete = useCallback(() => {
    if (!itemId || !listId)
      throw new Error('missing listId or itemId on item detail screen');
    dispatch(removeItem(itemId));
    dispatch(updateListRemoveItem({listId, itemId}));
  }, [dispatch, itemId, listId]);

  return !item ? null : (
    <Modal backgroundColor={color.surface} onBackgroundPress={navBack}>
      {!item ? (
        <View>
          <Text title="missing item" />
        </View>
      ) : (
        <View>
          <Card>
            <Text
              style={{paddingBottom: Theme.padding.p04}}
              title="Title"
              type="h3"
            />
            <TextInput
              emphasis="medium"
              flex
              onBlur={onItemSave}
              onChangeText={onTitleChange}
              placeholder="list name..."
              returnKeyType="done"
              type="h4"
              value={title}
            />
          </Card>
          <Card>
            <Text
              style={{paddingBottom: Theme.padding.p04}}
              title="Description"
              type="h3"
            />
            <TextInput
              emphasis="medium"
              flex
              onBlur={onItemSave}
              onChangeText={onDescriptionChange}
              placeholder="details..."
              returnKeyType="done"
              type="h4"
              value={description}
            />
          </Card>
          <Card>
            <Text
              style={{paddingBottom: Theme.padding.p04}}
              title="Reminders"
              type="h3"
            />
          </Card>
          <Card>
            <Button center onPress={onItemDelete} title="delete" />
          </Card>
        </View>
      )}
    </Modal>
  );
});
