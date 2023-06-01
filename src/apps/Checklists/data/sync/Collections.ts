import { Firebase } from '../../../../conversions';

export const Collections = {
  auth: Firebase.auth(),
  checklists: Firebase.firestore().collection('checklists-checklists'),
  users: Firebase.firestore().collection('users'),
};
