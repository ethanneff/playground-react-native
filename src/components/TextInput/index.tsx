import * as React from "react";
import { TextInput as Original, TextStyle } from "react-native";

interface Props {
  style?: TextStyle | {};
  placeholder?: string;
  value?: string;
  onChangeText?(text: string): void;
}

export class TextInput extends React.PureComponent<Props> {
  public render() {
    const { placeholder, onChangeText, value, style } = this.props;
    return (
      <Original
        style={style}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />
    );
  }
}
