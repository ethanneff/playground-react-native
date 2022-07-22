import Lottie from 'lottie-react-native';
import React, { memo, useCallback } from 'react';
import { Button, Screen, Spacing, Text, Toast, View } from '~components';
import { Firebase } from '~conversions';
import {
  getLandscapeOrientation,
  getSmallestDimension,
  useRootSelector,
} from '~redux';

export const Landing = memo(function Landing() {
  const width = useRootSelector(getSmallestDimension);
  const landscape = useRootSelector(getLandscapeOrientation);
  const imageSize = width * 0.5;
  const extraBottomPadding = landscape ? 0 : width / 20;

  const handleSubmit = useCallback(async () => {
    try {
      await Firebase.auth().signInAnonymously();
    } catch (e) {
      Toast.show({
        type: 'accent',
        props: {
          title: 'bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d70',
          description: 'bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d70',
        },
      });
      Firebase.crashlytics().log('unable to sign in anonymously');
    }
  }, []);

  return (
    <Screen>
      <View flex>
        <View
          center
          flex
          row={landscape}
        >
          <View flex={landscape}>
            <Lottie
              autoPlay
              loop
              source={require('./trophy.json')}
              speed={0.75}
              style={{
                width: imageSize,
                height: imageSize,
                alignSelf: 'center',
              }}
            />
          </View>
          <View
            center
            flex={landscape}
          >
            <Text
              center
              title="Progression"
              type="h3"
            />
            <Spacing padding={2} />
            <Text
              center
              title="Improve your habits. Hit your goals."
              type="h5"
            />
            <Spacing padding={extraBottomPadding} />
          </View>
        </View>
      </View>
      <Spacing padding={4}>
        <Button
          center
          color="accent"
          emphasis="high"
          onPress={handleSubmit}
          title="Get Started"
        />
        <Spacing padding={2} />
        <Button
          center
          color="secondary"
          emphasis="medium"
          onPress={handleSubmit}
          title="I already have an account"
        />
      </Spacing>
    </Screen>
  );
});
