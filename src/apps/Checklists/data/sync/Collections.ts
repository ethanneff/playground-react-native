import { Firebase } from '../../../../conversions';

export const Collections = {
  auth: Firebase.auth(),
  checklist: Firebase.firestore().collection('checklist'),
  user: Firebase.firestore().collection('user'),
};
