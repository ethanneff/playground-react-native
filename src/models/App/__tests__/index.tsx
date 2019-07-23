import { AppStateStatus } from "react-native";
import { getType } from "typesafe-actions";
import {
  appInitialState,
  appReducer,
  AppState,
  changeAppStatus,
  changeKeyboardStatus,
  getAppStatus,
  getKeyboardVisible,
  loadApp
} from "..";
import { store } from "../../../containers";
import { logout } from "../../Auth";

describe("selectors", () => {
  it("getAppStatus", () => {
    const value = "background";
    store.dispatch(changeAppStatus(value));
    expect(getAppStatus(store.getState())).toEqual(value);
  });
  it("changeKeyboardStatus", () => {
    const value = true;
    store.dispatch(changeKeyboardStatus(value));
    expect(getKeyboardVisible(store.getState())).toEqual(value);
  });
});

describe("actions", () => {
  it("loadApp", () => {
    const payload: AppState = {
      ...appInitialState,
      version: "123"
    };
    const expectedAction = {
      payload,
      type: getType(loadApp)
    };
    expect(loadApp(payload)).toEqual(expectedAction);
  });
  it("changeAppStatus", () => {
    const payload = "background";
    const expectedAction = {
      payload,
      type: getType(changeAppStatus)
    };
    expect(changeAppStatus(payload)).toEqual(expectedAction);
  });
  it("changeKeyboardStatus", () => {
    const payload = true;
    const expectedAction = {
      payload,
      type: getType(changeKeyboardStatus)
    };
    expect(changeKeyboardStatus(payload)).toEqual(expectedAction);
  });
});

describe("reducer", () => {
  it("loadApp", () => {
    const status: AppStateStatus = "active";
    const payload = {
      ...appInitialState,
      appVersion: "12",
      keyboardVisible: false,
      status
    };
    const action = {
      payload,
      type: getType(loadApp)
    };
    expect(appReducer(appInitialState, action)).toEqual(payload);
  });
  it("changeKeyboardStatus", () => {
    expect(
      appReducer(appInitialState, {
        payload: true,
        type: getType(changeKeyboardStatus)
      })
    ).toEqual({ ...appInitialState, keyboardVisible: true });
  });
  it("loadApp", () => {
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
      type: getType(loadApp)
    };
    expect(appReducer(appInitialState, action)).toEqual({
      ...appInitialState,
      ...action.payload
    });
  });
  it("logout", () => {
    expect(
      appReducer(appInitialState, {
        type: getType(logout)
      })
    ).toMatchObject(appInitialState);
  });
});
