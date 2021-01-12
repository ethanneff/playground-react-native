import React, {ReactNode} from 'react';
import {Card, Text} from '../../../components';
import {Theme} from '../../../utils';

type Props = {
  title: string;
  children: ReactNode;
};

export const Section = ({title, children}: Props): JSX.Element => {
  return (
    <Card>
      <Text
        emphasis="low"
        style={{paddingBottom: Theme.padding.p02}}
        title={title}
        type="h4"
      />
      {children}
    </Card>
  );
};
