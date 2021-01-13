import React, {memo, useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Card, Icon, Text} from '../../components';
import {useColor} from '../../hooks';
import {getLandscapeOrientation} from '../../models';
import {Config, useRootSelector} from '../../utils';
import {DailyProgress} from './DailyProgress';
import {app} from './data';
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

  const keyExtractor = useCallback((id: string) => app.goals.byId[id].id, []);

  const styles = StyleSheet.create({
    list: {
      paddingBottom: Config.padding(2),
      paddingHorizontal: Config.padding(4),
    },
  });

  const onPress = useCallback(() => undefined, []);

  const renderItem = useCallback(
    ({item, index}) => {
      const data = app.goals.byId[item];
      return (
        <View
          style={{
            flex: 1,
            marginRight: index % 2 === 0 ? Config.padding(2) : 0,
            marginLeft: index % 2 !== 0 ? Config.padding(2) : 0,
          }}>
          <Card key={data.id} onPress={onPress} style={{}}>
            <Text
              bold
              center
              style={{paddingBottom: Config.padding(4)}}
              title={`Challenge #${index + 1}`}
              type="subtitle1"
            />
            <Text center title={data.challenge} />
          </Card>
        </View>
      );
    },
    [onPress],
  );

  const renderHeader = useCallback(
    () => (
      <View>
        <Text
          center
          style={{padding: Config.padding(4)}}
          title="Progress"
          type="h4"
        />
        <Card>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: Config.padding(2),
            }}>
            <ProfileLevel onPress={onProfilePress} />
            <Icon name="cog" onPress={onSettingsPress} />
          </View>
          <DailyProgress />
        </Card>
        <Text
          center
          style={{padding: Config.padding(4)}}
          title="Challenges"
          type="h4"
        />
      </View>
    ),
    [onProfilePress, onSettingsPress],
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.list}
      data={app.goals.orderById}
      key={columns}
      keyExtractor={keyExtractor}
      keyboardShouldPersistTaps="handled"
      numColumns={columns}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: color.surface}}
    />
  );
});
