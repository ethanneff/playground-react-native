import React, {memo, useCallback} from 'react';
import {Screen, Text} from '../../../components';
import {useNav} from '../../../hooks';

export default memo(function PlaygroundFonts() {
  const nav = useNav();
  const navBack = useCallback(nav('playground'), [nav]);

  return (
    <Screen onLeftPress={navBack} title="Fonts">
      <Text
        title="H1: The quick brown fox jumps over the lazy dog."
        type="h1"
      />
      <Text title="h2 The quick brown fox jumps over the lazy dog." type="h2" />
      <Text
        title="H3: The quick brown fox jumps over the lazy dog."
        type="h3"
      />
      <Text
        title="H4: The quick brown fox jumps over the lazy dog."
        type="h4"
      />
      <Text
        title="H5: The quick brown fox jumps over the lazy dog."
        type="h5"
      />
      <Text
        title="H6: The quick brown fox jumps over the lazy dog."
        type="h6"
      />
      <Text
        title="SUBTITLE1: The quick brown fox jumps over the lazy dog."
        type="subtitle1"
      />
      <Text
        title="SUBTITLE2: The quick brown fox jumps over the lazy dog."
        type="subtitle2"
      />
      <Text
        title="BODY1: The quick brown fox jumps over the lazy dog."
        type="body1"
      />
      <Text
        title="BODY2: The quick brown fox jumps over the lazy dog."
        type="body2"
      />
      <Text
        title="OVERLINE: The quick brown fox jumps over the lazy dog."
        type="overline"
      />
      <Text
        title="CAPTION: The quick brown fox jumps over the lazy dog."
        type="caption"
      />
      <Text
        title="BUTTON: The quick brown fox jumps over the lazy dog."
        type="button"
      />
      <Text title="NOTHING: The quick brown fox jumps over the lazy dog." />
    </Screen>
  );
});
