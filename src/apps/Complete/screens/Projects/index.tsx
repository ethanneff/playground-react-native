import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {LayoutChangeEvent, View} from 'react-native';
import {KeyboardHandler, Screen} from '../../../../components';
import {useColor} from '../../../../hooks';
import {useRootSelector} from '../../../../utils';
import {List} from '../../components';
import {config} from '../../configs';
import {getCategoryBoardId} from '../../models';

// TODO: add journal
// TODO: add historical data
// TODO: add purpose
// TODO: add goals

// TODO: render as <Board />

export const Projects = memo(function Projects() {
  const color = useColor();
  const {navigate} = useNavigation();
  const boardId = useRootSelector(getCategoryBoardId);
  const listIds = useRootSelector((s) => s.completeBoard.items[boardId].lists);
  const [dimensions, setDimensions] = useState(0);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const {height} = event.nativeEvent.layout;
      if (dimensions > 0) return;

      setDimensions(height);
    },
    [dimensions],
  );

  const maxHeight = dimensions / 2 - config.padding * 11;

  const navToAccount = useCallback(() => navigate('account'), [navigate]);

  return (
    <Screen onRightPress={navToAccount} rightIcon="account" title="Projects">
      <KeyboardHandler
        backgroundColor={color.surface}
        onLayout={onLayout}
        render={dimensions > 0}>
        <View style={{padding: config.padding}}>
          {listIds.map((listId) => (
            <List
              boardId={boardId}
              key={listId}
              listId={listId}
              listMaxHeight={maxHeight}
              placeholder="List title..."
              title="Add list"
            />
          ))}
        </View>
      </KeyboardHandler>
    </Screen>
  );
});
