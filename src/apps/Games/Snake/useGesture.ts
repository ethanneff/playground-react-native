import { PanResponder, PanResponderInstance } from "react-native";

export type Direction = "left" | "right" | "up" | "down";

export const useGesture = (
  next: (direction: Direction) => void
): PanResponderInstance => {
  const panGesture: PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderRelease: (_, g) => {
      if (Math.abs(g.dx) >= Math.abs(g.dy)) {
        next(g.dx >= 0 ? "right" : "left");
      } else {
        next(g.dy >= 0 ? "down" : "up");
      }
    }
  });

  return panGesture;
};
