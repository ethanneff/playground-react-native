import React, { useCallback } from 'react';
import { Button, Card, Carousel, Screen, View } from '../../../../components';
import {
  type StackNavigationProperty,
  useNavigation,
} from '../../../../conversions';
import { spacing } from '../../../../features';
import { type UnAuthStackRoutes } from '../../types';
import { slides } from './slides';

export const Landing = () => {
  const { navigate } =
    useNavigation<StackNavigationProperty<UnAuthStackRoutes, 'landing'>>();

  const handleSignIn = useCallback(() => {
    navigate('sign-in');
  }, [navigate]);

  return (
    <Screen
      dropShadow
      title="Landing"
    >
      <View
        backgroundColor="secondary"
        flex={1}
        gap={spacing(4)}
        padding={spacing(4)}
      >
        <Card>
          <View
            flex={1}
            gap={spacing(4)}
            padding={spacing(4)}
          >
            <Carousel
              duration={6000}
              slides={slides}
            />
            <Button
              center
              color="accent"
              emphasis="high"
              onPress={handleSignIn}
              title="get started"
            />
          </View>
        </Card>
      </View>
    </Screen>
  );
};
