export const Firebase = {
  auth: () => ({ onAuthStateChanged: () => null }),
  firestore: () => ({ collection: () => null }),
  crashlytics: () => null,
};

type FirebaseAuthTypes = null;
export { type FirebaseAuthTypes };
