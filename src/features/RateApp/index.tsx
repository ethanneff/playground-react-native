import React, {memo, useCallback, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Rate, {AndroidMarket} from 'react-native-rate';
import {Button, Input, Modal, Text} from '../../components';
import {padding} from '../../features/Config';
import {Rating} from './Rating';

type ModalState = 'default' | 'thank you' | 'review' | 'feedback';
type State = {
  rating: number;
  modal: ModalState;
  feedback: string;
};
const initialState: State = {
  rating: 0,
  modal: 'default',
  feedback: '',
};
const ratingMin = 4;
const ratingOptions = {
  AppleAppID: '899247664',
  GooglePackageName: 'com.google.android.apps.maps', // TODO: use configs
  AmazonPackageName: 'com.google.android.apps.maps',
  OtherAndroidURL: 'http://www.mywebsite.com/app/47172391',
  preferredAndroidMarket: AndroidMarket.Google,
  preferInApp: true,
  openAppStoreIfInAppFails: true,
  fallbackPlatformURL: 'http://www.mywebsite.com/myapp',
};

type CompleteState = {
  rating: number;
  feedback: string;
  navigatedToAppStore: boolean;
};

interface Props {
  onComplete: (completeState: CompleteState) => void;
}

export const RateApp = memo(function RateAppMemo({onComplete}: Props) {
  const ratingRef = useRef(0);
  const navigatedToAppStore = useRef(false);
  const [form, setForm] = useState<State>(initialState);
  const styles = StyleSheet.create({
    modal: {padding: padding(6)},
    title: {paddingBottom: padding(4)},
  });
  const completeState = useMemo(
    () => ({
      rating: form.rating,
      feedback: form.feedback,
      navigatedToAppStore: navigatedToAppStore.current,
    }),
    [form.feedback, form.rating],
  );

  const handleReset = useCallback(() => {
    ratingRef.current = 0;
    setForm(initialState);
  }, []);

  const handleReviewApp = useCallback(() => {
    handleReset();
    onComplete({...completeState, navigatedToAppStore: true});
    Rate.rate(ratingOptions, () => undefined);
  }, [completeState, onComplete, handleReset]);

  const handleRating = useCallback((rating: number) => {
    ratingRef.current = rating;
    setForm(prev => ({...prev, rating}));
    setTimeout(() => {
      const success = ratingRef.current >= ratingMin;
      setForm(prev => ({...prev, modal: success ? 'review' : 'feedback'}));
    }, 300);
  }, []);

  const handleTextChange = useCallback((feedback: string) => {
    setForm(prev => ({...prev, feedback}));
  }, []);

  const handleFeedbackSubmit = useCallback(() => {
    setForm(prev => ({...prev, modal: 'thank you'}));
  }, []);

  const handleComplete = useCallback(() => {
    onComplete(completeState);
  }, [completeState, onComplete]);

  return (
    <Modal onBackgroundPress={handleComplete} showOverlay>
      {form.modal === 'review' ? (
        <>
          <Text
            center
            style={styles.title}
            title="Thank you for your feedback!"
            type="h4"
          />
          <Text
            center
            style={styles.title}
            title="Do you mind reviewing us on the app store?"
          />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              center
              color="secondary"
              onPress={handleComplete}
              title="No Thanks"
            />
            <Button
              center
              color="accent"
              onPress={handleReviewApp}
              title="Okay"
            />
          </View>
        </>
      ) : form.modal === 'feedback' ? (
        <>
          <Text
            center
            style={styles.title}
            title="Thank you for your rating!"
            type="h4"
          />
          <Text
            center
            style={styles.title}
            title="Could you provide us some additional feedback to help us improve?"
          />
          <Input
            onChangeText={handleTextChange}
            onSubmitEditing={handleFeedbackSubmit}
            placeholder="How can we improve?"
            value={form.feedback}
          />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              center
              color="secondary"
              onPress={handleComplete}
              title="No Thanks"
            />
            <Button
              center
              color="accent"
              onPress={handleFeedbackSubmit}
              title="Submit"
            />
          </View>
        </>
      ) : form.modal === 'thank you' ? (
        <>
          <Text
            center
            style={styles.title}
            title="Your feedback has been submitted!"
            type="h4"
          />
          <Text
            center
            style={styles.title}
            title="Our team will review your feedback in the next few days."
          />
          <Button
            center
            color="accent"
            onPress={handleComplete}
            title="Close"
          />
        </>
      ) : (
        <>
          <Text center style={styles.title} title="Hello!" type="h4" />
          <Text
            center
            style={styles.title}
            title="How are your enjoying the app so far? Please tap a star to rate the app."
          />
          <Rating
            count={5}
            onPress={handleRating}
            rating={form.rating}
            size={padding(8)}
          />
        </>
      )}
    </Modal>
  );
});
