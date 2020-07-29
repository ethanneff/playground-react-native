import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {useColor} from '../../../hooks';
import {Text} from '../../../components';
import {Theme} from '../../../utils';

type Props = {
  row?: boolean;
  title: string;
  children: ReactNode;
};

export const Section = ({title, row, children}: Props): JSX.Element => {
  const color = useColor();
  return (
    <View
      style={{
        flexDirection: row ? 'row' : 'column',
        marginBottom: Theme.padding.p04,
      }}>
      <Text
        style={{
          color: color.background, // TODO: add prop to text for inverse
          backgroundColor: color.secondary,
          padding: Theme.padding.p02,
          borderColor: color.secondary,
          borderWidth: 2,
        }}
        title={title}
        type="h3"
      />
      <View
        style={{
          backgroundColor: color.background,
          padding: Theme.padding.p03,
          borderColor: color.secondary,
          borderWidth: 2,
          borderTopWidth: 0,
        }}>
        {children}
      </View>
    </View>
  );
};
