import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {Modal, Screen, Text} from '../../components';
import {List} from './List';
import {Item} from './types';

// TODO: flatlist on web
// TODO: rename item.action to item.title
// TODO: fix refresh scroll jitter
// TODO: re-rendering everything because dialog is same level as list

const infiniteScrollRegeneration = 100;
const editItem: {visible: boolean; item: Item | null} = {
  visible: false,
  item: null,
};

export const Home = memo(function Home() {
  const [modalItemEdit, setModalItemEdit] = useState(editItem);
  const [modalProfile] = useState(false);
  const [modalLogin] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const {goBack} = useNavigation();

  const generateMoreItems = useCallback(() => {
    const group = [...items];
    for (let i = 0; i < infiniteScrollRegeneration; i++) {
      const lastItem =
        group.length === 0
          ? dayjs().startOf('day').add(2, 'day').valueOf()
          : group[group.length - 1].id;
      const next = dayjs(lastItem).subtract(1, 'hour');
      const id = next.valueOf();
      group.push({
        action: String(Math.random()) + String(Math.random()),
        dayOfMonth: next.format('D'),
        dayOfWeek: next.format('ddd'),
        hour: next.format('h'),
        id,
        month: next.format('MMM'),
        zone: next.format('a'),
      });
    }
    setItems(group);
  }, [items]);

  const handleItemPress = useCallback((item: Item) => {
    setModalItemEdit({visible: true, item});
  }, []);

  const handleLoad = useCallback(() => {
    if (items.length > 0) return;

    generateMoreItems();
  }, [generateMoreItems, items.length]);

  const handleModalEditBackgroundPress = useCallback(() => {
    setModalItemEdit((state) => ({...state, visible: false}));
  }, []);

  useEffect(() => handleLoad(), [handleLoad]);

  const navBack = useCallback(() => goBack(), [goBack]);
  return (
    <>
      <Screen border onLeftPress={navBack} title="Focus">
        {items.length > 0 && (
          <List
            items={items}
            onEndReached={generateMoreItems}
            onEndReachedThreshold={0.5}
            onItemPress={handleItemPress}
          />
        )}
      </Screen>
      {modalItemEdit.visible && (
        <Modal
          duration={2000}
          onBackgroundPress={handleModalEditBackgroundPress}
          testID="editItem">
          <Text title={modalItemEdit.item?.action || 'empty'} />
        </Modal>
      )}
      {modalProfile && (
        <Modal
          onBackgroundPress={handleModalEditBackgroundPress}
          testID="editItem">
          <Text title="hello" />
        </Modal>
      )}
      {modalLogin && (
        <Modal
          onBackgroundPress={handleModalEditBackgroundPress}
          testID="login">
          <Text title="hello" />
        </Modal>
      )}
    </>
  );
});
