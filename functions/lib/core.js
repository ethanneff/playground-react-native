Object.defineProperty(exports, '__esModule', { value: true });
exports.accountCreate = void 0;
const admin = require('firebase-admin');
const functions = require('firebase-functions');
exports.accountCreate = functions.auth.user().onCreate(async (user) => {
  try {
    await admin.auth().updateUser(user.uid, { emailVerified: true });
  } catch (err) {
    console.log('err when verifying email', err);
  }
});
// # sourceMappingURL=core.js.map
