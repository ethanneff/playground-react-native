import React, { memo } from 'react';
import { Spacing, Text, View } from '../../../../../components';
import { slotMachineConfigs } from '../utils/slotMachineConfigs';

type Props = {
  multiplier: number;
  payout: string;
  wins: string;
};

export const Header = memo(function HeaderMemo({
  multiplier,
  payout,
  wins,
}: Props) {
  return (
    <View
      flexDirection="row"
      justifyContent="space-between"
    >
      <View justifyContent="center">
        {slotMachineConfigs.combinations.map(({ amount, combo, name }) => (
          <View
            flexDirection="row"
            key={name}
          >
            <Text
              title={combo}
              type="h5"
            />
            <Text
              emphasis="medium"
              title={`$${amount * multiplier}`}
              type="h5"
            />
          </View>
        ))}
      </View>
      <View
        alignItems="center"
        justifyContent="center"
      >
        <Text
          emphasis="medium"
          title="WINS"
          type="h6"
        />
        <Text
          title={wins}
          type="h5"
        />
        <Spacing padding={2} />
        <Text
          emphasis="medium"
          title="PAYOUT"
          type="h6"
        />
        <Text
          title={payout}
          type="h5"
        />
      </View>
      <View justifyContent="center">
        {slotMachineConfigs.combinations.map(({ amount, combo, name }) => (
          <View
            flexDirection="row"
            justifyContent="flex-end"
            key={name}
          >
            <Text
              emphasis="medium"
              title={`$${amount * multiplier}`}
              type="h5"
            />
            <Text
              title={combo}
              type="h5"
            />
          </View>
        ))}
      </View>
    </View>
  );
});
