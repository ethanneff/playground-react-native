import React, { memo, useCallback } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { Text } from "../../../../components";
import { Theme } from "../../../../utils";
import { useColor } from "../../../../hooks";
import "react-native-get-random-values";
import { v4 } from "uuid";

interface Location {
  id: string;
  title: string;
  subtitle?: string;
}

interface Props {
  onLocationPress: (id: string) => () => void;
}

export default memo(function Location({ onLocationPress }: Props) {
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

  const color = useColor();

  const keyExtractor = (item: Location) => item.id;

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <TouchableOpacity
          key={item.title}
          style={{
            flexDirection: "row",
            height: Theme.padding.p15,
            justifyContent: "space-between",
            borderColor: color.secondary,
            borderWidth: 1,
            marginBottom: index !== locations.length - 1 ? Theme.padding.p02 : 0
          }}
          onPress={onLocationPress(item.id)}
        >
          {!item.subtitle ? 
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                paddingHorizontal: Theme.padding.p02
              }}
            >
              <Text h4 title={item.title} />
            </View>
           : 
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                paddingHorizontal: Theme.padding.p02
              }}
            >
              <Text h4 title={item.title} />
              <Text title={item.subtitle} />
            </View>
          }
        </TouchableOpacity>
      );
    },
    [color.secondary, locations.length, onLocationPress]
  );

  return (
    <FlatList
      bounces
      data={locations}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
});
