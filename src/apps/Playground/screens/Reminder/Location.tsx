import React, {memo, useCallback} from 'react';
import 'react-native-get-random-values';
import {v4} from 'uuid';
import {Item} from './Item';

interface Location {
  id: string;
  title: string;
  subtitle?: string;
}

export default memo(function Location() {
  const locations: Location[] = [
    {
      id: v4(),
      title: 'Home',
      subtitle: 'Tap to add',
    },
    {
      id: v4(),
      title: 'Work',
      subtitle: 'Tap to add',
    },
    {
      id: v4(),
      title: 'Gym',
      subtitle: 'Tap to add',
    },
    {
      id: v4(),
      title: 'Add a new location',
    },
  ];

  const onPress = useCallback(() => undefined, []);

  return (
    <>
      {locations.map((location, index) => (
        <Item
          description={location.subtitle}
          key={location.id}
          marginBottom={index !== locations.length - 1}
          onPress={onPress}
          title={location.title}
        />
      ))}
    </>
  );
});
