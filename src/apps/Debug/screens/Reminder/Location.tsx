import React, { memo } from "react";
import "react-native-get-random-values";
import { v4 } from "uuid";
import { Item } from "./Item";

interface Location {
  id: string;
  title: string;
  subtitle?: string;
}

export default memo(function Location() {
  const locations: Location[] = [
    {
      id: v4(),
      title: "Home",
      subtitle: "Tap to add"
    },
    {
      id: v4(),
      title: "Work",
      subtitle: "Tap to add"
    },
    {
      id: v4(),
      title: "Gym",
      subtitle: "Tap to add"
    },
    {
      id: v4(),
      title: "Add a new location"
    }
  ];

  return (
    <>
      {locations.map((location, index) => 
        <Item
          key={location.id}
          onPress={() => undefined}
          title={location.title}
          description={location.subtitle}
          marginBottom={index !== locations.length - 1}
        />
      )}
    </>
  );
});
