import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Input,
  Screen,
  ScrollView,
  Spacing,
  Text,
  View,
} from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { spacing, useColors } from '../../../../features';

// type GameHistory = {
//   callout: number;
//   payout: number;
//   players: string[];
// };

// type Game = {
//   history: GameHistory[];
//   id: string;
//   name: string;
// };

// type PlayerHistory = {
//   autoCallout: number;
//   bid: number;
//   callout: number;
//   date: number;
//   id: string;
//   payout: number;
// };

// type Player = {
//   cash: number;
//   history: PlayerHistory[];
//   id: string;
//   name: string;
// };

type Tab = 'auto' | 'manual';
type PlayerGame = {
  activeTab: Tab;
  autoCashOut: number;
  bidAmount: number;
  status: 'bid' | 'idle';
};

type Game = {
  endTime: number;
  history: number[];
  maxPayout: number;
  payout: number;
  startTime: number;
  status: 'finish' | 'run' | 'start';
};

// https://www.youtube.com/watch?v=sRq1_B8raPg
export const Crash = memo(function CrashMemo() {
  const colors = useColors();
  const { goBack } = useNavigation();

  const [playerGame, setPlayerGame] = useState<PlayerGame>({
    activeTab: 'manual',
    autoCashOut: 4,
    bidAmount: 2,
    status: 'idle',
  });

  const [game, setGame] = useState<Game>({
    endTime: 0,
    history: [],
    maxPayout: 0,
    payout: 0,
    startTime: 0,
    status: 'start',
  });
  const gameSeconds = game.endTime - game.startTime;

  const handleTabPress = useCallback(
    (activeTab: Tab) => () => {
      setPlayerGame((p) => ({ ...p, activeTab }));
    },
    [],
  );

  const handleAmountInputChange = useCallback((amount: string) => {
    setPlayerGame((p) => ({ ...p, bidAmount: Number(amount) }));
  }, []);

  const handleAutoCashOutChange = useCallback((amount: string) => {
    setPlayerGame((p) => ({ ...p, autoCashOut: Number(amount) }));
  }, []);

  const handleAmountPress = useCallback(
    (amount: number) => () => {
      setPlayerGame((p) => ({ ...p, bidAmount: p.bidAmount * amount }));
    },
    [],
  );

  const handleButtonPress = useCallback(() => {
    setPlayerGame((p) => ({
      ...p,
      status: p.status === 'bid' ? 'idle' : 'bid',
    }));
  }, []);

  const loop = useCallback(() => {
    setTimeout(() => {
      setGame((p) => ({ ...p }));
      loop();
    }, 30);
  }, []);

  useEffect(() => {
    loop();
  }, [loop]);

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Roobet Crash"
    >
      <ScrollView
        contentContainerStyle={{
          gap: spacing(4),
          padding: spacing(4),
        }}
        style={{ backgroundColor: colors.background.secondary }}
      >
        <Card>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text title="name" />
            <Text
              emphasis="medium"
              title="cash"
            />
          </View>
        </Card>

        <Card>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button
              color={playerGame.activeTab === 'manual' ? 'accent' : 'primaryA'}
              emphasis="medium"
              onPress={handleTabPress('manual')}
              title="manual"
            />
            <Spacing padding={spacing(2)} />
            <Button
              color={playerGame.activeTab === 'auto' ? 'accent' : 'primaryA'}
              emphasis="medium"
              onPress={handleTabPress('auto')}
              title="auto"
            />
          </View>
          <Spacing padding={spacing(2)} />
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <Input
              flex
              onChangeText={handleAmountInputChange}
              title="bet amount"
              value={String(playerGame.bidAmount)}
            />
            <Spacing padding={spacing(1)} />
            <Button
              emphasis="medium"
              onPress={handleAmountPress(0.5)}
              title="1/2"
            />
            <Spacing padding={spacing(1)} />
            <Button
              emphasis="medium"
              onPress={handleAmountPress(2)}
              title="2x"
            />
            <Spacing padding={spacing(1)} />
            <Button
              emphasis="medium"
              onPress={handleAmountPress(100)}
              title="max"
            />
          </View>
          <Input
            onChangeText={handleAutoCashOutChange}
            title="auto cashout"
            value={String(playerGame.autoCashOut)}
          />
          <Button
            buttonStyle={{ padding: spacing(3) }}
            center
            color="positive"
            emphasis="high"
            onPress={handleButtonPress}
            title={playerGame.status === 'bid' ? 'cash out' : 'place bet'}
          />
        </Card>

        <Card>
          <View>
            {game.status === 'start' ? (
              <View>
                <Text title="Preparing Round" />
                <Text title={`Staring in ${gameSeconds}s`} />
              </View>
            ) : game.status === 'finish' ? (
              <View>
                <Text title={`${game.payout}`} />
                <Text title="Round Over" />
              </View>
            ) : (
              <View>
                <Text title={`${game.payout}`} />
                <Text title="Current Payout" />
                <Text title={`${game.payout * playerGame.bidAmount}`} />
              </View>
            )}
          </View>
        </Card>
      </ScrollView>
    </Screen>
  );
});
