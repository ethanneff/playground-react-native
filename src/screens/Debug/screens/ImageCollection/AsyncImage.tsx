import * as React from "react";
import { ActivityIndicator, Animated, StyleSheet, View } from "react-native";

interface Props {
  uri: string;
  height: number;
  width: number;
  color?: string;
  size?: number | "small" | "large";
}

export class AsyncImage extends React.PureComponent<Props> {
  private styles = StyleSheet.create({
    indicatorOverlay: {
      justifyContent: "center",
      position: "absolute"
    }
  });
  private imageAnimated = new Animated.Value(0);
  private indicatorAnimated = new Animated.Value(1);

  public render() {
    const { uri, height, width, color = "black", size = "small" } = this.props;
    const containerStyle = { width, height };
    const imageStyle = [containerStyle, { opacity: this.imageAnimated }];
    const indicatorStyle = [
      containerStyle,
      { opacity: this.indicatorAnimated },
      this.styles.indicatorOverlay
    ];
    return (
      <View style={containerStyle}>
        <Animated.Image
          source={{ uri }}
          style={imageStyle}
          onLoad={this.onImageLoad}
        />
        <Animated.View style={indicatorStyle}>
          <ActivityIndicator size={size} color={color} />
        </Animated.View>
      </View>
    );
  }

  private onImageLoad = () => {
    Animated.parallel([
      Animated.timing(this.indicatorAnimated, {
        toValue: 0,
        useNativeDriver: true
      }),
      Animated.timing(this.imageAnimated, {
        toValue: 1,
        useNativeDriver: true
      })
    ]).start();
  };
}
