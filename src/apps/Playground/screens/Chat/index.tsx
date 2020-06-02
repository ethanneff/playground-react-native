import React, {memo} from 'react';
import {Screen} from '../../../../components';
import {useNav} from '../../../../hooks';
import {TextField} from './TextField';
import {Items} from './Items';

export default memo(function PlaygroundChat() {
  const nav = useNav();

  return (
    <Screen onLeftPress={nav.to('playground')} title="Chat" gutter>
      <Items />
      <TextField />
    </Screen>
  );
});
