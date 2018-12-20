import {
  ConnectionInfo,
  ConnectionType,
  EffectiveConnectionType
} from "react-native";
import {
  DeviceActionTypes,
  DeviceReducer,
  DimensionsProps,
  onDeviceLoad,
  onDeviceUpdateBattery,
  onDeviceUpdateFingerprint,
  onDimensionChange,
  onNetworkChange,
  selectHeight,
  selectLandscapeOrientation,
  selectLargestDimension,
  selectSmallestDimension,
  selectWidth
} from "..";
import { RootState } from "../../../utils";

describe("selectors with no initial state", () => {
  jest.mock("Dimensions", () => undefined);
  it("selectLandscapeOrientation null", () => {
    const state: RootState = {
      app: {},
      device: {}
    };
    expect(selectLandscapeOrientation(state)).toBe(false);
  });
  it("selectSmallestDimension null", () => {
    const state: RootState = {
      app: {},
      device: {}
    };
    expect(selectSmallestDimension(state)).toBe(750);
  });
  it("selectLargestDimension null", () => {
    const state: RootState = {
      app: {},
      device: {}
    };
    expect(selectLargestDimension(state)).toBe(1334);
  });
  it("selectHeight null", () => {
    const state: RootState = {
      app: {},
      device: {}
    };
    expect(selectHeight(state)).toBe(1334);
  });
  it("selectWidth null", () => {
    const state: RootState = {
      app: {},
      device: {}
    };
    expect(selectWidth(state)).toBe(750);
  });
});

describe("actions", () => {
  it("onDeviceUpdateFingerprint", () => {
    const payload = true;
    const expectedAction = {
      type: DeviceActionTypes.DEVICE_UPDATE_FINGERPRINT,
      payload
    };
    expect(onDeviceUpdateFingerprint(payload)).toEqual(expectedAction);
  });
  it("onDeviceUpdateBattery", () => {
    const payload = 2;
    const expectedAction = {
      type: DeviceActionTypes.DEVICE_UPDATE_BATTERY,
      payload
    };
    expect(onDeviceUpdateBattery(payload)).toEqual(expectedAction);
  });
  it("onDeviceLoad", () => {
    const payload = { manufacturer: "apple" };
    const expectedAction = {
      type: DeviceActionTypes.DEVICE_LOAD,
      payload
    };
    expect(onDeviceLoad(payload)).toEqual(expectedAction);
  });
  it("onNetworkChange", () => {
    const type: ConnectionType = "wifi";
    const effectiveType: EffectiveConnectionType = "2g";
    const payload = {
      type,
      effectiveType
    };
    const expectedAction = {
      type: DeviceActionTypes.DEVICE_UPDATE_NETWORK,
      payload
    };
    expect(onNetworkChange(payload)).toEqual(expectedAction);
  });
  it("onDimensionChange", () => {
    const size = {
      width: 1,
      height: 1,
      scale: 1,
      fontScale: 1
    };
    const payload = { window: size, screen: size };
    const expectedAction = {
      type: DeviceActionTypes.DEVICE_UPDATE_DIMENSION,
      payload
    };
    expect(onDimensionChange(payload)).toEqual(expectedAction);
  });
});

describe("selectors", () => {
  it("selectLandscapeOrientation", () => {
    const state: RootState = {
      app: {},
      device: {
        windowDimensions: {
          width: 123,
          height: 456,
          scale: 123,
          fontScale: 123
        }
      }
    };
    expect(selectLandscapeOrientation(state)).toBe(false);
  });
  it("selectLargestDimension", () => {
    const state: RootState = {
      app: {},
      device: {
        windowDimensions: {
          width: 123,
          height: 456,
          scale: 123,
          fontScale: 123
        }
      }
    };
    expect(selectLargestDimension(state)).toBe(456);
  });
  it("selectSmallestDimension", () => {
    const state: RootState = {
      app: {},
      device: {
        windowDimensions: {
          width: 123,
          height: 456,
          scale: 123,
          fontScale: 123
        }
      }
    };
    expect(selectSmallestDimension(state)).toBe(123);
  });
  it("selectHeight", () => {
    const state: RootState = {
      app: {},
      device: {
        windowDimensions: {
          width: 123,
          height: 456,
          scale: 123,
          fontScale: 123
        }
      }
    };
    expect(selectHeight(state)).toBe(456);
  });
  it("selectWidth", () => {
    const state: RootState = {
      app: {},
      device: {
        windowDimensions: {
          width: 123,
          height: 456,
          scale: 123,
          fontScale: 123
        }
      }
    };
    expect(selectWidth(state)).toBe(123);
  });
});

describe("reducer", () => {
  it("DEVICE_UPDATE_BATTERY", () => {
    const value = 22;
    expect(
      DeviceReducer(
        {},
        { type: DeviceActionTypes.DEVICE_UPDATE_BATTERY, payload: value }
      )
    ).toEqual({ batteryLevel: 22 });
  });
  it("DEVICE_UPDATE_FINGERPRINT", () => {
    const value = true;
    expect(
      DeviceReducer(
        {},
        { type: DeviceActionTypes.DEVICE_UPDATE_FINGERPRINT, payload: value }
      )
    ).toEqual({ isPinOrFingerprintSet: value });
  });
  it("DEVICE_LOAD", () => {
    const data = {
      manufacturer: "string",
      brand: "string",
      model: "string",
      deviceId: "string",
      systemName: "string",
      systemVersion: "string",
      deviceName: "string",
      userAgent: "string",
      deviceLocale: "string",
      deviceCountry: "string",
      timezone: "string",
      instanceId: "string",
      installReferrer: "string",
      isEmulator: true,
      isTablet: true,
      fontScale: 123,
      is24Hour: true,
      isPinOrFingerprintSet: true,
      firstInstallTime: 123,
      lastUpdateTime: 123
    };
    expect(
      DeviceReducer({}, { type: DeviceActionTypes.DEVICE_LOAD, payload: data })
    ).toEqual({
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
      systemName: "string",
      systemVersion: "string",
      timezone: "string",
      userAgent: "string"
    });
  });
  it("DEVICE_UPDATE_NETWORK", () => {
    const value: ConnectionInfo = {
      type: "wifi",
      effectiveType: "2g"
    };
    expect(
      DeviceReducer(
        {},
        { type: DeviceActionTypes.DEVICE_UPDATE_NETWORK, payload: value }
      )
    ).toEqual({ networkEffectiveType: "2g", networkType: "wifi" });
  });
  it("DEVICE_UPDATE_DIMENSION", () => {
    const data: DimensionsProps = {
      window: {
        width: 123,
        height: 123,
        scale: 123,
        fontScale: 123
      },
      screen: {
        width: 123,
        height: 123,
        scale: 123,
        fontScale: 123
      }
    };
    expect(
      DeviceReducer(
        {},
        { type: DeviceActionTypes.DEVICE_UPDATE_DIMENSION, payload: data }
      )
    ).toEqual({
      screenDimensions: {
        fontScale: 123,
        height: 123,
        scale: 123,
        width: 123
      },
      windowDimensions: {
        fontScale: 123,
        height: 123,
        scale: 123,
        width: 123
      }
    });
  });
});
