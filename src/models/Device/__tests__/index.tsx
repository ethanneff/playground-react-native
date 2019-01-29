import {
  ConnectionInfo,
  ConnectionType,
  EffectiveConnectionType
} from "react-native";
import {
  DeviceActionTypes,
  deviceReducer,
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
import { RootState } from "../../../models";

describe("selectors with no initial state", () => {
  jest.mock("Dimensions", () => undefined);
  it("selectLandscapeOrientation null", () => {
    const state: RootState = {
      app: {},
      device: {},
      items: {},
      lists: {}
    };
    expect(selectLandscapeOrientation(state)).toBe(false);
  });
  it("selectSmallestDimension null", () => {
    const state: RootState = {
      app: {},
      device: {},
      items: {},
      lists: {}
    };
    expect(selectSmallestDimension(state)).toBe(750);
  });
  it("selectLargestDimension null", () => {
    const state: RootState = {
      app: {},
      device: {},
      items: {},
      lists: {}
    };
    expect(selectLargestDimension(state)).toBe(1334);
  });
  it("selectHeight null", () => {
    const state: RootState = {
      app: {},
      device: {},
      items: {},
      lists: {}
    };
    expect(selectHeight(state)).toBe(1334);
  });
  it("selectWidth null", () => {
    const state: RootState = {
      app: {},
      device: {},
      items: {},
      lists: {}
    };
    expect(selectWidth(state)).toBe(750);
  });
});

describe("actions", () => {
  it("onDeviceUpdateFingerprint", () => {
    const payload = true;
    const expectedAction = {
      payload,
      type: DeviceActionTypes.DEVICE_UPDATE_FINGERPRINT
    };
    expect(onDeviceUpdateFingerprint(payload)).toEqual(expectedAction);
  });
  it("onDeviceUpdateBattery", () => {
    const payload = 2;
    const expectedAction = {
      payload,
      type: DeviceActionTypes.DEVICE_UPDATE_BATTERY
    };
    expect(onDeviceUpdateBattery(payload)).toEqual(expectedAction);
  });
  it("onDeviceLoad", () => {
    const payload = { manufacturer: "apple" };
    const expectedAction = {
      payload,
      type: DeviceActionTypes.DEVICE_LOAD
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
      type: DeviceActionTypes.DEVICE_UPDATE_NETWORK
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
      type: DeviceActionTypes.DEVICE_UPDATE_DIMENSION
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
          fontScale: 123,
          height: 456,
          scale: 123,
          width: 123
        }
      },
      items: {},
      lists: {}
    };
    expect(selectLandscapeOrientation(state)).toBe(false);
  });
  it("selectLargestDimension", () => {
    const state: RootState = {
      app: {},
      device: {
        windowDimensions: {
          fontScale: 123,
          height: 456,
          scale: 123,
          width: 123
        }
      },
      items: {},
      lists: {}
    };
    expect(selectLargestDimension(state)).toBe(456);
  });
  it("selectSmallestDimension", () => {
    const state: RootState = {
      app: {},
      device: {
        windowDimensions: {
          fontScale: 123,
          height: 456,
          scale: 123,
          width: 123
        }
      },
      items: {},
      lists: {}
    };
    expect(selectSmallestDimension(state)).toBe(123);
  });
  it("selectHeight", () => {
    const state: RootState = {
      app: {},
      device: {
        windowDimensions: {
          fontScale: 123,
          height: 456,
          scale: 123,
          width: 123
        }
      },
      items: {},
      lists: {}
    };
    expect(selectHeight(state)).toBe(456);
  });
  it("selectWidth", () => {
    const state: RootState = {
      app: {},
      device: {
        windowDimensions: {
          fontScale: 123,
          height: 456,
          scale: 123,
          width: 123
        }
      },
      items: {},
      lists: {}
    };
    expect(selectWidth(state)).toBe(123);
  });
});

describe("reducer", () => {
  it("DEVICE_UPDATE_BATTERY", () => {
    const value = 22;
    expect(
      deviceReducer(
        {},
        {
          payload: value,
          type: DeviceActionTypes.DEVICE_UPDATE_BATTERY
        }
      )
    ).toEqual({ batteryLevel: 22 });
  });
  it("DEVICE_UPDATE_FINGERPRINT", () => {
    const value = true;
    expect(
      deviceReducer(
        {},
        {
          payload: value,
          type: DeviceActionTypes.DEVICE_UPDATE_FINGERPRINT
        }
      )
    ).toEqual({ isPinOrFingerprintSet: value });
  });
  it("DEVICE_LOAD", () => {
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
      systemName: "string",
      systemVersion: "string",
      timezone: "string",
      userAgent: "string"
    };
    expect(
      deviceReducer(
        {},
        {
          payload: data,
          type: DeviceActionTypes.DEVICE_LOAD
        }
      )
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
      effectiveType: "2g",
      type: "wifi"
    };
    expect(
      deviceReducer(
        {},
        {
          payload: value,
          type: DeviceActionTypes.DEVICE_UPDATE_NETWORK
        }
      )
    ).toEqual({ networkEffectiveType: "2g", networkType: "wifi" });
  });
  it("DEVICE_UPDATE_DIMENSION", () => {
    const data: DimensionsProps = {
      screen: {
        fontScale: 123,
        height: 123,
        scale: 123,
        width: 123
      },
      window: {
        fontScale: 123,
        height: 123,
        scale: 123,
        width: 123
      }
    };
    expect(
      deviceReducer(
        {},
        {
          payload: data,
          type: DeviceActionTypes.DEVICE_UPDATE_DIMENSION
        }
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
