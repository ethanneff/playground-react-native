import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Keyboard, View} from 'react-native';
import {useColor} from '../../../hooks';
import {useRootDispatch, useRootSelector} from '../../../utils';
import {setActiveBoard, setActiveList, updateListTitle} from '../models';
import {TextInputWithIcons} from './TextInputWithIcons';

type ListHeaderProps = {
  listId: string;
  boardId: string;
};

export const ListHeader = memo(function ListHeader({
  listId,
  boardId,
}: ListHeaderProps) {
  const dispatch = useRootDispatch();
  const {navigate} = useNavigation();
  const color = useColor();
  const list = useRootSelector((s) => s.completeList.items[listId]);

  const onSave = useCallback(
    (title) => {
      dispatch(updateListTitle({listId, title}));
      Keyboard.dismiss();
    },
    [dispatch, listId],
  );

  const onDetail = useCallback(() => {
    dispatch(setActiveBoard(boardId));
    dispatch(setActiveList(listId));
    navigate('list-detail');
  }, [boardId, dispatch, listId, navigate]);

  const onClose = useCallback(() => Keyboard.dismiss(), []);

  const icons = [
    {name: 'close', onPress: onClose, focus: true},
    {
      name: 'send',
      onPress: onSave,
      color: color.primary,
      focus: true,
      required: true,
    },
    {name: 'dots-horizontal', onPress: onDetail},
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TextInputWithIcons
        editable={!list.default}
        icons={icons}
        onSubmit={onSave}
        placeholder="List title..."
        type="h4"
        value={list.title}
      />
    </View>
  );
});
