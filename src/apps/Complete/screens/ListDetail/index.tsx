import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {Button, Modal, Text} from '../../../../components';
import {useColor} from '../../../../hooks';
import {useRootDispatch, useRootSelector} from '../../../../utils';
import {Card, DeleteModal, ItemEdit} from '../../components';
import {ItemContext} from '../../components/ItemContext';
import {removeList, updateBoardRemoveList, updateList} from '../../models';

export const ListDetail = memo(function ListDetail() {
  const dispatch = useRootDispatch();
  const {goBack} = useNavigation();
  const color = useColor();
  const navBack = useCallback(() => goBack(), [goBack]);
  const boardId = useRootSelector((s) => s.completeBoard.active);
  const listId = useRootSelector((s) => s.completeList.active);
  const list = useRootSelector((s) => s.completeList.items[listId || '']);
  const [deleteModal, setDeleteModal] = useState(false);
  if (!boardId || !listId)
    throw new Error('missing listId or boardId on list detail screen');

  const onListDelete = useCallback(() => {
    dispatch(removeList(listId));
    dispatch(updateBoardRemoveList({listId, boardId}));
    setDeleteModal(false);
    goBack();
  }, [boardId, dispatch, goBack, listId]);

  const onDeletePress = useCallback(() => setDeleteModal(true), []);
  const onDeleteClose = useCallback(() => setDeleteModal(false), []);

  const onListSubmit = useCallback(
    (type: string) => (text: string) => {
      dispatch(updateList({...list, [type]: text}));
      Keyboard.dismiss();
    },
    [dispatch, list],
  );

  return !list ? null : (
    <>
      <Modal backgroundColor={color.surface} onBackgroundPress={navBack}>
        {!list ? (
          <Text title="missing list" />
        ) : (
          <View>
            <ItemEdit
              description={list.description}
              onSubmit={onListSubmit}
              placeholder="List"
              title={list.title}
            />
            <ItemContext
              createdAt={list.createdAt}
              updatedAt={list.updatedAt}
              userId={list.userId}
            />
            {list.default ? null : (
              <Card>
                <Button
                  center
                  color="danger"
                  onPress={onDeletePress}
                  title="delete"
                />
              </Card>
            )}
          </View>
        )}
      </Modal>
      {!deleteModal ? null : (
        <DeleteModal onCancel={onDeleteClose} onDelete={onListDelete} />
      )}
    </>
  );
});
