import React, {ReactNode, memo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useColor, useDropShadow} from '../../hooks';
import {Theme, useRootSelector} from '../../utils';
import {Card} from '../Card';
import {TouchableOpacity} from '../TouchableOpacity';

interface Props {
  testID?: string;
  elevation?: number;
  maxHeight?: number;
  maxWidth?: number;
  noScroll?: boolean;
  onBackgroundPress?(): void;
  children: ReactNode | ReactNode[];
}
export const Modal = memo(function ModalWrapperMemo({
  testID,
  onBackgroundPress,
  children,
  elevation = 4,
  noScroll,
  maxWidth = 500,
  maxHeight,
}: Props) {
  const appHeight = useRootSelector((state) => state.dimension.window.height);
  const maximumHeight = maxHeight ? maxHeight : appHeight * 0.6;
  const color = useColor();
  const dropShadow = useDropShadow();
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
    },
    modal: {
      backgroundColor: color.background,
      borderRadius: Theme.sizing.borderRadius,
      maxHeight: maximumHeight,
      maxWidth,
      overflow: 'hidden',
      position: 'absolute',
      width: '80%',
      ...dropShadow(10),
    },
    modalContent: {
      padding: Theme.padding.p08,
    },
    overlay: {
      backgroundColor: Theme.color.overlay,
      flex: 1,
      width: '100%',
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onBackgroundPress}
        style={styles.overlay}
        testID={testID}
      />
      <Card
        elevation={elevation}
        noMargin
        noPadding
        style={styles.modal}
        testID="modal">
        {noScroll ? (
          <View style={styles.modalContent}>{children}</View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.modalContent}
            keyboardShouldPersistTaps="handled">
            {children}
          </ScrollView>
        )}
      </Card>
    </View>
  );
});
