import { Dayjs } from "dayjs";
import React, { memo, useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Icon, Text } from "../../../../components";
import { Theme } from "../../../../utils";
import { useColor } from "../../../../hooks";

const initialState = [
  {
    title: "Home",
    subtitle: "Tap to add"
  },
  {
    title: "Work",
    subtitle: "Tap to add"
  },
  {
    title: "Add a new location",
    subtitle: null
  }
];

interface Props {
  onLocationPress: () => void;
}

export default memo(function Location({ onLocationPress }: Props) {
  const [locations, setLocations] = useState(initialState);
  const color = useColor();

  const handlePress = () => {
    console.log("here");
  };

  return (
    <ScrollView>
      {locations.map((location, index) => 
        <TouchableOpacity
          key={location.title}
          style={{
            flexDirection: "row",
            height: Theme.padding.p15,
            justifyContent: "space-between",
            borderColor: color.secondary,
            borderWidth: 1,
            marginBottom: index !== locations.length - 1 ? Theme.padding.p02 : 0
          }}
          onPress={handlePress}
        >
          {!location.subtitle ? 
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                paddingHorizontal: Theme.padding.p02
              }}
            >
              <Text h4 title={location.title} />
            </View>
           : 
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                paddingHorizontal: Theme.padding.p02
              }}
            >
              <Text h4 title={location.title} />
              <Text title={location.subtitle} />
            </View>
          }
        </TouchableOpacity>
      )}
    </ScrollView>
  );
});
