import React, {memo, useCallback} from 'react';
import {Button, Screen} from '../../../../components';
import {useNav} from '../../../../hooks';

export default memo(function PortfolioMain() {
  const nav = useNav();
  const navBack = useCallback(nav('portfolioLanding'), [nav]);
  return (
    <Screen gutter title="Main">
      <Button onPress={navBack} title="logout" />
    </Screen>
  );
});
