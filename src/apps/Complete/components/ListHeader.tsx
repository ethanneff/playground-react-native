import React, {memo, useCallback} from 'react';
import {Keyboard, View} from 'react-native';
import {useColor} from '../../../hooks';
import {useRootDispatch, useRootSelector} from '../../../utils';
import {updateListTitle} from '../models';
import {TextInputWithIcons} from './TextInputWithIcons';

type ListHeaderProps = {
  listId: string;
};

export const ListHeader = memo(function ListHeader({listId}: ListHeaderProps) {
  const dispatch = useRootDispatch();
  const color = useColor();
  const listTitle = useRootSelector((s) => s.completeList.items[listId].title);

  const onSave = useCallback(
    (title) => {
      dispatch(updateListTitle({listId, title}));
      Keyboard.dismiss();
    },
    [dispatch, listId],
  );

  const onDetail = useCallback(() => undefined, []);

  const onClose = useCallback(() => Keyboard.dismiss(), []);

  const icons = [
    {name: 'close', onPress: onClose, focus: true},
    {name: 'send', onPress: onSave, color: color.primary, focus: true},
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
        icons={icons}
        onSubmit={onSave}
        placeholder="List title..."
        type="h4"
        value={listTitle}
      />
    </View>
  );
});
