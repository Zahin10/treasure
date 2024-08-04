// src/pages/inventory.js

'use client'
import { useState, useEffect } from 'react';
import { firestore, storage, auth } from '../firebase';
import { Box, Modal, Stack, TextField, Typography, Button, IconButton, Link } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { collection, query, getDocs, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        updateInventory(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateInventory = async (uid) => {
    const snapshot = query(collection(firestore, `users/${uid}/inventory`));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const handleUpload = async () => {
    if (!user || !imageFile) return;

    const storageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);

    const response = await fetch('/api/classify-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl, userId: user.uid }),
    });

    if (response.ok) {
      const data = await response.json();
      await updateInventory(user.uid);
      alert(`Image classified as: ${data.classifications.join(', ')}`);
    } else {
      console.error('Error classifying image:', await response.json());
    }

    setItemName('');
    setImageFile(null);
  };

  const addItem = async (item) => {
    if (user && item) {
      const docRef = doc(collection(firestore, `users/${user.uid}/inventory`), item);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        await setDoc(docRef, { name: item, quantity: quantity + 1 });
      } else {
        await setDoc(docRef, { name: item, quantity: 1 });
      }
      await updateInventory(user.uid);
    }
  };

  const removeItem = async (item) => {
    if (user && item) {
      const docRef = doc(collection(firestore, `users/${user.uid}/inventory`), item);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        if (quantity === 1) {
          await deleteDoc(docRef);
        } else {
          await setDoc(docRef, { name: item, quantity: quantity - 1 });
        }
      }
      await updateInventory(user.uid);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      sx={{
        background: 'linear-gradient(180deg, #eef3ff, #dce4f5, #b9c7e2, #94a8d0, #748dc1, #5f7cb8, #5474b4, #44639f, #39588f, #2d4b81)',
      }}
    >
      <Box width="97%" bgcolor="#5474B4" p={2} boxShadow={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" color="white" fontFamily="Times New Roman, serif">
          Treasure
        </Typography>
        <Box>
          <IconButton component={Link} href="https://www.instagram.com/10_zahin/" target="_blank" sx={{ ml: -1 }}>
            <InstagramIcon style={{ color: 'white' }} />
          </IconButton>
          <IconButton component={Link} href="https://www.linkedin.com/in/zahin-chowdhury-sb/" target="_blank" sx={{ ml: -1 }}>
            <LinkedInIcon style={{ color: 'white' }} />
          </IconButton>
          <IconButton component={Link} href="https://github.com/Zahin10" target="_blank" sx={{ ml: -1 }}>
            <GitHubIcon style={{ color: 'white' }} />
          </IconButton>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" color="#5474B4">
            Add Item
          </Typography>
          <Stack width="100%" direction="column" spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => addItem(itemName)}
              sx={{ borderColor: "#5474B4", color: "#5474B4", fontFamily: 'Times New Roman, serif' }}
            >
              Add Item
            </Button>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              style={{ margin: '10px 0' }}
            />
            <Button
              variant="outlined"
              onClick={handleUpload}
              sx={{ borderColor: "#5474B4", color: "#5474B4", fontFamily: 'Times New Roman, serif' }}
            >
              Upload and Classify
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{ bgcolor: "#5474B4", '&:hover': { bgcolor: "#44639F" }, fontFamily: 'Times New Roman, serif' }}
      >
        Add New Item
      </Button>
      <Box border="1px solid #5474B4" borderRadius="8px" width="80%">
        <Box
          height="150px"
          bgcolor="#DCE4F5"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderTopLeftRadius="8px"
          borderTopRightRadius="8px"
        >
          <Typography variant="h2" color="#5474B4" textAlign="center" fontFamily="Times New Roman, serif">
            Inventory Items
          </Typography>
        </Box>
        <Stack width="100%" height="500px" spacing={2} overflow="auto" p={2}>
          {inventory.map(({ id, name, quantity }) => (
            <Box
              key={id}
              width="92%"
              minHeight="100px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgcolor="#f0f0f0"
              paddingX={5}
              borderRadius="8px"
              border="1px solid #DCE4F5"
              boxShadow={1}
            >
              <Typography variant="h6" color="#5474B4" textAlign="center" fontFamily="Times New Roman, serif">
                {name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Unnamed Item'}
              </Typography>
              <Typography variant="h6" color="#5474B4" textAlign="center" fontFamily="Times New Roman, serif">
                Quantity: {quantity}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  onClick={() => addItem(name)}
                  sx={{ bgcolor: "#5474B4", '&:hover': { bgcolor: "#44639F" }, fontFamily: 'Times New Roman, serif' }}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  onClick={() => removeItem(name)}
                  sx={{ bgcolor: "#5474B4", '&:hover': { bgcolor: "#44639F" }, fontFamily: 'Times New Roman, serif' }}
                >
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
