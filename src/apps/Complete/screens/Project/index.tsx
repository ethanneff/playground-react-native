import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useRef, useState} from 'react';
import {FlatList, LayoutChangeEvent, View} from 'react-native';
import {Screen} from '../../../../components';
import {useColor} from '../../../../hooks';
import {getSmallestDimension} from '../../../../models';
import {useRootSelector} from '../../../../utils';
import {AddItem} from '../../components/AddItem';
import {List} from '../../components/List';
import {config} from '../../configs';
import {ListObject} from '../../types';

// TODO: add landing page (actionables + record)
// TODO: create data layer

// TODO: fix keyboard scrolling (keyboard aware + recycler view)

// TODO: figure out centering of list

export const Project = memo(function Project() {
  const [lists, setLists] = useState<ListObject[]>([
    {
      id: '1',
      title: 'Backlog',
      items: [
        {
          id: '11',
          title: 'clean desk',
        },
        {
          id: '22',
          title: 'clean room',
        },
        {
          id: '33',
          title: 'brush teeth',
        },
      ],
    },
    {
      id: '2',
      title: 'Todo',
      items: [],
    },
    {
      id: '3',
      title: 'In Progress',
      items: [],
    },
    {
      id: '4',
      title: 'Done',
      items: [],
    },
  ]);
  const {goBack} = useNavigation();
  const color = useColor();
  const screenWidth = useRootSelector(getSmallestDimension);
  const listWidth = screenWidth * 0.7;
  const listSize = listWidth + config.padding; // TODO: deal with marginRight and FlatList padding
  const listsRef = useRef<FlatList | null>(null);
  const listsCount = useRef(lists.length);
  const keyboardHeight = useRootSelector(
    (state) => state.device.keyboardHeight,
  );
  const [container, setContainer] = useState(0);
  const keyboardPadding = keyboardHeight
    ? config.padding * 8
    : config.padding * 13;
  const listMaxHeight = container - keyboardPadding - keyboardHeight;
  const getItemId = useCallback((item) => item.id, []);

  const addList = useCallback((title: string) => {
    const date = String(Date.now());
    setLists((p) => [...p, {id: date, title, items: []}]);
  }, []);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const {height} = event.nativeEvent.layout;
      if (container > 0) {
        return;
      }
      setContainer(height);
    },
    [container],
  );

  const renderList = useCallback(
    ({item}) => {
      return (
        <List
          addButtonPlaceholder="Card title..."
          addButtonTitle="Add card"
          borderRadius={config.borderRadius}
          itemColor={color.surface}
          key={item.id}
          list={item}
          listColor={color.background}
          listWidth={listWidth}
          maxHeight={listMaxHeight}
          orientation="horizontal"
          padding={config.padding}
        />
      );
    },
    [color.surface, color.background, listWidth, listMaxHeight],
  );

  const renderAddList = useCallback(() => {
    return (
      <AddItem
        backgroundColor={color.background}
        borderRadius={config.borderRadius}
        buttonTitle="Add List"
        inputPlaceholder="List title..."
        inputType="h4"
        itemWidth={listWidth}
        onAdd={addList}
      />
    );
  }, [addList, color.background, listWidth]);

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
  }, [lists.length]);

  const navBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <Screen onLeftPress={navBack} title="Focus">
      <View
        onLayout={onLayout}
        style={{flex: 1, backgroundColor: color.surface}}>
        {!container ? null : (
          <FlatList
            ListFooterComponent={renderAddList} // TODO: make default FlatList with this setting
            contentContainerStyle={{padding: config.padding}}
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
          />
        )}
      </View>
    </Screen>
  );
});
