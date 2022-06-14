import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import { Button, Carousel, Screen } from '../../../components';
import { CarouselSlide } from '../../../components/Carousel/types';
import { useColors } from '../../../features';
import { PortfolioNavigation } from '../types';

export const Landing = memo(function PortfolioLanding() {
  const { navigate, goBack } = useNavigation<PortfolioNavigation>();
  const colors = useColors();
  const navPortfolioLogin = useCallback(() => navigate('login'), [navigate]);

  const slides: CarouselSlide[] = [
    { id: '1', title: 'hello', backgroundColor: colors.background.accent },
    { id: '2', title: 'bob', backgroundColor: colors.background.warning },
    { id: '3', title: 'steve', backgroundColor: colors.background.positive },
    { id: '4', title: 'jill', backgroundColor: colors.background.negative },
  ];
  return (
    <Screen
      onLeftPress={goBack}
      title="Landing"
    >
      <Carousel slides={slides} />
      <Button
        center
        onPress={navPortfolioLogin}
        title="Login"
      />
    </Screen>
  );
});
