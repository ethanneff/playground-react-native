import React, {memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Screen} from '../../../../components';
import {useNav} from '../../../../hooks';
import Walkthrough from './Walkthrough';

const styles = StyleSheet.create({
  row: {flexDirection: 'row', justifyContent: 'space-around'},
});

export default memo(function PortfolioLanding() {
  const nav = useNav();
  const navBack = useCallback(nav('playground'), [nav]);
  const navPortfolioLogin = useCallback(nav('portfolioLogin'), [nav]);
  const navPortfolio = useCallback(nav('portfolio'), [nav]);
  const navPortfolioSettings = useCallback(nav('portfolioSettings'), [nav]);
  const navChecklists = useCallback(nav('checklists'), [nav]);
  const navCantHurtMe = useCallback(nav('cantHurtMe'), [nav]);
  const navTheOneThing = useCallback(nav('theOneThing'), [nav]);
  const navJournal = useCallback(nav('journal'), [nav]);
  const navActivity = useCallback(nav('activity'), [nav]);
  const navFocus = useCallback(nav('focus'), [nav]);
  const navGamesFlappyBird = useCallback(nav('gamesFlappyBird'), [nav]);
  const navGamesSnake = useCallback(nav('gamesSnake'), [nav]);
  const navGamesPapiJump = useCallback(nav('gamesPapiJump'), [nav]);
  const navGamesArchero = useCallback(nav('gamesArchero'), [nav]);

  return (
    <Screen title="Landing">
      <Walkthrough />
      <View style={styles.row}>
        <Button onPress={navPortfolioLogin} title="Login" />
        <Button onPress={navPortfolio} title="Main" />
        <Button onPress={navPortfolioSettings} title="Settings" />
      </View>
      <View style={styles.row}>
        <Button onPress={navChecklists} title="Checklist" />
        <Button onPress={navCantHurtMe} title="Cant Hurt" />
        <Button onPress={navTheOneThing} title="One Thing " />
      </View>
      <View style={styles.row}>
        <Button onPress={navJournal} title="Journal" />
        <Button onPress={navActivity} title="Activity" />
        <Button onPress={navFocus} title="Focus" />
      </View>
      <View style={styles.row}>
        <Button onPress={navGamesFlappyBird} title="FlappyBird" />
        <Button onPress={navGamesSnake} title="Snake" />
        <Button onPress={navGamesPapiJump} title="PapiJump" />
        <Button onPress={navGamesArchero} title="Archero" />
      </View>
      <View style={styles.row}>
        <Button onPress={navBack} title="Playground" />
      </View>
    </Screen>
  );
});
