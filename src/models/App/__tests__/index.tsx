import { AppStateStatus } from "react-native";
import {
  AppActionTypes,
  appReducer,
  onAppLoad,
  onAppStateChange,
  selectAppStatus
} from "..";
import { RootState } from "../../../models";

describe("device", () => {
  describe("selectors", () => {
    it("selectAppStatus", () => {
      const status: AppStateStatus = "background";
      const state: RootState = {
        app: {
          status
        },
        device: {},
        items: {},
        lists: {}
      };
      expect(selectAppStatus(state)).toEqual(status);
    });
  });

  describe("actions", () => {
    it("onAppLoad", () => {
      const payload = { version: "background" };
      const expectedAction = {
        payload,
        type: AppActionTypes.APP_LOAD
      };
      expect(onAppLoad(payload)).toEqual(expectedAction);
    });

    it("onAppStateChange", () => {
      const payload = "background";
      const expectedAction = {
        payload,
        type: AppActionTypes.APP_UPDATE_STATUS
      };
      expect(onAppStateChange(payload)).toEqual(expectedAction);
    });
  });

  describe("reducer", () => {
    it("APP_UPDATE_STATUS", () => {
      expect(
        appReducer(undefined, {
          payload: "active",
          type: AppActionTypes.APP_UPDATE_STATUS
        })
      ).toEqual({ status: "active" });
    });

    it("APP_LOAD", () => {
      expect(
        appReducer(
          {
            status: "active"
          },
          {
            payload: {
              appVersion: "string",
              applicationName: "string",
              buildNumber: "string",
              buildVersion: "string",
              bundleIdentifier: "string",
              readableVersion: "string",
              version: "string"
            },
            type: AppActionTypes.APP_LOAD
          }
        )
      ).toEqual({
        appVersion: "string",
        applicationName: "string",
        buildNumber: "string",
        buildVersion: "string",
        bundleIdentifier: "string",
        readableVersion: "string",
        status: "active",
        version: "string"
      });
    });
  });
});
