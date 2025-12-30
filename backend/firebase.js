// backend/firebase.js
const admin = require('firebase-admin');

let serviceAccount;

try {
  const rawData = process.env.FIREBASE_SERVICE_ACCOUNT;
  
  // If it's already an object, use it. If it's a string, parse it.
  serviceAccount = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;

  if (serviceAccount && serviceAccount.private_key) {
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("✅ Firebase connection established");
  }
} catch (error) {
  console.error("❌ Firebase Error:", error.message);
}

const db = admin.firestore();
module.exports = { db };