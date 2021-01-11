import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {View} from 'react-native';
import {Button, Calendar, Card, Input, Screen, Text} from '../../components';
import {ScrollView} from '../../conversions';
import {useColor} from '../../hooks';
import {Theme} from '../../utils';

const data = [
  'Set your alarm for 10 minutes earlier than usual',
  'Skip breakfast and drink water instead until your first snack or meal',
  'Switch up your coffee drink',
  'Switch web browsers for a day',
  'Pack your lunch for today, preferably something healthy',
  'Set your alarm for 10 minutes later than usual',
  'Take a different route to work',
  'Tell someone how much they mean to you',
  'Do some form of new exercise',
  'Read',
  'Write in a journal',
  'Get rid of some of your clothes',
  'Order from a different store and/or try some new toppings',
  'Watch a show that you wouldn’t normally watch',
  'Do or try that thing you’ve been procrastinating on',
  'Try being vegan for a day',
  'Fast for an entire day',
  'Wear the exact same clothes you wore yesterday',
  'Talk to a stranger',
  'Publish something online',
  'Sign up for a hot yoga or unfamiliar class',
  'Sit with a stranger or someone new for lunch',
  'Reach out to 5 celebrities on Twitter',
  'Reach out to 5 career role models',
  'Ask for a 10% discount at a coffee shop',
  'Sleep on the floor tonight',
  'Play rejection therapy for a day by asking people out',
  'Eat by yourself at a restaurant',
  'Ditch the electricity for a day',
  'Ask someone new to constructively criticize your behavior or work habits',
  'Give a total stranger a genuine compliment every day',
  'List things that scare you the most and add them to the list',
  'Make a new friend or new acquaintance',
  'Unplug from technology for a no-tech day',
  'Take a short power nap in the afternoon',
  'Try a new language',
  'Change your routine',
  'Smile towards everyone',
  'Cook something new',
  'Mix up your music',
  'Do all your shopping for the week',
  'Have a day of kindness',
  'Say yes to everything',
  'Watch something odd',
  'Hide a note for a loved one',
  'Throw out the things you haven’t used in 1 year',
  'Go out',
  'Reach out to someone you haven’t spoken to in a while',
  'Do something your inner kid loves',
  'Buy something you’d never buy at the grocery store',
  'Turn your shower to cold at the end',
  'Introduce yourself to someone new',
  'Visit a new place',
  'Volunteer',
  'Ask for a discount',
  'Try a new workout',
  'Write yourself a note using your non-dominant hand',
  'Take a dance lesson',
  'Take a creative class like music, art, or cooking',
  'Commit to saying hi to everyone you meet on your next walk',
  'Listen to a music genre you never do',
  'Read something you’d never normally read',
  'Take yourself out on a date',
  'Tell someone how much you appreciate them',
  'Declutter',
  'Purposely sit in the wrong seat',
  'Speak out online about something you care about',
  'Start that book or project you’ve always wanted to start',
  'Ask someone for a recommendation',
  'Purposely switch up your morning routine',
  'Give someone a compliment',
  'Ask for something that you don’t see on the menu',
  'Invite someone you don’t know well to lunch',
  'Ask for feedback',
  'Respond with something besides “good” when someone asks how you are',
  'Begin learning a new instrument',
  'Try meditation',
  'Give someone a spontaneous and creative gift without their input',
  'Take a picture every day for a month',
  'Ask for a raise',
  'Go to a restaurant, order and eat dessert first',
  'Call your Mother just to tell her how much you love her',
  'Send someone flowers for no reason',
  'Rent a tandem bike with a friend',
  'Go for a police ride along',
  'Hug a stranger',
  'Go play Bingo',
  'Slow dance on a rooftop',
  'Approach someone who intimidates you and compliment them',
  'Pay for the coffee in the car behind you',
  'Have a dance off in front of your mirror',
  'Write 5 thank you cards to your best friends and tell them why they mean so much to you',
  'Go to a public pillow fight',
  'Pull an all nighter',
  'Go to a thrift store with a $20 budget and wear the clothing',
  'Jump into a lake with your clothes on',
  'Lead your friend/significant other to a beautiful place blindfolded, bring picnic supplies',
  'Buy a bottle of bubbles, lay in the grass with a friend and blow bubbles',
  'Lay on the 50 yard line of a football field at night and stargaze',
  'Go for a drive. When you get to an intersection, take turns deciding which way to go. GPS your way back home',
  'Night hike under the stars',
  'Go to your favorite book store, and leave notes in your favorites books for future readers',
  'Go to a dealership, pretend to be married and drive swanky vehicles',
  'Walk around the city all night and find a place to eat breakfast at dawn',
  'Go to a restaurant, convince the cook to create something completely new for you',
  'Rent a movie you’ve never seen before. Mute it and improvise the dialogue',
  'Take a class you’ve always wanted to take',
  'Make a new recipe you’ve never tried before',
  'Get a Craniosacral massage',
  'Say no to something you don’t like to do but often do out of guilt',
  'Go for a walk at sunrise',
  'Ask someone on a date who you think is out of your league',
  'Buy a pack of sticky notes. Start anonymously leaving compliments around for friends, coworkers, lovers or strangers',
  'Eat a bug',
  'Go watch improv',
  'Journal 20 amazing things you bring to the world',
  'Eat somewhere out of your budget',
  'Attend a costume party',
  'Hire a photographer, and get head shots',
  'Sing karaoke',
  'Make a fool of yourself on a dance floor in public.',
  'Crash a wedding',
  'Make a free hugs sign, stand in a high traffic place',
  'Buy lunch for a homeless person, or better yet, take them out to lunch and hear their story',
  'Go spelunking',
  'Dining in the dark',
  'Go experience a gun range',
  'Raise money for a charity',
  'Apply for jobs that intimidate you',
  'Ask for constructive criticism at work',
  'Invite a co-worker you don’t know well to lunch and get to know them better',
  'Set up a tent and camp in your backyard',
  'Travel alone',
  'Attend a Meetup group',
  'Go to a local shelter and walk the dogs',
  'Go for a ride on a motorcycle',
  'Bake some cookies for the old folks home',
  'When ordering a drink at a restaurant, tell the waiter to surprise you',
];

