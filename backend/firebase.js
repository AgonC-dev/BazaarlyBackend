const admin = require('firebase-admin');

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT env variable not set');
}

// Fix potential newline issues in the private key string
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (serviceAccount.private_key) {
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
module.exports = { db };