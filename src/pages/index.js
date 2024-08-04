// src/pages/index.js

'use client'
import { useRouter } from 'next/navigation';
import { Box, Typography, Button } from '@mui/material';
import { styled, keyframes } from '@mui/system';

const Background = styled(Box)({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  background: 'linear-gradient(180deg, #00008B, #4B0082)',
  position: 'relative',
  overflow: 'hidden',
  gap: '4rem',
});

const Title = styled(Typography)({
  color: '#fff',
  fontSize: '4rem',
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  zIndex: 2,
});

const CustomButton = styled(Button)({
  padding: '15px 30px',
  fontSize: '1.5rem',
  textTransform: 'none',
  borderRadius: '8px',
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
  zIndex: 2,
  '&:hover': {
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
  },
});

const createFluidMovement = () => keyframes({
  '0%': { transform: `translate(0, 0) rotate(0deg)` },
  '50%': { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg)` },
  '100%': { transform: `translate(0, 0) rotate(360deg)` },
});

const Circle = styled(Box)(({ size }) => ({
  position: 'absolute',
  width: size,
  height: size,
  borderRadius: '50%',
  background: 'rgba(255, 215, 0, 0.5)', // Gold color
  animation: `${createFluidMovement()} 3s infinite linear`,
  zIndex: 1,
}));

const circles = [
  { size: '50px', top: '10%', left: '10%' },
  { size: '100px', top: '30%', left: '20%' },
  { size: '150px', top: '50%', left: '30%' },
  { size: '200px', top: '70%', left: '40%' },
  { size: '75px', top: '20%', left: '50%' },
  { size: '125px', top: '40%', left: '60%' },
  { size: '175px', top: '60%', left: '70%' },
  { size: '50px', top: '80%', left: '80%' },
  { size: '150px', top: '25%', left: '90%' },
  { size: '100px', top: '45%', left: '10%' },
  { size: '200px', top: '65%', left: '20%' },
  { size: '75px', top: '85%', left: '30%' },
  { size: '125px', top: '15%', left: '40%' },
  { size: '175px', top: '35%', left: '50%' },
  { size: '50px', top: '55%', left: '60%' },
  { size: '100px', top: '75%', left: '70%' },
  { size: '150px', top: '10%', left: '80%' },
  { size: '200px', top: '30%', left: '90%' },
  { size: '75px', top: '50%', left: '10%' },
  { size: '125px', top: '70%', left: '20%' },
  { size: '175px', top: '90%', left: '30%' },
];

export default function HomePage() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/inventory');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <Background>
      {circles.map((circle, index) => (
        <Circle key={index} size={circle.size} style={{ top: circle.top, left: circle.left }} />
      ))}
      <Title variant="h1">
        Treasure
      </Title>
      <CustomButton
        variant="contained"
        color="primary"
        onClick={handleStart}
      >
        Let&apos;s Start
      </CustomButton>
      <CustomButton
        variant="contained"
        color="secondary"
        onClick={handleLogin}
      >
        Login
      </CustomButton>
    </Background>
  );
}
