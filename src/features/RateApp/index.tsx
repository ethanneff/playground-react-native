import React, { memo, useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Rate, { AndroidMarket } from "react-native-rate";
import StarRating from "react-native-star-rating";
import { Modal, Text, Button, TextInput } from "../../components";
import { Theme } from "../../utils";
import { useColor } from "../../hooks";

type ModalState = "default" | "thank you" | "review" | "feedback";
type State = {
  rating: number;
  modal: ModalState;
  feedback: string;
};
const initialState: State = {
  rating: 0,
  modal: "default",
  feedback: ""
};
const ratingMin = 5;
const ratingOptions = {
  AppleAppID: "899247664",
  GooglePackageName: "com.google.android.apps.maps", // TODO: use configs
  AmazonPackageName: "com.google.android.apps.maps",
  OtherAndroidURL: "http://www.mywebsite.com/app/47172391",
  preferredAndroidMarket: AndroidMarket.Google,
  preferInApp: true,
  openAppStoreIfInAppFails: true,
  fallbackPlatformURL: "http://www.mywebsite.com/myapp"
};

type CompleteState = {
  rating: number;
  feedback: string;
  navigatedToAppStore: boolean;
};

interface Props {
  onComplete: (completeState: CompleteState) => void;
}

export const RateApp = memo(function RateAppMemo({ onComplete }: Props) {
  const color = useColor();
  const ratingRef = useRef(0);
  const navigatedToAppStore = useRef(false);
  const [form, setForm] = useState<State>(initialState);
  const styles = StyleSheet.create({
    title: { paddingBottom: Theme.padding.p04 },
    modal: { padding: Theme.padding.p06 }
  });
  const completeState = {
    rating: form.rating,
    feedback: form.feedback,
    navigatedToAppStore: navigatedToAppStore.current
  };

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
    setForm(prev => ({ ...prev, rating }));
    setTimeout(() => {
      const success = ratingRef.current >= ratingMin;
      setForm(prev => ({ ...prev, modal: success ? "review" : "feedback" }));
    }, 300);
  }, []);

  const handleTextChange = useCallback((feedback: string) => {
    setForm(prev => ({ ...prev, feedback }));
  }, []);

  const handleFeedbackSubmit = useCallback(() => {
    setForm(prev => ({ ...prev, modal: "thank you" }));
  }, []);

  const handleComplete = useCallback(() => {
    onComplete(completeState);
  }, [completeState, onComplete]);

  return (
    <Modal onBackgroundPress={handleComplete}>
      <View style={styles.modal}>
        {form.modal === "review" ? 
          <>
            <Text
              h4
              title="Thank you for your feedback!"
              center
              style={styles.title}
            />
            <Text
              title="Do you mind reviewing us on the app store?"
              center
              style={styles.title}
            />
            <Button title="Okay" onPress={handleReviewApp} contained />
          </>
         : form.modal === "feedback" ? 
          <>
            <Text h4 title="Thank you" center style={styles.title} />
            <Text
              title="Can you provide us with some feedback to help us improve?"
              center
              style={styles.title}
            />
            <TextInput
              onSubmitEditing={handleFeedbackSubmit}
              value={form.feedback}
              onChangeText={handleTextChange}
              placeholder="How can we improve?"
            />
            <Button title="Submit" onPress={handleFeedbackSubmit} contained />
          </>
         : form.modal === "thank you" ? 
          <>
            <Text h4 title="Thank you" center style={styles.title} />
            <Text
              title="We have sent your feedback to our team"
              style={styles.title}
              center
            />
            <Button title="Close" onPress={handleComplete} contained />
          </>
         : 
          <>
            <Text
              h4
              title="How are you enjoying the app so far?"
              center
              style={styles.title}
            />
            <StarRating
              disabled={false}
              maxStars={5}
              starSize={Theme.padding.p10}
              rating={form.rating}
              fullStarColor={color.primary}
              selectedStar={handleRating}
              fullStar={"star"}
              emptyStar={"star-outline"}
              iconSet={"MaterialCommunityIcons"}
            />
          </>
        }
      </View>
    </Modal>
  );
});
