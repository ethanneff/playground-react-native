import React, { memo, useCallback } from 'react';
import { ListRenderItem, StyleSheet } from 'react-native';
import {
  Card,
  FlatList,
  Icon,
  Text,
  TouchableOpacity,
  View,
} from '../../components';
import { spacing, useColors } from '../../features';
import { getLandscapeOrientation, useRootSelector } from '../../redux';
import { DailyProgress } from './DailyProgress';
import { app } from './data';
import { ProfileLevel } from './ProfileLevel';

type Props = {
  onProfilePress(): void;
  onSettingsPress(): void;
};

export const List = memo(function List({
  onProfilePress,
  onSettingsPress,
}: Props) {
  const colors = useColors();
  const landscape = useRootSelector(getLandscapeOrientation);
  const columns = landscape ? 4 : 2;

  const keyExtractor = useCallback((id: string) => app.goals.byId[id].id, []);

  const styles = StyleSheet.create({
    list: {
      paddingBottom: spacing(2),
      paddingHorizontal: spacing(4),
    },
  });

  const onPress = useCallback(() => undefined, []);

  const renderItem = useCallback<ListRenderItem<string>>(
    ({ index, item }) => {
      const data = app.goals.byId[item];
      return (
        <View
          style={{
            flex: 1,
            marginLeft: index % 2 === 0 ? 0 : spacing(2),
            marginRight: index % 2 === 0 ? spacing(2) : 0,
          }}
        >
          <Card
            key={data.id}
            onPress={onPress}
          >
            <Text
              bold
              center
              style={{ paddingBottom: spacing(4) }}
              title={`Challenge #${index + 1}`}
              type="subtitle1"
            />
            <Text
              center
              title={data.challenge}
            />
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
          style={{ padding: spacing(4) }}
          title="Progress"
          type="h4"
        />
        <Card>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: spacing(2),
            }}
          >
            <ProfileLevel onPress={onProfilePress} />
            <TouchableOpacity onPress={onSettingsPress}>
              <Icon name="cog" />
            </TouchableOpacity>
          </View>
          <DailyProgress />
        </Card>
        <Text
          center
          style={{ padding: spacing(4) }}
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
      style={{ backgroundColor: colors.background.secondary }}
    />
  );
});
