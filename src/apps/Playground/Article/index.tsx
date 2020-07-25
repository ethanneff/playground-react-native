import React, {memo, useCallback} from 'react';
import {Screen} from '../../../components';
import {Content} from '../../../components/Content';
import {useNav} from '../../../hooks';
import {data} from './data';

export default memo(function PlaygroundArticle() {
  const nav = useNav();
  const navBack = useCallback(nav('playground'), [nav]);
  return (
    <Screen onLeftPress={navBack} title="Article">
      <Content body={data} />
    </Screen>
  );
});
