import { MMKVLoader } from 'react-native-mmkv-storage';
export const Storage = new MMKVLoader().withEncryption().initialize();
