import { useIsFocused } from '@react-navigation/native';
import React, { memo, useEffect, useRef } from 'react';
import {
  Button,
  Modal,
  Spacing,
  Text,
  TextInput,
  type TextInputRef,
  View,
} from '../../../../components';
import { spacing } from '../../../../features';

type Props = {
  loading: boolean;
  onChangeText: (value: string) => void;
  onModalClose: () => void;
  onSubmit: () => void;
};

export const CreateGoalModal = memo(function CreateGoalModal({
  loading,
  onChangeText,
  onModalClose,
  onSubmit,
}: Props) {
  const inputGoal = useRef<TextInputRef>(null);
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
      <Spacing padding={2} />
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
});
