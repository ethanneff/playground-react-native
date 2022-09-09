export const Firebase = {
  auth: () => ({ onAuthStateChanged: () => null }),
  crashlytics: () => null,
  firestore: () => ({ collection: () => null }),
};

type FirebaseAuthTypes = null;
export { type FirebaseAuthTypes };
