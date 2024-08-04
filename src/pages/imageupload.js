// src/pages/imageupload.js
'use client'
import { useState } from 'react';
import { storage, firestore } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { Box, Button, Typography } from '@mui/material';

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [classificationResult, setClassificationResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
    console.log('Image selected:', e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image to upload.');
      return;
    }

    setLoading(true);
    console.log('Uploading image...');
    
    try {
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
      console.log('Image uploaded:', imageUrl);

      const classification = await classifyImage(imageUrl);
      setClassificationResult(classification);
      console.log('Image classified:', classification);

      await addDoc(collection(firestore, 'classifiedImages'), {
        imageUrl,
        classification,
      });

      alert('Image uploaded and classified successfully!');
    } catch (error) {
      console.error('Error uploading and classifying image:', error);
      alert('Error uploading and classifying image.');
    } finally {
      setLoading(false);
    }
  };

  const classifyImage = async (imageUrl) => {
    console.log('Classifying image:', imageUrl);
    const response = await fetch('/api/classifyImage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl }),
    });

    const data = await response.json();
    console.log('Classification result:', data);
    return data.classification.join(', ');
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={5}>
      <Typography variant="h4">Upload and Classify Image</Typography>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <Button variant="contained" onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload and Classify'}
      </Button>
      {classificationResult && (
        <Box mt={2}>
          <Typography variant="h6">Classification Result:</Typography>
          <Typography>{classificationResult}</Typography>
        </Box>
      )}
    </Box>
  );
}
