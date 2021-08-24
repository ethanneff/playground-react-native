import React, {memo, useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Button,
  Card,
  Icon,
  Screen,
  Text,
  TouchableOpacity,
} from '../../components';
import {ScrollView} from '../../conversions';
import {LoginFlow, padding, useAdminNavBack, useColor} from '../../features';

// const

// Notification.show()
// Alert.show()
// ShareSheet.show()
// Badge.show()
// Badge.show()
// Badge.show()

export const Home = memo(function Checklists() {
  const color = useColor();
  const {onLeftPress} = useAdminNavBack();
  const styles = StyleSheet.create({
    bottom: {
      paddingBottom: padding(4),
    },
  });
  const [showLogin, setShowLogin] = useState(false);
  const onToggleLogin = useCallback(() => setShowLogin(prev => !prev), []);

  return (
    <>
      <Screen onLeftPress={onLeftPress} title="Checklists">
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: padding(4),
            paddingVertical: padding(2),
          }}
          style={{backgroundColor: color.background.secondary}}>
          <Card>
            <Text
              emphasis="medium"
              style={styles.bottom}
              title="Weekly Goals"
              type="h4"
            />
            <Text title="1. complete learn plan profit" type="caption" />
            <Text title="2. ship checklist" type="caption" />
            <Text title="3. complete 30 leetcode" type="caption" />
          </Card>
          <Card>
            <Text
              emphasis="medium"
              style={styles.bottom}
              title="Daily Habits and Routines"
              type="h4"
            />
            <Text title="After I wake up" type="caption" />
            <Text title="After I shower" type="caption" />
            <Text title="Before I one on one" type="caption" />
            <Text title="Before I get on the train" type="caption" />
          </Card>
          <Button onPress={onToggleLogin} title="showLogin" />
        </ScrollView>
        <TouchableOpacity
          onPress={onToggleLogin}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            margin: padding(4),
          }}>
          <Icon color="primaryB" fab name="plus" />
        </TouchableOpacity>
      </Screen>
      {showLogin && <LoginFlow onBackgroundPress={onToggleLogin} />}
    </>
  );
});
