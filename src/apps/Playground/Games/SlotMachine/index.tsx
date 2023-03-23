import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  Button,
  Screen,
  ScrollView,
  Spacing,
  Text,
  View,
} from '../../../../components';
import { spacing } from '../../../../features';
import { Header } from './components/Header';
import { Multiplier } from './components/Multiplier';
import { slotMachineConfigs } from './utils/slotMachineConfigs';
import { slotMachineUtils } from './utils/slotMachineUtils';
import {
  type CombinationAmount,
  type MultipleArray,
  type Percentages,
  type Reels,
} from './utils/types';

// TODO: track wins
// TODO: increase payout to 96% and wins to 25%
// TODO: add confetti on win
// TODO: handle horizontal
// TODO: add reel animation

type Game = {
  combos: CombinationAmount;
  credits: number;
  multipleArray: MultipleArray;
  multipleIndex: number;
  percentages: Percentages;
  reels: Reels;
  spin: string;
  spinning: boolean;
};

export const SlotMachine = memo(function PlaygroundSlotMachine() {
  const { goBack } = useNavigation();
  const [game, setGame] = useState<Game | null>(null);

  const setGameState = useCallback(() => {
    const combos = slotMachineUtils.getCombos(slotMachineConfigs.combinations);
    const reels = slotMachineUtils.getReels(slotMachineConfigs.reelFreq);
    const percentages = slotMachineUtils.getPercentages(combos, reels, 100000);
    const spin = slotMachineUtils.getSpin(reels);
    setGame({
      combos,
      credits: 0,
      multipleArray: [1, 2, 5, 10, 25],
      multipleIndex: 0,
      percentages,
      reels,
      spin,
      spinning: false,
    });
  }, []);

  const handleMultiplier = useCallback(() => {
    setGame(
      (prev) =>
        prev && {
          ...prev,
          multipleIndex: (prev.multipleIndex + 1) % prev.multipleArray.length,
        },
    );
  }, []);
  const handleSpin = useCallback(() => {
    setGame((prev) => {
      if (!prev) return null;
      const spin = slotMachineUtils.getSpin(prev.reels);
      const amount = slotMachineUtils.getWin(spin, prev.combos);
      const multiple = prev.multipleArray[prev.multipleIndex];
      const wins = amount === 0 ? -multiple : amount * multiple;
      const credits = prev.credits + wins;
      return { ...prev, credits, spin };
    });
  }, []);

  const handleCredits = useCallback(() => {
    setGame(
      (prev) =>
        prev && {
          ...prev,
          credits: prev.credits + 50,
        },
    );
  }, []);

  useEffect(() => {
    setGameState();
  }, [setGameState]);

  return game === null ? null : (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Slot Machine"
    >
      <View
        backgroundColor="secondary"
        flex={1}
        paddingVertical={spacing(4)}
      >
        <ScrollView>
          <Header
            payout={game.percentages.payout}
            wins={game.percentages.wins}
          />
          <View
            alignItems="center"
            style={{ marginTop: -spacing(12) }}
          >
            <Text
              title={`$${game.credits}`}
              type="h1"
            />
          </View>
          <Spacing padding={2} />
          <View alignItems="center">
            <Text
              title={game.spin}
              type="h1"
            />
          </View>
          <View paddingHorizontal={spacing(10)}>
            <Spacing padding={4} />
            <Multiplier
              disabled={game.spinning}
              multiplier={game.multipleArray[game.multipleIndex]}
              onPress={handleMultiplier}
            />
            <Spacing padding={2} />
            <Button
              buttonStyle={{
                padding: spacing(4),
              }}
              center
              color="accent"
              disabled={
                !game.credits ||
                game.multipleArray[game.multipleIndex] > game.credits ||
                game.spinning
              }
              emphasis="high"
              onPress={handleSpin}
              title={
                game.multipleArray[game.multipleIndex] < game.credits
                  ? 'spin'
                  : 'add credits to play'
              }
            />
            <Spacing padding={2} />
            <Button
              center
              disabled={game.spinning}
              onPress={handleCredits}
              title="add 50 credits"
            />
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
});
