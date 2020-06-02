import React, {memo} from 'react';
import {Screen, Text} from '../../../../components';
import {useNav} from '../../../../hooks';

export default memo(function PlaygroundFonts() {
  const nav = useNav();

  return (
    <Screen onLeftPress={nav.to('playground')} title="Fonts" scroll>
      <Text
        type="h1"
        title="H1: The quick brown fox jumps over the lazy dog."
      />
      <Text type="h2" title="h2 The quick brown fox jumps over the lazy dog." />
      <Text
        type="h3"
        title="H3: The quick brown fox jumps over the lazy dog."
      />
      <Text
        type="h4"
        title="H4: The quick brown fox jumps over the lazy dog."
      />
      <Text
        type="h5"
        title="H5: The quick brown fox jumps over the lazy dog."
      />
      <Text
        type="h6"
        title="H6: The quick brown fox jumps over the lazy dog."
      />
      <Text
        type="subtitle1"
        title="SUBTITLE1: The quick brown fox jumps over the lazy dog."
      />
      <Text
        type="subtitle2"
        title="SUBTITLE2: The quick brown fox jumps over the lazy dog."
      />
      <Text
        type="body1"
        title="BODY1: The quick brown fox jumps over the lazy dog."
      />
      <Text
        type="body2"
        title="BODY2: The quick brown fox jumps over the lazy dog."
      />
      <Text
        type="overline"
        title="OVERLINE: The quick brown fox jumps over the lazy dog."
      />
      <Text
        type="caption"
        title="CAPTION: The quick brown fox jumps over the lazy dog."
      />
      <Text
        type="button"
        title="BUTTON: The quick brown fox jumps over the lazy dog."
      />
      <Text title="NOTHING: The quick brown fox jumps over the lazy dog." />
    </Screen>
  );
});
