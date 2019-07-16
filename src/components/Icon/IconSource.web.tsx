// TODO: icons for web
import * as React from "react";
import { Text } from "../Text";

interface Props {
  name: string;
  size: number;
  color: string;
  invisible?: boolean;
}

export class IconSource extends React.PureComponent<Props> {
  public render() {
    const { name } = this.props;
    return <Text title={name} />;
  }
}
