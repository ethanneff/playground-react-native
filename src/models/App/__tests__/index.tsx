import { AppStateStatus } from "react-native";
import { getType } from "typesafe-actions";
import {
  appInitialState,
  appReducer,
  AppState,
  getAppStatus,
  getKeyboardVisible,
  onAppLoad,
  onAppStatusChange,
  onKeyboardChange
} from "..";
import { store } from "../../../models";

describe("selectors", () => {
  it("getAppStatus", () => {
    const value = "background";
    store.dispatch(onAppStatusChange(value));
    expect(getAppStatus(store.getState())).toEqual(value);
  });
  it("onKeyboardChange", () => {
    const value = true;
    store.dispatch(onKeyboardChange(value));
    expect(getKeyboardVisible(store.getState())).toEqual(value);
  });
});

describe("actions", () => {
  it("onAppLoad", () => {
    const payload: AppState = {
      ...appInitialState,
      version: "123"
    };
    const expectedAction = {
      payload,
      type: getType(onAppLoad)
    };
    expect(onAppLoad(payload)).toEqual(expectedAction);
  });
  it("onAppStatusChange", () => {
    const payload = "background";
    const expectedAction = {
      payload,
      type: getType(onAppStatusChange)
    };
    expect(onAppStatusChange(payload)).toEqual(expectedAction);
  });
  it("onKeyboardChange", () => {
    const payload = true;
    const expectedAction = {
      payload,
      type: getType(onKeyboardChange)
    };
    expect(onKeyboardChange(payload)).toEqual(expectedAction);
  });
});

describe("reducer", () => {
  it("onAppLoad", () => {
    const status: AppStateStatus = "active";
    const payload = {
      appVersion: "12",
      keyboardVisible: false,
      status
    };
    const action = {
      payload,
      type: getType(onAppLoad)
    };
    expect(appReducer(appInitialState, action)).toEqual(payload);
  });
  it("onKeyboardChange", () => {
    expect(
      appReducer(appInitialState, {
        payload: true,
        type: getType(onKeyboardChange)
      })
    ).toEqual({ ...appInitialState, keyboardVisible: true });
  });
  it("onAppLoad", () => {
    const status: AppStateStatus = "active";
    const action = {
      payload: {
        appVersion: "string",
        applicationName: "string",
        buildNumber: "string",
        buildVersion: "string",
        bundleIdentifier: "string",
        keyboardVisible: false,
        readableVersion: "string",
        status,
        version: "string"
      },
      type: getType(onAppLoad)
    };
    expect(appReducer(appInitialState, action)).toEqual({
      ...appInitialState,
      ...action.payload
    });
  });
});
