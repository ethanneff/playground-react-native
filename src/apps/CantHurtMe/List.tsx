import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {memo} from 'react';
import {useColor} from '../../hooks';
import {Theme, useRootSelector} from '../../utils';
import {getLandscapeOrientation} from '../../models';
import {Card, Icon, Text} from '../../components';
import {app} from './data';
import {DailyProgress} from './DailyProgress';
import {ProfileLevel} from './ProfileLevel';

interface Props {
  onProfilePress(): void;
  onSettingsPress(): void;
}

export const List = memo(function List({
  onProfilePress,
  onSettingsPress,
}: Props) {
  const color = useColor();
  const landscape = useRootSelector(getLandscapeOrientation);
  const columns = landscape ? 4 : 2;

  const keyExtractor = (id: string) => app.goals.byId[id].id;

  const styles = StyleSheet.create({
    list: {
      backgroundColor: color.surface,
      paddingBottom: Theme.padding.p04,
      paddingHorizontal: Theme.padding.p04,
    },
  });

  const onPress = () => undefined;

  const renderItem = useCallback(({item, index}) => {
    const data = app.goals.byId[item];
    return (
      <Card
        flex
        key={data.id}
        onPress={onPress}
        style={{marginHorizontal: Theme.padding.p02}}>
        <Text
          bold
          center
          style={{paddingBottom: Theme.padding.p04}}
          title={`Challenge #${index + 1}`}
          type="h4"
        />
        <Text center title={data.challenge} />
      </Card>
    );
  }, []);

  const renderHeader = useCallback(
    () => (
      <View>
        <Text
          center
          style={{padding: Theme.padding.p04}}
          title="Progress"
          type="h3"
        />
        <Card>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <ProfileLevel onPress={onProfilePress} />
            <Icon name="settings" onPress={onSettingsPress} />
          </View>
          <DailyProgress />
        </Card>
        <Text
          center
          style={{padding: Theme.padding.p04}}
          title="Challenges"
          type="h3"
        />
      </View>
    ),
    [onProfilePress, onSettingsPress],
  );

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={app.goals.orderById}
      key={columns}
      keyExtractor={keyExtractor}
      ListHeaderComponent={renderHeader}
      numColumns={columns}
      renderItem={renderItem}
    />
  );
});
