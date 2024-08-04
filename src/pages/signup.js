'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';  // Adjust the path accordingly

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={2}
      sx={{
        background: 'linear-gradient(180deg, #eef3ff, #dce4f5, #b9c7e2, #94a8d0, #748dc1, #5f7cb8, #5474b4, #44639f, #39588f, #2d4b81)',
      }}
    >
      <Typography variant="h4" color="#333" fontFamily="Times New Roman, serif">
        Sign Up
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSignup}
        sx={{ padding: '10px 20px', fontSize: '1rem', fontFamily: 'Times New Roman, serif' }}
      >
        Sign Up
      </Button>
      <Button
        variant="text"
        color="secondary"
        onClick={goToLogin}
        sx={{ padding: '10px 20px', fontSize: '1rem', fontFamily: 'Times New Roman, serif' }}
      >
        Already have an account? Login
      </Button>
    </Box>
  );
}
