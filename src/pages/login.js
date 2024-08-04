'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Typography } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';  // Adjust the path accordingly

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/inventory');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const goToSignup = () => {
    router.push('/signup');
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
        Login
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
        onClick={handleLogin}
        sx={{ padding: '10px 20px', fontSize: '1rem', fontFamily: 'Times New Roman, serif' }}
      >
        Login
      </Button>
      <Button
        variant="text"
        color="secondary"
        onClick={goToSignup}
        sx={{ padding: '10px 20px', fontSize: '1rem', fontFamily: 'Times New Roman, serif' }}
      >
        Don&apos;t have an account? Sign up
      </Button>
    </Box>
  );
}
