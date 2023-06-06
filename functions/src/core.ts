/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as logger from 'firebase-functions/logger';
import { onRequest } from 'firebase-functions/v2/https';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((_, response) => {
  logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from core!');
});
