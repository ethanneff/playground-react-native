import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const accountCreate = functions.auth.user().onCreate(async (user) => {
  const facebookLogin = user.providerData.find(
    (data) => data.providerId === 'facebook.com',
  );
  if (!facebookLogin) return;
  try {
    await admin.auth().updateUser(user.uid, { emailVerified: true });
  } catch (err) {
    console.log('err when verifying email', err);
  }
});
