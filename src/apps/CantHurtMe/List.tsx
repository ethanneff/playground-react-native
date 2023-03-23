import React, { memo, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import {
  Card,
  Icon,
  MasonryFlatList,
  Spacing,
  Text,
  TouchableOpacity,
  View,
  type FlatListRenderItem,
} from '../../components';
import { spacing } from '../../features';
import { getLandscapeOrientation, useRootSelector } from '../../redux';
import { DailyProgress } from './DailyProgress';
import { app } from './data';
import { ProfileLevel } from './ProfileLevel';

type Props = {
  onProfilePress: () => void;
  onSettingsPress: () => void;
};

const Header = ({ onProfilePress, onSettingsPress }: Props) => (
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
);

export const List = memo(function List({
  onProfilePress,
  onSettingsPress,
}: Props) {
  const landscape = useRootSelector(getLandscapeOrientation);
  const columns = landscape ? 5 : 2;

  const keyExtractor = useCallback((id: string) => app.goals.byId[id].id, []);

  const styles = StyleSheet.create({
    list: {
      paddingBottom: spacing(2),
      paddingHorizontal: spacing(4),
    },
  });

  const onPress = useCallback(() => undefined, []);

  const renderItem = useCallback<FlatListRenderItem<string>>(
    ({ index, item }) => {
      const data = app.goals.byId[item];
      return (
        <View style={{ padding: spacing(2), paddingBottom: 0 }}>
          <Card onPress={onPress}>
            <Text
              bold
              center
              title={`#${index + 1}`}
              type="subtitle1"
            />
            <Spacing padding={1} />
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

  return (
    <View
      backgroundColor="secondary"
      flex={1}
    >
      <MasonryFlatList
        ListHeaderComponent={
          <Header
            onProfilePress={onProfilePress}
            onSettingsPress={onSettingsPress}
          />
        }
        contentContainerStyle={styles.list}
        data={app.goals.orderById}
        estimatedItemSize={20}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
        numColumns={columns}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});
