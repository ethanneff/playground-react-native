import React, { memo } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Card, Screen, Text } from '../../../../components';
import { padding, useColor } from '../../../../features';

export const Profile = memo(function Profile() {
  const color = useColor();

  return (
    <Screen dropShadow title="Profile">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: padding(4),
          paddingVertical: padding(2),
        }}
        style={{ backgroundColor: color.background.secondary }}
      >
        <Card>
          <Text
            emphasis="medium"
            style={{ paddingBottom: padding(2) }}
            title="Profile"
            type="h4"
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text title="avatar" />
            <View>
              <Text title="name" />
              <Text title="email" />
            </View>
          </View>
          <Button color="accent" title="upgrade to premium" />
          <Button title="reset password" />
          <Button title="delete account" />
          <Button title="restore transactions" />
          <Button title="log out" />
        </Card>

        <Card>
          <Text
            emphasis="medium"
            style={{ paddingBottom: padding(2) }}
            title="Preferences"
            type="h4"
          />
          <Button title="intervals" />
          <Button title="notifications" />
          <Button title="theme" />
        </Card>

        <Card>
          <Text
            emphasis="medium"
            style={{ paddingBottom: padding(2) }}
            title="App"
            type="h4"
          />
          <Button title="support" />
          <Button title="feedback" />
          <Button title="about" />
          <Button title="terms of use" />
          <Button title="privacy policy" />
        </Card>
      </ScrollView>
    </Screen>
  );
});
