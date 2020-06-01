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
      paddingHorizontal: Theme.padding.p04,
      paddingBottom: Theme.padding.p04,
    },
  });

  const renderItem = useCallback(({item, index}) => {
    const data = app.goals.byId[item];
    return (
      <Card
        key={data.id}
        flex
        onPress={() => undefined}
        style={{marginHorizontal: Theme.padding.p02}}>
        <Text
          title={`Challenge #${index + 1}`}
          center
          type="h4"
          bold
          style={{paddingBottom: Theme.padding.p04}}
        />
        <Text title={data.challenge} center />
      </Card>
    );
  }, []);

  const renderHeader = useCallback(
    () => (
      <View>
        <Text
          title="Progress"
          type="h3"
          style={{padding: Theme.padding.p04}}
          center
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
          title="Challenges"
          type="h3"
          style={{padding: Theme.padding.p04}}
          center
        />
      </View>
    ),
    [onProfilePress, onSettingsPress],
  );

  return (
    <FlatList
      contentContainerStyle={styles.list}
      keyExtractor={keyExtractor}
      key={columns}
      data={app.goals.orderById}
      renderItem={renderItem}
      numColumns={columns}
      ListHeaderComponent={renderHeader}
    />
  );
});
