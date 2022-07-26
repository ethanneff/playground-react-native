import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export const Firebase = {
  auth,
  crashlytics,
  firestore,
};
export { FirebaseAuthTypes, FirebaseFirestoreTypes };
