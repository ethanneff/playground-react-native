import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Screen} from '../../../components';
import {Content} from '../../../components/Content';
import {data} from './data';

export const Article = memo(function PlaygroundArticle() {
  const {goBack} = useNavigation();
  const navBack = useCallback(() => goBack(), [goBack]);
  return (
    <Screen onLeftPress={navBack} title="Article">
      <Content body={data} />
    </Screen>
  );
});
