/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

export enum NetInfoStateType {
  Unknown = 'unknown',
  None = 'none',
  Cellular = 'cellular',
  Wifi = 'wifi',
  Bluetooth = 'bluetooth',
  Ethernet = 'ethernet',
  Wimax = 'wimax',
  Vpn = 'vpn',
  Other = 'other',
}

export enum NetInfoCellularGeneration {
  '2G' = '2G',
  '3G' = '3G',
  '4G' = '4G',
}
export interface NetInfoConnectedDetails {
  isConnectionExpensive: boolean;
}
interface NetInfoConnectedState<
  T extends NetInfoStateType,
  D extends any = any
> {
  type: T;
  isConnected: true;
  isInternetReachable: boolean | null;
  details: D & NetInfoConnectedDetails;
}
interface NetInfoDisconnectedState<T extends NetInfoStateType> {
  type: T;
  isConnected: false;
  isInternetReachable: false;
  details: null;
}
export type NetInfoUnknownState = NetInfoDisconnectedState<NetInfoStateType.Unknown>;
export type NetInfoNoConnectionState = NetInfoDisconnectedState<NetInfoStateType.None>;
export type NetInfoCellularState = NetInfoConnectedState<
  NetInfoStateType.Cellular,
  {
    cellularGeneration: NetInfoCellularGeneration | null;
  }
>;
export type NetInfoWifiState = NetInfoConnectedState<NetInfoStateType.Wifi>;
export type NetInfoBluetoothState = NetInfoConnectedState<NetInfoStateType.Bluetooth>;
export type NetInfoEthernetState = NetInfoConnectedState<NetInfoStateType.Ethernet>;
export type NetInfoWimaxState = NetInfoConnectedState<NetInfoStateType.Wimax>;
export type NetInfoVpnState = NetInfoConnectedState<NetInfoStateType.Vpn>;
export type NetInfoOtherState = NetInfoConnectedState<NetInfoStateType.Other>;
export type NetInfoState =
  | NetInfoUnknownState
  | NetInfoNoConnectionState
  | NetInfoCellularState
  | NetInfoWifiState
  | NetInfoBluetoothState
  | NetInfoEthernetState
  | NetInfoWimaxState
  | NetInfoVpnState
  | NetInfoOtherState;
export type NetInfoChangeHandler = (state: NetInfoState) => void;
export type NetInfoSubscription = () => void;
export {};
