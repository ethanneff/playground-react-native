import {
  GestureResponderEvent,
  NativeTouchEvent,
  PointProp,
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
    touches.forEach((touch: NativeTouchEvent) => {
      this.recordFinish(touch);
      this.recordStart(touch);
    });
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
    const numRecordedTouched = Object.keys(this.start).length;
    let x = 0;
    let y = 0;
    for (let i = 1; i <= numRecordedTouched; i++) {
      const point = this.start[i];
      x += point.x;
      y += point.x;
    }

    return { x: x / numRecordedTouched, y: y / numRecordedTouched };
  }

  determineOutcome(): Outcome {
    const numRecordedTouched = Object.keys(this.start).length;
    const outcome = {
      pinch: false,
      spread: false,
    };
    if (numRecordedTouched < this.minTouches) return outcome;
    let spread = false;
    let pinch = false;
    for (let i = 1; i <= numRecordedTouched; i++) {
      const isSpread = this.isSpread(i);
      const isPinch = !this.isSpread(i);
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
