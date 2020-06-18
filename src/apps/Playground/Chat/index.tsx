import React, {memo} from 'react';
import {useNav} from '../../../hooks';
import {Screen} from '../../../components';
import {Items} from './Items';
import {TextField} from './TextField';

export default memo(function PlaygroundChat() {
  const nav = useNav();

  return (
    <Screen gutter onLeftPress={nav.to('playground')} title="Chat">
      <Items />
      <TextField />
    </Screen>
  );
});
