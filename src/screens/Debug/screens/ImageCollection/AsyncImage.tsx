import * as React from "react";
import { ActivityIndicator, ImageBackground } from "react-native";

interface Props {
  uri: string;
  height: number;
  width: number;
  color?: string;
  size?: number | "small" | "large";
}

interface State {
  loaded: boolean;
}

export class AsyncImage extends React.PureComponent<Props, State> {
  public state = {
    loaded: false
  };

  public render() {
    const { uri, height, width, color = "black", size = "small" } = this.props;
    const { loaded } = this.state;
    const opacity = loaded ? 0 : 1;

    return (
      <ImageBackground
        source={{ uri }}
        style={{ width, height }}
        onLoad={this.onImageLoad}
      >
        <ActivityIndicator
          size={size}
          color={color}
          style={{ width, height, opacity }}
        />
      </ImageBackground>
    );
  }

  private onImageLoad = () => {
    this.setState({ loaded: true });
  };
}
