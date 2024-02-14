import {
  type GestureResponderEvent,
  type NativeTouchEvent,
  type PointProp,
} from 'react-native';

type Touches = Record<string, PointProp>;

type Outcome = {
  pinch: boolean;
  spread: boolean;
};

export class GestureHandler {
  minTouches: number;

  finish: Touches = {};

  start: Touches = {};

  constructor({ minTouches = 2 } = {}) {
    this.minTouches = minTouches;
  }

  onPanResponderMove(event: GestureResponderEvent): void {
    const { touches } = event.nativeEvent;

    for (const touch of touches) {
      this.recordFinish(touch);
      this.recordStart(touch);
    }
  }

  onPanResponderRelease(): Outcome {
    const outcome = this.determineOutcome();
    this.start = {};
    this.finish = {};
    return outcome;
  }

  recordStart(touch: NativeTouchEvent): void {
    if (touch.identifier in this.start) return;
    this.start[touch.identifier] = {
      x: touch.locationX,
      y: touch.locationY,
    };
  }

  recordFinish(touch: NativeTouchEvent): void {
    this.finish[String(touch.identifier)] = {
      x: touch.locationX,
      y: touch.locationY,
    };
  }

  isSpread(touch: number): boolean {
    const center = this.determineCenter();
    const startXDistance = Math.abs(this.start[touch].x - center.x);
    const startYDistance = Math.abs(this.start[touch].y - center.y);
    const finishXDistance = Math.abs(this.finish[touch].x - center.x);
    const finishYDistance = Math.abs(this.finish[touch].y - center.y);
    return (
      startXDistance <= finishXDistance && startYDistance <= finishYDistance
    );
  }

  determineCenter(): { x: number; y: number } {
    const numberRecordedTouched = Object.keys(this.start).length;
    let x = 0;
    let y = 0;
    for (let index = 1; index <= numberRecordedTouched; index++) {
      const point = this.start[index];
      x += point.x;
      y += point.x;
    }

    return { x: x / numberRecordedTouched, y: y / numberRecordedTouched };
  }

  determineOutcome(): Outcome {
    const numberRecordedTouched = Object.keys(this.start).length;
    const outcome = {
      pinch: false,
      spread: false,
    };
    if (numberRecordedTouched < this.minTouches) return outcome;
    let spread = false;
    let pinch = false;
    for (let index = 1; index <= numberRecordedTouched; index++) {
      const isSpread = this.isSpread(index);
      const isPinch = !this.isSpread(index);
      if (isPinch && isSpread) return outcome;
      if (!isPinch && !isSpread) return outcome;
      if (isPinch && spread) return outcome;
      if (isSpread && pinch) return outcome;
      pinch = isPinch;
      spread = isSpread;
    }
    return { pinch, spread };
  }
}
