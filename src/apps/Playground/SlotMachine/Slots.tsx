import React, { memo, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { v4 } from 'uuid';
import { Button, Icon, Text, TouchableOpacity } from '../../../components';
import { padding, useColor } from '../../../features';
import { shuffleArray } from './utils';

type Combinations = { [key: string]: number };
type WildCards = { amount: number; line: string }[];
type Props = {
  combinations: Combinations;
  credits: number;
  multipliers?: number[];
  randomize?: boolean;
  reels: string[];
};

type State = {
  activity: 'idle' | 'spinning' | 'insufficient credits';
  credits: number;
  lineIndexes: number[];
  multiplierIndex: number;
  reelsArray: string[][];
};

type InitialState = {
  credits: number;
  randomize?: boolean;
  reels: string[];
};

const getInitialState = ({
  randomize,
  reels,
  credits,
}: InitialState): State => {
  const reelsArray = randomize
    ? reels.map((reel) => shuffleArray([...(reel as any)]))
    : reels.map((reel) => [...(reel as any)]);
  return {
    activity: 'idle',
    credits,
    reelsArray,
    multiplierIndex: 0,
    lineIndexes: [0, 0, 0],
  };
};

const getWildCards = (
  combinations: Combinations,
  reels: string[],
): WildCards => {
  const wildCards: WildCards = [];
  Object.keys(combinations).map((combination) => {
    const unicodeCombination = [...(combination as any)];
    if (unicodeCombination.length < reels.length)
      wildCards.push({ line: combination, amount: combinations[combination] });

    return combination;
  });
  return wildCards.sort((a, b) => b.amount - a.amount);
};

const getRandomLineIndexes = (reelsArray: string[][]): number[] => {
  return reelsArray.map((reel) => Math.floor(Math.random() * reel.length));
};

const getWinningLine = (
  lineIndexes: number[],
  reelsArray: string[][],
): string => {
  return lineIndexes.reduce(
    (total, lineIndex, i) => `${total}${reelsArray[i][lineIndex]}`,
    '',
  );
};

const getWinningAmount = (
  line: string,
  combinations: Combinations,
  wildCards: WildCards,
): number => {
  const combination = combinations[line];
  if (combination) return combination;

  for (let i = 0; i < wildCards.length; i++) {
    const wildCard = wildCards[i];
    if (line.includes(wildCard.line)) return wildCard.amount;
  }
  return 0;
};

type ReelsProps = {
  lineIndexes: number[];
  reelsArray: string[][];
};

const Reels = memo(function Reels({ reelsArray, lineIndexes }: ReelsProps) {
  const color = useColor();
  return (
    <View style={{ flexDirection: 'row' }}>
      {reelsArray.map((reel, i) => (
        <View key={v4()}>
          {reel.map((item, j) => (
            <Text
              key={v4()}
              style={{
                borderWidth: 2,
                borderColor:
                  lineIndexes[i] === j
                    ? color.border.accent
                    : color.border.primaryA,
              }}
              title={item}
            />
          ))}
        </View>
      ))}
    </View>
  );
});

type BetProps = {
  disabled: boolean;
  multiplier: number;
  onBet: () => void;
};

const Bet = memo(function Bet({ onBet, disabled, multiplier }: BetProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onBet}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text bold emphasis="high" title={`BET X${multiplier}`} />
      <Icon color="accent" name="lightning-bolt" />
    </TouchableOpacity>
  );
});

export const Slots = memo(function Slots({
  combinations,
  reels,
  multipliers = [1, 2, 3, 5, 10, 20],
  randomize,
  credits,
}: Props) {
  const [state, setState] = useState<State>(() =>
    getInitialState({ randomize, reels, credits }),
  );
  const multiplier = multipliers[state.multiplierIndex];
  const disabled = state.activity === 'spinning';
  const wildCards = useMemo(
    () => getWildCards(combinations, reels),
    [combinations, reels],
  );

  const creditError =
    state.activity === 'insufficient credits' ? 'insufficient credits' : '';

  const onSpin = useCallback(() => {
    const remainingCredits = state.credits - multiplier;
    if (remainingCredits < 0) {
      setState((p) => ({ ...p, activity: 'insufficient credits' }));
      return;
    }
    const lineIndexes = getRandomLineIndexes(state.reelsArray);
    const winningLine = getWinningLine(lineIndexes, state.reelsArray);
    const winningAmount = getWinningAmount(
      winningLine,
      combinations,
      wildCards,
    );

    setState((p) => ({
      ...p,
      activity: 'spinning',
      lineIndexes,
      credits: remainingCredits,
    }));
    setTimeout(() => {
      console.log(winningLine, winningAmount);
      setState((p) => ({
        ...p,
        activity: 'idle',
        credits: p.credits + winningAmount * multiplier,
      }));
    }, 500);
  }, [combinations, multiplier, state.credits, state.reelsArray, wildCards]);

  const onMultiplier = useCallback(() => {
    setState((p) => {
      const nextIndex = p.multiplierIndex + 1;
      const multiplierIndex =
        multipliers.length <= nextIndex || p.credits < multipliers[nextIndex]
          ? 0
          : nextIndex;
      return { ...p, multiplierIndex };
    });
  }, [multipliers]);

  return (
    <View>
      <Reels lineIndexes={state.lineIndexes} reelsArray={state.reelsArray} />
      <Bet disabled={disabled} multiplier={multiplier} onBet={onMultiplier} />
      <Text
        center
        emphasis="high"
        style={{ padding: padding(2) }}
        title={`${state.credits} credits`}
        type="h4"
      />
      <Button
        color="accent"
        disabled={disabled}
        emphasis="high"
        onPress={onSpin}
        title="spin"
      />
      <Text
        center
        color="negative"
        emphasis="high"
        style={{ padding: padding(2) }}
        title={creditError}
      />
    </View>
  );
});
