import React, { memo } from "react";
import { View } from "react-native";
import { Button } from "../../../../components";

interface Props {
  buttons: string[];
  horizontal?: boolean;
  value: string;
  onChange: (id: string) => () => void;
}

export default memo(function Radio(props: Props) {
  return (
    <View
      style={{
        justifyContent: "center",
        flexDirection: props.horizontal ? "row" : "column"
      }}
    >
      {props.buttons.map(button => 
        <Button
          emphasis="high"
          color={props.value === button ? "primary" : "secondary"}
          title={button}
          key={button}
          onPress={props.onChange(button)}
        />
      )}
    </View>
  );
});
