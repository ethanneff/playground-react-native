import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useRef, useState} from 'react';
import {FlatList, ScrollView} from 'react-native';
import {Screen} from '../../../../components';
import {KeyboardSpacer} from '../../../../conversions';
import {useColor} from '../../../../hooks';
import {getSmallestDimension} from '../../../../models';
import {Theme, useRootSelector} from '../../../../utils';
import {AddItem} from './AddItem';
import {List} from './List';
import {ListObject} from './types';

// TODO: add landing page (actionables + record)
// TODO: create data layer

// TODO: fix keyboard scrolling

// TODO: figure out max height for list (not 500)
// TODO: figure out centering of list

export const Project = memo(function Project() {
  const [lists, setLists] = useState<ListObject[]>([
    {
      id: '1',
      name: 'Backlog',
      items: [
        {
          id: '11',
          name: 'clean desk',
        },
        {
          id: '22',
          name: 'clean room',
        },
        {
          id: '33',
          name: 'brush teeth',
        },
      ],
    },
    {
      id: '2',
      name: 'Todo',
      items: [],
    },
    {
      id: '3',
      name: 'In Progress',
      items: [],
    },
    {
      id: '4',
      name: 'Done',
      items: [],
    },
  ]);
  const {goBack} = useNavigation();
  const color = useColor();
  const width = useRootSelector(getSmallestDimension);
  const listWidth = width * 0.7;
  const padding = Theme.padding.p04;
  const listSize = listWidth + padding;
  const borderRadius = Theme.padding.p02;
  const listsRef = useRef<FlatList | null>(null);
  const listsCount = useRef(lists.length);

  const getItemId = useCallback((item) => item.id, []);

  const addList = useCallback((name: string) => {
    const date = String(Date.now());
    setLists((p) => [...p, {id: date, name, items: []}]);
  }, []);

  const renderList = useCallback(
    ({item}) => {
      return (
        <List
          borderRadius={borderRadius}
          cardColor={color.surface}
          key={item.id}
          list={item}
          listColor={color.background}
          listWidth={listWidth}
          maxHeight={500}
          padding={padding}
        />
      );
    },
    [borderRadius, color.surface, color.background, listWidth, padding],
  );

  const renderAddList = useCallback(() => {
    return (
      <AddItem
        backgroundColor={color.background}
        borderRadius={borderRadius}
        buttonTitle="Add List"
        inputPlaceholder="List title..."
        inputType="h4"
        itemWidth={listWidth}
        onAdd={addList}
        padding={padding}
      />
    );
  }, [addList, borderRadius, color.background, listWidth, padding]);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: listSize,
      offset: listSize * index,
      index,
    }),
    [listSize],
  );

  const onListSizeChange = useCallback(() => {
    if (lists.length > listsCount.current) {
      listsRef.current?.scrollToIndex({
        index: lists.length - 1,
        viewPosition: 0.5,
      });
      listsCount.current = lists.length;
    }
  }, [listsRef, lists, listsCount]);

  const navBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <Screen onLeftPress={navBack} title="Focus">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{backgroundColor: color.surface}}>
        <FlatList
          ListFooterComponent={renderAddList} // TODO: make default FlatList with this setting
          contentContainerStyle={{padding}}
          data={lists}
          decelerationRate="fast"
          getItemLayout={getItemLayout}
          horizontal
          keyExtractor={getItemId}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={onListSizeChange}
          ref={listsRef}
          renderItem={renderList}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          snapToInterval={listSize}
          style={{backgroundColor: color.surface}}
        />
        <KeyboardSpacer />
      </ScrollView>
    </Screen>
  );
});
