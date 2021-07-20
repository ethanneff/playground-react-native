import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Button, Carousel, Screen} from '../../../components';
import {Slide} from '../../../components/Carousel/types';
import {useColor} from '../../../hooks';

export const Landing = memo(function PortfolioLanding() {
  const {navigate, goBack} = useNavigation();
  const color = useColor();
  const navPortfolioLogin = useCallback(() => navigate('login'), [navigate]);
  const navBack = useCallback(() => goBack(), [goBack]);

  const slides: Slide[] = [
    {id: '1', title: 'hello', backgroundColor: color.background.accent},
    {id: '2', title: 'bob', backgroundColor: color.background.warning},
    {id: '3', title: 'steve', backgroundColor: color.background.positive},
    {id: '4', title: 'jill', backgroundColor: color.background.negative},
  ];

  return (
    <Screen onLeftPress={navBack} title="Landing">
      <Carousel slides={slides} />
      <Button center onPress={navPortfolioLogin} title="Login" />
    </Screen>
  );
});
