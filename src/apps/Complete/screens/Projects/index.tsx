import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {LayoutChangeEvent, View} from 'react-native';
import {KeyboardHandler, Screen} from '../../../../components';
import {useColor} from '../../../../hooks';
import {config, useRootSelector} from '../../../../utils';
import {List} from '../../components';
import {getProjects} from '../../models';
import {completeConfig} from '../../utils';
import {useKeyboardHeight} from '../../utils/useKeyboardHeight';

// TODO: add journal
// TODO: add historical data
// TODO: add purpose
// TODO: add goals

// TODO: render as <Board />

export const Projects = memo(function Projects() {
  const color = useColor();
  const {navigate} = useNavigation();
  const [dimensions, setDimensions] = useState(0);
  const keyboardHeight = useKeyboardHeight();
  const itemId = useRootSelector(getProjects);
  if (!itemId) throw new Error('missing item id');
  const keyboardPadding = config.padding(keyboardHeight ? 16 : 35);
  const maxHeight = dimensions - keyboardHeight - keyboardPadding;

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (dimensions > 0) return;
      setDimensions(event.nativeEvent.layout.height);
    },
    [dimensions],
  );

  const navToAccount = useCallback(() => navigate('account'), [navigate]);

  return (
    <Screen onRightPress={navToAccount} rightIcon="account" title="Implement">
      <KeyboardHandler backgroundColor={color.surface} onLayout={onLayout}>
        <View style={{padding: completeConfig.padding, maxHeight}}>
          <List
            itemId={itemId}
            key={itemId}
            parentItemId={null}
            placeholder="Item title..."
            title="Add item"
          />
        </View>
      </KeyboardHandler>
    </Screen>
  );
});
