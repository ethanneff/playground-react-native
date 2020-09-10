import React, {memo, useCallback} from 'react';
import {Screen} from '../../../components';
import {useNav} from '../../../hooks';

export const AppleFit = memo(function PlaygroundAppleFit() {
  const nav = useNav();
  const navBack = useCallback(nav('landing'), [nav]);

  return <Screen onLeftPress={navBack} title="Apple Fit" />;
});
