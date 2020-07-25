import React, {memo, useCallback} from 'react';
import {useNav} from '../../../hooks';
import {Screen} from '../../../components';
import {Items} from './Items';
import {TextField} from './TextField';

export default memo(function PlaygroundChat() {
  const nav = useNav();
  const navBack = useCallback(nav('playground'), [nav]);

  return (
    <Screen gutter onLeftPress={navBack} title="Chat">
      <Items />
      <TextField />
    </Screen>
  );
});
