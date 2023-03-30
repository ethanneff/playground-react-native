import React, { useCallback } from 'react';
import { Platform } from 'react-native';
import { Spacing, Text, TextGroup, View } from '../../../../components';
import {
  useNavigation,
  type StackNavigationProp,
} from '../../../../conversions';
import { spacing } from '../../../../features';
import { getLandscapeOrientation, useRootSelector } from '../../../../redux';
import { type UnAuthStackRoutes } from '../../types';
import { SocialButton } from './SocialButton';

type Props = {
  disabled: boolean;
};

export const SocialAuth = ({ disabled }: Props) => {
  const handleMissingCallback = useCallback(() => null, []);
  const landscape = useRootSelector(getLandscapeOrientation);

  const { navigate } =
    useNavigation<StackNavigationProp<UnAuthStackRoutes, 'sign-up'>>();

  const handleTerms = useCallback(() => {
    navigate('terms');
  }, [navigate]);

  const handlePrivacy = useCallback(() => {
    navigate('privacy');
  }, [navigate]);

  return (
    <View
      style={{
        paddingHorizontal: spacing(landscape ? 0 : 8),
        paddingTop: spacing(landscape ? 8 : 0),
        paddingVertical: spacing(landscape ? 0 : 4),
      }}
    >
      <Spacing padding={2} />
      <SocialButton
        disabled={disabled}
        icon="google"
        onPress={handleMissingCallback}
        title="Sign Up with Google"
      />
      <Spacing padding={2} />
      <SocialButton
        disabled={disabled}
        icon="facebook"
        onPress={handleMissingCallback}
        title="Sign Up with Facebook"
      />
      {Platform.OS === 'ios' && (
        <>
          <Spacing padding={2} />
          <SocialButton
            disabled={disabled}
            icon="apple"
            onPress={handleMissingCallback}
            title="Sign Up with Apple"
          />
        </>
      )}
      <Spacing padding={2} />
      <TextGroup style={{ textAlign: 'center' }}>
        <Text
          emphasis="medium"
          title="By signing in to Progression, you agree to our "
        />
        <Text
          color="accent"
          onPress={handleTerms}
          title="Terms"
        />
        <Text
          emphasis="medium"
          title=" and "
        />
        <Text
          color="accent"
          onPress={handlePrivacy}
          title="Privacy Policy"
        />
        <Text
          emphasis="medium"
          title="."
        />
      </TextGroup>
    </View>
  );
};
