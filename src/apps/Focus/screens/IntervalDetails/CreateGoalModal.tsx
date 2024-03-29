import React, { useEffect, useRef } from 'react';
import {
  Button,
  Modal,
  Spacing,
  Text,
  TextInput,
  View,
  type TextInputReference,
} from '../../../../components';
import { useIsFocused } from '../../../../conversions';
import { spacing } from '../../../../features';

type Properties = {
  readonly loading: boolean;
  readonly onChangeText: (value: string) => void;
  readonly onModalClose: () => void;
  readonly onSubmit: () => void;
};

export const CreateGoalModal = ({
  loading,
  onChangeText,
  onModalClose,
  onSubmit,
}: Properties) => {
  const inputGoal = useRef<TextInputReference>(null);
  const focus = useIsFocused();

  useEffect(() => {
    if (!focus) return;
    inputGoal.current?.focus();
  }, [focus]);

  return (
    <Modal
      onBackgroundPress={onModalClose}
      showOverlay
    >
      <Text
        emphasis="medium"
        title="Create Goal"
        type="h4"
      />
      <Spacing padding={spacing(2)} />
      <TextInput
        autoCapitalize="sentences"
        autoComplete="off"
        autoCorrect
        backgroundColor="secondary"
        blurOnSubmit
        editable={!loading}
        keyboardType="default"
        onChangeText={onChangeText}
        onRef={inputGoal}
        onSubmitEditing={onSubmit}
        placeholder="Complete..."
        returnKeyType="done"
        textContentType="none"
        title="Goal name"
        value=""
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingTop: spacing(4),
        }}
      >
        <Button
          emphasis="high"
          onPress={onModalClose}
          title="cancel"
        />
        <Button
          color="accent"
          emphasis="high"
          onPress={onSubmit}
          title="create"
        />
      </View>
    </Modal>
  );
};
