import React, { memo, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Card,
  Icon,
  Screen,
  ScrollView,
  Text,
  TouchableOpacity,
} from '../../components';
import { LoginFlow, spacing, useAdminNavBack, useColors } from '../../features';

// Notification.show()
// Alert.show()
// ShareSheet.show()
// Badge.show()
// Badge.show()
// Badge.show()

export const Home = memo(function Checklists() {
  const colors = useColors();
  const { onLeftPress } = useAdminNavBack();
  const styles = StyleSheet.create({
    bottom: {
      paddingBottom: spacing(4),
    },
  });
  const [showLogin, setShowLogin] = useState(false);
  const onToggleLogin = useCallback(() => {
    setShowLogin((prev) => !prev);
  }, []);

  return (
    <>
      <Screen
        onLeftPress={onLeftPress}
        title="Checklists"
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: spacing(4),
            paddingVertical: spacing(2),
          }}
          style={{ backgroundColor: colors.background.secondary }}
        >
          <Card>
            <Text
              emphasis="medium"
              style={styles.bottom}
              title="Weekly Goals"
              type="h4"
            />
            <Text
              title="1. complete learn plan profit"
              type="caption"
            />
            <Text
              title="2. ship checklist"
              type="caption"
            />
            <Text
              title="3. complete 30 leetcode"
              type="caption"
            />
          </Card>
          <Card>
            <Text
              emphasis="medium"
              style={styles.bottom}
              title="Daily Habits and Routines"
              type="h4"
            />
            <Text
              title="After I wake up"
              type="caption"
            />
            <Text
              title="After I shower"
              type="caption"
            />
            <Text
              title="Before I one on one"
              type="caption"
            />
            <Text
              title="Before I get on the train"
              type="caption"
            />
          </Card>
          <Button
            onPress={onToggleLogin}
            title="showLogin"
          />
        </ScrollView>
        <TouchableOpacity
          onPress={onToggleLogin}
          style={{
            bottom: 0,
            margin: spacing(4),
            position: 'absolute',
            right: 0,
          }}
        >
          <Icon
            color="primaryB"
            fab
            name="plus"
          />
        </TouchableOpacity>
      </Screen>
      {showLogin ? <LoginFlow onBackgroundPress={onToggleLogin} /> : null}
    </>
  );
});
