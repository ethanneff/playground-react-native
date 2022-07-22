import React from 'react';
import Original from 'react-native-toast-message';
import { MultiColor, spacing, useColors, useDropShadow } from '../../features';
import { Spacing } from '../Spacing';
import { Text } from '../Text';
import { View } from '../View';

export const Toast = Original;

type CustomToastProps = {
  center?: boolean;
  color: keyof MultiColor;
  description?: string;
  title: string;
};

type ToastProps = {
  props: CustomToastProps;
};

const CustomToast = ({
  description,
  title,
  color,
  center,
}: CustomToastProps) => {
  const colors = useColors();
  const dropShadow = useDropShadow();

  return (
    <View
      style={{
        borderTopColor: colors.background[color],
        borderTopWidth: spacing(1),
        justifyContent: 'center',
        padding: spacing(2),
        borderRadius: spacing(2),
        width: '90%',
        backgroundColor: colors.background.primaryA,
        ...dropShadow(4),
      }}
    >
      <Text
        bold
        center={center}
        title={title}
      />
      {description ? (
        <>
          <Spacing padding={1} />
          <Text
            center={center}
            emphasis="medium"
            title={description}
          />
        </>
      ) : null}
    </View>
  );
};

const PositiveToast = ({
  props: { description, title, center },
}: ToastProps) => {
  return (
    <CustomToast
      center={center}
      color="positive"
      description={description}
      title={title}
    />
  );
};

const WarningToast = ({
  props: { description, title, center },
}: ToastProps) => {
  return (
    <CustomToast
      center={center}
      color="warning"
      description={description}
      title={title}
    />
  );
};

const NegativeToast = ({
  props: { description, title, center },
}: ToastProps) => {
  return (
    <CustomToast
      center={center}
      color="negative"
      description={description}
      title={title}
    />
  );
};

const AccentToast = ({ props: { description, title, center } }: ToastProps) => {
  return (
    <CustomToast
      center={center}
      color="accent"
      description={description}
      title={title}
    />
  );
};

export const toastConfig = {
  positive: PositiveToast,
  negative: NegativeToast,
  warning: WarningToast,
  accent: AccentToast,
};
