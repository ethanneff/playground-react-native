import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useState } from 'react';
import {
  Alert,
  Button,
  Input,
  Loading,
  Modal,
  Notification,
  Screen,
  ScrollView,
  Text,
} from '../../../../components';
import { RateApp, spacing, useColors } from '../../../../features';
import { Reminders } from './Reminders';

type Modal =
  | 'action-sheet'
  | 'alert'
  | 'loading'
  | 'login'
  | 'modal-keyboard'
  | 'modal-large'
  | 'modal-small'
  | 'notification'
  | 'rate-app'
  | 'reminder'
  | null;

type ModalManagerProps = {
  modal: Modal;
  onClose: (modal: Modal) => () => void;
};

const ModalManager = memo(function ModalManager({
  modal,
  onClose,
}: ModalManagerProps) {
  const handleClose = useCallback(() => {
    onClose(null)();
  }, [onClose]);
  const [value, setValue] = useState<string>('');
  const handleTextChange = useCallback((v: string) => {
    setValue(v);
  }, []);

  switch (modal) {
    case 'rate-app':
      return <RateApp onComplete={handleClose} />;
    case 'reminder':
      return <Reminders onComplete={handleClose} />;
    case 'alert':
      return (
        <Alert
          description="do not do this"
          onBackgroundPress={handleClose}
          onCancelPress={handleClose}
          onConfirmPress={handleClose}
          title="warning"
        />
      );
    case 'modal-small':
      return (
        <Modal
          onBackgroundPress={handleClose}
          showOverlay
        >
          <Text title="Hello" />
        </Modal>
      );
    case 'modal-large':
      return (
        <Modal
          onBackgroundPress={handleClose}
          showOverlay
        >
          <Text
            title="Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello"
            type="h1"
          />
        </Modal>
      );
    case 'modal-keyboard':
      return (
        <Modal
          onBackgroundPress={handleClose}
          showOverlay
        >
          <Text
            title="hello hello hello hello"
            type="h1"
          />

          <Input
            onChangeText={handleTextChange}
            title="hello"
            value={value}
          />
        </Modal>
      );
    case 'loading':
      return <Loading onBackgroundPress={handleClose} />;
    case 'notification':
      return (
        <Notification
          onCancel={handleClose}
          title="bob"
        />
      );
    default:
      return null;
  }
});

export const Modals = memo(function Modals() {
  const { goBack } = useNavigation();
  const colors = useColors();
  const [modal, setModal] = useState<Modal>(null);
  const handleModalChange = useCallback(
    (nextModal: Modal) => () => {
      setModal(nextModal);
    },
    [],
  );

  return (
    <>
      <Screen
        dropShadow
        onLeftPress={goBack}
        title="Reminder"
      >
        <ScrollView
          contentContainerStyle={{ padding: spacing(4) }}
          style={{ backgroundColor: colors.background.secondary }}
        >
          <Text
            emphasis="low"
            title="Components"
            type="h4"
          />
          <Button
            onPress={handleModalChange('loading')}
            title="loading"
          />
          <Button
            onPress={handleModalChange('action-sheet')}
            title="action sheet ❌ need to build"
          />
          <Button
            onPress={handleModalChange('notification')}
            title="notification ❌ missing background"
          />
          <Button
            onPress={handleModalChange('alert')}
            title="alert"
          />
          <Button
            onPress={handleModalChange('modal-large')}
            title="Modal large"
          />
          <Button
            onPress={handleModalChange('modal-small')}
            title="Modal small"
          />
          <Button
            onPress={handleModalChange('modal-keyboard')}
            title="Modal keyboard"
          />
          <Text
            emphasis="low"
            title="Features"
            type="h4"
          />
          <Button
            onPress={handleModalChange('reminder')}
            title="Reminder ❌ incomplete"
          />
          <Button
            onPress={handleModalChange('rate-app')}
            title="Rate app ✅"
          />
          <Button
            onPress={handleModalChange('login')}
            title="login ❌ incomplete"
          />
          <Text
            center
            emphasis="low"
            title="Reminders"
            type="h4"
          />
          {/* {form.reminders.map((reminder, index) => (
            <Text
              key={reminder.id}
              title={reminder.format}
              type={index === form.reminders.length - 1 ? 'button' : undefined}
            />
          ))} */}
        </ScrollView>
      </Screen>
      <ModalManager
        modal={modal}
        onClose={handleModalChange}
      />
      {/* {showRate && <RateApp onComplete={handleRate(false)} />}
      {form.modals.createReminder && (
        <CreateReminderModal
          onBackgroundPress={handleCreateReminderClose}
          onLocationPress={handleLocation}
          onOneTimePress={handleOneTimeReminder}
        />
      )}
      {form.modals.customDate && (
        <Modal onBackgroundPress={handleCustomDateClose} showOverlay>
          <Text title="hello" />
        </Modal>
      )}
      {form.modals.location && (
        <Modal onBackgroundPress={handleLocationClose} showOverlay>
          <Text title="location" />
        </Modal>
      )} */}
    </>
  );
});
