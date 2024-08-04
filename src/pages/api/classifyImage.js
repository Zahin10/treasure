// src/pages/api/classify-image.js
import vision from '@google-cloud/vision';
import { firestore } from '../../firebase';

const client = new vision.ImageAnnotatorClient({
  keyFilename: 'C:\Users\zahin\OneDrive\Documents\cors.json', // Replace with your service account JSON path
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { imageUrl, userId } = req.body;

  try {
    const [result] = await client.labelDetection(imageUrl);
    const labels = result.labelAnnotations;
    const classifications = labels.map(label => label.description);

    const inventoryRef = firestore.collection(`users/${userId}/inventory`).doc();
    await inventoryRef.set({
      name: classifications.join(', '),
      quantity: 1,
      imageUrl: imageUrl,
    });

    res.status(200).json({ message: 'Image classified and added to inventory', classifications });
  } catch (error) {
    console.error('Error classifying image:', error);
    res.status(500).json({ error: 'Error classifying image', details: error.message });
  }
}
