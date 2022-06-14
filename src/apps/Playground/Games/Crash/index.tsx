import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Card,
  Input,
  Screen,
  ScrollView,
  Spacing,
  Text,
} from '../../../../components';
import { padding, useColors } from '../../../../features';

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

type Tab = 'manual' | 'auto';
type PlayerGame = {
  activeTab: Tab;
  autoCashOut: number;
  bidAmount: number;
  status: 'idle' | 'bid';
};

type Game = {
  endTime: number;
  history: number[];
  maxPayout: number;
  payout: number;
  startTime: number;
  status: 'start' | 'finish' | 'run';
};

// https://www.youtube.com/watch?v=sRq1_B8raPg
export const Crash = memo(function CrashMemo() {
  const colors = useColors();
  const { goBack } = useNavigation();

  const [playerGame, setPlayerGame] = useState<PlayerGame>({
    activeTab: 'manual',
    bidAmount: 2,
    autoCashOut: 4,
    status: 'idle',
  });

  const [game, setGame] = useState<Game>({
    status: 'start',
    startTime: 0,
    endTime: 0,
    payout: 0,
    maxPayout: 0,
    history: [],
  });
  const gameSeconds = game.endTime - game.startTime;

  const handleTabPress = useCallback(
    (activeTab: Tab) => () => setPlayerGame((p) => ({ ...p, activeTab })),
    [],
  );

  const handleAmountInputChange = useCallback(
    (amount: string) =>
      setPlayerGame((p) => ({ ...p, bidAmount: Number(amount) })),
    [],
  );

  const handleAutoCashOutChange = useCallback(
    (amount: string) =>
      setPlayerGame((p) => ({ ...p, autoCashOut: Number(amount) })),
    [],
  );

  const handleAmountPress = useCallback(
    (amount: number) => () =>
      setPlayerGame((p) => ({ ...p, bidAmount: p.bidAmount * amount })),
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
      onLeftPress={goBack}
      title="Roobet Crash"
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: padding(4),
          paddingVertical: padding(2),
        }}
        style={{ backgroundColor: colors.background.secondary }}
      >
        <View />

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
            <Spacing padding={2} />
            <Button
              color={playerGame.activeTab === 'auto' ? 'accent' : 'primaryA'}
              emphasis="medium"
              onPress={handleTabPress('auto')}
              title="auto"
            />
          </View>
          <Spacing padding={2} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Input
              flex
              onChangeText={handleAmountInputChange}
              title="bet amount"
              value={String(playerGame.bidAmount)}
            />
            <Spacing padding={1} />
            <Button
              emphasis="medium"
              onPress={handleAmountPress(0.5)}
              title="1/2"
            />
            <Spacing padding={1} />
            <Button
              emphasis="medium"
              onPress={handleAmountPress(2)}
              title="2x"
            />
            <Spacing padding={1} />
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
            buttonStyle={{ padding: padding(3) }}
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
