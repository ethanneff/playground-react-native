import React, {memo} from 'react';
import {Button, Screen, Text} from '../../../../components';
import {useNav} from '../../../../hooks';

export default memo(function PortfolioNotFound() {
  const nav = useNav();
  return (
    <Screen>
      <Text type="h1" center title="404 :(" />
      <Button title="go home" onPress={nav.to('portfolioLanding')} />
    </Screen>
  );
});
