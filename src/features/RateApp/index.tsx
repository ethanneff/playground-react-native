import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import Rate, { AndroidMarket } from 'react-native-rate';
import { Button, Input, Modal, Text, View } from '../../components';
import { spacing } from '../Config';
import { Rating } from './Rating';

type ModalState = 'default' | 'feedback' | 'review' | 'thank you';
type State = {
  feedback: string;
  modal: ModalState;
  rating: number;
};
const initialState: State = {
  feedback: '',
  modal: 'default',
  rating: 0,
};
const ratingMin = 4;
const ratingOptions = {
  // TODO: use configs
  AmazonPackageName: 'com.google.android.apps.maps',

  AppleAppID: '899247664',
  GooglePackageName: 'com.google.android.apps.maps',
  OtherAndroidURL: 'http://www.mywebsite.com/app/47172391',
  fallbackPlatformURL: 'http://www.mywebsite.com/myapp',
  openAppStoreIfInAppFails: true,
  preferInApp: true,
  preferredAndroidMarket: AndroidMarket.Google,
};

type CompleteState = {
  feedback: string;
  navigatedToAppStore: boolean;
  rating: number;
};

type Props = {
  readonly onComplete: (completeState: CompleteState) => void;
};

export const RateApp = ({ onComplete }: Props) => {
  const ratingRef = useRef(0);
  const navigatedToAppStore = useRef(false);
  const [form, setForm] = useState<State>(initialState);
  const styles = StyleSheet.create({
    title: { paddingBottom: spacing(4) },
  });
  const completeState = useMemo(
    () => ({
      feedback: form.feedback,
      navigatedToAppStore: navigatedToAppStore.current,
      rating: form.rating,
    }),
    [form.feedback, form.rating],
  );

  const handleReset = useCallback(() => {
    ratingRef.current = 0;
    setForm(initialState);
  }, []);

  const handleReviewApp = useCallback(() => {
    handleReset();
    onComplete({ ...completeState, navigatedToAppStore: true });
    Rate.rate(ratingOptions, () => undefined);
  }, [completeState, onComplete, handleReset]);

  const handleRating = useCallback((rating: number) => {
    ratingRef.current = rating;
    setForm((prev) => ({ ...prev, rating }));
    setTimeout(() => {
      const success = ratingRef.current >= ratingMin;
      setForm((prev) => ({ ...prev, modal: success ? 'review' : 'feedback' }));
    }, 200);
  }, []);

  const handleTextChange = useCallback((feedback: string) => {
    setForm((prev) => ({ ...prev, feedback }));
  }, []);

  const handleFeedbackSubmit = useCallback(() => {
    setForm((prev) => ({ ...prev, modal: 'thank you' }));
  }, []);

  const handleComplete = useCallback(() => {
    onComplete(completeState);
  }, [completeState, onComplete]);

  return (
    <Modal
      onBackgroundPress={handleComplete}
      showOverlay
    >
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
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
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
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
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
          <Text
            center
            style={styles.title}
            title="Hello!"
            type="h4"
          />
          <Text
            center
            style={styles.title}
            title="How are your enjoying the app so far? Please tap a star to rate the app."
          />
          <Rating
            count={5}
            onPress={handleRating}
            rating={form.rating}
            size={spacing(8)}
          />
        </>
      )}
    </Modal>
  );
};
