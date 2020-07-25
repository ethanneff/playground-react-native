import React, {memo, useCallback} from 'react';
import {Button, Screen, Text} from '../../../../components';
import {useNav} from '../../../../hooks';

export default memo(function PortfolioNotFound() {
  const nav = useNav();
  const navBack = useCallback(nav('portfolioLanding'), [nav]);
  return (
    <Screen>
      <Text center title="404 :(" type="h1" />
      <Button onPress={navBack} title="go home" />
    </Screen>
  );
});
