import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Button, Carousel, Screen} from '../../../../components';
import {Slide} from '../../../../components/Carousel/types';
import {useColor} from '../../../../hooks';

export const Landing = memo(function Landing() {
  const {navigate} = useNavigation();
  const color = useColor();
  const navPortfolioLogin = useCallback(() => navigate('account'), [navigate]);

  const slides: Slide[] = [
    {id: '1', text: 'hello', color: color.info},
    {id: '2', text: 'bob', color: color.warning},
    {id: '3', text: 'steve', color: color.success},
    {id: '4', text: 'jill', color: color.brand},
  ];

  return (
    <Screen title="Landing">
      <Carousel slides={slides} />
      <Button center onPress={navPortfolioLogin} title="Login" />
    </Screen>
  );
});
