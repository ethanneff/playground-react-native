import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import firestore from '@react-native-firebase/firestore';

export const Firebase = {
  auth,
  crashlytics,
  firestore,
};

export { FirebaseAuthTypes } from '@react-native-firebase/auth';
export { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
