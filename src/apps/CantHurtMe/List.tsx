import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import {
  Card,
  MasonryFlashList,
  Spacing,
  Text,
  View,
  type FlashListRenderItem,
} from '../../components';
import { spacing } from '../../features';
import { getLandscapeOrientation, useAppSelector } from '../../redux';
import { Header } from './Header';
import { app } from './data';

type Properties = {
  readonly onProfilePress: () => void;
  readonly onSettingsPress: () => void;
};

export const List = ({ onProfilePress, onSettingsPress }: Properties) => {
  const landscape = useAppSelector(getLandscapeOrientation);
  const columns = landscape ? 5 : 2;

  const keyExtractor = useCallback((id: string) => app.goals.byId[id].id, []);

  const styles = StyleSheet.create({
    list: {
      paddingBottom: spacing(2),
      paddingHorizontal: spacing(4),
    },
  });

  const onPress = useCallback(() => false, []);

  const renderItem = useCallback<FlashListRenderItem<string>>(
    ({ index, item }) => {
      const data = app.goals.byId[item];
      return (
        <View padding={spacing(2)}>
          <Card onPress={onPress}>
            <Text
              bold
              center
              title={`#${index + 1}`}
              type="subtitle1"
            />
            <Spacing padding={spacing(1)} />
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
      <MasonryFlashList
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
        numColumns={columns}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
