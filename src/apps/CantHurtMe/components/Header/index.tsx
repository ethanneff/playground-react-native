import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../../../../components';
import { Theme } from '../../../../utils';

interface Props {
  title: string;
}

export const Header: React.FC<Props> = memo(({ title }) => {
  const styles = StyleSheet.create({
    header: {
      padding: Theme.padding.p04,
    },
  });

  return <Text title={title} h3 style={styles.header} center />;
});
