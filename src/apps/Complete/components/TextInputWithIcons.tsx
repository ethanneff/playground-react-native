import React, {
  memo,
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {LayoutChangeEvent, TextInput as Original, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Icon, TextInput} from '../../../components';
import {PointerEvents} from '../../../components/TextInput/types';
import {useColor} from '../../../hooks';
import {FontType, Theme} from '../../../utils';

type Icon = {
  name: string;
  onPress: (text: string) => void;
  hidden?: boolean;
  color?: string;
  focus?: boolean;
  required?: boolean;
};

type TextInputWithIconsProps = {
  value: string;
  placeholder: string;
  icons: Icon[];
  onRef?: MutableRefObject<Original | null>;
  onSubmit: (text: string) => void;
  backgroundColor?: string;
  pointerEvents?: PointerEvents;
  type?: FontType;
  focusOnLoad?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  blurOnSubmit?: boolean;
  multiline?: boolean;
  maxIconHeight?: number;
  editable?: boolean;
  notRequired?: boolean;
  numberOfLines?: number;
};

export const TextInputWithIcons = memo(function TextInputWithIcons({
  value,
  multiline,
  maxIconHeight = Theme.padding.p06,
  placeholder,
  backgroundColor,
  editable,
  pointerEvents,
  focusOnLoad,
  icons,
  type,
  onSubmit,
  blurOnSubmit,
  onFocus,
  notRequired,
  numberOfLines,
  onBlur,
  onRef,
}: TextInputWithIconsProps) {
  const color = useColor();
  const bgColor = backgroundColor || color.background;
  const [text, setText] = useState(value);
  const [showControls, setShowControls] = useState(false);

  const onTextChange = useCallback((change) => {
    setText(change);
  }, []);

  const onFocusInternal = useCallback(() => {
    setShowControls(true);
    if (onFocus) onFocus();
  }, [onFocus]);

  const onSubmitInternal = useCallback(() => {
    const result = text.trim();
    if (!notRequired && result.length === 0) return;
    onSubmit(result);
    if (value === '') setText('');
  }, [notRequired, onSubmit, text, value]);

  const onBlurInternal = useCallback(() => {
    setText(value);
    setShowControls(false);
    if (onBlur) onBlur();
  }, [onBlur, value]);

  const onIconPressInternal = useCallback(
    (callback) => () => {
      callback(text);
      if (value === '') setText('');
    },
    [text, value],
  );
  const [containerHeight, setContainerHeight] = useState(0);
  const iconHeight = containerHeight - Theme.padding.p04;
  const clampIconHeight =
    iconHeight > maxIconHeight ? maxIconHeight : iconHeight;

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      if (containerHeight) return;
      setContainerHeight(e.nativeEvent.layout.height);
    },
    [containerHeight],
  );

  const onIconParentPress = useCallback((e) => e.preventDefault(), []);

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <View
      onLayout={onLayout}
      style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
      <TextInput
        backgroundColor={bgColor}
        blurOnSubmit={blurOnSubmit}
        editable={editable}
        flex
        focusOnLoad={focusOnLoad}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onBlur={onBlurInternal}
        onChangeText={onTextChange}
        onFocus={onFocusInternal}
        onRef={onRef}
        onSubmitEditing={onSubmitInternal}
        placeholder={placeholder}
        pointerEvents={pointerEvents}
        returnKeyType="done"
        type={type}
        value={text}
      />
      <TouchableWithoutFeedback
        onPress={onIconParentPress}
        style={{flexDirection: 'row'}}>
        {icons.map((icon) =>
          icon.hidden ||
          (showControls && !icon.focus) ||
          (!showControls && icon.focus) ? null : (
            <Icon
              color={icon.color}
              disabled={icon.required && text.trim().length === 0}
              key={`${icon.name}-focus`}
              name={icon.name}
              onPress={onIconPressInternal(icon.onPress)}
              padded
              size={clampIconHeight}
            />
          ),
        )}
      </TouchableWithoutFeedback>
    </View>
  );
});
