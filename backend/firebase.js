// backend/firebase.js
const admin = require('firebase-admin');

let serviceAccount;

try {
  const secretStr = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!secretStr) throw new Error("FIREBASE_SERVICE_ACCOUNT is missing from Railway Variables!");
  
  // Fixes potential escaped newline issues
  serviceAccount = JSON.parse(secretStr);
  if (serviceAccount.private_key) {
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
  }
} catch (error) {
  console.error("❌ Firebase Secret Parse Error:", error.message);
  // This will show up in your Railway logs so you know if the JSON is bad
}

if (!admin.apps.length && serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("✅ Firebase Admin Initialized");
}

const db = admin.firestore();
module.exports = { db };