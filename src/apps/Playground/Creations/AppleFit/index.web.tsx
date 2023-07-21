import React from 'react';
import { Screen } from '../../../../components';
import { useNavigation } from '../../../../conversions';

export const AppleFit = () => {
  const { goBack } = useNavigation();

  return (
    <Screen
      onLeftPress={goBack}
      title="Apple Fit"
    />
  );
};
