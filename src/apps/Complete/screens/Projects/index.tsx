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
      name: 'Actionables',
      items: [
        {id: '1', name: 'home'},
        {id: '2', name: 'work'},
        {id: '3', name: 'gym'},
        {id: '4', name: 'groceries'},
        {id: '5', name: 'gifts'},
      ],
    },
    {
      id: '2',
      name: 'Storage',
      items: [
        {id: '1', name: 'gift ideas'},
        {id: '2', name: 'checklists'},
        {id: '3', name: 'book summaries'},
        {id: '4', name: 'meeting notes'},
        {id: '5', name: 'receipts'},
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

  const onAddGroup = useCallback((name: string) => {
    const date = Date.now().toString();
    setGroups((p) => [...p, {id: date, name, items: []}]);
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
