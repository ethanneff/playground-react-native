import React, {memo} from 'react';
import {Screen} from '../../../../components';
import {Content} from '../../../../components/Content';
import {useNav} from '../../../../hooks';
import {data} from './data';

export default memo(function DebugArticle() {
  const nav = useNav();

  return (
    <Screen onLeftPress={nav.to('debug')} title="Article">
      <Content body={data} />
    </Screen>
  );
});
