import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Screen} from '../../../../components';
import {useColor} from '../../../../hooks';
import {AddItem} from '../../components/AddItem';
import {List} from '../../components/List';
import {config} from '../../configs';
import {ListObject} from '../../types';

// TODO: add journal
// TODO: add historical data
// TODO: add purpose
// TODO: add goals

export const Projects = memo(function Projects() {
  const color = useColor();
  const {navigate} = useNavigation();

  const navNext = useCallback(() => {
    navigate('Project');
  }, [navigate]);

  const [groups, setGroups] = useState<ListObject[]>([
    {
      id: '1',
      title: 'Actionables',
      items: [
        {id: '1', title: 'home'},
        {id: '2', title: 'work'},
        {id: '3', title: 'gym'},
        {id: '4', title: 'groceries'},
        {id: '5', title: 'gifts'},
      ],
    },
    {
      id: '2',
      title: 'Storage',
      items: [
        {id: '1', title: 'gift ideas'},
        {id: '2', title: 'checklists'},
        {id: '3', title: 'book summaries'},
        {id: '4', title: 'meeting notes'},
        {id: '5', title: 'receipts'},
      ],
    },
  ]);

  const renderGroup = useCallback(
    ({item}) => {
      return (
        <List
          addButtonPlaceholder="Project title..."
          addButtonTitle="Add project"
          borderRadius={config.borderRadius}
          itemColor={color.surface}
          key={item.id}
          list={item}
          listColor={color.background}
          padding={config.padding}
        />
      );
    },
    [color.background, color.surface],
  );

  const onAddGroup = useCallback((title: string) => {
    const date = Date.now().toString();
    setGroups((p) => [...p, {id: date, title, items: []}]);
  }, []);

  const renderFooter = useCallback(() => {
    return (
      <AddItem
        backgroundColor={color.background}
        borderRadius={config.borderRadius}
        buttonTitle="Add group"
        inputPlaceholder="Group title..."
        inputType="h4"
        onAdd={onAddGroup}
      />
    );
  }, [color.background, onAddGroup]);

  return (
    <Screen onRightPress={navNext} title="Projects">
      <View
        style={{
          flex: 1,
          backgroundColor: color.surface,
        }}>
        <FlatList
          ListFooterComponent={renderFooter}
          contentContainerStyle={{padding: config.padding}}
          data={groups}
          keyboardShouldPersistTaps="handled"
          renderItem={renderGroup}
        />
      </View>
    </Screen>
  );
});
