import React, { useCallback } from 'react';
import {
  Button,
  Carousel,
  Screen,
  type CarouselSlide,
} from '../../../components';
import { useNavigation } from '../../../conversions';
import { useColors } from '../../../features';
import { type PortfolioNavigation } from '../types';

export const Landing = () => {
  const { goBack, navigate } = useNavigation<PortfolioNavigation>();
  const colors = useColors();
  const navPortfolioLogin = useCallback(() => {
    navigate('login');
  }, [navigate]);

  const slides: CarouselSlide[] = [
    { backgroundColor: colors.background.accent, id: '1', title: 'hello' },
    { backgroundColor: colors.background.warning, id: '2', title: 'bob' },
    { backgroundColor: colors.background.positive, id: '3', title: 'steve' },
    { backgroundColor: colors.background.negative, id: '4', title: 'jill' },
  ];
  return (
    <Screen
      onLeftPress={goBack}
      title="Landing"
    >
      <Carousel
        duration={2000}
        slides={slides}
      />
      <Button
        center
        onPress={navPortfolioLogin}
        title="Login"
      />
    </Screen>
  );
};
