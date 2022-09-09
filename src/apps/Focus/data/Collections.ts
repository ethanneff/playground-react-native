import { Firebase } from '../../../conversions';

export const Collections = {
  auth: Firebase.auth(),
  goals: Firebase.firestore().collection('goals'),
  intervals: Firebase.firestore().collection('intervals'),
  preferences: Firebase.firestore().collection('preferences'),
  users: Firebase.firestore().collection('users'),
};
