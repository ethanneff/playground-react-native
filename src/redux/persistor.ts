import DeviceInfo from 'react-native-device-info';
import { persistReducer } from 'redux-persist';
import { Storage } from '../conversions';
import { reducers } from './reducers';

const blacklist = ['gameOfLife', 'history'];
const key = DeviceInfo.getBundleId() || '123';
const persistConfig = { blacklist, key, storage: Storage };
export const persistedReducer = persistReducer(persistConfig, reducers);
