import React, {memo, useCallback, useMemo, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import Rate, {AndroidMarket} from 'react-native-rate';
import {Button, Input, Modal, Text} from '../../components';
import {Theme} from '../../utils';
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
const ratingMin = 5;
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
    modal: {padding: Theme.padding.p06},
    title: {paddingBottom: Theme.padding.p04},
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
    setForm((prev) => ({...prev, rating}));
    setTimeout(() => {
      const success = ratingRef.current >= ratingMin;
      setForm((prev) => ({...prev, modal: success ? 'review' : 'feedback'}));
    }, 300);
  }, []);

  const handleTextChange = useCallback((feedback: string) => {
    setForm((prev) => ({...prev, feedback}));
  }, []);

  const handleFeedbackSubmit = useCallback(() => {
    setForm((prev) => ({...prev, modal: 'thank you'}));
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
          <Button onPress={handleReviewApp} title="Okay" />
        </>
      ) : form.modal === 'feedback' ? (
        <>
          <Text center style={styles.title} title="Thank you" type="h4" />
          <Text
            center
            style={styles.title}
            title="Can you provide us with some feedback to help us improve?"
          />
          <Input
            onChangeText={handleTextChange}
            onSubmitEditing={handleFeedbackSubmit}
            placeholder="How can we improve?"
            value={form.feedback}
          />
          <Button onPress={handleFeedbackSubmit} title="Submit" />
        </>
      ) : form.modal === 'thank you' ? (
        <>
          <Text center style={styles.title} title="Thank you" type="h4" />
          <Text
            center
            style={styles.title}
            title="We have sent your feedback to our team"
          />
          <Button onPress={handleComplete} title="Close" />
        </>
      ) : (
        <>
          <Text
            center
            style={styles.title}
            title="How are you enjoying the app so far?"
            type="h4"
          />
          <Rating
            count={5}
            onPress={handleRating}
            rating={form.rating}
            size={Theme.padding.p08}
          />
        </>
      )}
    </Modal>
  );
});
