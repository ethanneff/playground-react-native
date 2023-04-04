import React from 'react';
import { Card, Icon, Text, TouchableOpacity, View } from '../../components';
import { spacing } from '../../features';
import { DailyProgress } from './DailyProgress';
import { ProfileLevel } from './ProfileLevel';

type Props = {
  onProfilePress: () => void;
  onSettingsPress: () => void;
};

export const Header = ({ onProfilePress, onSettingsPress }: Props) => (
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
