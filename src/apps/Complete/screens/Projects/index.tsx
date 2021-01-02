import React, {memo, useCallback, useState} from 'react';
import {LayoutChangeEvent, View} from 'react-native';
import {HandleKeyboard, Screen} from '../../../../components';
import {useColor} from '../../../../hooks';
import {useRootSelector} from '../../../../utils';
import {List} from '../../components';
import {config} from '../../configs';
import {getCategoryListIds} from '../../models';

// TODO: add journal
// TODO: add historical data
// TODO: add purpose
// TODO: add goals

// TODO: render as <Board />

export const Projects = memo(function Projects() {
  const color = useColor();
  const listIds = useRootSelector(getCategoryListIds);
  const [dimensions, setDimensions] = useState(0);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const {height} = event.nativeEvent.layout;
      if (dimensions > 0) return;

      setDimensions(height);
    },
    [dimensions],
  );

  const maxHeight = dimensions / 2 - config.padding * 10;

  return (
    <Screen title="Projects">
      <HandleKeyboard
        backgroundColor={color.surface}
        onLayout={onLayout}
        render={dimensions > 0}>
        <View style={{padding: config.padding}}>
          {listIds.map((listId) => (
            <List
              key={listId}
              listId={listId}
              listMaxHeight={maxHeight}
              placeholder="List title..."
              title="Add list"
            />
          ))}
        </View>
      </HandleKeyboard>
    </Screen>
  );
});
