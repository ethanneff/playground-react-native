/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
Object.defineProperty(exports, '__esModule', { value: true });
exports.helloWorld = void 0;
const logger = require('firebase-functions/logger');
const https_1 = require('firebase-functions/v2/https');
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
exports.helloWorld = (0, https_1.onRequest)((_, response) => {
  logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from checklist!');
});
// # sourceMappingURL=checklist.js.map
