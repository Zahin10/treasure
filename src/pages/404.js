'use client'
import { useRouter } from 'next/navigation';
import { Box, Typography, Button } from '@mui/material';

export default function Custom404() {
  const router = useRouter();

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      bgcolor="#f0f0f0"
      gap={2}
    >
      <Typography variant="h1" color="red">
        404 - Page Not Found
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/')}
      >
        Go Back Home
      </Button>
    </Box>
  );
}
