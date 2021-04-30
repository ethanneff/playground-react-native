import React, {memo} from 'react';
import {Text} from '../../../components';
import {config} from '../../../utils';

type Props = {title: string};

export const Title = memo(function Title({title}: Props) {
  return (
    <Text center style={{padding: config.padding(8)}} title={title} type="h4" />
  );
});
