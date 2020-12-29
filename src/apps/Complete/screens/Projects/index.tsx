import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {LayoutChangeEvent, View} from 'react-native';
import {Screen} from '../../../../components';
import {useColor} from '../../../../hooks';
import {useRootSelector} from '../../../../utils';
import {
  HandleKeyboard,
  ListAdd,
  ListContainer,
  ListHeader,
  ListItems,
} from '../../components';
import {config} from '../../configs';
import {getCategoryListIds} from '../../models';

// TODO: add journal
// TODO: add historical data
// TODO: add purpose
// TODO: add goals

export const Projects = memo(function Projects() {
  const color = useColor();
  const {navigate} = useNavigation();

  const listIds = useRootSelector(getCategoryListIds);

  const navNext = useCallback(() => {
    navigate('Project');
  }, [navigate]);

  const [dimensions, setDimensions] = useState(0);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const {height} = event.nativeEvent.layout;
      if (dimensions > 0) {
        return;
      }
      setDimensions(height);
    },
    [dimensions],
  );

  const maxHeight = dimensions / 2 - config.padding * 10;

  return (
    <Screen onRightPress={navNext} title="Projects">
      <HandleKeyboard
        backgroundColor={color.surface}
        onLayout={onLayout}
        render={dimensions > 0}>
        <View style={{padding: config.padding}}>
          {listIds.map((listId) => (
            <ListContainer key={listId}>
              <ListHeader listId={listId} />
              <ListItems listId={listId} maxHeight={maxHeight} />
              <ListAdd
                buttonTitle="Add project"
                inputPlaceholder="Project title..."
                listId={listId}
              />
            </ListContainer>
          ))}
        </View>
      </HandleKeyboard>
    </Screen>
  );
});
