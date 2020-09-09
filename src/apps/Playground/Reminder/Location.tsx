import React, {memo, useCallback} from 'react';

import {v4} from 'uuid';
import {Item} from './Item';

interface LocationItem {
  id: string;
  title: string;
  subtitle?: string;
}

export const Location = memo(function Location() {
  const locations: LocationItem[] = [
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
