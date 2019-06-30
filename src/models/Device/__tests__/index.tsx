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
  loadDevice,
  updateBattery,
  updateDimensions,
  updateFingerprint,
  updateNetwork
} from "..";
import { store } from "../../../containers";

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
    store.dispatch(updateDimensions(dimensionChange));
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
      type: getType(updateFingerprint)
    };
    expect(updateFingerprint(payload)).toEqual(expectedAction);
  });
  it("onDeviceUpdateBattery", () => {
    const payload = 2;
    const expectedAction = {
      payload,
      type: getType(updateBattery)
    };
    expect(updateBattery(payload)).toEqual(expectedAction);
  });
  it("loadDevice", () => {
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
      type: getType(loadDevice)
    };
    expect(loadDevice(payload)).toEqual(expectedAction);
  });
  it("updateNetwork", () => {
    const type: ConnectionType = "wifi";
    const effectiveType: EffectiveConnectionType = "2g";
    const payload = {
      effectiveType,
      type
    };
    const expectedAction = {
      payload,
      type: getType(updateNetwork)
    };
    expect(updateNetwork(payload)).toEqual(expectedAction);
  });
  it("updateDimensions", () => {
    const size = {
      fontScale: 1,
      height: 1,
      scale: 1,
      width: 1
    };
    const payload = { window: size, screen: size };
    const expectedAction = {
      payload,
      type: getType(updateDimensions)
    };
    expect(updateDimensions(payload)).toEqual(expectedAction);
  });
});

describe("reducer", () => {
  it("updateBattery", () => {
    const value = 22;
    expect(
      deviceReducer(deviceInitialState, {
        payload: value,
        type: getType(updateBattery)
      })
    ).toMatchObject({ batteryLevel: 22 });
  });
  it("updateFingerprint", () => {
    const value = true;
    expect(
      deviceReducer(deviceInitialState, {
        payload: value,
        type: getType(updateFingerprint)
      })
    ).toMatchObject({ isPinOrFingerprintSet: value });
  });
  it("loadDevice", () => {
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
        type: getType(loadDevice)
      })
    ).toEqual(data);
  });
  it("updateNetwork", () => {
    const value: ConnectionInfo = {
      effectiveType: "2g",
      type: "wifi"
    };
    expect(
      deviceReducer(deviceInitialState, {
        payload: value,
        type: getType(updateNetwork)
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
        type: getType(updateDimensions)
      })
    ).toMatchObject({ windowDimensions: size, screenDimensions: size });
  });
});
