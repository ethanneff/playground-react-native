import React, { memo } from "react";
import { View } from "react-native";
import { Button } from "../../../../components";

interface Props {
  buttons: string[];
  horizontal?: boolean;
  value?: string;
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
          key={button}
          title={button}
          primary={button === props.value}
          onPress={props.onChange(button)}
        />
      )}
    </View>
  );
});
