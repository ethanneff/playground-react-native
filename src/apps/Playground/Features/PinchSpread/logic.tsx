import {
  GestureResponderEvent,
  NativeTouchEvent,
  PointPropType,
} from 'react-native';

interface Touches {
  [key: string]: PointPropType;
}

interface Outcome {
  pinch: boolean;
  spread: boolean;
}

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
    if (this.isStartAlreadyRecorded(touch)) return;

    this.start[String(touch.identifier)] = {
      x: touch.locationX,
      y: touch.locationY,
    };
  }

  isStartAlreadyRecorded(touch: NativeTouchEvent): PointPropType {
    return this.start[String(touch.identifier)];
  }

  recordFinish(touch: NativeTouchEvent): void {
    this.finish[String(touch.identifier)] = {
      x: touch.locationX,
      y: touch.locationY,
    };
  }

  isSpread(
    start: PointPropType,
    finish: PointPropType,
    center: PointPropType,
  ): boolean {
    const startXDistance = Math.abs(start.x - center.x);
    const startYDistance = Math.abs(start.y - center.y);
    const finishXDistance = Math.abs(finish.x - center.x);
    const finishYDistance = Math.abs(finish.y - center.y);
    return (
      startXDistance <= finishXDistance && startYDistance <= finishYDistance
    );
  }

  determineCenter(points: Touches): { x: number; y: number } {
    const numRecordedTouched = Object.keys(points).length;
    let x = 0;
    let y = 0;
    for (let i = 1; i <= numRecordedTouched; i++) {
      const point = points[i];
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
    const center = this.determineCenter(this.start);
    for (let i = 1; i <= numRecordedTouched; i++) {
      const start = this.start[i];
      const finish = this.finish[i];
      const isPinch = !this.isSpread(start, finish, center);
      const isSpread = this.isSpread(start, finish, center);
      if (isPinch && isSpread) return outcome;

      if (!isPinch && !isSpread) return outcome;

      if (isPinch && spread) return outcome;

      if (isSpread && pinch) return outcome;

      pinch = isPinch;
      spread = isSpread;
    }
    return { spread, pinch };
  }
}
