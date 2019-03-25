import {
  ConnectionInfo,
  ConnectionType,
  EffectiveConnectionType
} from "react-native";
import { getType } from "typesafe-actions";
import {
  deviceInitialState,
  deviceReducer,
  DimensionsProps,
  getHeight,
  getLandscapeOrientation,
  getLargestDimension,
  getSmallestDimension,
  getWidth,
  onBatteryChange,
  onDeviceLoad,
  onDimensionChange,
  onFingerprintChange,
  onNetworkChange
} from "..";
import { store } from "../../../models";

describe("selectors", () => {
  beforeEach(() => {
    const dimensionChange = {
      screen: {
        fontScale: 0,
        height: 0,
        scale: 0,
        width: 0
      },
      window: {
        fontScale: 123,
        height: 456,
        scale: 123,
        width: 123
      }
    };
    store.dispatch(onDimensionChange(dimensionChange));
  });

  it("getLandscapeOrientation", () => {
    expect(getLandscapeOrientation(store.getState())).toBe(false);
  });
  it("getLargestDimension", () => {
    expect(getLargestDimension(store.getState())).toBe(456);
  });
  it("getSmallestDimension", () => {
    expect(getSmallestDimension(store.getState())).toBe(123);
  });
  it("getHeight", () => {
    expect(getHeight(store.getState())).toBe(456);
  });
  it("getWidth", () => {
    expect(getWidth(store.getState())).toBe(123);
  });
});

describe("selectors with no initial state", () => {
  it("getLandscapeOrientation null", () => {
    expect(getLandscapeOrientation(store.getState())).toBe(false);
  });
  it("getSmallestDimension null", () => {
    expect(getSmallestDimension(store.getState())).toBe(123);
  });
  it("getLargestDimension null", () => {
    expect(getLargestDimension(store.getState())).toBe(456);
  });
  it("getHeight null", () => {
    expect(getHeight(store.getState())).toBe(456);
  });
  it("getWidth null", () => {
    expect(getWidth(store.getState())).toBe(123);
  });
});

describe("actions", () => {
  it("onDeviceUpdateFingerprint", () => {
    const payload = true;
    const expectedAction = {
      payload,
      type: getType(onFingerprintChange)
    };
    expect(onFingerprintChange(payload)).toEqual(expectedAction);
  });
  it("onDeviceUpdateBattery", () => {
    const payload = 2;
    const expectedAction = {
      payload,
      type: getType(onBatteryChange)
    };
    expect(onBatteryChange(payload)).toEqual(expectedAction);
  });
  it("onDeviceLoad", () => {
    const size = {
      fontScale: 1,
      height: 1,
      scale: 1,
      width: 1
    };
    const payload = {
      manufacturer: "apple",
      screenDimensions: size,
      windowDimensions: size
    };
    const expectedAction = {
      payload,
      type: getType(onDeviceLoad)
    };
    expect(onDeviceLoad(payload)).toEqual(expectedAction);
  });
  it("onNetworkChange", () => {
    const type: ConnectionType = "wifi";
    const effectiveType: EffectiveConnectionType = "2g";
    const payload = {
      effectiveType,
      type
    };
    const expectedAction = {
      payload,
      type: getType(onNetworkChange)
    };
    expect(onNetworkChange(payload)).toEqual(expectedAction);
  });
  it("onDimensionChange", () => {
    const size = {
      fontScale: 1,
      height: 1,
      scale: 1,
      width: 1
    };
    const payload = { window: size, screen: size };
    const expectedAction = {
      payload,
      type: getType(onDimensionChange)
    };
    expect(onDimensionChange(payload)).toEqual(expectedAction);
  });
});

describe("reducer", () => {
  it("onBatteryChange", () => {
    const value = 22;
    expect(
      deviceReducer(deviceInitialState, {
        payload: value,
        type: getType(onBatteryChange)
      })
    ).toMatchObject({ batteryLevel: 22 });
  });
  it("onFingerprintChange", () => {
    const value = true;
    expect(
      deviceReducer(deviceInitialState, {
        payload: value,
        type: getType(onFingerprintChange)
      })
    ).toMatchObject({ isPinOrFingerprintSet: value });
  });
  it("onDeviceLoad", () => {
    const size = {
      fontScale: 1,
      height: 1,
      scale: 1,
      width: 1
    };
    const data = {
      brand: "string",
      deviceCountry: "string",
      deviceId: "string",
      deviceLocale: "string",
      deviceName: "string",
      firstInstallTime: 123,
      fontScale: 123,
      installReferrer: "string",
      instanceId: "string",
      is24Hour: true,
      isEmulator: true,
      isPinOrFingerprintSet: true,
      isTablet: true,
      lastUpdateTime: 123,
      manufacturer: "string",
      model: "string",
      screenDimensions: size,
      systemName: "string",
      systemVersion: "string",
      timezone: "string",
      userAgent: "string",
      windowDimensions: size
    };
    expect(
      deviceReducer(deviceInitialState, {
        payload: data,
        type: getType(onDeviceLoad)
      })
    ).toEqual(data);
  });
  it("onNetworkChange", () => {
    const value: ConnectionInfo = {
      effectiveType: "2g",
      type: "wifi"
    };
    expect(
      deviceReducer(deviceInitialState, {
        payload: value,
        type: getType(onNetworkChange)
      })
    ).toMatchObject({ networkEffectiveType: "2g", networkType: "wifi" });
  });
  it("DEVICE_UPDATE_DIMENSION", () => {
    const size = {
      fontScale: 123,
      height: 123,
      scale: 123,
      width: 123
    };
    const data: DimensionsProps = {
      screen: size,
      window: size
    };
    expect(
      deviceReducer(deviceInitialState, {
        payload: data,
        type: getType(onDimensionChange)
      })
    ).toMatchObject({ windowDimensions: size, screenDimensions: size });
  });
});
