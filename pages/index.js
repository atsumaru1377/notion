import { Container, Typography, Button, Box, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [inputPassword, setInputPassword] = useState('');
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);

  useEffect(() => {
    setIsPasswordMatched(inputPassword === process.env.NEXT_PUBLIC_PASSWORD);
  }, [inputPassword]);

  return (
    <Container maxWidth="md" className="flex flex-col items-center justify-center h-screen space-y-4">
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to Movie and Drama Database
      </Typography>
      <TextField
        label="Password"
        type="password"
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
      />
      {isPasswordMatched && (
        <Box className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <Link href="/movies" passHref>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className="w-full text-black hover:text-white"
            >
              Movies
            </Button>
          </Link>
          <Link href="/dramas" passHref>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className="w-full text-black hover:text-white"
            >
              Dramas
            </Button>
          </Link>
          <Link href="/books" passHref>
            <Button
              variant="contained"
              color="warning"
              size="large"
              className="w-full text-black hover:text-white"
            >
              Books
            </Button>
          </Link>
        </Box>
      )}
    </Container>
  );
}