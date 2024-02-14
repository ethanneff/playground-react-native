import React from 'react';

import {
  spacing,
  useColors,
  useDropShadow,
  type MultiColor,
} from '../../features';
import { Spacing } from '../Spacing';
import { Text } from '../Text';
import { View } from '../View';

type CustomToastProperties = {
  readonly center?: boolean;
  readonly color: keyof MultiColor;
  readonly description?: string;
  readonly title: string;
};

type ToastProperties = {
  readonly props: CustomToastProperties;
};

const CustomToast = ({
  center,
  color,
  description,
  title,
}: CustomToastProperties) => {
  const colors = useColors();
  const dropShadow = useDropShadow();

  return (
    <View
      style={{
        backgroundColor: colors.background.primaryA,
        borderRadius: spacing(2),
        borderTopColor: colors.border[color],
        borderTopWidth: spacing(1),
        justifyContent: 'center',
        padding: spacing(4),
        width: '90%',
        ...dropShadow(4),
      }}
    >
      <Text
        center={center}
        title={title}
        type="h6"
      />
      {description ? (
        <>
          <Spacing padding={spacing(1)} />
          <Text
            center={center}
            emphasis="high"
            title={description}
          />
        </>
      ) : null}
    </View>
  );
};

const PositiveToast = ({
  props: { center, description, title },
}: ToastProperties) => (
  <CustomToast
    center={center}
    color="positive"
    description={description}
    title={title}
  />
);

const WarningToast = ({
  props: { center, description, title },
}: ToastProperties) => (
  <CustomToast
    center={center}
    color="warning"
    description={description}
    title={title}
  />
);

const NegativeToast = ({
  props: { center, description, title },
}: ToastProperties) => (
  <CustomToast
    center={center}
    color="negative"
    description={description}
    title={title}
  />
);

const AccentToast = ({
  props: { center, description, title },
}: ToastProperties) => (
  <CustomToast
    center={center}
    color="accent"
    description={description}
    title={title}
  />
);

export const toastConfig = {
  accent: AccentToast,
  negative: NegativeToast,
  positive: PositiveToast,
  warning: WarningToast,
};

export { default as Toast } from 'react-native-toast-message';
