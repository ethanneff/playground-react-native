import { Firebase } from '../../../conversions';

export const Collections = {
  auth: Firebase.auth(),
  goals: Firebase.firestore().collection('focus-goals'),
  intervals: Firebase.firestore().collection('focus-intervals'),
  preferences: Firebase.firestore().collection('focus-preferences'),
  users: Firebase.firestore().collection('focus-users'),
};
