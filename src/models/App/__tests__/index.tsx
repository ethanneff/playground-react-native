import { AppStateStatus } from "react-native";
import {
  AppActionTypes,
  AppReducer,
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
        items: {},
        device: {}
      };
      expect(selectAppStatus(state)).toEqual(status);
    });
  });

  describe("actions", () => {
    it("onAppLoad", () => {
      const payload = { version: "background" };
      const expectedAction = {
        type: AppActionTypes.APP_LOAD,
        payload
      };
      expect(onAppLoad(payload)).toEqual(expectedAction);
    });

    it("onAppStateChange", () => {
      const payload = "background";
      const expectedAction = {
        type: AppActionTypes.APP_UPDATE_STATUS,
        payload
      };
      expect(onAppStateChange(payload)).toEqual(expectedAction);
    });
  });

  describe("reducer", () => {
    it("APP_UPDATE_STATUS", () => {
      expect(
        AppReducer(undefined, {
          type: AppActionTypes.APP_UPDATE_STATUS,
          payload: "active"
        })
      ).toEqual({ status: "active" });
    });

    it("APP_LOAD", () => {
      expect(
        AppReducer(
          {
            status: "active"
          },
          {
            type: AppActionTypes.APP_LOAD,
            payload: {
              appVersion: "string",
              buildVersion: "string",
              bundleIdentifier: "string",
              applicationName: "string",
              buildNumber: "string",
              version: "string",
              readableVersion: "string"
            }
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