export const Home = memo(function Home() {
  const {goBack} = useNavigation();
  const color = useColor();
  const [challenge, setChallenge] = useState('...');
  const [customInput, setCustomInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const navBack = useCallback(() => goBack(), [goBack]);
  const onRandom = useCallback(
    () => setChallenge(data[Math.floor(Math.random() * data.length)]),
    [],
  );
  const onCustom = useCallback(() => setShowCustomInput((v) => !v), []);
  const onCustomInputChange = useCallback(
    (value: string) => setCustomInput(value),
    [],
  );
  const onCustomInputSubmit = useCallback(() => {
    data.push(challenge);
    setCustomInput('');
    setShowCustomInput(false);
  }, [challenge]);

  return (
    <Screen onLeftPress={navBack} title="Comfort Zone">
      <ScrollView
        contentContainerStyle={{
          padding: Theme.padding.p04,
        }}
        style={{backgroundColor: color.surface}}>
        <Card>
          <Text
            center
            style={{paddingBottom: Theme.padding.p04}}
            title="Try something new every day"
            type="h3"
          />
          <Text
            center
            emphasis="medium"
            title="Break comfort barriers to be more creative, to be better at dealing with change, and to be better at improving your future"
            type="h4"
          />
        </Card>

        <Card>
          <Text
            center
            style={{paddingBottom: Theme.padding.p04}}
            title="Today's Challenge"
            type="h3"
          />
          <Text
            center
            emphasis="medium"
            style={{paddingBottom: Theme.padding.p04}}
            title={challenge}
            type="h4"
          />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button color="primary" onPress={onRandom} title="random" />
            <Button color="primary" onPress={onCustom} title="custom" />
          </View>
          {!showCustomInput ? null : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Input
                onChangeText={onCustomInputChange}
                onSubmitEditing={onCustomInputSubmit}
                placeholder="what is something that outside your comfort zone?"
                value={customInput}
              />
              <Button
                color="primary"
                onPress={onCustomInputSubmit}
                title="submit"
              />
            </View>
          )}
        </Card>
        <Card>
          <Text
            center
            style={{paddingBottom: Theme.padding.p04}}
            title="Progress"
            type="h3"
          />
          <Calendar />
        </Card>
      </ScrollView>
    </Screen>
  );
});
