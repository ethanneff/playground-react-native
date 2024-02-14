import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import {
  Button,
  Screen,
  ScrollView,
  Spacing,
  Text,
  View,
} from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { spacing, useDriver } from '../../../../features';
import { Header } from './components/Header';
import { slotMachineConfigs } from './utils/slotMachineConfigs';
import { slotMachineUtils } from './utils/slotMachineUtils';
import {
  type CombinationAmount,
  type History,
  type MultipleArray,
  type Percentages,
  type Reels,
} from './utils/types';

// TODO: add confetti on win
// TODO: handle horizontal
// TODO: add bonus round https://www.youtube.com/watch?v=JyIWQIdxaOA

type Game = {
  combos: CombinationAmount;
  credits: number;
  history: History[];
  multipleArray: MultipleArray;
  multipleIndex: number;
  percentages: Percentages;
  reels: Reels;
  spin: string;
  spinning: boolean;
};

export const SlotMachine = () => {
  const { goBack } = useNavigation();
  const useNativeDriver = useDriver();
  const [game, setGame] = useState<Game | null>(null);
  const spinAnimation = useRef(new Animated.Value(1)).current;
  const multiplier = game?.multipleArray[game.multipleIndex] ?? 1;
  const lastSpinAmount = game?.history.at(-1)?.amount ?? 0;

  const setGameState = useCallback(() => {
    const combos = slotMachineUtils.getCombos(slotMachineConfigs.combinations);
    const reels = slotMachineUtils.getReels(slotMachineConfigs.reelFreq);
    const percentages = slotMachineUtils.getPercentages(combos, reels, 100_000);
    const spin = slotMachineUtils.getSpin(reels);
    setGame({
      combos,
      credits: 0,
      history: [],
      multipleArray: [1, 2, 5, 10],
      multipleIndex: 0,
      percentages,
      reels,
      spin,
      spinning: false,
    });
  }, []);

  const handleMultiplier = useCallback(() => {
    setGame(
      (previous) =>
        previous && {
          ...previous,
          multipleIndex:
            (previous.multipleIndex + 1) % previous.multipleArray.length,
        },
    );
  }, []);

  const handleSpin = useCallback(() => {
    setGame((previous) => previous && { ...previous, spinning: true });
    Animated.timing(spinAnimation, {
      duration: 200,
      toValue: 0,
      useNativeDriver,
    }).start(({ finished }) => {
      if (!finished) return;
      setGame((previous) => {
        if (!previous) return null;
        const spin = slotMachineUtils.getSpin(previous.reels);
        const amount = slotMachineUtils.getWin(spin, previous.combos);
        const multiple = previous.multipleArray[previous.multipleIndex];
        const payout = amount === 0 ? -multiple : amount * multiple;
        const history = [
          ...previous.history,
          { amount: payout, spin, time: Date.now() },
        ];
        const credits = previous.credits + payout;
        return { ...previous, credits, history, spin };
      });
      Animated.sequence([
        Animated.delay(200),
        Animated.timing(spinAnimation, {
          duration: 200,
          toValue: 1,
          useNativeDriver,
        }),
      ]).start(({ finished: nestedFinished }) => {
        if (!nestedFinished) return;
        setGame((previous) => previous && { ...previous, spinning: false });
      });
    });
  }, [spinAnimation, useNativeDriver]);

  const handleCredits = useCallback(() => {
    setGame(
      (previous) => previous && { ...previous, credits: previous.credits + 50 },
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
        flex={1}
        paddingVertical={spacing(4)}
      >
        <ScrollView>
          <Header
            multiplier={multiplier}
            payout={game.percentages.payout}
            wins={game.percentages.wins}
          />
          <View
            alignItems="center"
            style={{ marginTop: -spacing(20) }}
          >
            <Animated.View
              style={{
                opacity: spinAnimation,
              }}
            >
              <Text
                color="positive"
                style={{ opacity: lastSpinAmount > 0 ? 1 : 0 }}
                title={`+$${lastSpinAmount}`}
                type="h3"
              />
            </Animated.View>
            <View flexDirection="row">
              <Text
                emphasis="low"
                title="$"
                type="h1"
              />
              <Text
                title={String(game.credits)}
                type="h1"
              />
            </View>
          </View>
          <Animated.View
            style={{
              opacity: spinAnimation,
              transform: [{ scale: spinAnimation }],
            }}
          >
            <Text
              center
              title={game.spin}
              type="h1"
            />
          </Animated.View>
          <View paddingHorizontal={spacing(10)}>
            <Spacing padding={spacing(4)} />
            <View
              alignItems="center"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Button
                center
                disabled={game.spinning}
                onPress={handleMultiplier}
                title={`⚡️ BET X${multiplier} ⚡️`}
              />
              <Button
                center
                disabled={game.spinning}
                onPress={handleCredits}
                title="💰 add $50 💰"
              />
            </View>
            <Spacing padding={spacing(2)} />
            <Button
              buttonStyle={{
                padding: spacing(4),
              }}
              center
              color="accent"
              disabled={
                !game.credits || multiplier > game.credits || game.spinning
              }
              emphasis="high"
              onPress={handleSpin}
              title={multiplier < game.credits ? 'spin' : 'add credits to play'}
            />
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
};
