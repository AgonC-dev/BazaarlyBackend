const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Replace your uploadData function with this version
const uploadData = async () => {
  try {
    const products = JSON.parse(fs.readFileSync('products.json', 'utf-8'));
    console.log(`🚀 Starting upload to Firestore...`);

    for (const product of products) {
      const docId = product.id.toString(); // Ensure ID is a string
      const docRef = db.collection('products').doc(docId);
      
      // We await the actual result of the set operation
      await docRef.set(product); 
      console.log(`✅ Document ${docId} synchronized.`);
    }

    console.log('--- ALL DATA VERIFIED ON SERVER ---');
    // Give it a second before closing the script
    setTimeout(() => process.exit(0), 2000); 
  } catch (error) {
    console.error('❌ UPLOAD FAILED:', error);
  }
};

uploadData();