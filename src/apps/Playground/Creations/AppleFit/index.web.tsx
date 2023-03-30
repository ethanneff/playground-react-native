import React, { memo } from 'react';
import { Screen } from '../../../../components';
import { useNavigation } from '../../../../conversions';

export const AppleFit = memo(function PlaygroundAppleFit() {
  const { goBack } = useNavigation();

  return (
    <Screen
      onLeftPress={goBack}
      title="Apple Fit"
    />
  );
});
