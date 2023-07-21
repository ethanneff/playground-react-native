import React from 'react';
import { Spacing, Text, View } from '../../../../../components';
import { spacing } from '../../../../../features';
import { slotMachineConfigs } from '../utils/slotMachineConfigs';

type Props = {
  readonly multiplier: number;
  readonly payout: string;
  readonly wins: string;
};

export const Header = ({ multiplier, payout, wins }: Props) => (
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
            emphasis="low"
            title={`$${amount * multiplier}`}
            type="h5"
          />
        </View>
      ))}
    </View>
    <View
      style={{
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
      }}
    >
      <View
        alignItems="center"
        style={{ paddingTop: spacing(10) }}
      >
        <Text
          emphasis="low"
          title="ODDS"
          type="h6"
        />
        <Text
          title={wins}
          type="h5"
        />
        <Spacing padding={spacing(2)} />
        <Text
          emphasis="low"
          title="PAYOUT"
          type="h6"
        />
        <Text
          title={payout}
          type="h5"
        />
      </View>
    </View>
    <View justifyContent="center">
      {slotMachineConfigs.combinations.map(({ amount, combo, name }) => (
        <View
          flexDirection="row"
          justifyContent="flex-end"
          key={name}
        >
          <Text
            emphasis="low"
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
