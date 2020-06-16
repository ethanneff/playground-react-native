import React, {memo} from 'react';
import {Button, Screen, Text} from '../../../../components';
import {useNav} from '../../../../hooks';

export default memo(function PortfolioNotFound() {
  const nav = useNav();
  return (
    <Screen>
      <Text center title="404 :(" type="h1" />
      <Button onPress={nav.to('portfolioLanding')} title="go home" />
    </Screen>
  );
});
