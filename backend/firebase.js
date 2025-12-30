// backend/firebase.js
const admin = require('firebase-admin');

try {
  const rawData = process.env.FIREBASE_SERVICE_ACCOUNT;
  
  if (!rawData) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT is missing!");
  }

  // Parse the string into an object
  let serviceAccount = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;

  // This part is the most important:
  if (serviceAccount.private_key) {
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("✅ Connected to Firebase Project:", serviceAccount.project_id);
  }
} catch (error) {
  console.error("❌ Firebase Setup Error:", error.message);
}

const db = admin.firestore();
module.exports = { db };