import React, {memo} from 'react';
import {Button, Screen} from '../../../../components';
import {useNav} from '../../../../hooks';

export default memo(function PortfolioMain() {
  const nav = useNav();
  return (
    <Screen gutter title="Main">
      <Button onPress={nav.to('portfolioLanding')} title="logout" />
    </Screen>
  );
});
