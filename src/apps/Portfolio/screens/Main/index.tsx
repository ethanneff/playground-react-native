import React, {memo} from 'react';
import {Button, Screen} from '../../../../components';
import {useNav} from '../../../../hooks';

export default memo(function PortfolioMain() {
  const nav = useNav();
  return (
    <Screen title="Main" gutter>
      <Button title="logout" onPress={nav.to('portfolioLanding')} />
    </Screen>
  );
});
