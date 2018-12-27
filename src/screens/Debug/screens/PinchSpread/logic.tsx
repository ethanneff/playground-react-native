import { NativeTouchEvent, PointPropType } from "react-native";

interface Touches {
  [key: string]: PointPropType;
}

interface Outcome {
  spread: boolean;
  pinch: boolean;
}

export class GestureHandler {
  private minTouches: number;
  private finish: Touches = {};
  private start: Touches = {};

  constructor({ minTouches = 4 } = {}) {
    this.minTouches = minTouches;
  }

  public onPanResponderMove(event: any) {
    const touches: NativeTouchEvent[] = event.nativeEvent.touches;
    touches.map((touch: NativeTouchEvent) => {
      this.recordFinish(touch);
      this.recordStart(touch);
    });
  }

  public onPanResponderRelease(): Outcome {
    const outcome = this.determineOutcome();
    this.start = {};
    this.finish = {};
    return outcome;
  }

  private recordStart(touch: NativeTouchEvent) {
    if (this.isStartAlreadyRecorded(touch)) {
      return;
    }
    this.start[String(touch.identifier)] = {
      x: touch.locationX,
      y: touch.locationY
    };
  }

  private isStartAlreadyRecorded(touch: NativeTouchEvent) {
    return this.start[String(touch.identifier)];
  }

  private recordFinish(touch: NativeTouchEvent) {
    this.finish[String(touch.identifier)] = {
      x: touch.locationX,
      y: touch.locationY
    };
  }

  private isSpread(
    start: PointPropType,
    finish: PointPropType,
    center: PointPropType
  ) {
    const startXDistance = Math.abs(start.x - center.x);
    const startYDistance = Math.abs(start.y - center.y);
    const finishXDistance = Math.abs(finish.x - center.x);
    const finishYDistance = Math.abs(finish.y - center.y);
    return (
      startXDistance <= finishXDistance && startYDistance <= finishYDistance
    );
  }

  private determineCenter(points: Touches) {
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

  private determineOutcome(): Outcome {
    const numRecordedTouched = Object.keys(this.start).length;
    const outcome = {
      spread: false,
      pinch: false
    };
    if (numRecordedTouched < this.minTouches) {
      return outcome;
    }
    let spread = false;
    let pinch = false;
    const center = this.determineCenter(this.start);
    for (let i = 1; i <= numRecordedTouched; i++) {
      const start = this.start[i];
      const finish = this.finish[i];
      const isPinch = !this.isSpread(start, finish, center);
      const isSpread = this.isSpread(start, finish, center);
      if (isPinch && isSpread) {
        return outcome;
      }
      if (!isPinch && !isSpread) {
        return outcome;
      }
      if (isPinch && spread) {
        return outcome;
      }
      if (isSpread && pinch) {
        return outcome;
      }
      pinch = isPinch;
      spread = isSpread;
    }
    return { spread, pinch };
  }
}
