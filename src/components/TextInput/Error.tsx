import * as React from "react";
import { Button } from "..";

interface Props {
  error?: string;
  onPress(): void;
}

export class Error extends React.PureComponent<Props> {
  private icon = "alert-circle";
  public render() {
    const { error, onPress } = this.props;
    const icon = error && this.icon;
    const message = error || " ";
    return (
      <Button
        label
        wrap
        lowercase
        activeOpacity={1}
        icon={icon}
        title={message}
        danger
        onPress={onPress}
      />
    );
  }
}
